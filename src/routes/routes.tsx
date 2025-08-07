import {Route, Routes} from "react-router-dom";
import React from "react";
import Produits from "../pages/produits";
import Users from "../pages/users";
import Dashboard from "../pages/dashboard";
import Commandes from "../pages/commandes";
import Paramétre from "../pages/parametre";
import Action from "../pages/action";


export default function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/users" element={<Users />} />
        <Route path="/action" element={<Action />} />
        <Route path="/parametre" element={<Paramétre />} />
        <Route path="/commandes" element={<Commandes />} />
        </Routes>
    );
    }