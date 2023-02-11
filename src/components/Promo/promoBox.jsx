import React from 'react';
import Promo from './promo';
import "./promo.css";

export default ({promoText, size}) => {
  return (
    <div className="promo">
        <Promo promoText={promoText} size={size}/>
    </div>
  )
}
