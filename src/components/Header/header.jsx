import React, {useState, useContext} from "react";
import Search from "../Search/search";
import "./header.css";
import { Link, useNavigate } from "react-router-dom";
import Ctx from "../../Ctx";

import burger from "./img/Menu.svg"

import { AppBar, Container, Toolbar, Box, Stack, IconButton, Button, Fab, Badge} from "@mui/material";

import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
 
export default ({setModalActive}) => {
	const {user, setUser, favorites, basket}  = useContext(Ctx);
	const navigate = useNavigate();

	const logIn = (e) => {
		e.preventDefault();
		setModalActive(prev => !prev);
		setMobileMenu(false);
	}
	const logOut = (e) => {
		e.preventDefault();
		setUser("");
		localStorage.removeItem("user");
		navigate("/");
		
	}
	const [isActiveMenu, setMobileMenu] = useState(false);
	let styleMobileMenu = {
		display: isActiveMenu && "block",
	}
	return <AppBar color="primary" position="static" sx={{mb:'-1px'}}>
		<Container maxWidth="lg">
			 <Toolbar disableGutters sx={{justifyContent:"space-between"}}>
					<Link to="/"><PetsIcon sx={{ mr: 1, ml: 1 }} /></Link>  
					{user && <Search /> }
					<Stack direction="row" sx={{display: {xs: 'none', md: 'flex'}, pl: 1}}>
						{user && user.name && <Fab color="white" size="small" component={Link} to="/addForm">
						<AddIcon />
						</Fab>
						}
						{user && user.name && 
						<IconButton sx={{color: "inherit"}}>
							<Badge badgeContent={favorites.length} color="warning" component={Link} to="/favorites" >
								<FavoriteBorderOutlinedIcon color="black" />
							</Badge>
						</IconButton>}
						{user && user.name && 
						<IconButton sx={{color: "inherit"}}>
							<Badge badgeContent={basket.reduce((acc, el) => acc + el.cnt, 0)} color="warning" component={Link} to="/basket" >
								<ShoppingBasketOutlinedIcon color="black" />
							</Badge>
						</IconButton>}
						{user && user.name && <Button sx={{color: "black"}}  component={Link} to="/profile" >{user.name}</Button>}
						{!user && <Button sx={{color: "black"}} onClick={logIn} >Войти</Button>}
					</Stack>
					<IconButton
						size="large"
						edge="start"
						color="inherit"
						aria-label="open drawer"
						sx={{display: {xs: 'flex', md: 'none'}, ml: 2 }}
						onClick={()=>setMobileMenu(true)}
					>
						<MenuIcon />
					</IconButton>
					<div className="mobile-menu" style={styleMobileMenu}>
						<div className="mobile-menu-header">
							<button className="mobile-menu-close" onClick={()=>setMobileMenu(false)}>
								<i className="fa fa-solid fa-xmark"></i>
							</button>
							{user && user.name && <Link to="/profile">{user.name}</Link>}
							{!user && <a className="button-primary" href="" onClick={logIn}>Войти</a>}
							{user && <a className="button-primary" href="" onClick={logOut} >Выйти</a>}
						</div>
						<nav className="mobile-menu-nav">
							<li>Главная страница</li>
							<li>Каталог</li>
						</nav>
					</div>
			</Toolbar>
		</Container>
	</AppBar>
}