import Layout from "../components/layout";
import { postAdmin } from "../js/post-admin";
import Table from "../components/table";



export default function Like() {

  return (
    <Layout>
      <h1 className="font-bold ml-10 text-xl text-blue-500">Publication</h1>
      <div className=" p-5">
        <div className="m-4 space-x-4">
          <button type="submit" className="bg-white hover:text-white shadow-lg text-black p-2 rounded-sm hover:bg-blue-500 font-bold">
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
    </Layout>
  );
}