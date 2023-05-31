import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import "./App.css";
import { Footer, Header, MockAPI, PrivateRoute } from "./components";
import { Cart, Checkout, Home, Login, Products, SignUp, User, Wishlist } from './pages';

import { useLocation, useNavigate } from 'react-router-dom';
import ProductDetail from './pages/product-detail/ProductDetail';


function App() {
  const [isLogin, setIsLogin] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  console.log(location)
  
  
  const loginHandler = () => {
    console.log(isLogin)
    setIsLogin((prev) => !prev)
    navigate(location?.state?.from?.pathname)
  }


  return (
    <div>
    <Header loginHandler={loginHandler} isLogin={isLogin}/>
    
    
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/login" element={ <Login /> }/>
      <Route path="/signup" element={ <SignUp /> }/>
      <Route path="/mock" element={ <MockAPI /> }/>
      <Route path="/products" element={ <Products /> }/>
      <Route path="/checkout" element={ <Checkout /> }/>
      <Route path="/products/:productID" element={ <ProductDetail /> }/>
      
      <Route path="/cart" element={
        <PrivateRoute isLogin={isLogin}>
          <Cart /> 
        </PrivateRoute>
      }/>
      
      <Route path="/wishlist" element={ 
        <PrivateRoute isLogin={isLogin}>
          <Wishlist /> 
        </PrivateRoute>
      }/>

      <Route path="/user-profile" element={ 
        <PrivateRoute isLogin={isLogin}>
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
