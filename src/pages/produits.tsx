import React, { useState, useCallback, useEffect } from "react";
import Layout from "../components/layout";
import CartProduit from "../components/IN/cart-produit";
import { useNotifications } from "../context/NotificationsContext";
import { ProductsService, ProductDto } from "../services/products";

export default function Produits() {
  const { notifyProductDeleted } = useNotifications();
  const [products, setProducts] = useState<ProductDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    ProductsService.list()
      .then((data) => {
        if (mounted) {
          console.log('Produits récupérés:', data); // Debug des données
          setProducts(data);
        }
      })
      .catch((e) => { if (mounted) setError(e.message || 'Erreur de chargement'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleDelete = useCallback((id: number) => {
    console.log('Deleting product:', id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    ProductsService.remove(id).catch((e) => {
      console.error('Erreur suppression produit:', e);
      // Optionally rollback
      // setProducts((prev) => /* restore */ );
    });
  }, []);

  return (
    <Layout>
      <h1 className="font-bold ml-10 text-xl text-blue-500">Produits</h1>
      {loading && <p className="m-4">Chargement...</p>}
      {error && <p className="m-4 text-red-600">{error}</p>}
      <div className="grid grid-cols-3 gap-4 p-2">
        {products.map((p: any) => (
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
      </div>
    </Layout>
  );
}
