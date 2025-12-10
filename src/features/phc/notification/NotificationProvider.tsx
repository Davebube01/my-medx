import React, { createContext, useContext, useState, useCallback } from "react";

type Notify = (message: string, opts?: { duration?: number }) => void;

const NotifyContext = createContext<Notify | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<{ id: string; message: string }[]>([]);

  const notify: Notify = useCallback((message, opts = { duration: 4000 }) => {
    const id = `${Date.now()}`;
    setToasts((s) => [...s, { id, message }]);
    setTimeout(() => setToasts((s) => s.filter((t) => t.id !== id)), opts.duration);
  }, []);

  return (
    <NotifyContext.Provider value={notify}>
      {children}
      <div aria-live="polite" className="fixed right-4 bottom-4 flex flex-col gap-2 z-50">
        {toasts.map((t) => (
          <div key={t.id} className="bg-foreground text-foreground-contrast px-4 py-2 rounded shadow text-sm bg-black text-white">{t.message}</div>
        ))}
      </div>
    </NotifyContext.Provider>
  );
};

export function useNotify() {
  const ctx = useContext(NotifyContext);
  if (!ctx) throw new Error("useNotify must be used within NotificationProvider");
  return ctx;
}
