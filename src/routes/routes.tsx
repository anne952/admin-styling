import {Route, Routes} from "react-router-dom";
import React from "react";
import Produits from "../pages/produits";
import Clients from "../pages/clients";
import Dashboard from "../pages/dashboard";
import Vendeurs from "../pages/vendeurs";
import Paramétre from "../pages/parametre";
import Action from "../pages/action";


export default function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/clients" element={<Clients />} />
        <Route path="/action" element={<Action />} />
        <Route path="/vendeurs" element={<Vendeurs />} />
        <Route path="/parametre" element={<Paramétre />} />
        </Routes>
    );
    }