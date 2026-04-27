import React from 'react'
import Header from '../components/header'
import Leads from '../components/leads'
import Sidebar from '../components/sidebar'
import { Users } from "lucide-react";

function LeadsPage() {
    return (
        <>
        <Header
            title="Leads"
            icon={<Users className="w-5 h-5" />}
        />
        <Sidebar />
        <Leads />
        </>
        
    )
}

export default LeadsPage
