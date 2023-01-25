import React from "react";
import Card from "../components/Card/card";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import usePagination from "../hooks/usePagination";
import { Container } from "@mui/material";

export default ({goods, searchData}) => {
    const clearSearch = () =>{
        searchData("");
    }
    const paginate = usePagination(searchData, 12);
    
    return <>
    <Container>
    {goods.length > 0
        ? <>
            <h1>Каталог товаров</h1>
            <Pagination hook={paginate}/>
                <div className="cards">
                    {paginate.setPageData().map((el, i ) => <Link to={`/catalog/${el._id}`}>
                        <Card key={"card_" + i} text={el.name} price={el.price} pictures={el.pictures} wight={el.wight}/>
                            </Link>
                     )}
                </div>
        </>
        :
        <>
        <p>Товар не найден</p>
        <Link to="/" onClick={clearSearch}>На главную</Link>
        </>
    }

    </Container>
  </>
}