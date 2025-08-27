import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CloudSun, Sun, Cloud, CloudRain, Droplets, Thermometer } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface WeatherData {
  location: string;
  forecast: Array<{
    date: string;
    temperature: number;
    description: string;
    icon: string;
    humidity: number;
    rainfall: number;
  }>;
  alerts: string[];
}

export default function WeatherWidget() {
  const { t } = useLanguage();

  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null);

  const { data: weather, isLoading, error } = useQuery<WeatherData>({
    queryKey: ["weather", location?.lat, location?.lon],
    queryFn: async () => {
      const response = await fetch(`/api/weather?lat=${location?.lat ?? 0}&lon=${location?.lon ?? 0}`);
      return response.json();
    },
    enabled: !!location,
    refetchInterval: 5 * 60 * 1000,
  });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => setLocation({ lat: pos.coords.latitude, lon: pos.coords.longitude }),
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  const getWeatherIcon = (iconCode: string, temp: number) => {
    if (iconCode.includes('01')) return <Sun className="w-5 h-5 text-farmer-yellow" />;
    if (iconCode.includes('02') || iconCode.includes('03')) return <Cloud className="w-5 h-5 text-gray-500" />;
    if (iconCode.includes('09') || iconCode.includes('10')) return <CloudRain className="w-5 h-5 text-blue-500" />;
    return <CloudSun className="w-5 h-5 text-farmer-yellow" />;
  };

  if (error) {
    return (
      <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white" data-testid="weather-error">
        <CardContent className="p-6">
          <h4 className="font-semibold mb-2">{t('error')}</h4>
          <p className="text-sm opacity-90">Failed to load weather data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white" data-testid="weather-widget">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <CloudSun className="w-5 h-5" />
          <h4 className="font-semibold" data-testid="weather-title">
            {t('weatherForecast')}
          </h4>
        </div>
        {weather?.location && (
          <p className="text-sm opacity-90" data-testid="weather-location">
            📍 {weather.location}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {isLoading ? (
          <div className="space-y-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex justify-between items-center">
                <Skeleton className="h-4 w-16 bg-white/20" />
                <Skeleton className="h-4 w-20 bg-white/20" />
              </div>
            ))}
          </div>
        ) : weather?.forecast ? (
          <motion.div className="space-y-3" data-testid="weather-forecast">
            {weather.forecast.slice(0, 5).map((day, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex justify-between items-center hover:bg-white/10 rounded-lg p-2 transition-colors"
                data-testid={`weather-day-${index}`}
              >
                <div className="flex items-center space-x-3">
                  {getWeatherIcon(day.icon, day.temperature)}
                  <span className="text-sm">
                    {index === 0 ? t('today') : new Date(day.date).toLocaleDateString(navigator.language, { weekday: 'short', timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone })}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3 text-sm">
                  <div className="flex items-center space-x-1">
                    <Thermometer className="w-3 h-3" />
                    <span>{day.temperature}°C</span>
                  </div>
                  {day.rainfall > 0 && (
                    <div className="flex items-center space-x-1">
                      <Droplets className="w-3 h-3" />
                      <span>{day.rainfall}mm</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="text-sm opacity-90" data-testid="weather-no-data">No weather data available</p>
        )}

        {/* Weather Alerts */}
        {weather?.alerts && weather.alerts.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 p-3 bg-yellow-500/20 border border-yellow-500/30 rounded-lg"
            data-testid="weather-alerts"
          >
            <h5 className="font-semibold text-yellow-200 mb-2">⚠️ Farm Alerts</h5>
            {weather.alerts.map((alert, index) => (
              <p key={index} className="text-xs text-yellow-100 mb-1" data-testid={`weather-alert-${index}`}>
                {alert}
              </p>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
