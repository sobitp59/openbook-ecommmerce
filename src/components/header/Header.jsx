import { NavLink } from "react-router-dom";
import "./header.css";

import { AiFillHeart } from 'react-icons/ai';
import { FaBook, FaUserCircle } from 'react-icons/fa';
import { GiWhiteBook } from "react-icons/gi";
import { RiLoginCircleFill, RiShoppingCart2Fill } from 'react-icons/ri';
import Logo from "../../components/logo-comp/Logo";
import { useAuth } from "../../contexts/authentication/AuthContext";
import { useProducts } from "../../contexts/products-context/ProductsContext";
import Search from "../search/Search";


const Header = () => {
    const {cart, wishlist} = useProducts();
    const {login, user} = useAuth();

    return(
        <div className="header">
            <div className="header__navbar">

                <Logo />
                <Search />
                
                <div className="header__right">
                    <NavLink className="header__links header__cartnav" to={'/products'}>
                        <GiWhiteBook className="header__cartlogo" />
                        <span className="header__linkname">books</span>
                    </NavLink>  
                    
                    <NavLink className="header__links header__cartnav" to={'/cart'}>
                        <RiShoppingCart2Fill className="header__cartlogo" /> {cart?.length > 0 && <span className="header__cart header__logo--length">{cart?.length}</span> }
                        <span className="header__linkname">bag</span>
                    </NavLink>  
                    
                    <NavLink className="header__links header__wishnav" to={'/wishlist'}>
                        <AiFillHeart className="header__wishlistlogo" /> {wishlist?.length > 0 && <span className="header__wishlist header__logo--length">{wishlist?.length}</span> }
                        <span className="header__linkname">wishlist</span>
                    </NavLink> 
                    
                    { user?.loggedIn ?  
                        <NavLink className="header__links" to={'/user-profile'}>
                        <FaUserCircle />
                        <span className="header__linkname">profile</span>
                    </NavLink>: (
                        <NavLink className="header__links" to={'/login'}>
                        <RiLoginCircleFill />
                        <span className="header__linkname">login</span>
                    </NavLink>
                    ) } 
                   
                </div>

            </div>
        </div>
    )
}

export default Header