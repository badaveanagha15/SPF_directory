import Payments from "../components/Payments";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Building2, Users, Landmark } from "lucide-react";

const PaymentsPage = () => {
    return (
        <>
        <Header
            title="Payments"
            icon={<Landmark className="w-5 h-5" />}
        />
        <Sidebar />
        <Payments />
        </>
    );
}
export default PaymentsPage;