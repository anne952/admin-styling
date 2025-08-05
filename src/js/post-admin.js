import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { useTableActions } from "../js/action";

 

const postAdmin = [
    

    {
        id: 1,
        nom: "Coca Cola",
        description: "Disponible H-24 chez nous !!",
        urlImage: "url",
        prix: 11000,
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    },
    {
        id: 2,
        nom: "Sac",
        description: "Sac a dos",
        urlImage: "url",
        prix: 11000,
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5"  />
    }
]

export default postAdmin;
export { postAdmin };
