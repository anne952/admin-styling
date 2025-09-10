import React, { FormEvent, useState } from "react";
import Layout from "../components/layout";
import { useNotifications } from "../context/NotificationsContext";

export default function NotificationPage() {
  const { notifications, addNotification, removeNotification, notifyNotificationAdded } = useNotifications();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "success" | "warning" | "error">("info");
  const [showForm, setShowForm] = useState(false);

  const totalCount = notifications.length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addNotification({ title, message, type });
    notifyNotificationAdded(title.trim());
    setTitle("");
    setMessage("");
    setType("info");
  };

  return (
    <Layout>
      <h1 className="font-bold ml-10 text-xl text-blue-500">Notifications</h1>

      <div className="m-4">
        <button
          type="button"
          onClick={() => setShowForm((s) => !s)}
          className="bg-green-600 text-white rounded px-4 py-2"
        >
          {showForm ? "Fermer" : "+ Ajouter"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="m-4 p-4 bg-white rounded shadow-sm grid grid-cols-1 md:grid-cols-4 gap-3">
          <input
            className="border rounded p-2"
            placeholder="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <input
            className="border rounded p-2 md:col-span-2"
            placeholder="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <select className="border rounded p-2" value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="info">Info</option>
            <option value="success">Succès</option>
            <option value="warning">Alerte</option>
            <option value="error">Erreur</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white rounded px-4 py-2 md:col-span-4">Ajouter</button>
        </form>
      )}

      <ul className="m-4 divide-y divide-gray-200 bg-white rounded shadow-sm ">
        {notifications.map((n) => (
          <li key={n.id} className="p-4 flex items-start justify-between">
            <div>
              <p className="font-semibold">{n.title}</p>
              {n.message && <p className="text-sm text-gray-600">{n.message}</p>}
              <p className="text-xs text-gray-400">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
            <button
              type="button"
              onClick={() => removeNotification(n.id)}
              className="text-red-600 hover:text-red-800"
            >
              Supprimer
            </button>
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="p-4 text-gray-500">Aucune notification pour l'instant.</li>
        )}
      </ul>
    </Layout>
  );
}