import React, { useState, useEffect } from "react";
import UserProfile from "../components/userProfil";
import Layout from "../components/layout";
import { ProfileService } from "../services/profile";
import { useAuth } from "../context/AuthContext";

const Parametre = () => {
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<any>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
    }
  }, [authUser]);

  if (!authUser) return <Layout><p>Utilisateur non trouvé.</p></Layout>;

  return (
    <Layout>
      <div className="m-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Paramètres</h1>
            <p className="text-gray-600 mt-2">Gérez votre profil, sécurité et préférences.</p>
          </div>

          <div className="space-y-8">
            <div className="flex justify-center lg:justify-start">
              <UserProfile
                imageUrl={user.urlImage || user.photoProfil || 'https://via.placeholder.com/150'}
                name={user.nom || 'Utilisateur'}
                email={user.email || 'email@example.com'}
                onPhotoUpdate={(newUrl) => setUser((prev: any) => ({ ...prev, urlImage: newUrl }))}
              />
            </div>

            <section className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-blue-600 mb-6">Informations de l'entreprise</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Nom de l'entreprise" />
                <input className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Site web" />
                <input className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Adresse" />
                <input className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Ville" />
              </div>
              <div className="mt-6">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition duration-200">Enregistrer</button>
              </div>
            </section>

            <section className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-blue-600 mb-6">Préférences d'affichage</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded focus:ring-blue-500" defaultChecked />
                  <span className="text-gray-700">Activer le thème sombre</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded focus:ring-blue-500" />
                  <span className="text-gray-700">Mode compact</span>
                </label>
              </div>
            </section>

            <section className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-blue-600 mb-6">Notifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded focus:ring-blue-500" defaultChecked />
                  <span className="text-gray-700">Recevoir les alertes produits</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 rounded focus:ring-blue-500" defaultChecked />
                  <span className="text-gray-700">Recevoir les alertes utilisateurs</span>
                </label>
              </div>
            </section>

            <section className="bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-100">
              <h2 className="text-xl font-bold text-blue-600 mb-6">Profil vendeur</h2>
              <VendorProfileForm />
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Parametre;

function VendorProfileForm() {
  const [telephone, setTelephone] = React.useState("");
  const [specialite, setSpecialite] = React.useState("");
  const [type, setType] = React.useState("");
  const [localisation, setLocalisation] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  const submit = async () => {
    try {
      setSaving(true);
      await ProfileService.update({ telephone, specialite, type, localisation });
    } catch (e: any) {
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
      </div>
    </div>
  );
}
