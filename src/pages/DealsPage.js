import React from 'react'
import Header from '../components/header'
import Sidebar from '../components/sidebar'
import { Users } from "lucide-react";
import Deals from '../components/deals';

function DealsPage() {
    return (
        <>
        <Header
            title="Deals"
            icon={<Users className="w-5 h-5" />}
        />
        <Sidebar />
        <Deals />
        
        </>
        
    )
}

export default DealsPage;
