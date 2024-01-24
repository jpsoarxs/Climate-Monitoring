// SettingsContext.tsx
import React, { ReactNode, createContext, useContext, useState } from "react";

const defaultSettings: {
  darkMode?: boolean;
  measure?: "metric" | "imperial";
  loading?: boolean;
  search?: string;
} = {
  darkMode: false,
  measure: "metric",
  loading: false,
  search: "",
};

export const SettingsContext = createContext<{
  settings: typeof defaultSettings;
  setSettings: (settings: typeof defaultSettings) => void;
}>({
  settings: defaultSettings,
  setSettings: () => {},
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [settings, setSettings] = useState<{
    darkMode?: boolean;
    measure?: "metric" | "imperial";
    loading?: boolean;
    search?: string;
  }>(defaultSettings);

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
