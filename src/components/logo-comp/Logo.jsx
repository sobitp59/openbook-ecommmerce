import React from 'react';
import { GiBookmarklet } from 'react-icons/gi';
import "./logo.css";


const Logo = () => {
  return (
            <div className="logo">
                    <GiBookmarklet className="logo__icon" />
                    <span className="logo__name">openbook</span>
            </div>
  )
}

export default Logo

