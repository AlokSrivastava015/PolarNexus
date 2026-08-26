import React, { createContext, useContext, useState, useEffect } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [themeMode, setThemeModeState] = useState(() => {
    return localStorage.getItem("polarnexus_theme") || "default";
  });

  const [activeTheme, setActiveTheme] = useState("light");

  const setThemeMode = (mode) => {
    setThemeModeState(mode);
    localStorage.setItem("polarnexus_theme", mode);
  };

  useEffect(() => {
    const applyTheme = () => {
      let computed = "light";
      if (themeMode === "dark") {
        computed = "dark";
      } else if (themeMode === "light") {
        computed = "light";
      } else {
        // default / device mode
        const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        computed = systemDark ? "dark" : "light";
      }

      setActiveTheme(computed);
      document.documentElement.setAttribute("data-theme", computed);
      document.documentElement.setAttribute("data-mode", themeMode);
    };

    applyTheme();

    if (themeMode === "default") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = () => applyTheme();
      if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener("change", handler);
        return () => mediaQuery.removeEventListener("change", handler);
      } else if (mediaQuery.addListener) {
        mediaQuery.addListener(handler);
        return () => mediaQuery.removeListener(handler);
      }
    }
  }, [themeMode]);

  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode, activeTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
