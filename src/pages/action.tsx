import Layout from "../components/layout";
import { postAdmin } from "../js/post-admin";
import Table from "../components/table";
import React, {useState} from "react";



export default function Like() {

  const [isShow, setIsShow] = useState(false);
  const toggleModal = () => {
    setIsShow(!isShow);
  };

  return (
    <Layout>
      <h1 className="font-bold ml-10 text-xl text-blue-500">Publication</h1>
      <div className=" p-5">
        <div className="m-4 space-x-4">
          <button type="submit" onClick={toggleModal} className="bg-white hover:text-white shadow-lg text-black p-2 rounded-sm hover:bg-blue-500 font-bold">
            CREER UN POST
          </button>
          <button type="submit" className="bg-white hover:text-white shadow-lg text-black p-2 rounded-sm hover:bg-blue-500 font-bold">
            COMMANDES
          </button>
        </div>

        <div className="">
          <table>
            <thead>
              <tr className="bg-blue-500 text-white text-center">
                <th className="font-bold p-2 w-72" >Id</th>
                <th className="font-bold p-2 w-72" >Nom</th>
                <th className="font-bold p-2 w-72" >Image</th>
                <th className="font-bold p-2 w-72" >Description</th>
                <th className="font-bold p-2 w-72" >Prix</th>
                <th className="font-bold p-2 w-72" >Action</th>
              </tr>
            </thead>
            {postAdmin.map((item,id)=>(   
              <Table
              key={id}
              id={item.id}
              nom={item.nom}
              description={item.description}
              prix={item.prix}
              urlImage={item.urlImage}
              modifier
              supprimer

               />
            ))}
          </table>
        </div>
      </div>

      {isShow && (
        <div  className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center p-2">
            <h2 className="text-xl font-bold mb-4">Créer un Post</h2>
            <button onClick={toggleModal} className="-mt-4 text-red-500 hover:text-red-700">Fermer</button>
            </div>
            <form>
              <div className="mb-4">
                <label className="block text-gray-700">Nom</label>
                <input type="text" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Description</label>
                <textarea className="w-full p-2 border rounded"></textarea>
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Prix</label>
                <input type="number" className="w-full p-2 border rounded" />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Image URL</label>
                <input type="file" accept="image/*" className="w-full p-2 border rounded" />
              </div>
              <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">Publier</button>
            </form>
          </div>
        </div>
      )}
    </Layout>
  );
}