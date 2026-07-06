import { useState } from 'react';
import './App.css';
import DashboardPage from './pages/DashboardPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LeadsPage from './pages/LeadsPage';
import DealsPage from './pages/DealsPage';
import TasksPage from './pages/TasksPage';
import AccountsPage from './pages/AccountsPage';
import ContactsPage from './pages/ContactsPage';
import CallsPage from './pages/CallsPage';
import EmailsPage from './pages/EmailsPage';
import LeadDetailsPage from './pages/LeadDetailsPage';
import AccountDetailsPage from './pages/AccountDetailsPage';
import DealDetailsPage from './pages/DealDetailsPage';
import RoleHierarchy from './components/RoleHierarcy';
import DashboardBuilder from './components/DashboardBuilder';
import ContactDetailsPage from './pages/ContactDetailsPage';
import ProductsPage from './pages/ProductsPage';
import UsersPage from './pages/UsersPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import UserDetailsPage from './pages/UserDetailsPage';
import UserProfile from './components/UserProfile';
import PermissionManagement from './components/PermissionManagement';
import OwnerAnalytics from './components/OwnerAnalytics';
import QuotationSystem from './pages/QuotationSystem';
import Landing from './components/landing';
import DepartmentsPage from './pages/DepartmentsPage';
import Login from './components/Login';
import PaymentsPage from './pages/PaymentsPage';



function App() {

  return (
    <Router>
      <Routes>
        <Route path="/:department/dashboard" element={<DashboardPage />} />
        <Route path="/sales/leads" element={<LeadsPage />} />
        <Route path="/deals" element={<DealsPage/>} />
        <Route path="/tasks" element={<TasksPage/>} />
        <Route path="/accounts" element={<AccountsPage />} />
        <Route path="/contacts" element={<ContactsPage/>} />
        <Route path="/calls" element={<CallsPage/>} />
        <Route path="/emails" element={<EmailsPage/>} />
        <Route path="/leads/:id" element={<LeadDetailsPage/>} />
        <Route path="/accounts/:id" element={<AccountDetailsPage/>} />
        <Route path="/contacts/:id" element={<ContactDetailsPage/>} />
        <Route path="/deals/:id" element={<DealDetailsPage/>} />
        <Route path="/rolehierarchy" element={<RoleHierarchy/>}/>
        <Route path="/dashboardbuilder" element={<DashboardBuilder/>} />
        <Route path="/products" element={<ProductsPage/>} />
        <Route path="/products/:id" element={<ProductDetailsPage/>} />

        <Route path="/users" element={<UsersPage/>} />
        <Route path="/users/:id" element={<UserDetailsPage/>} />
        <Route path="/userprofile" element={<UserProfile/>}/>
        <Route path="/permissions" element={<PermissionManagement/>} />
        <Route path="/owneranalytics" element={<OwnerAnalytics/>} />
        <Route path="/quotation" element={<QuotationSystem/>}/>
        <Route path="/landing" element={<Landing/>}/>
        <Route path="/departments" element={<DepartmentsPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/payments" element={<PaymentsPage  />}/>
        <Route
    path="/sales/deals"
    element={<DealsPage  type="sales" />}
/>

<Route
    path="/purchase/deals"
    element={<DealsPage  type="purchase" />}
/>

<Route
    path="/finance/deals"
    element={<DealsPage  type="finance" />}
/>




      </Routes>
    </Router>
  );
}

export default App;
