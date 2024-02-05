import { Route, Routes } from 'react-router-dom';
import Cards from './cards/Cards';
import About from './pages/About';
import EditCard from './cards/EditCard';
import CreateCard from './cards/CreateCard';
import MyCards from './cards/MyCards';
import FavoriteCards from './cards/FavoriteCards';
import Account from './pages/Account';
import ClientManagement from './admin/ClientManagement';
import EditClient from './admin/EditClient';
import SingleCard from './cards/SingleCard';
import ErrorPage from './pages/ErrorPage';
import { useContext } from 'react';
import { GeneralContext } from './App';
import { RoleTypes } from './components/Navbar-config';
import TermsAndPrivacy from './pages/TermsAndPrivacy';

export default function RouterAuth() {
    const { roleType } = useContext(GeneralContext);
    return (
        <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/TermsAndPrivacy" element={<TermsAndPrivacy />} />
            <Route path="/errorPage" element={<ErrorPage />} />
            <Route path="/cards/:id" element={<SingleCard />} />
            <Route path="/cards/favorite" element={<FavoriteCards />} />

            {roleType === RoleTypes.admin &&<Route path="/admin/clients/:id" element={<EditClient />} />}
            {roleType === RoleTypes.admin &&<Route path="/admin/clients" element={<ClientManagement />} />}
            {roleType !== RoleTypes.user && <Route path="/business/cards/:id" element={<EditCard />} />}
            {roleType !== RoleTypes.user && <Route path="/business/cards" element={<MyCards />} />}
            {roleType !== RoleTypes.user && <Route path="/business/cards/new" element={<CreateCard />} />}
            {roleType !== RoleTypes.admin && <Route path="/account" element={<Account />} />}
        </Routes>
    )
}