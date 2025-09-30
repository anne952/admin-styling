import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';

export interface AlertItem {
  id: number;
  type: 'success' | 'error';
  message: string;
}

interface AlertsContextValue {
  alerts: AlertItem[];
  push: (type: AlertItem['type'], message: string) => void;
  remove: (id: number) => void;
}

const AlertsContext = createContext<AlertsContextValue | undefined>(undefined);

export function AlertsProvider({ children }: { children: React.ReactNode }) {
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const push = useCallback((type: AlertItem['type'], message: string) => {
    const item: AlertItem = { id: Date.now() + Math.floor(Math.random() * 1000), type, message };
    setAlerts((prev) => [item, ...prev]);
    setTimeout(() => {
      setAlerts((prev) => prev.filter((a) => a.id !== item.id));
    }, 4000);
  }, []);
  const remove = useCallback((id: number) => setAlerts((prev) => prev.filter((a) => a.id !== id)), []);
  const value = useMemo(() => ({ alerts, push, remove }), [alerts, push, remove]);
  return (
    <AlertsContext.Provider value={value}>
      {children}
    </AlertsContext.Provider>
  );
}

export function useAlerts(): AlertsContextValue {
  const ctx = useContext(AlertsContext);
  if (!ctx) throw new Error('useAlerts must be used within AlertsProvider');
  return ctx;
}

export function AlertsViewport() {
  const { alerts, remove } = useAlerts();
  return (
    <div className="fixed top-4 inset-x-0 flex flex-col items-center z-50 pointer-events-none">
      {alerts.map((a) => (
        <div key={a.id} className={`pointer-events-auto mb-2 px-4 py-2 rounded shadow text-white ${a.type==='success'?'bg-green-600':'bg-red-600'}`}>
          <div className="flex items-center gap-3">
            <span>{a.message}</span>
            <button className="bg-white/20 px-2 py-0.5 rounded" onClick={() => remove(a.id)}>X</button>
          </div>
        </div>
      ))}
    </div>
  );
}


