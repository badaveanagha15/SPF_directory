import Users from "../components/Users";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Building2, Landmark } from "lucide-react";

const UsersPage = () => {
    return (
        <>
        <Header
            title="Users"
            icon={<Landmark className="w-5 h-5" />}
        />
        <Sidebar />
        <Users />
        </>
    );
}
export default UsersPage;