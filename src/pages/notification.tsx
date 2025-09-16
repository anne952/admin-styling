import React, { FormEvent, useState } from "react";
import Layout from "../components/layout";
import { useNotifications } from "../context/NotificationsContext";

export default function NotificationPage() {
  const { notifications, addNotification, removeNotification } = useNotifications();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState<"info" | "success" | "warning" | "error">("info");
  const [showForm, setShowForm] = useState(false);

  const totalCount = notifications.length;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    addNotification({ title, message, type });
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

      <ul className="m-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {notifications.map((n) => (
          <li key={n.id} className="bg-blue-400 text-white rounded-xl p-5 flex items-start justify-between shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
            <div className="pr-4">
              <p className="font-semibold text-lg">{n.title}</p>
              {n.message && <p className="text-sm opacity-90">{n.message}</p>}
              <p className="text-xs opacity-80 mt-1">{new Date(n.createdAt).toLocaleString()}</p>
            </div>
            <button
              type="button"
              onClick={() => removeNotification(n.id)}
              className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md backdrop-blur-sm transition-colors"
            >
              Supprimer
            </button>
          </li>
        ))}
        {notifications.length === 0 && (
          <li className="p-4 text-gray-500 bg-white rounded">Aucune notification pour l'instant.</li>
        )}
      </ul>
    </Layout>
  );
}