import { createContext, useContext, useEffect, useState } from "react";

const themes = {
  cyan: {
    name: "Cyan",
    background:
      "bg-gradient-to-br from-[#020617] via-[#111827] to-[#0f172a]",
  },

  green: {
    name: "Spotify",
    background:
      "bg-gradient-to-br from-[#071b11] via-[#0d2b1f] to-[#05110b]",
  },

  purple: {
    name: "Galaxy",
    background:
      "bg-gradient-to-br from-[#120822] via-[#24103b] to-[#090312]",
  },

  orange: {
    name: "Sunset",
    background:
      "bg-gradient-to-br from-[#3b1405] via-[#6b2d06] to-[#120701]",
  },

  blue: {
    name: "Ocean",
    background:
      "bg-gradient-to-br from-[#021329] via-[#08294b] to-[#031120]",
  },
};

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "cyan"
  );

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        themes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);