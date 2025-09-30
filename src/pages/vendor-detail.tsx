import React, { useEffect, useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/layout";
import CartProduit from "../components/IN/cart-produit";
import { useNotifications } from "../context/NotificationsContext";
import { UsersService } from "../services/users";
import { ProductsService } from "../services/products";
import { ReviewsService, ReviewDto } from "../services/reviews";

export default function UserDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const userId = Number(params.id);
  const { notifyProductDeleted } = useNotifications();

  const [user, setUser] = useState<any | null>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [reviews, setReviews] = useState<ReviewDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

    const handleDelete = useCallback((id: number) => {
      console.log('Deleting product:', id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      ProductsService.remove(id).catch((e) => {
        console.error('Erreur suppression produit:', e);
      });
    }, []);

  useEffect(() => {
    setLoading(true);
    setError("");
    UsersService.get(userId)
      .then((u) => {
        console.log('Utilisateur récupéré:', u);
        setUser(u);
        if (u && u.role === 'vendeur') {
          Promise.all([
            ProductsService.getByUser(userId),
            ReviewsService.list({ vendorId: userId })
          ]).then(([products, revs]) => {
            console.log('Produits de l\'utilisateur:', products, 'pour userId:', userId);
            setProducts(products);
            setReviews(revs);
          }).catch((e) => setError(e.message || 'Erreur de chargement des données'));
        } else {
          setProducts([]);
          setReviews([]);
        }
      })
      .catch((e) => setError(e.message || 'Erreur de chargement'))
      .finally(() => setLoading(false));
  }, [userId]);

  if (!user && !loading) {
    return (
      <Layout>
        <div className="m-6">
          <button className="text-blue-600 underline" onClick={() => navigate(-1)}>Retour</button>
          <p className="mt-4 text-gray-600">Utilisateur introuvable.</p>
        </div>
      </Layout>
    );
  }

  const handleDeleteProduct = (id: number) => {
    console.log('Tentative de suppression du produit:', id);
    const toDelete = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (toDelete) notifyProductDeleted(toDelete.titre || 'Produit');
    ProductsService.remove(id).then(() => {
      console.log('Produit supprimé avec succès:', id);
    }).catch((e) => {
      console.error('Erreur lors de la suppression du produit:', id, e);
      // Rollback if needed
      // setProducts((prev) => [toDelete, ...prev].sort((a,b) => a.id - b.id));
    });
  };

const profileImage = user?.photoProfil
  ? user.photoProfil
  : "/image/1%20(1).jpg";

  return (
    <Layout>
      <div className="m-6">
        <button className="text-blue-600 underline" onClick={() => navigate(-1)}>Retour</button>
      </div>
      {loading && <p className="m-6">Chargement...</p>}
      {error && <p className="m-6 text-red-600">{error}</p>}

      {user && (
      <div className="m-6 bg-gradient-to-r from-blue-50 to-indigo-100 rounded-xl shadow-lg p-8">
        <div className="flex flex-col lg:flex-row items-start gap-6">
          <div className="flex-shrink-0">
            <img 
              src={profileImage} 
              alt={user.nom || 'profil'} 
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-md" 
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "/image/1%20(1).jpg";
              }}
            />
          </div>
          <div className="flex-grow space-y-3">
            <h1 className="text-3xl font-bold text-gray-800">{user.nom}</h1>
            <div className="flex items-center gap-4 text-gray-600">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${user.role === 'vendeur' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>
                {user.role === 'vendeur' ? 'Vendeur' : 'Client'}
              </span>
              <span className="text-lg font-medium">{user.email}</span>
            </div>
            {user.telephone && (
              <div className="flex items-center gap-3">
                <span className="text-gray-600 font-medium">Téléphone:</span>
                <span className="text-gray-800">{user.telephone}</span>
                <a className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition text-sm" href={`tel:${user.telephone}`}>📞 Appel</a>
                <a className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition text-sm" target="_blank" rel="noreferrer" href={`https://wa.me/${(user.telephone || '').replace(/\D/g,'')}`}>💬 WhatsApp</a>
              </div>
            )}
            {user.role === 'vendeur' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {user.specialite && <p className="text-gray-700"><span className="font-semibold">Spécialité:</span> {user.specialite}</p>}
                {user.type && <p className="text-gray-700"><span className="font-semibold">Type:</span> {user.type}</p>}
                {user.localisation && <p className="text-gray-700"><span className="font-semibold">Localisation:</span> {user.localisation}</p>}
                {(user.publications !== undefined || user.likes !== undefined) && (
                  <p className="text-gray-700"><span className="font-semibold">Stats:</span> Publications: {user.publications || 0} • Likes: {user.likes || 0}</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      )}

      {user && user.role === 'vendeur' && (
        <>
          <div className="m-6">
            <h2 className="font-bold text-xl text-blue-500 mb-4">Produits publiés</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map((p) => (
                <CartProduit
                  key={p.id}
                  image={p.productImages?.[0]?.url || p.urlImage || p.image}
                  image1={p.productImages?.[1]?.url || p.image1}
                  image2={p.productImages?.[2]?.url || p.image2}
                  image3={p.productImages?.[3]?.url || p.image3}
                  title={p.nom || p.title}
                  description={p.description}
                  price={p.prix || p.price}
                  prixPromo={p.prix || p.price}
                  onDelete={() => handleDelete(p.id)}
                />
              ))}
              {products.length === 0 && (
                <p className="text-gray-500">Aucun produit.</p>
              )}
            </div>
          </div>

          <div className="m-6">
            <h2 className="font-bold text-xl text-blue-500 mb-4">Avis</h2>
            <ReviewSection userId={userId} reviews={reviews} setReviews={setReviews} />
          </div>
        </>
      )}
    </Layout>
  );
}

function ReviewSection({ userId, reviews, setReviews }: { userId: number; reviews: ReviewDto[]; setReviews: React.SetStateAction<any>; }) {
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);

  const add = () => {
    const text = content.trim();
    if (!text) return;
    ReviewsService.create({ vendorId: userId, content: text, rating })
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
