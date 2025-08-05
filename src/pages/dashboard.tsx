import Layout from "../components/layout";
import Carts from "../components/carts";
import { cartItems } from "../js/cart-id";
import UserStatsChart from "../constant/chart";

export default function Dashboard() {
  
  return (
    <Layout>
      <div className="flex flex-wrap justify-between items-center p-4 ml-2">
        {cartItems.map(item => (
          <Carts
            key={item.id}
            name={item.name}
            number={item.number}
            icon={item.icon}
          />
        ))}
      </div>
      <UserStatsChart  />
    </Layout>
  );
}