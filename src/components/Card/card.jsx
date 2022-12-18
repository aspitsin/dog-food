import React from "react";
import "./card.css";

export default ({text, price, pictures, wight}) => {
    return <div className="card">
        <img className="card-img" src={pictures}  alt="" />
        <span className="card-prie">{price} ₽</span>
        <span className="card-wight">{wight}</span>
        <span className="card-name">{text}</span>
        <button className="button-primary"> В корзину</button>
        <span className="card__heart">
            {/* {
                like 
                ? <i className="fa-solid fa-heart"></i>
                : <i className="fa-regular fa-heart"></i>
            } */}
        </span>
    </div>
}