import { NavLink } from "react-router-dom";
import "./header.css";

import { AiFillHeart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import Logo from "../../components/logo-comp/Logo";
import { useProducts } from "../../contexts/products-context/ProductsContext";
import Search from "../search/Search";


const Header = ({isLogin, loginHandler}) => {
    const {cart, wishlist} = useProducts();
    

    return(
        <div className="header">
            <div className="header__navbar">

                <Logo />
                <Search />
                
                <div className="header__right">
                    <NavLink className="header__links header__cartnav" to={'/cart'}>
                        <RiShoppingCart2Fill className="header__cartlogo" /> {cart?.length > 0 && <span className="header__cart header__logo--length">{cart?.length}</span> }
                        <span className="header__linkname">bag</span>
                    </NavLink>  
                    <NavLink className="header__links header__wishnav" to={'/wishlist'}>
                        <AiFillHeart className="header__wishlistlogo" /> {wishlist?.length > 0 && <span className="header__wishlist header__logo--length">{wishlist?.length}</span> }
                        <span className="header__linkname">wishlist</span>
                    </NavLink> 
                    
                    { !isLogin ?  <button onClick={loginHandler}> LOGIN </button> : (
                        <NavLink className="header__links" to={'/user-profile'}>
                            <FaUserCircle />
                            <span className="header__linkname">profile</span>
                        </NavLink>
                    ) } 
                   
                </div>

            </div>
        </div>
    )
}

export default Header