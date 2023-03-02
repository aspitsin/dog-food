import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BasketRow from '../components/basketRow';
import { Container, Box, Grid, Paper, Divider, Typography, Button, Table, TableContainer, TableHead, TableBody, TableRow, TableCell } from '@mui/material'

import Ctx from '../Ctx';

const Basket = () => {
	const [gds, setGds] = useState([]);
	const {basket, goods} = useContext(Ctx);
	useEffect(()=>{
		let arr = [];
		if (goods.length){
			basket.forEach(el => {
				arr.push(goods.filter(g => g._id === el.id)[0])
			})
		}
		setGds(arr)
	},[basket, goods])

	return <Container maxWidth="lg" sx={{mb:1}}>
		{ basket.length === 0 &&  gds.length === 0 &&
			<Box sx={{display: 'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
				<Typography variant="h4" component="p" >Корзина пуста</Typography>
				<Typography variant="subtitle" component="p" >Воспользуйтесь поиском, чтобы найти всё что нужно.</Typography>
				<Button component={Link} to="/catalog">В каталог</Button>
			</Box>
		}
		{basket.length > 0 && gds.length > 0 && <>
			<Typography variant="h4" component="h1" sx={{py: 2}}>Корзина</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} md={8}>
					<TableContainer component={Paper}>
				<Table>
					<TableHead>
						<TableRow>
							<TableCell>Товар</TableCell>
							<TableCell>Количество</TableCell>	
							<TableCell>Цена</TableCell>		
						</TableRow>
					</TableHead>
					<TableBody>
						{basket.map((el, i) =>
							<BasketRow key={el.id} {...gds[i]} {...el}/>
						)}
					</TableBody>
				</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12} md={4}>
					<Paper sx={{p: 4}}>
						<Typography variant="h5" component="p">Ваша корзина</Typography>
						<Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', py: 2}}>
							<Typography>Товары ({basket.reduce((acc, el, i) => {
										acc += el.cnt;
										return acc;
									}, 0)})</Typography>
							<Typography>{basket.reduce((acc, el, i) => {
										acc += el.cnt * Math.round(gds[i].price * 100 / (100 - gds[i].discount))
										return acc;
									}, 0)} ₽</Typography>
						</Box>
						<Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', pb: 2}}>
							<Typography>Скидка</Typography>
							<Typography>{basket.reduce((acc, el, i) => {
										acc += el.cnt * Math.round(gds[i].price * 100 / (100 - gds[i].discount)) - el.cnt * gds[i].price;
										return acc;
									}, 0)} ₽</Typography>
						</Box>
						<Divider />
						<Box sx={{display:'flex', alignItems: 'center', justifyContent: 'space-between', py: 2}}>
							<Typography>Общая стоимость</Typography>
							<Typography>
								{basket.reduce((acc, el, i) => {
										acc += el.cnt * gds[i].price; 
										return acc;
									}, 0)} ₽
							</Typography>
						</Box>
						<Button sx={{width: '100%'}} variant="contained">Оформить заказ</Button>
					</Paper>
				</Grid>
			</Grid>
			</>
		}
	</Container>
}

export default Basket