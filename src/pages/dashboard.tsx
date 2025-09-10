import Layout from "../components/layout";
import Carts from "../components/carts";
import { cartItems } from "../js/cart-id";
import UserStatsChart from "../constant/chart";
import React from "react";
import { UsersService } from "../services/users";
import { ProductsService } from "../services/products";
import { OrdersService } from "../services/orders";

export default function Dashboard() {
  const [counts, setCounts] = React.useState({ products: 0, users: 0, vendors: 0, likes: 0 });
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    setLoading(true);
    Promise.all([
      UsersService.list(),
      ProductsService.list(),
      OrdersService.list().catch(() => [])
    ]).then(([users, products]) => {
      if (!mounted) return;
      const vendors = (users as any[]).filter(u => u.role === 'vendeur').length;
      setCounts({
        products: (products as any[]).length,
        users: (users as any[]).length,
        vendors,
        likes: 0,
      });
    }).finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, []);

  const items = React.useMemo(() => {
    return cartItems.map(i => {
      if (i.name === 'Product') return { ...i, number: counts.products };
      if (i.name === 'Users') return { ...i, number: counts.users };
      if (i.name === 'Vendeurs') return { ...i, number: counts.vendors };
      if (i.name === 'Like') return { ...i, number: counts.likes };
      return i;
    });
  }, [counts]);

  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center p-4 ml-2">
        {items.map(item => (
          <Carts
            key={item.id}
            name={item.name}
            number={item.number}
            icon={item.icon}
          />
        ))}
      </div>
      {!loading && <UserStatsChart />}
    </Layout>
  );
}