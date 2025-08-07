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
        id: 1,
        nom: "Alice DOUDOU",
        email: "alixedoudou@gmail.com",
        password: "*****",
        urlImage: "url",
        role: "vendeur",
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    },
    {
        id: 2,
        nom: "Alex DOUDOU",
        email: "alexdoudou@gmail.com",
        password: "*****",
        urlImage: "url",
        role: "vendeur",
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    }
]

export default clients;
export { clients };
