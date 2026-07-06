import React from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import DepartmentsList from '../components/DepartmentsList';
import { Handshake} from "lucide-react";

function DepartmentsPage() {
    return (
        <>
        <Header
            title="Departments"
            icon={<Handshake className="w-5 h-5" />}
        />
        <Sidebar />
        <DepartmentsList />
        
        </>
        
    )
}

export default DepartmentsPage;