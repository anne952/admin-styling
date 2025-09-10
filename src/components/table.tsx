import React from "react";
import { TrashIcon, PencilSquareIcon, CheckCircleIcon } from "@heroicons/react/24/solid";

interface TableProps {
    id?: number;
    nom?: string;
    description?: string;
    urlImage?: string;
    prix?: number;
    location?: string;
    date?: string;
    modifier?: React.ReactNode;
    supprimer?: React.ReactNode;
    icon?: React.ReactNode;
    email?: string;
    password?: string;
    action?: string;
    role?: string; 
    onDelete?: (id: number) => void;
    onSelectRow?: (id: number) => void;
}

export default function Table({
    id, 
    nom, 
    description, 
    urlImage, 
    prix, 
    location, 
    date, 
    modifier, 
    supprimer, 
    icon, 
    email, 
    password, 
    action, 
    role,
    onDelete,
    onSelectRow
}: TableProps) {
    
    return (
        <tbody>
            <tr className="text-center bg-slate-300 border cursor-pointer" onClick={() => { if (onSelectRow && id !== undefined) onSelectRow(id); }}>
                {id !== undefined && <td className="p-4">{id}</td>}
                {nom !== undefined && <td className="p-4">{nom}</td>}
                {email !== undefined && <td className="p-4">{email}</td>}
                {password !== undefined && <td className="p-4">{password}</td>}
                {urlImage !== undefined && <td className="p-4">{urlImage}</td>}
                {description !== undefined && <td className="p-4">{description}</td>}
                {prix !== undefined && <td className="p-4">{prix}</td>}
                {location !== undefined && <td className="p-4">{location}</td>}
                {date !== undefined && <td className="p-4">{date}</td>}
                {role !== undefined && <td className="p-4">{role}</td>}
                {(modifier || supprimer || icon || onDelete) && (
                    <td className="p-4 flex gap-2 justify-center">
                        {modifier&&(
                            <PencilSquareIcon color="blue" className="w-5" />
                        )
                        }
                        {(supprimer || onDelete) && (
                            <button type="button" onClick={(e) => { e.stopPropagation(); if (onDelete && id !== undefined) onDelete(id); }}>
                                <TrashIcon color="red" className="w-5" />
                            </button>
                        )}
                        {icon && (
                            <CheckCircleIcon color="red" className="w-5" />
                        )
                        }
                    </td>
                )}
            </tr>
        </tbody>
    );
}
  