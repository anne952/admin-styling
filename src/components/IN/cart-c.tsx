import React from "react";


interface CartItem {
    name: string;
    price: number;
    quantity: number;
    items: CartItem[];
    onRemove: (id: number) => void;
}

export default function Navigation({name, price, quantity, items, onRemove}: CartItem) {
    return (
        <nav>
            <ul>


<div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow-sm sm:p-8 dark:bg-gray-800 dark:border-gray-700">
    <div className="flex items-center justify-between mb-4">
   </div>
   <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            <li className="py-3 sm:py-4">
                <div className="flex items-center">
                    <div className="shrink-0">
                        <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-1.jpg" alt="Neil image"/>
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                            {name}
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                            {quantity}
                        </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                         {price}    
                    </div>
                </div>
            </li>
            
        </ul>
   </div>
</div>

            </ul>
        </nav>
    );
}