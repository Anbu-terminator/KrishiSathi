import { ThemeProvider as ThemeContextProvider } from "../hooks/use-theme";
import { ReactNode } from "react";

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  return <ThemeContextProvider>{children}</ThemeContextProvider>;
}
