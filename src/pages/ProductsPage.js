import Products from "../components/products";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Building2, Users, Landmark } from "lucide-react";

const ProductsPage = () => {
    return (
        <>
        <Header
            title="Products"
            icon={<Landmark className="w-5 h-5" />}
        />
        <Sidebar />
        <Products />
        </>
    );
}
export default ProductsPage;