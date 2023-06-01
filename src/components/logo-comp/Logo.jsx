import React from 'react';
import { GiBookmarklet } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import "./logo.css";


const Logo = () => {
  return (
    <Link to={"/"} className='logo__link'>
    
   
            <div className="logo">
                    <GiBookmarklet className="logo__icon" />
                    <span className="logo__name">Openbook</span>
            </div>
            </Link>
  )
}

export default Logo

