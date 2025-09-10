import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import CartProduit from "../components/IN/cart-produit";
import { useNotifications } from "../context/NotificationsContext";
import { UsersService } from "../services/users";
import { ProductsService } from "../services/products";
import { ReviewsService, ReviewDto } from "../services/reviews";

export default function VendorDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const vendorId = Number(params.id);
  const { notifyProductDeleted } = useNotifications();

  const [vendor, setVendor] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([
      UsersService.get(vendorId),
      ProductsService.list(),
      ReviewsService.list({ vendorId })
    ]).then(([v, allProducts, revs]) => {
      if (!mounted) return;
      setVendor(v as any);
      setProducts((allProducts as any[]).filter(p => (p as any).vendorId === vendorId || (p as any).vendeurId === vendorId));
      setReviews(revs);
    }).catch((e) => {
      if (mounted) setError(e.message || 'Erreur de chargement');
    }).finally(() => {
      if (mounted) setLoading(false);
    });
    return () => { mounted = false; };
  }, [vendorId]);

  if (!vendor && !loading) {
    return (
      <Layout>
        <div className="m-6">
          <button className="text-blue-600 underline" onClick={() => navigate(-1)}>Retour</button>
          <p className="mt-4 text-gray-600">Vendeur introuvable.</p>
        </div>
      </Layout>
    );
  }

  const handleDeleteProduct = (id: number) => {
    const toDelete = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (toDelete) notifyProductDeleted(toDelete.titre || 'Produit');
  };

  const profileImage = vendor?.urlImage && vendor.urlImage !== 'url' ? vendor.urlImage : "/image/1 (1).jpg";

  return (
    <Layout>
      <div className="m-6">
        <button className="text-blue-600 underline" onClick={() => navigate(-1)}>Retour</button>
      </div>
      {loading && <p className="m-6">Chargement...</p>}
      {error && <p className="m-6 text-red-600">{error}</p>}

      {vendor && (
      <div className="m-6 bg-white rounded shadow-sm p-6">
        <div className="flex items-start gap-4">
          <img src={profileImage} alt={vendor.nom} className="w-20 h-20 rounded-full object-cover" />
          <div className="space-y-1">
            <h1 className="text-2xl font-bold">{vendor.nom}</h1>
            <p className="text-gray-700">{vendor.email}</p>
            <p className="text-gray-700">{vendor.telephone} <a className="text-blue-600 underline ml-2" href={`tel:${vendor.telephone}`}>Appel</a> <a className="text-green-600 underline ml-2" target="_blank" rel="noreferrer" href={`https://wa.me/${(vendor.telephone || '').replace(/\D/g,'')}`}>WhatsApp</a></p>
            <p className="text-gray-700">Spécialité: {vendor.specialite}</p>
            <p className="text-gray-700">Type: {vendor.type}</p>
            <p className="text-gray-700">Localisation: {vendor.localisation}</p>
            <p className="text-gray-700">Publications: {vendor.publications} • Likes: {vendor.likes}</p>
          </div>
        </div>
      </div>
      )}

      <div className="m-6">
        <h2 className="font-bold text-xl text-blue-500 mb-4">Produits publiés</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((p) => (
            <CartProduit
              key={p.id}
              image={p.image}
              image1={p.image}
              title={p.titre}
              description=""
              price={p.prix}
              prixPromo={p.prix}
              onDelete={() => handleDeleteProduct(p.id)}
            />
          ))}
          {products.length === 0 && (
            <p className="text-gray-500">Aucun produit.</p>
          )}
        </div>
      </div>

      <div className="m-6">
        <h2 className="font-bold text-xl text-blue-500 mb-4">Avis</h2>
        <ReviewSection vendorId={vendorId} reviews={reviews} setReviews={setReviews} />
      </div>
    </Layout>
  );
}

function ReviewSection({ vendorId, reviews, setReviews }: { vendorId: number; reviews: ReviewDto[]; setReviews: React.SetStateAction<any>; }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const add = () => {
    const text = content.trim();
    if (!text) return;
    ReviewsService.create({ vendorId, content: text, rating })
      .then((r) => {
        setReviews((prev: ReviewDto[]) => [r, ...prev]);
        setContent("");
        setRating(5);
      })
      .catch((e) => alert(e.message || 'Erreur ajout avis'));
  };

  const remove = (id: number) => {
    const prev = reviews;
    setReviews(reviews.filter(r => r.id !== id));
    ReviewsService.remove(id).catch(() => setReviews(prev));
  };

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="flex items-center gap-2 mb-4">
        <input className="border rounded px-3 py-2 flex-1" placeholder="Votre avis" value={content} onChange={(e) => setContent(e.target.value)} />
        <input className="border rounded px-3 py-2 w-24" type="number" min={1} max={5} value={rating} onChange={(e) => setRating(Number(e.target.value))} />
        <button className="px-3 py-2 bg-blue-600 text-white rounded" onClick={add}>Ajouter</button>
      </div>
      <ul className="divide-y">
        {reviews.map((r) => (
          <li key={r.id} className="py-2 flex items-start justify-between">
            <div>
              <p className="font-medium">Note: {r.rating}/5</p>
              <p className="text-gray-700">{r.content}</p>
            </div>
            <button className="text-red-600" onClick={() => remove(r.id)}>Supprimer</button>
          </li>
        ))}
        {reviews.length === 0 && <li className="py-2 text-gray-500">Aucun avis.</li>}
      </ul>
    </div>
  );
}


