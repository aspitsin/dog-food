import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card/card";
import Pagination from "../components/Pagination/pagination";
import usePagination from "../hooks/usePagination";
import { Container } from "@mui/material";
import Ctx from "../Ctx";
import { Typography } from '@mui/material'

export default () => {
	const {favorites} = useContext(Ctx);
	const paginate = usePagination(favorites, 6);
	
	return <Container sx={{mb:1}}>
		{favorites.length > 0
			? <>
				<Typography variant="h4" component="h1" sx={{py: 2}}>Каталог товаров</Typography>
				{favorites.length > 6 && <Pagination hook={paginate}/>}
					<div className="cards">
						{paginate.setPageData().map((el, i ) => <Link to={`/catalog/${el._id}`}>
							<Card key={"card_" + i} {...el}/>
								</Link>
					)}</div>
				</>
				:
				<>
				<p>Вы еще не добавили ни один любимый товар</p>
				<Link to="/catalog" >В каталог</Link>
			</>
		}
	</Container>
}