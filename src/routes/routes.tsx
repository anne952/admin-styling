import {Route, Routes} from "react-router-dom";
import React from "react";
import Produits from "../pages/produits";
import Users from "../pages/users";
import Dashboard from "../pages/dashboard";
import Paramétre from "../pages/parametre";
import Action from "../pages/action";
import Login from "../pages/login";
import Acceuil from "../pages/IN/acceuil";
import NotificationPage from "../pages/notification";
import VendorDetail from "../pages/vendor-detail";


export default function AppRoutes() {
    return (
        <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/produits" element={<Produits />} />
        <Route path="/users" element={<Users />} />
        <Route path="/action" element={<Action />} />
        <Route path="/parametre" element={<Paramétre />} />
        <Route path="/acceuil" element={<Acceuil />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/vendeurs/:id" element={<VendorDetail />} />
        </Routes>
    );
    }