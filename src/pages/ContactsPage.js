import Contact from "../components/contact";
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { UserPlus,UserCheck } from "lucide-react";

const ContactsPage = () => {
    return(
        <>  
        <Header
            title="Contacts"
            icon={<UserCheck className="w-5 h-5" />}
        />
        <Sidebar />
        <Contact />
        </>
    );
}

export default ContactsPage;