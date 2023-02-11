import React from 'react'
import "./promo.css";
import dog from './img/banner-dog.png';

export default ({promoText, size}) => {
  return (
        <div className={size}>
            <div className="promo-block">
                <div className="promo-right">
                        <h3>{promoText}</h3>
                </div>
                <div className="promo-left">
                        <img src={dog}/>
                </div>
            </div>
        </div>
  )
}
