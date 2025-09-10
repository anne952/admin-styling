import Layout from "../../components/layout";
import Navigation from "../../components/IN/navigation";
import Carts from "../../components/carts";
import { cartItems } from "../../js/acceuil";


export default function Acceuil() {
    return (
        <Layout>
            <div className="m-4">
                <div className=" absolute top-10 m-4">
                    <Navigation />
                </div>
                <div className="cart flex flex-row justify-between gap-10">
                <div className="flex flex-row justify-between items-center p-4 ml-2 -mt-64">
                    {cartItems.map(item => (
                    <Carts
                        key={item.id}
                        name={item.name}
                        number={item.number}
                        icon={item.icon}
                    />
                    ))}
                </div>
                <div className="h-[470px] bg-red-500 w-[500px] rounded-lg">
                    
                </div>
                </div>
                <div className="w-[550px] rounded-lg bg-violet-500 h-[250px] -mt-[250px]"></div>
            </div>
        </Layout>
    );
}

 