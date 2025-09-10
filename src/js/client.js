import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";


const clients = [
    {
        id: 1,
        nom: "Alice DOUDOU",
        email: "alixedoudou@gmail.com",
        password: "*****",
        urlImage: "url",
        role: "client",
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    },
    {
        id: 2,
        nom: "Alex DOUDOU",
        email: "alexdoudou@gmail.com",
        password: "*****",
        urlImage: "url",
        role: "client",
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    },

    
      {
        id: 3,
        nom: "Alice DOUDOU",
        email: "alixedoudou@gmail.com",
        password: "*****",
        urlImage: "url",
        role: "vendeur",
        telephone: "+22890112233",
        specialite: "Haute couture",
        type: "Femme",
        localisation: "Lomé",
        publications: 12,
        likes: 134,
        produits: [
          { id: 101, titre: "Robe A", prix: 25000, image: "/image/1 (1).jpg" },
          { id: 102, titre: "Robe B", prix: 30000, image: "/image/1 (2).jpg" }
        ],
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    },
    {
        id: 4,
        nom: "Alex DOUDOU",
        email: "alexdoudou@gmail.com",
        password: "*****",
        urlImage: "url",
        role: "vendeur",
        telephone: "+22899007766",
        specialite: "Prêt-à-porter",
        type: "Homme",
        localisation: "Agoè",
        publications: 7,
        likes: 89,
        produits: [
          { id: 201, titre: "Chemise A", prix: 15000, image: "/image/1 (3).jpg" },
          { id: 202, titre: "Pantalon B", prix: 18000, image: "/image/1 (4).jpg" }
        ],
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    }
]

export default clients;
export { clients };
