import React from 'react';

interface cartProps {
  name: string;
  number: number;
  icon: React.ReactNode;
}

export default function Carts({ name, number, icon}: cartProps) {
  

    return (
           <div 
     className="Min_cart m-2"
     >
      <div 
      className="cart_items p-4 bg-white shadow-md rounded-lg w-60"
      >

        <div className=" flex items-center justify-between">
        {icon}
        <h1 className="-ml-36 text-2xl font-bold p-2">{name}</h1>
        </div>
        <p className=" text-gray-600 mt-2 p-1 font-semibold">{number}</p>
        <div className="w-full h-2 bg-slate-400 rounded-full">
          <div className="h-2 w-28 bg-blue-500 rounded-full"></div>
        </div>
      </div>

     </div>
    )
}