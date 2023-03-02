import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";

import "./style.css";

import Header from "./components/Header/header";
import Footer from "./components/footer";
import Modal from "./components/Modal/modal";
import Review from "./components/Review/review";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddForm from "./pages/AddForm";
import Favorites from "./pages/Favorites";
import Basket from "./pages/Basket";


import { Api } from "./Api";
import Ctx from "./Ctx";

import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

const theme = createTheme({
	typography: {
	  fontFamily: [
		'Nunito',
		'Roboto',
		'"Helvetica Neue"',
		'Arial',
		'sans-serif'
	  ].join(','),
	},   
		palette: {
		  primary: {
			main: '#ffc107',
		  },
		},
  });

const App = () =>{
	let usr = localStorage.getItem("user");
	if (usr) {
		usr = JSON.parse(usr);
	}
	const [user, setUser] = useState("usr");
	const [token, setToken] = useState(localStorage.getItem("token"));
	const [modalActive, setModalActive] = useState(false);
	const [api, setApi] = useState(new Api(token));
	const [goods, setGoods] = useState([]);
	const [searchData, setSearchData] = useState(goods);
	const [favorites, setFavorites] = useState([]);
	const [users, setUsers] =useState ([]);
	const [basket, setBasket] = useState(localStorage.getItem("basket") ? JSON.parse(localStorage.getItem("basket")) : []);

	useEffect(() => {
        if (token) {
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
					setSearchData(data.products);
                })
            api.getUsers()
                .then(res => res.json())
                .then(data => {
                    setUsers(data);
                })
        }
    }, [])

	useEffect(() => {
		setApi(new Api(token));
		let usr = localStorage.getItem("user");
		if (usr) {
			usr = JSON.parse(usr);
		}
		setUser(usr);
	}, [token]);

	useEffect(() => {
		if(!user) {
			localStorage.removeItem("token");
			setToken(null);
		}
	}, [user]);

	useEffect(() => {
		if (token) {
			api.getProducts()
			.then(res => res.json())
			.then(data => {
				setSearchData(data.products);
				setGoods(data.products);
			})
		}
	}, [api]);
	
	useEffect(()=>{
		if(user) {
			setFavorites(goods.filter(el => {
			return el.likes && el.likes.includes(user._id);
		}))
		}
	}, [goods]);

	useEffect(() => {
		localStorage.setItem("basket", JSON.stringify(basket))
	}, [basket])
	

	return (
	<ThemeProvider theme={theme}>
		<Ctx.Provider value={{
			user: user,
			token: token,
			api: api,
			goods: goods,
			searchData: searchData,
			favorites: favorites,
			setUser: setUser,
			setToken: setToken,
			setApi: setApi,
			setGoods: setGoods,
			setSearchData: setSearchData,
			setFavorites: setFavorites,
			basket: basket,
			setBasket: setBasket,
			users: users,
			setUsers: setUsers,
		}}>
	<div className="container">
		<Header 
			goods={goods}
			searchData={searchData}
			setSearchData={setSearchData}
			setModalActive={setModalActive}
		/>
		<main>
			<Routes>
				<Route path="/" element={<Home goods={goods}/>}/>
				<Route path="/catalog" element={<Catalog goods={searchData} searchData={searchData}/>}/>
				<Route path="/profile" element={<Profile />}></Route>
				<Route path="/catalog/:id" element={<Product/>}></Route>
				<Route path="/addForm" element={<AddForm/>}></Route>
				<Route path="/addForm/:id" element={<AddForm/>}></Route>
				<Route path="/favorites" element={<Favorites/>}></Route>
				<Route path="/review/:id" element={<Review/>}></Route>
				<Route path="/basket" element={<Basket/>}></Route>
			</Routes>
		</main>
		<Footer/>
	</div>
	<Modal modalActive={modalActive} setModalActive={setModalActive}/>
	</Ctx.Provider>
	</ThemeProvider>
	)
}

export default App;