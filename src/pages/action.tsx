import React, { FormEvent, useEffect, useMemo, useState } from "react";
import Layout from "../components/layout";
import Navigation from "../components/IN/navigation";
import { CategoriesService, CategoryDto } from "../services/categories";
import { ColorsService, ColorDto } from "../services/colors";



export default function Action() {
    const [categories, setCategories] = useState<CategoryDto[]>([]);
    const [activeTab, setActiveTab] = useState<'categories' | 'colors'>('categories');
    const [showForm, setShowForm] = useState(false);
    const [showColorForm, setShowColorForm] = useState(false);
    const [newCategory, setNewCategory] = useState("");
    const [colors, setColors] = useState<ColorDto[]>([]);
    const [deletedCategories, setDeletedCategories] = useState<CategoryDto[]>([]);
    const colorPalette = useMemo(() => [
        "#1F2937","#111827","#6B7280","#9CA3AF","#D1D5DB","#F3F4F6",
        "#EF4444","#F59E0B","#FBBF24","#10B981","#3B82F6","#6366F1",
        "#8B5CF6","#EC4899","#14B8A6","#22C55E","#84CC16","#EAB308",
        "#F97316","#DC2626","#0891B2","#0EA5E9","#2563EB","#4F46E5",
        "#7C3AED","#DB2777","#F43F5E","#A3E635","#38BDF8","#34D399",
        "#60A5FA","#93C5FD"
    ], []);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        let mounted = true;
        setLoading(true);
        Promise.all([
            CategoriesService.list(),
            ColorsService.list().catch(() => [])
        ])
            .then(([cats, cols]) => { if (mounted) { setCategories(cats); setColors(cols as ColorDto[]); } })
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
        const toDelete = prev.find(c => c.id === id);
        setCategories(prev.filter(c => c.id !== id));
        if (toDelete) setDeletedCategories((p) => [toDelete, ...p]);
        CategoriesService.remove(id).catch(() => {
            setCategories(prev);
            setDeletedCategories((p) => p.filter(c => c.id !== id));
        });
    };

    const addColor = (hex: string) => {
        const defaultName = `Couleur ${hex}`;
        ColorsService.create(hex, defaultName)
            .then((created) => setColors(prev => ([{ ...(created as any), hex }, ...prev])))
            .catch((e) => alert(e.message || 'Erreur lors de la création de la couleur'));
    };

    const removeColor = (id: number) => {
        const prev = colors;
        setColors(prev.filter(c => c.id !== id));
        ColorsService.remove(id).catch(() => setColors(prev));
    };

    return (
        <Layout>
            <div className="m-6">
               
                <div className="flex items-center justify-between mb-6">
                    <div className="flex gap-2">
                        <button onClick={() => setActiveTab('categories')} className={`px-4 py-2 rounded ${activeTab==='categories'?'bg-blue-600 text-white':'bg-white shadow-sm'}`}>Catégories</button>
                        <button onClick={() => setActiveTab('colors')} className={`px-4 py-2 rounded ${activeTab==='colors'?'bg-blue-600 text-white':'bg-white shadow-sm'}`}>Couleurs</button>
                    </div>
                    {activeTab==='categories' ? (
                        <button onClick={() => setShowForm(s => !s)} className="px-3 py-2 bg-green-600 text-white rounded">{showForm ? "Fermer" : "+ Ajouter"}</button>
                    ) : (
                        <button onClick={() => setShowColorForm(true)} className="px-3 py-2 bg-green-600 text-white rounded">+ Ajouter</button>
                    )}
                </div>

                {activeTab==='categories' && showForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 backdrop-blur-sm bg-black/30" onClick={() => setShowForm(false)} />
                        <form onSubmit={addCategory} className="relative bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                            <h2 className="text-lg font-semibold mb-4">Nouvelle catégorie</h2>
                            <input className="border rounded px-3 py-2 w-full mb-4" placeholder="Nom de la catégorie" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowForm(false)} className="px-3 py-2 bg-gray-200 rounded">Annuler</button>
                                <button type="submit" className="px-3 py-2 bg-blue-600 text-white rounded">Ajouter</button>
                            </div>
                        </form>
                    </div>
                )}

                {activeTab==='categories' && (
                    <>
                        {loading && <p className="mb-2">Chargement...</p>}
                        {error && <p className="mb-2 text-red-600">{error}</p>}
                        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {categories.map((c) => (
                                <li key={c.id} className="bg-blue-400 text-white rounded-xl p-5 flex items-center justify-center flex-col gap-2 shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
                                    <span className="font-semibold text-lg tracking-wide">{c.type}</span>
                                    <button onClick={() => removeCategory(c.id)} className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-md backdrop-blur-sm transition-colors">Supprimer</button>
                                </li>
                            ))}
                            {categories.length === 0 && (
                                <li className="p-4 text-gray-500 bg-white rounded">Aucune catégorie</li>
                            )}
                        </ul>
                        {deletedCategories.length > 0 && (
                            <div className="mt-8">
                                <h3 className="text-sm font-semibold text-gray-600 mb-3">Catégories supprimées</h3>
                                <div className="flex flex-wrap gap-2">
                                    {deletedCategories.map((c) => (
                                        <span key={`deleted-${c.id}`} className="px-3 py-1 rounded-full bg-gray-100 text-gray-600 text-sm">{c.type}</span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </>
                )}

                {activeTab==='colors' && (
                    <div className="mt-2 p-5">
                        <div className="mb-4">
                            <h2 className="text-xl font-bold text-blue-600">Couleurs</h2>
                        </div>
                        {colors.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                                {colors.map((c) => {
                                    const anyC: any = c as any;
                                    const nameStr = String(anyC.name || "");
                                    const match = nameStr.match(/#([0-9a-fA-F]{6})/);
                                    const hex = anyC.hex || anyC.code || anyC.value || (match ? `#${match[1]}` : '#ffffff');
                                    return (
                                        <div key={c.id} className="relative rounded-xl h-20 shadow-sm ring-1 ring-black/5 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-md" style={{ backgroundColor: hex }}>
                                            <button onClick={() => removeColor(c.id)} className="absolute top-1 right-1 text-xs bg-white/40 px-2 py-0.5 rounded">X</button>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}

                {activeTab==='colors' && showColorForm && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <div className="absolute inset-0 backdrop-blur-sm bg-black/30" onClick={() => setShowColorForm(false)} />
                        <div className="relative bg-white rounded-2xl shadow-xl p-6 w-full max-w-xl transition-all duration-300 ease-out">
                            <h2 className="text-lg font-semibold mb-4">Choisir une couleur</h2>
                            <div className="grid grid-cols-8 gap-2 mb-4">
                                {colorPalette.map((hex) => (
                                    <button key={hex} type="button" onClick={() => addColor(hex)} className="w-8 h-8 rounded ring-1 ring-black/5 hover:ring-2 transition" style={{ backgroundColor: hex }} />
                                ))}
                            </div>
                            <div className="flex justify-end gap-2">
                                <button type="button" onClick={() => setShowColorForm(false)} className="px-3 py-2 bg-gray-200 rounded">Fermer</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Layout>
    );
}