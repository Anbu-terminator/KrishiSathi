import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMutation } from "@tanstack/react-query";
import { Bot, User, Send, Mic } from "lucide-react";
import { useLanguage } from "../hooks/use-language";
import { apiRequest } from "../lib/queryClient";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { useToast } from "../hooks/use-toast";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

// ✅ Setup Speech Recognition and Speech Synthesis
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
const recognition = SpeechRecognition ? new SpeechRecognition() : null;
const synth = window.speechSynthesis;

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false); // ✅ added missing state
  const { language, t } = useLanguage();
  const { toast } = useToast();

  const chatMutation = useMutation({
    mutationFn: async (message: string) => {
      const response = await apiRequest("POST", "/api/chat", {
        query: message, // ✅ match server expects "query"
        language,
      });
      return response.json();
    },
    onSuccess: (data, variables) => {
      const userMessage: Message = {
        id: Date.now() + "_user",
        role: "user",
        content: variables,
        timestamp: new Date(),
      };

      const assistantMessage: Message = {
        id: Date.now() + "_assistant",
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage, assistantMessage]);
      setInputMessage("");
    },
    onError: (error: any) => {
      toast({
        title: t("error"),
        description: error.message || "Failed to send message",
        variant: "destructive",
      });
    },
  });

  // 🎤 Voice input handler
  const startListening = () => {
    if (!recognition) {
      toast({
        title: t("error"),
        description: "Speech recognition is not supported in this browser.",
        variant: "destructive",
      });
      return;
    }

    recognition.lang =
      language === "hi" ? "hi-IN" : language === "ta" ? "ta-IN" : "en-IN";
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage((prev) => prev + " " + transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
      toast({
        title: t("error"),
        description: t("voiceError"),
        variant: "destructive",
      });
    };
  };

  // 🔊 Text-to-speech
  const speakResponse = (text: string) => {
    if (!synth) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang =
      language === "hi" ? "hi-IN" : language === "ta" ? "ta-IN" : "en-US";
    synth.speak(utterance);
  };

  // Auto-speak assistant replies
  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (lastMessage?.role === "assistant") {
      speakResponse(lastMessage.content);
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || chatMutation.isPending) return;
    chatMutation.mutate(inputMessage.trim());
  };

  return (
    <Card className="h-[80vh] max-h-[800px] flex flex-col min-h-[400px]" data-testid="chat-interface">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-2">
          <Bot className="w-5 h-5 text-farmer-green" />
          <h3 className="font-semibold text-farmer-green" data-testid="chat-title">
            {t("aiAssistant")}
          </h3>
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        {/* Messages */}
        <ScrollArea className="h-[calc(80vh-160px)] p-4" data-testid="chat-messages">
          <AnimatePresence>
            {messages.length === 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center text-muted-foreground py-8"
                data-testid="chat-welcome"
              >
                <Bot className="w-12 h-12 mx-auto mb-4 text-farmer-green" />
                <p>
                  {language === "hi"
                    ? "नमस्ते! मैं आपका AI कृषि सलाहकार हूं। आप अपनी फसल के बारे में कोई भी सवाल पूछ सकते हैं।"
                    : language === "ta"
                    ? "வணக்கம்! நான் உங்கள் AI விவசாய ஆலோசகர். நீங்கள் உங்கள் பயிர்களைப் பற்றி எந்தக் கேள்வியும் கேட்கலாம்."
                    : "Hello! I'm your AI agricultural advisor. You can ask me any questions about your crops."}
                </p>
              </motion.div>
            )}

            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`mb-4 flex ${
                  message.role === "user" ? "justify-end" : "justify-start"
                }`}
                data-testid={`message-${message.role}`}
              >
                <div
                  className={`flex space-x-2 max-w-[80%] ${
                    message.role === "user"
                      ? "flex-row-reverse space-x-reverse"
                      : ""
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.role === "user"
                        ? "bg-farmer-green text-white"
                        : "bg-farmer-green/20 text-farmer-green"
                    }`}
                  >
                    {message.role === "user" ? (
                      <User className="w-4 h-4" />
                    ) : (
                      <Bot className="w-4 h-4" />
                    )}
                  </div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.role === "user"
                        ? "bg-farmer-green text-white"
                        : "bg-card border border-border"
                    }`}
                  >
                    <p
                      className="text-sm whitespace-pre-wrap"
                      data-testid="message-content"
                    >
                      {message.content}
                    </p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t flex space-x-2">
          <form onSubmit={handleSendMessage} className="flex flex-1 space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              placeholder={t("chatPlaceholder")}
              disabled={chatMutation.isPending}
              className="flex-1"
              data-testid="chat-input"
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || chatMutation.isPending}
              className="px-4 py-2 bg-farmer-green hover:bg-farmer-neon text-white rounded-lg transition-colors duration-300"
              data-testid="chat-send-button"
            >
              {chatMutation.isPending ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </form>
          <Button
            type="button"
            onClick={startListening}
            className={`px-3 py-2 rounded-lg ${
              isListening ? "bg-red-500" : "bg-farmer-green"
            } text-white`}
            title="Voice Input"
          >
            <Mic className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
