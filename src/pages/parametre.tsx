import React, { useEffect, useState } from "react";
import UserProfile from "../components/userProfil";
import Layout from "../components/layout";
import { ProfileService } from "../services/profile";
import { UsersService } from "../services/users";

const Parametre = () => {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    // Try to get current user ID from localStorage
    const userId = localStorage.getItem('userId') ? Number(localStorage.getItem('userId')) : null;
    if (userId) {
      UsersService.get(userId)
        .then((u) => { if (mounted) setUser(u); })
        .catch((e) => { console.error('Erreur chargement user:', e); if (mounted) setUser(null); })
        .finally(() => { if (mounted) setLoading(false); });
    } else {
      // If no userId in localStorage, set user to null or use a mock
      console.warn('Aucun userId trouvé dans localStorage');
      setUser(null);
      setLoading(false);
    }
    return () => { mounted = false; };
  }, []);

  if (loading) return <Layout><p>Chargement...</p></Layout>;
  if (!user) return <Layout><p>Utilisateur non trouvé.</p></Layout>;

  return (
    <Layout>
      <div className="m-6 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-blue-600">Paramètres</h1>
            <p className="text-gray-600 mt-2">Gérez votre profil, sécurité et préférences.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <UserProfile
                imageUrl={user.urlImage || user.photoProfil || 'https://via.placeholder.com/150'}
                name={user.nom || 'Utilisateur'}
                email={user.email || 'email@example.com'}
                onPhotoUpdate={(newUrl) => setUser((prev: any) => ({ ...prev, urlImage: newUrl }))}
              />
            </div>

            <div className="lg:col-span-3 space-y-6">
              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Informations de l'entreprise</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input className="border rounded px-3 py-2" placeholder="Nom de l'entreprise" />
                  <input className="border rounded px-3 py-2" placeholder="Site web" />
                  <input className="border rounded px-3 py-2" placeholder="Adresse" />
                  <input className="border rounded px-3 py-2" placeholder="Ville" />
                </div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded">Enregistrer</button>
                </div>
              </section>

              <section className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Préférences d'affichage</h2>
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
