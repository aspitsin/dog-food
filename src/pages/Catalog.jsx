import React from "react";
import Card from "../components/Card/card";

export default ({data}) => {
    return <>
    <h1>Каталог товаров</h1>
    <div className="cards">
        {data.map((el, i ) => 
        i > 4 && <Card key={"card_" + i} text={el.name} price={el.price} pictures={el.pictures} wight={el.wight}/>)}
    </div>
    </>
}