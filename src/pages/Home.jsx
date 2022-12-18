import React from "react";
import Card from "../components/Card/card";
import "../style.css";
import dog from './img/banner-dog.png';

export default () => {
    return <>
    <div className="container-banner">
        <div className="banner">
        <div className="right-side">
            <h1>Крафтовые лакомства для собак</h1>
            <p>Всегда свежие лакомства ручной работы с доставкой по России</p>
            <button className="button-white">Каталог</button>
        </div>
        <div className="left-side">
        </div>
        </div>
    </div>
    <div className="promo">
    <div className="promo-big">
            <div className="promo-block">
                <div className="promo-right">
                    <h3>Подарок за первый заказ</h3>
                </div>
                <div className="promo-left">
                    <img src={dog}/>
                </div>
            </div>
        </div>
    </div>
    <div className="promo">
        <div className="promo-small">
            <div className="promo-block">
                <div className="promo-right">
                    <h3>Вкусняшка</h3>
                </div>
                <div className="promo-left">
                    <img src={dog}/>
                </div>
            </div>
            <div className="promo-block">
                <div className="promo-right">
                    <h3>Вкусняшка</h3>
                </div>
                <div className="promo-left">
                    <img src={dog}/>
                </div>
            </div>
        </div>
    </div>
    </>
}