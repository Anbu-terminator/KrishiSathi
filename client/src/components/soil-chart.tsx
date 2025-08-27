import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { BarChart3 } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Skeleton } from "./ui/skeleton";

interface SoilDataEntry {
  id: string;
  ph: number;
  temperature: number;
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  humidity: number;
  location?: string;
  createdAt: string;
}

export default function SoilChart() {
  const { t } = useLanguage();

  const { data: soilData, isLoading, error } = useQuery<SoilDataEntry[]>({
    queryKey: ["/api/soil"],
  });

  // Process data for charts
  const chartData = soilData?.slice(-7).map((entry, index) => ({
    date: new Date(entry.createdAt).toLocaleDateString('en', { month: 'short', day: 'numeric' }),
    N: entry.nitrogen,
    P: entry.phosphorus,
    K: entry.potassium,
    pH: entry.ph,
    Temp: entry.temperature,
    entry: entry
  })) || [];

  const averageData = soilData?.length ? [{
    name: 'Average',
    N: soilData.reduce((sum, item) => sum + item.nitrogen, 0) / soilData.length,
    P: soilData.reduce((sum, item) => sum + item.phosphorus, 0) / soilData.length,
    K: soilData.reduce((sum, item) => sum + item.potassium, 0) / soilData.length,
  }] : [];

  if (error) {
    return (
      <Card data-testid="soil-chart-error">
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">Failed to load soil data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card data-testid="soil-chart">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <BarChart3 className="w-5 h-5 text-farmer-green" />
          <h3 className="font-semibold text-farmer-green" data-testid="soil-chart-title">
            {t('soilAnalytics')}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 w-full" data-testid="chart-skeleton" />
            <div className="grid grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        ) : !soilData || soilData.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8"
            data-testid="no-soil-data"
          >
            <BarChart3 className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-muted-foreground">No soil data available</p>
            <p className="text-sm text-muted-foreground mt-2">
              Add some soil measurements to see your analytics
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* NPK Levels Bar Chart */}
            <div className="space-y-2">
              <h4 className="font-medium text-sm">NPK Levels Over Time</h4>
              <div className="h-48" data-testid="npk-chart">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--card)', 
                        border: '1px solid var(--border)',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="N" fill="var(--farmer-green)" name="Nitrogen" />
                    <Bar dataKey="P" fill="var(--farmer-yellow)" name="Phosphorus" />
                    <Bar dataKey="K" fill="var(--farmer-brown)" name="Potassium" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* pH and Temperature Line Chart */}
            {chartData.length > 1 && (
              <div className="space-y-2">
                <h4 className="font-medium text-sm">pH & Temperature Trends</h4>
                <div className="h-40" data-testid="ph-temp-chart">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" fontSize={12} />
                      <YAxis fontSize={12} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'var(--card)', 
                          border: '1px solid var(--border)',
                          borderRadius: '8px'
                        }}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="pH" 
                        stroke="var(--farmer-neon)" 
                        name="pH Level"
                        strokeWidth={2}
                      />
                      <Line 
                        type="monotone" 
                        dataKey="Temp" 
                        stroke="var(--farmer-yellow)" 
                        name="Temperature (°C)"
                        strokeWidth={2}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            )}

            {/* Summary Stats */}
            <div className="grid grid-cols-3 gap-4" data-testid="soil-stats">
              <div className="text-center p-3 bg-farmer-green/10 rounded-lg">
                <p className="text-2xl font-bold text-farmer-green">
                  {soilData[soilData.length - 1]?.nitrogen || 0}
                </p>
                <p className="text-xs text-muted-foreground">Nitrogen (N)</p>
              </div>
              <div className="text-center p-3 bg-farmer-yellow/10 rounded-lg">
                <p className="text-2xl font-bold text-farmer-yellow">
                  {soilData[soilData.length - 1]?.phosphorus || 0}
                </p>
                <p className="text-xs text-muted-foreground">Phosphorus (P)</p>
              </div>
              <div className="text-center p-3 bg-farmer-brown/10 rounded-lg">
                <p className="text-2xl font-bold text-farmer-brown">
                  {soilData[soilData.length - 1]?.potassium || 0}
                </p>
                <p className="text-xs text-muted-foreground">Potassium (K)</p>
              </div>
            </div>

            {/* Latest Reading Info */}
            {soilData.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center text-xs text-muted-foreground"
                data-testid="latest-reading"
              >
                Last updated: {new Date(soilData[soilData.length - 1].createdAt).toLocaleString()}
                {soilData[soilData.length - 1].location && (
                  <span> • {soilData[soilData.length - 1].location}</span>
                )}
              </motion.div>
            )}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
