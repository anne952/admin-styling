import React from "react";
import Layout from "../components/layout";

export default function Paramétre() {
  return (
    <Layout>
   <div className="rounded ml-20 shadow-sm " style={{width: '60rem', height: '30rem'}}>

   <div className="flex m-5 mt-20 justify-between items-center w-80">
    <img src="/favicon.ico" alt="Image de paramètre" className="w-16 h-16 rounded-full" />
    <div>
      <h1 className="text-blue-500">Andreuis</h1>
      <h3>andre@gmail.com</h3>
    </div>
   </div>

   </div>
    </Layout>
  );
}