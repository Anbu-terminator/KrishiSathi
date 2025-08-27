import { LanguageProvider as LanguageContextProvider } from "../hooks/use-language";
import { ReactNode } from "react";

interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  return <LanguageContextProvider>{children}</LanguageContextProvider>;
}
