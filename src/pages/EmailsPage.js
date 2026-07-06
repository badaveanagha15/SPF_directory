import Emails from "../components/Emails";
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Building2, Users, Landmark } from "lucide-react";

const EmailsPage = () => {
    return (
        <>
        <Header
            title="Emails"
            icon={<Landmark className="w-5 h-5" />}
        />
        <Sidebar />
        <Emails />
        </>
    );
}
export default EmailsPage;