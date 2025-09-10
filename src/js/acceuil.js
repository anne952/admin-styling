import { ShoppingCartIcon ,ShoppingBagIcon, HeartIcon, UserIcon, BuildingStorefrontIcon} from '@heroicons/react/24/solid';
const cartItems = [
  { id: 1, 
    name: 'Product', 
    icon: <ShoppingBagIcon className="h-6 w-6 text-blue-600 mt-2" />,
    number: 1000
  },

  { id: 2, 
    name: 'Like', 
    icon: <HeartIcon className="h-6 w-6 text-blue-600 mt-2" />,
    number: 40000 
  },

];

export default cartItems;
export { cartItems };