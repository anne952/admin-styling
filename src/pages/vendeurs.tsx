import React from "react";
import Layout from "../components/layout";
import Table from "../components/table";
import {Vendeurs} from "../js/vendeur";

export default function Vendeur() {
  return (
    <Layout>
   <h1 className="font-bold ml-10 text-xl text-blue-500">Vendeurs</h1>
    <div className="m-5 p-5 ">
      <table className="w-full">
        <thead>
          <tr className="bg-blue-500 text-white text-center">
            <th className="w-72">Id</th>
            <th className="w-72">Nom</th>
            <th className="w-72">Email</th>
            <th className="w-72">Password</th>
            <th className="w-72">Url image</th>
            <th className="w-72">Action</th>
          </tr>
        </thead>
        {Vendeurs.map((item)=>(
          <Table
          id={item.id}
          nom={item.nom}
          email={item.email}
          password={item.password}
          urlImage={item.urlImage}
          supprimer
          />
        ))}
      </table>
    </div>
    </Layout>
  );
}