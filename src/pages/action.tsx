import Layout from "../components/layout";
import { postAdmin } from "../js/post-admin";
import React, { useState } from "react";
import Table from "../components/table";
import { useNavigate } from "react-router-dom";

// Adapter les données initiales pour ne garder que les propriétés nécessaires
const initialPosts = postAdmin.map((item: any, idx: number) => ({
  id: item.id,
  nom: item.nom,
  description: item.description,
  prix: item.prix,
  urlImage: item.urlImage,
}));

export default function Like() {
  const [isShow, setIsShow] = useState(false);
  const colonnes = [
    { key: "id", label: "Id" },
    { key: "nom", label: "Nom" },
    { key: "urlImage", label: "Image" },
    { key: "description", label: "Description" },
    { key: "prix", label: "Prix" },
    { key: "action", label: "Action" },
  ];
  // Etat local pour la liste des posts, uniformisé
  const [posts, setPosts] = useState(initialPosts);
  // Etats pour le formulaire
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState("");
  const [urlImage, setUrlImage] = useState("");

  const toggleModal = () => {
    setIsShow(!isShow);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Création d'un nouvel objet post
    const nouveauPost = {
      id: posts.length + 1,
      nom,
      description,
      prix,
      urlImage,
    };
    setPosts([...posts, nouveauPost]);
    // Réinitialiser le formulaire
    setNom("");
    setDescription("");
    setPrix("");
    setUrlImage("");
    setIsShow(false);
  };

  // Gestion du fichier image (optionnel, on peut juste prendre le nom du fichier)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUrlImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const navigate = useNavigate();

  const handleCommande = () => {
    navigate("/commandes");
  };

  return (
    <Layout>
      <h1 className="font-bold ml-10 text-xl text-blue-500">Publication</h1>
      <div className=" p-5">
        <div className="m-4 space-x-4">
          <button type="button" onClick={toggleModal} className="bg-white hover:text-white shadow-lg text-black p-2 rounded-sm hover:bg-blue-500 font-bold">
            CREER UN POST
          </button>
          <button type="button" onClick={handleCommande} className="bg-white hover:text-white shadow-lg text-black p-2 rounded-sm hover:bg-blue-500 font-bold">
            COMMANDES
          </button>
        </div>
        <div className="">
          <table>
            <thead>
              <tr className="bg-blue-500 text-white text-center">
                {colonnes.map((col) => (
                  <th key={col.key} className="font-bold p-2 w-72">{col.label}</th>
                ))}
              </tr>
            </thead>
            {posts.map((item, id) => (
              <Table
                key={id}
                id={item.id}
                nom={item.nom}
                urlImage={item.urlImage}
                description={item.description}
                prix={item.prix}
                modifier
                supprimer
              />
            ))}
          </table>
        </div>
      </div>
      {isShow && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center p-2">
              <h2 className="text-xl font-bold mb-4">Créer un Post</h2>
              <button onClick={toggleModal} className="-mt-4 text-red-500 hover:text-red-700">Fermer</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input type="text" className="w-full p-2 border rounded" value={nom} onChange={e => setNom(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea className="w-full p-2 border rounded" value={description} onChange={e => setDescription(e.target.value)} required></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Prix</label>
                <input type="number" className="w-full p-2 border rounded" value={prix} onChange={e => setPrix(e.target.value)} required />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image</label>
                <input type="file" accept="image/*" className="w-full p-2 border rounded" onChange={handleImageChange} />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 w-full">Publier</button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}