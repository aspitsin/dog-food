import React, {useState, useContext} from "react";
import "./search.css";
import {useNavigate} from "react-router-dom";
import {ReactComponent as SearchImg} from "./img/magnifying-glass-solid.svg";
import {ReactComponent as CloseImg} from "./img/xmark-solid.svg";
import Ctx from "../../Ctx";

export default ({}) => {
    const {goods, searchData, setSearchData} = useContext(Ctx);
    const navigate = useNavigate();
    const [text, updateText] = useState("");

    const clearSearch = () => {
        updateText("");
        setSearchData(goods);
        searchData(goods);
    }
    const search = (e) => {
        navigate("/catalog");
        updateText(e.target.value);
        let arr = goods.filter(el => el.name.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchData(arr);
    }
    return <div className="search-block">
        <input placeholder="Поиск..." value={text} onChange={search}/>
        <button>{text ? <CloseImg onClick={clearSearch}/> : <SearchImg/>}</button>
        {text && <div className="search-result">
            По запросу <b>{text}</b>&nbsp; 
            {searchData.length > 0 ? `найдено ${searchData.length} товаров` : "не найдено ни одного товара"}
        </div>}
    </div>
}