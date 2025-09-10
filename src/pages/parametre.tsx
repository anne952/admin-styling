// src/pages/Parametre.tsx
import UserProfile from "../components/userProfil";
import Layout from "../components/layout";
import React from "react";
import { ProfileService } from "../services/profile";

const Parametre = () => (
  <Layout>
    <div className="m-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-600">Paramètres</h1>
        <p className="text-gray-600">Gérez votre profil, sécurité et préférences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <UserProfile
            imageUrl="https://randomuser.me/api/portraits/men/1.jpg"
            name="Andreuis"
            email="andreuis@email.com"
          />
        </div>

        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Informations de l’entreprise</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input className="border rounded px-3 py-2" placeholder="Nom de l’entreprise" />
              <input className="border rounded px-3 py-2" placeholder="Site web" />
              <input className="border rounded px-3 py-2" placeholder="Adresse" />
              <input className="border rounded px-3 py-2" placeholder="Ville" />
            </div>
            <div className="mt-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Préférences d’affichage</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Activer le thème sombre</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>Mode compact</span>
              </label>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Notifications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Recevoir les alertes produits</span>
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" defaultChecked />
                <span>Recevoir les alertes utilisateurs</span>
              </label>
            </div>
          </section>

          <section className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Profil vendeur</h2>
            <VendorProfileForm />
          </section>
        </div>
      </div>
    </div>
  </Layout>
);

export default Parametre;

function VendorProfileForm() {
  const [telephone, setTelephone] = React.useState("");
  const [specialite, setSpecialite] = React.useState("");
  const [type, setType] = React.useState("");
  const [localisation, setLocalisation] = React.useState("");
  const [saving, setSaving] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const submit = async () => {
    try {
      setSaving(true);
      setMessage("");
      await ProfileService.update({ telephone, specialite, type, localisation });
      setMessage("Profil mis à jour");
    } catch (e: any) {
      setMessage(e?.message || "Erreur de mise à jour");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input className="border rounded px-3 py-2" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
      <input className="border rounded px-3 py-2" placeholder="Spécialité" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
      <input className="border rounded px-3 py-2" placeholder="Type (Homme/Femme/...)" value={type} onChange={(e) => setType(e.target.value)} />
      <input className="border rounded px-3 py-2" placeholder="Localisation" value={localisation} onChange={(e) => setLocalisation(e.target.value)} />
      <div className="md:col-span-2 flex items-center gap-3">
        <button disabled={saving} onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50">{saving ? 'Enregistrement...' : 'Enregistrer'}</button>
        {message && <span className="text-sm text-gray-600">{message}</span>}
      </div>
    </div>
  );
}