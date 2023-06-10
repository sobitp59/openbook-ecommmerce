import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import { Footer, Header, MockAPI, PrivateRoute } from "./components";
import { Cart, Checkout, Home, Login, Products, SignUp, User, Wishlist } from './pages';

import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/authentication/AuthContext';
import ProductDetail from './pages/product-detail/ProductDetail';


function App() {
  const {login, user} = useAuth()
  const location = useLocation()
  const navigate = useNavigate()




  return (
    <div>
    <Header isLogin={login?.loggedIn}/>
    
    
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/signup" element={ <SignUp /> }/>
      <Route path="/mock" element={ <MockAPI /> }/>
      <Route path="/products" element={ <Products /> }/>
      <Route path="/checkout" element={ <Checkout /> }/>
      <Route path="/products/:productId" element={ <ProductDetail /> }/>
      
      <Route path="/cart" element={
        <PrivateRoute isLogin={user?.loggedIn}>
          <Cart /> 
        </PrivateRoute>
      }/>
      
      <Route path="/wishlist" element={ 
        <PrivateRoute isLogin={user?.loggedIn}>
          <Wishlist /> 
        </PrivateRoute>
      }/>

      <Route path="/user-profile" element={ 
        <PrivateRoute isLogin={user?.loggedIn}>
          <User />
        </PrivateRoute>
      }/>
      
      <Route path="mockbee" element={ <MockAPI /> }/>
    </Routes>

    <Footer />

    </div>
  );
}

export default App;
