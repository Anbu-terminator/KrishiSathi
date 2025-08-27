import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, Upload, AlertCircle, CheckCircle, X } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import { apiRequest } from "../lib/queryClient";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { useToast } from "../hooks/use-toast";

interface DetectionResult {
  plantName: string;
  probability: number;
  isHealthy: boolean;
  diseases: Array<{
    name: string;
    probability: number;
  }>;
  recommendations: string[];
}

export default function DiseaseDetection() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [result, setResult] = useState<DetectionResult | null>(null);
  const { t } = useLanguage();
  const { toast } = useToast();

  const detectionMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/plant', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error(`Detection failed: ${response.statusText}`);
      }
      
      return response.json();
    },
    onSuccess: (data) => {
      setResult(data);
      toast({
        title: t('success'),
        description: "Plant analysis completed successfully",
      });
    },
    onError: (error: any) => {
      toast({
        title: t('error'),
        description: error.message || "Failed to analyze plant image",
        variant: "destructive"
      });
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: t('error'),
          description: "Image size must be less than 5MB",
          variant: "destructive"
        });
        return;
      }
      
      if (!file.type.startsWith('image/')) {
        toast({
          title: t('error'),
          description: "Please select a valid image file",
          variant: "destructive"
        });
        return;
      }
      
      setSelectedFile(file);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      detectionMutation.mutate(selectedFile);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setResult(null);
  };

  return (
    <Card className="h-full" data-testid="disease-detection">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <Camera className="w-5 h-5 text-red-500" />
          <h3 className="font-semibold text-red-500" data-testid="disease-title">
            {t('identifyDisease')}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* File Upload Area */}
        <div className="space-y-4">
          {!previewUrl ? (
            <motion.div
              className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center hover:border-farmer-neon transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              data-testid="upload-area"
            >
              <Camera className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Upload plant image for disease detection
              </p>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="image-upload"
                disabled={detectionMutation.isPending}
                data-testid="file-input"
              />
              <Button asChild variant="outline" data-testid="upload-button">
                <label htmlFor="image-upload" className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  {t('upload')} Image
                </label>
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
              data-testid="image-preview"
            >
              <img
                src={previewUrl}
                alt="Plant preview"
                className="w-full h-48 object-cover rounded-lg"
                data-testid="preview-image"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2"
                onClick={clearSelection}
                disabled={detectionMutation.isPending}
                data-testid="clear-image"
              >
                <X className="w-4 h-4" />
              </Button>
            </motion.div>
          )}
        </div>

        {/* Analyze Button */}
        {selectedFile && !result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              onClick={handleAnalyze}
              disabled={detectionMutation.isPending}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
              data-testid="analyze-button"
            >
              {detectionMutation.isPending ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                  />
                  Analyzing...
                </>
              ) : (
                <>
                  <Camera className="w-4 h-4 mr-2" />
                  Analyze Plant
                </>
              )}
            </Button>
          </motion.div>
        )}

        {/* Results */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
              data-testid="detection-results"
            >
              {/* Plant Identification */}
              <div className="p-4 bg-card rounded-lg border">
                <h4 className="font-semibold mb-2 flex items-center" data-testid="plant-name">
                  🌱 {result.plantName}
                  <span className="ml-2 text-sm text-muted-foreground">
                    ({Math.round(result.probability * 100)}% confidence)
                  </span>
                </h4>
              </div>

              {/* Health Status */}
              <div className={`p-4 rounded-lg border ${result.isHealthy ? 'bg-green-50 border-green-200 dark:bg-green-900/20' : 'bg-red-50 border-red-200 dark:bg-red-900/20'}`}>
                <div className="flex items-center mb-2">
                  {result.isHealthy ? (
                    <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                  )}
                  <h4 className={`font-semibold ${result.isHealthy ? 'text-green-800 dark:text-green-400' : 'text-red-800 dark:text-red-400'}`} data-testid="health-status">
                    {result.isHealthy ? "Plant appears healthy" : "Potential issues detected"}
                  </h4>
                </div>
                
                {!result.isHealthy && result.diseases.length > 0 && (
                  <div className="mt-3" data-testid="diseases-list">
                    <p className="text-sm font-medium mb-2">Detected Issues:</p>
                    {result.diseases.slice(0, 3).map((disease, index) => (
                      <p key={index} className="text-sm text-red-700 dark:text-red-300" data-testid={`disease-${index}`}>
                        • {disease.name} ({Math.round(disease.probability * 100)}%)
                      </p>
                    ))}
                  </div>
                )}
              </div>

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200" data-testid="recommendations">
                  <h4 className="font-semibold mb-2 text-blue-800 dark:text-blue-400">
                    💡 Recommendations
                  </h4>
                  <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start" data-testid={`recommendation-${index}`}>
                        <span className="mr-2">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
