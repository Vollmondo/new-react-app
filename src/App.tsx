import React from 'react';
import './App.css';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { ProductsPage } from './pages/catalogPages/ProductsPage';
import { AboutPage } from './pages/infoPages/AboutPage';
import { ContactsPage } from './pages/infoPages/ContactsPage';
import { MainPage } from './pages/MainPage';
import { HelpPage } from './pages/infoPages/HelpPage';
import { UsersPage } from './pages/adminPages/adminUsers/UsersPage';
import { ProfilePageWrapper } from './pages/userPages/ProfilePageWrapper';
import { AdminProductsPage } from './pages/adminPages/adminProducts/AdminProductsPage';
import { AdminCategoriesPage } from './pages/adminPages/adminCategories/AdminCategoriesPage';
import { AdminMainPage } from './pages/adminPages/AdminMainPage';
import { AuthForm } from './pages/userPages/AuthForm';
import {Page404} from './components/service/Page404';
import { ProductDetails } from './pages/catalogPages/ProductDetails';
import { CartPage } from './pages/userPages/CartPage';
import { FavPage } from './pages/userPages/FavPage';
import { OrdersPage } from './pages/userPages/OrdersPage';
import { SearchResults } from './components/service/SearchRezults';
import { useAppSelector } from './store/hooks';
import { UserRoles } from './pages/adminPages/adminUsers/UsersRoles';
import { AdminProdChars } from './pages/adminPages/adminProducts/AdminProdChars';
import { AdminOrdersPage } from './pages/adminPages/adminOrders/AdminOrdersPage';
import { AdminOrderStatusPage } from './pages/adminPages/adminOrders/AdminOrderStatusPage';

function UserProfile() {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Routes>
      <Route path="/:id" element={<ProfilePageWrapper />} />
      <Route path="/fav" element={<FavPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

function Admin() {
  const user = useAppSelector((state) => state.user.user);

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Routes>
      <Route path='/' element={<AdminMainPage />}/>
      <Route path='/users' element={<UsersPage />}/>
      <Route path='/roles' element={<UserRoles />}/>
      <Route path='/products' element={<AdminProductsPage />}/>
      <Route path='/prodchars' element={<AdminProdChars />}/>
      <Route path='/categories' element={<AdminCategoriesPage />}/>
      <Route path='/orders' element={<AdminOrdersPage />}/>
      <Route path='/order_status' element={<AdminOrderStatusPage />}/>
    </Routes>
  );
}

function App() {

  const navigate = useNavigate();
  const location = useLocation();

  React.useEffect(() => {
    if (location.pathname === '/') {
      navigate('/home');
    }
  }, [navigate, location]);

  return (
    <>
      <Routes>
        <Route path='/home' element={<MainPage />}/>

        <Route path='/cat' element={<ProductsPage />}/>
        <Route path='/cat/:id' element={<ProductDetails />}/>


        <Route path='/about' element={<AboutPage />}/>
        <Route path='/contacts' element={<ContactsPage />}/>
        <Route path='/help' element={<HelpPage />}/>
        
        <Route path="/login" element={<AuthForm/>} />
        <Route path="/userProfile/*" element={<UserProfile />} />

        <Route path='/admin/*' element={<Admin />}/>

        <Route path="/search" element={<SearchResults />} />
        
        <Route path='*' element={<Page404/>} />
      </Routes>
    </>
  );
}

export default App;
