import Accounts from "../components/Accounts";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Building2, Users, Landmark } from "lucide-react";

const AccountsPage = () => {
    return (
        <>
        <Header
            title="Accounts"
            icon={<Landmark className="w-5 h-5" />}
        />
        <Sidebar />
        <Accounts />
        </>
    );
}
export default AccountsPage;