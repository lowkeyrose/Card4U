import { Route, Routes } from 'react-router-dom';
import Cards from './cards/Cards';
import Login from './user/Login';
import Signup from './user/Signup';
import About from './pages/About';
import ErrorPage from './pages/ErrorPage';
import SingleCard from './cards/SingleCard';
import TermsAndPrivacy from './pages/TermsAndPrivacy';

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<Cards />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/TermsAndPrivacy" element={<TermsAndPrivacy />} />
            <Route path="/cards/:id" element={<SingleCard />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/errorPage" element={<ErrorPage />} />
        </Routes>
    )
}