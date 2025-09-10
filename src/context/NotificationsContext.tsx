import React, { createContext, useCallback, useContext, useMemo, useState } from "react";

export type NotificationType = "info" | "success" | "warning" | "error";

export interface AppNotification {
  id: number;
  title: string;
  message: string;
  type: NotificationType;
  createdAt: string;
}

interface NotificationsContextValue {
  notifications: AppNotification[];
  addNotification: (input: Omit<AppNotification, "id" | "createdAt">) => AppNotification;
  removeNotification: (id: number) => void;
  notifyProductDeleted: (productName: string) => void;
  notifyProductAdded: (productName: string) => void;
  notifyUserAdded: (userName: string) => void;
  notifyNotificationAdded: (title: string) => void;
}

const NotificationsContext = createContext<NotificationsContextValue | undefined>(undefined);

export function NotificationsProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [seq, setSeq] = useState<number>(1);

  const addNotification: NotificationsContextValue["addNotification"] = useCallback((input) => {
    setSeq((s) => s + 1);
    const newNotification: AppNotification = {
      id: Date.now() + Math.floor(Math.random() * 1000),
      title: input.title,
      message: input.message,
      type: input.type,
      createdAt: new Date().toISOString(),
    };
    setNotifications((prev) => [newNotification, ...prev]);
    return newNotification;
  }, []);

  const removeNotification = useCallback((id: number) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const notifyProductDeleted = useCallback((productName: string) => {
    addNotification({ title: "Produit supprimé", message: `${productName} a été supprimé`, type: "warning" });
    if (typeof window !== 'undefined') {
      window.alert(`Produit supprimé: ${productName}`);
    }
  }, [addNotification]);

  const notifyProductAdded = useCallback((productName: string) => {
    addNotification({ title: "Nouveau produit", message: `${productName} a été ajouté`, type: "success" });
  }, [addNotification]);

  const notifyUserAdded = useCallback((userName: string) => {
    addNotification({ title: "Nouvel utilisateur", message: `${userName} a rejoint`, type: "info" });
  }, [addNotification]);

  const notifyNotificationAdded = useCallback((title: string) => {
    addNotification({ title: "Notification ajoutée", message: `"${title}" a été créée`, type: "info" });
    if (typeof window !== 'undefined') {
      window.alert(`Notification ajoutée: ${title}`);
    }
  }, [addNotification]);

  const value = useMemo<NotificationsContextValue>(() => ({
    notifications,
    addNotification,
    removeNotification,
    notifyProductDeleted,
    notifyProductAdded,
    notifyUserAdded,
    notifyNotificationAdded,
  }), [notifications, addNotification, removeNotification, notifyProductDeleted, notifyProductAdded, notifyUserAdded, notifyNotificationAdded]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}

export function useNotifications(): NotificationsContextValue {
  const ctx = useContext(NotificationsContext);
  if (!ctx) throw new Error("useNotifications must be used within NotificationsProvider");
  return ctx;
}


