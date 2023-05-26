import { NavLink } from "react-router-dom";
import "./header.css";

import { AiFillHeart } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { RiShoppingCart2Fill } from 'react-icons/ri';
import Logo from "../../components/logo-comp/Logo";


const Header = ({isLogin, loginHandler}) => {

    

    return(
        <div className="header">
            <div className="header__navbar">

                <Logo />
                
                <div className="header__right">
                    <NavLink className="header__links" to={'/cart'}>
                        <RiShoppingCart2Fill />
                        <span className="header__linkname">bag</span>
                    </NavLink>  
                    <NavLink className="header__links" to={'/wishlist'}>
                        <AiFillHeart />
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