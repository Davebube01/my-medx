import React, { createContext, useContext, useEffect, useState } from "react";
import type { PhcSettings, Staff } from "./types";
import * as api from "./services/phcApi";
import { NotificationProvider } from "./notification/NotificationProvider";

type PhcContextValue = {
  settings: PhcSettings | null;
  staff: Staff[];
  refresh: () => Promise<void>;
};

const PhcContext = createContext<PhcContextValue | undefined>(undefined);

export const PhcProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, _setSettings] = useState<PhcSettings | null>(null);
  const [staff, setStaff] = useState<Staff[]>([]);

  const refresh = async () => {
    const s = await api.getStaffList();
    setStaff(s);
    // In real API we would fetch settings; here we reuse staff as placeholder
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <PhcContext.Provider value={{ settings, staff, refresh }}>
      <NotificationProvider>{children}</NotificationProvider>
    </PhcContext.Provider>
  );
};

export function usePhcContext() {
  const ctx = useContext(PhcContext);
  if (!ctx) throw new Error("usePhcContext must be used within PhcProvider");
  return ctx;
}
