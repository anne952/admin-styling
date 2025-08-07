import React from "react";
import Layout from "../components/layout";
import Table from "../components/table";
import {produits} from "../js/produit"

export default function Produits() {
  return (
    <Layout>
      <h1 className="font-bold ml-10 text-xl text-blue-500">Produits</h1>
      <div className="m-5 p-5 ">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-500 text-white text-center">
            <th className="w-72">Id</th>
            <th className="w-72">Nom</th>
            <th className="w-72">Url image</th>
            <th className="w-72">Description</th>
            <th className="w-72">Prix</th>
            <th className="w-72">Action</th>
          </tr>
        </thead>
        {produits.map((item,id)=>(
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
    </Layout> 
  )
 
}