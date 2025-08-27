import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Leaf, Save } from "lucide-react";
import { z } from "zod";
import { useLanguage } from "../hooks/use-language";
import { apiRequest } from "../lib/queryClient";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";

const soilFormSchema = z.object({
  ph: z.number().min(0).max(14),
  temperature: z.number().min(-50).max(70),
  nitrogen: z.number().min(0).max(200),
  phosphorus: z.number().min(0).max(200),
  potassium: z.number().min(0).max(200),
  humidity: z.number().min(0).max(100).optional(),
  location: z.string().optional(),
});

type SoilFormData = z.infer<typeof soilFormSchema>;

export default function SoilForm() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<SoilFormData>({
    resolver: zodResolver(soilFormSchema),
    defaultValues: {
      ph: 6.5,
      temperature: 25,
      nitrogen: 40,
      phosphorus: 30,
      potassium: 20,
      humidity: 60,
      location: ""
    }
  });

  const soilMutation = useMutation({
    mutationFn: async (data: SoilFormData) => {
      const response = await apiRequest("POST", "/api/soil", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: t('success'),
        description: "Soil data saved successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/soil"] });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: t('error'),
        description: error.message || "Failed to save soil data",
        variant: "destructive"
      });
    }
  });

  const onSubmit = (data: SoilFormData) => {
    soilMutation.mutate(data);
  };

  return (
    <Card data-testid="soil-form">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <Leaf className="w-5 h-5 text-farmer-brown" />
          <h3 className="font-semibold text-farmer-brown" data-testid="soil-form-title">
            {t('soilData')}
          </h3>
        </div>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Location</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Punjab, India" 
                      {...field}
                      data-testid="input-location"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* pH and Temperature */}
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="ph"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('phLevel')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.1" 
                        min="0" 
                        max="14"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-ph"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="temperature"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('temperature')} (°C)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="-50" 
                        max="70"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-temperature"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* NPK Values */}
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="nitrogen"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('nitrogen')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="200"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-nitrogen"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phosphorus"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('phosphorus')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="200"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-phosphorus"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="potassium"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">{t('potassium')}</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="200"
                        {...field}
                        onChange={e => field.onChange(parseFloat(e.target.value))}
                        data-testid="input-potassium"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Humidity */}
            <FormField
              control={form.control}
              name="humidity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium">Humidity (%)</FormLabel>
                  <FormControl>
                    <Input 
                      type="number" 
                      min="0" 
                      max="100"
                      {...field}
                      onChange={e => field.onChange(parseFloat(e.target.value))}
                      data-testid="input-humidity"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                type="submit"
                disabled={soilMutation.isPending}
                className="w-full bg-farmer-brown hover:bg-farmer-brown/80 text-white"
                data-testid="save-soil-data"
              >
                {soilMutation.isPending ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    {t('saveSoilData')}
                  </>
                )}
              </Button>
            </motion.div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
