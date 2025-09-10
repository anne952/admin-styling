import React, { FormEvent, useEffect, useState } from "react";
import Layout from "../components/layout";
import { CategoriesService, CategoryDto } from "../services/categories";



export default function Action() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        CategoriesService.list()
            .then((data) => { if (mounted) setCategories(data); })
            .catch((e) => { if (mounted) setError(e.message || 'Erreur de chargement'); })
            .finally(() => { if (mounted) setLoading(false); });
        return () => { mounted = false; };
    }, []);

    const addCategory = (e: FormEvent) => {
        e.preventDefault();
        const name = newCategory.trim();
        if (!name) return;
        if (categories.some(c => c.type.toLowerCase() === name.toLowerCase())) {
            alert("Catégorie déjà existante");
            return;
        }
        CategoriesService.create(name)
            .then((created) => {
                setCategories(prev => [created, ...prev]);
                setNewCategory("");
                setShowForm(false);
            })
            .catch((e) => alert(e.message || 'Erreur lors de la création'));
    };

    const removeCategory = (id: number) => {
        const prev = categories;
        setCategories(prev.filter(c => c.id !== id));
        CategoriesService.remove(id).catch(() => setCategories(prev));
    };

    return (
        <Layout>
            <div className="m-6">
                <div className="flex flex-row justify-between items-center gap-10 mb-4">
                    <h1 className="text-2xl font-bold text-blue-600">Catégories</h1>
                    <button onClick={() => setShowForm(s => !s)} className="px-3 py-2 bg-green-600 text-white rounded">{showForm ? "Fermer" : "+ Ajouter"}</button>
                </div>

                {showForm && (
                    <form onSubmit={addCategory} className="bg-white rounded shadow-sm p-4 mb-4 flex items-center gap-2">
                        <input className="border rounded px-3 py-2 w-64" placeholder="Nom de la catégorie" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                        <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Ajouter</button>
                    </form>
                )}

                {loading && <p className="mb-2">Chargement...</p>}
                {error && <p className="mb-2 text-red-600">{error}</p>}

                <ul className="bg-white rounded shadow-sm divide-y flex flex-row justify-between items-center gap-10">
                    {categories.map((c) => (
                        <li key={c.id} className="flex items-center flex-col gap-10 p-3">
                            <span className="font-medium">{c.type}</span>
                            <button onClick={() => removeCategory(c.id)} className="text-red-600 hover:text-red-800">Supprimer</button>
                        </li>
                    ))}
                    {categories.length === 0 && (
                        <li className="p-3 text-gray-500">Aucune catégorie</li>
                    )}
                </ul>
            </div>
        </Layout>
    );
}