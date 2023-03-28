import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Welcome from '../../views/Welcome/Welcome';
import Onboarding from '../../views/Onboarding/Onboarding';
import Login from '../../views/Login/Login';
import Home from '../../views/Home/Home';
import Profile from '../../views/Profile/Profile';
import Category from '../../views/Category/Category';
import Library from '../../views/Library/Library';
import Categories from '../../views/Categories/Categories';
import Book from '../../views/Book/Book';

const AnimatedRoutes = () => {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Welcome />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:idCategory" element={<Category />} />
                <Route path="/library" element={<Library />} />
                <Route path="/book/:idBook" element={<Book />} />
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;
