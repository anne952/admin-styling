import React from 'react';
import { 
  UserCircleIcon, 
  MagnifyingGlassIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  HandThumbUpIcon, 
  Cog6ToothIcon, 
  Bars4Icon ,
  BellIcon
} from '@heroicons/react/24/solid';

function Drawer() {
  return (
    <div className="drawer">
      {/* Barre supérieure */}
      <div className="fixed w-full left-32 bg-white">
        <div className="p-2 flex space-x-4 justify-center ml-[38rem] items-center">
          <div className="relative">
            <MagnifyingGlassIcon className="h-6 w-6 text-gray-400 absolute left-2 top-2" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <h2 className="name_admin text-lg font-bold flex border p-1 rounded-lg text-gray-600 hover:bg-blue-100 cursor-pointer transition duration-300">
            <UserCircleIcon className="h-6 w-6 text-gray-400 inline-block mr-2 mt-1" />
            Andreuis
          </h2>
        </div>
      </div>

      {/* Sidebar */}
      <header>
        <div className="shadow w-40 h-screen fixed top-0 left-0">
          <h1 className="titre_admin text-blue-500 text-2xl font-bold text-center mt-4">
            Admin
          </h1>
          <div className="border-b border-blue-300 p-2"></div>
          <ul className="mt-8 space-y-4">
            <li className="hover:bg-blue-200 m-1 hover:text-black rounded-lg p-2">
              <a href="/dashboard" className="text-center m-1 flex gap-1">
                <Bars4Icon className="h-6 w-6 text-blue-600" />
                Dashboard
              </a>
            </li>
            <li className="hover:bg-blue-200 m-1 hover:text-black rounded-lg p-2">
              <a href="/produits" className="text-center m-1 flex gap-1">
                <ShoppingCartIcon className="h-6 w-6 text-blue-600" />
                Produits
              </a>
            </li>
            <li className="hover:bg-blue-200 m-1 hover:text-black rounded-lg p-2">
              <a href="/users" className="text-center m-1 flex gap-1">
                <UsersIcon className="h-6 w-6 text-blue-600" />
                Utilisateurs
              </a>
            </li>
            <li className="hover:bg-blue-200 m-1 hover:text-black rounded-lg p-2">
              <a href="/action" className="text-center m-1 flex gap-1">
                <HandThumbUpIcon className="h-6 w-6 text-blue-600" />
                Action
              </a>
            </li>
            <li className="hover:bg-blue-200 m-1 hover:text-black rounded-lg p-2">
              <a href="/notification" className="text-center m-1 flex gap-1">
                  <BellIcon className="h-6 w-6 text-blue-600" />
                Notification
              </a>
            </li>
            <li className="hover:bg-blue-200 m-1 hover:text-black rounded-lg p-2">
              <a href="/parametre" className="text-center m-1 flex gap-1">
                <Cog6ToothIcon className="h-6 w-6 text-blue-600" />
                Paramètre
              </a>
            </li>
            <li className="hover:bg-blue-200 mt-20 m-1 hover:text-black rounded-lg p-2">
              <a href="/" className="text-center m-1 flex gap-1 text-blue-400">
                Déconnexion
              </a>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
}

export default Drawer;
