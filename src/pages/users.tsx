import React, { useMemo, useState } from "react";
import Layout from "../components/layout";
import {clients as initialClients} from "../js/client";
import Table from "../components/table";
import { useNotifications } from "../context/NotificationsContext";
import { useNavigate } from "react-router-dom";
import { UsersService } from "../services/users";

export default function Clients() {
  const [users, setUsers] = useState<any[]>(initialClients as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState<'clients' | 'vendeurs'>('clients');
  const [selectedVendorId, setSelectedVendorId] = useState<number | null>(null);
  const { notifyProductDeleted } = useNotifications();
  const navigate = useNavigate();

  const clients = useMemo(() => users.filter(u => u.role === 'client'), [users]);
  const vendors = useMemo(() => users.filter(u => u.role === 'vendeur'), [users]);
  const selectedVendor = useMemo(() => vendors.find(v => v.id === selectedVendorId) as any, [vendors, selectedVendorId]);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    UsersService.list()
      .then((data) => { if (mounted) setUsers(data as any); })
      .catch((e) => { if (mounted) setError(e.message || 'Erreur de chargement des utilisateurs'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleDeleteUser = (id: number) => {
    setUsers(prev => prev.filter(u => u.id !== id));
    UsersService.remove(id).catch(() => {});
    if (selectedVendorId === id) setSelectedVendorId(null);
  };

  const handleSelectVendor = (id: number) => {
    navigate(`/vendeurs/${id}`);
  };

  const handleDeleteVendorProduct = (productId: number) => {
    if (!selectedVendor) return;
    setUsers(prev => prev.map(u => {
      if (u.id !== selectedVendor.id) return u;
      const nextProducts = (u.produits || []).filter((p: any) => p.id !== productId);
      const deleted = (u.produits || []).find((p: any) => p.id === productId);
      if (deleted) notifyProductDeleted(deleted.titre || 'Produit');
      return { ...u, produits: nextProducts };
    }));
  };

  return  (
    <Layout>
      <div className="flex items-center gap-4 m-5">
        <button className={`px-4 py-2 rounded ${activeTab === 'clients' ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setActiveTab('clients')}>Clients</button>
        <button className={`px-4 py-2 rounded ${activeTab === 'vendeurs' ? 'bg-blue-600 text-white' : 'bg-white'}`} onClick={() => setActiveTab('vendeurs')}>Vendeurs</button>
      </div>

      {activeTab === 'clients' && (
        <>
          <h1 className="font-bold ml-10 text-xl text-blue-500">Clients</h1>
          <div className="m-5 p-5 ">
            <table className="w-full ">
              <thead>
                <tr className="bg-blue-500 text-white text-center">
                  <th className="w-72">Id</th>
                  <th className="w-72">Nom</th>
                  <th className="w-72">Email</th>
                  <th className="w-72">Password</th>
                  <th className="w-72">Action</th>
                </tr>
              </thead>
              {loading && (
                <tbody><tr><td className="p-4" colSpan={7}>Chargement...</td></tr></tbody>
              )}
              {error && (
                <tbody><tr><td className="p-4 text-red-600" colSpan={7}>{error}</td></tr></tbody>
              )}
              {clients.map((item: any) => (
                <Table
                  key={item.id}
                  id={item.id}
                  nom={item.nom}
                  email={item.email}
                  password={item.password || '******'}
                  supprimer
                  onDelete={handleDeleteUser}
                />
              ))}
            </table>
          </div>
        </>
      )}

      {activeTab === 'vendeurs' && (
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="m-5 p-5 ">
            <h1 className="font-bold ml-10 text-xl text-blue-500"></h1>
            <table className="w-[220%] ">
              <thead>
                <tr className="bg-blue-500 text-white text-center">
                  <th className="w-72">Id</th>
                  <th className="w-72">Nom</th>
                  <th className="w-72">Email</th>
                  <th className="w-72">Password</th>
                  <th className="w-72">Action</th>
                </tr>
              </thead>
              {vendors.map((item: any) => (
                <Table
                  key={item.id}
                  id={item.id}
                  nom={item.nom}
                  email={item.email}
                  password={item.password || '******'}
                  supprimer
                  onDelete={handleDeleteUser}
                  onSelectRow={handleSelectVendor}
                />
              ))}
            </table>
          </div>

          <div className="m-5 p-5 ">
            <h2 className="font-bold text-lg mb-3 text-transparent">Détails du vendeur</h2>
            {!selectedVendor && <p className="text-gray-500 text-transparent">Sélectionnez un vendeur pour voir les détails.</p>}
            {selectedVendor && (
              <div className="bg-white rounded shadow-sm p-4 space-y-2">
                <p><span className="font-semibold">Nom:</span> {selectedVendor.nom}</p>
                <p><span className="font-semibold">Email:</span> {selectedVendor.email}</p>
                <p>
                  <span className="font-semibold">Téléphone:</span> {selectedVendor.telephone}{" "}
                  <a className="text-blue-600 underline ml-2" href={`tel:${selectedVendor.telephone}`}>Appel direct</a>{" "}
                  <a className="text-green-600 underline ml-2" target="_blank" rel="noreferrer" href={`https://wa.me/${(selectedVendor.telephone || '').replace(/\D/g,'')}`}>WhatsApp</a>
                </p>
                <p><span className="font-semibold">Spécialité:</span> {selectedVendor.specialite}</p>
                <p><span className="font-semibold">Type:</span> {selectedVendor.type}</p>
                <p><span className="font-semibold">Localisation:</span> {selectedVendor.localisation}</p>
                <p><span className="font-semibold">Publications:</span> {selectedVendor.publications}</p>
                <p><span className="font-semibold">Likes:</span> {selectedVendor.likes}</p>

                <h3 className="font-semibold mt-4">Produits publiés</h3>
                <ul className="divide-y divide-gray-200">
                  {(selectedVendor.produits || []).map((prod: any) => (
                    <li key={prod.id} className="flex items-center justify-between py-2">
                      <div>
                        <p className="font-medium">{prod.titre}</p>
                        <p className="text-sm text-gray-600">{prod.prix} FCFA</p>
                      </div>
                      <button className="text-red-600" onClick={() => handleDeleteVendorProduct(prod.id)}>Supprimer</button>
                    </li>
                  ))}
                  {(selectedVendor.produits || []).length === 0 && (
                    <li className="py-2 text-gray-500">Aucun produit.</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </Layout>
  );
}