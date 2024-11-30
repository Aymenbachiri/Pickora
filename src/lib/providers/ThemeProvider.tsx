import { createContext, useContext } from "react";
import { useColorScheme } from "nativewind";

interface ThemeContextProps {
  colorScheme: "dark" | "light";
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme: rawColorScheme, toggleColorScheme } = useColorScheme();
  const colorScheme: "dark" | "light" = rawColorScheme ?? "light";

  return (
    <ThemeContext.Provider value={{ colorScheme, toggleColorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
