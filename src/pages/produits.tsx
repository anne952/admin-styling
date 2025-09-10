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
      .then((data) => { if (mounted) setProducts(data); })
      .catch((e) => { if (mounted) setError(e.message || 'Erreur de chargement'); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const handleDelete = useCallback((id: number) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    ProductsService.remove(id).catch(() => {/* optionally rollback or refetch */});
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
            image={p.image}
            image1={p.image1}
            image2={(p as any).image2}
            image3={(p as any).image3}
            title={p.title}
            description={p.description}
            price={p.price}
            prixPromo={p.price}
            onDelete={() => handleDelete(p.id)}
          />
        ))}
      </div>
    </Layout>
  );
}
      