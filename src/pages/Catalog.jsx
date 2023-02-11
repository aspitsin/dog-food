import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/card";
import Pagination from "../components/Pagination/pagination";
import usePagination from "../hooks/usePagination";
import { Container, Box, Button, Typography } from "@mui/material";

import Ctx from "../Ctx";

export default ({goods}) => {
	const {searchData} = useContext(Ctx);

	const clearSearch = () =>{
		searchData("");
	}
	const paginate = usePagination(searchData, 12);

	return <Container>
	{goods.length > 0
		? <>
			<Typography variant="h4" component="h1" sx={{py: 2}}>Каталог товаров</Typography>
			<Pagination hook={paginate}/>
				<div className="cards">
					{paginate.setPageData().map((el, i ) => <Link to={`/catalog/${el._id}`}>
						<Card key={"card_" + i} text={el.name} price={el.price} discount={el.discount} pictures={el.pictures} wight={el.wight} likes={el.likes} _id={el._id}/>
							</Link>
					 )}
				</div>
		</>
		:
		<>
			<Box sx={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
				<Typography variant="subtitle" component="p" >Товар не найден</Typography>
				<Button component={Link}  onClick={clearSearch} to="/">На главную</Button>
			</Box>
		</>
	}
	</Container>
}