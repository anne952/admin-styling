import { TrashIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";


const commande = [
    {
        id: 1,
        nom: "alice DOUDOU",
        id_produit: "chemise",
        urlImage: "url",
        prix: 11000,
        location: "adidogomé",
        date: "2023-10-01",
        icon:<CheckCircleIcon color="blue" className="w-5" />,
    },
    {
        id: 2,
        nom: "Sac",
        description: "Sac a dos",
        urlImage: "url",
        prix: 1100,
        modifier:<PencilSquareIcon color="blue" className="w-5" />,
        supprimer:<TrashIcon color="red" className="w-5" />
    }
]

export default commande;
export { commande };
