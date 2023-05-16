import { NavLink } from "react-router-dom"

const Header = ({isLogin, loginHandler}) => {

    

    return(
        <div className="header">
            <div className="header__navbar">
                
                <div className="header__left">
                    logo-appname
                </div>
                
                <div className="header__right">
                    <NavLink to={'/'}>home</NavLink> || 
                    <NavLink to={'/cart'}>cart</NavLink> || 
                    <NavLink to={'/wishlist'}>wishlist</NavLink> ||
                    <NavLink to={'/user-profile'}>user</NavLink> ||
                    <NavLink to={'/mockbee'}>mockbee</NavLink> ||

                    <div>
                        { isLogin &&  <button onClick={loginHandler}> LOGOUT </button> } 
                        { !isLogin &&  <button onClick={loginHandler}> LOGIN </button> } 
                    </div>
                   
                </div>

            </div>
        </div>
    )
}

export default Header