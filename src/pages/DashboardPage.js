import Dashboard from "../components/dashboard";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { LayoutDashboard } from "lucide-react";

const DashboardPage = () => {
    return (
        <>
            <Header
                title="Dashboard"
                icon={<LayoutDashboard className="w-5 h-5" />}
            />
            <Sidebar />
            <Dashboard/>
        </>
    );
}

export default DashboardPage;