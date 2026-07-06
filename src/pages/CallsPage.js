import Calls from "../components/Calls";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Building2, Users, Landmark } from "lucide-react";

const CallsPage = () => {
    return (
        <>
        <Header
            title="Calls"
            icon={<Landmark className="w-5 h-5" />}
        />
        <Sidebar />
        <Calls />
        </>
    );
}
export default CallsPage;