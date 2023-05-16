import { Route, Routes } from 'react-router-dom';
import "./App.css";
import { Footer, Header, MockAPI } from "./components";
import { Cart, Home, User, Wishlist } from './pages';



function App() {
  return (
    <div className="MockAPI">
    <Header />
    
    <Routes>
      <Route path="/" element={ <Home /> }/>
      <Route path="/cart" element={ <Cart /> }/>
      <Route path="/wishlist" element={ <Wishlist /> }/>
      <Route path="/user-profile" element={ <User /> }/>
      <Route path="mockbee" element={ <MockAPI /> }/>
    </Routes>

    <Footer />

    </div>
  );
}

export default App;
