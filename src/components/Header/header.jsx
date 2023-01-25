import React, {useState, useContext} from "react";
import Search from "../Search/search";
import "./header.css";
import { Link } from "react-router-dom";
import Ctx from "../../Ctx";

import burger from "./img/Menu.svg"

import { AppBar, Container, Toolbar, Box, Stack, IconButton, Avatar, Menu, MenuItem, Typography, Button, Fab} from "@mui/material";
import PetsIcon from '@mui/icons-material/Pets';
import AddIcon from '@mui/icons-material/Add';
 
export default () => {
    const {user, setUser, setModalActive}  = useContext(Ctx);

    const logIn = (e) => {
        e.preventDefault();
        setModalActive(prev => !prev);
        setMobileMenu(false);
    }
    const logOut = (e) => {
        e.preventDefault();
        setUser("");
        localStorage.removeItem("user");
    }
    const [isActiveMenu, setMobileMenu] = useState(false);
    let styleMobileMenu = {
        display: isActiveMenu && "block",
    }

  

    return <AppBar position="static">
        <Container maxWidth="xl">
             <Toolbar disableGutters sx={{justifyContent:"space-between"}}>
                <Link to="/"><PetsIcon sx={{ mr: 1, ml: 1 }} /></Link>
             
                    <Search />
    
                    <Stack direction="row">
                    {user && user.name && <Fab color="primary" size="small" component={Link} to="/addForm">
                        <AddIcon />
                    </Fab>}

                    {user && user.name && <Button component={Link} to="/profile">{user.name}</Button>}
                    {!user && <Button onClick={logIn}>Войти</Button>}
                    {user && <Button onClick={logOut}>Выйти</Button>}
                    </Stack>
            </Toolbar>
        </Container>
    </AppBar>
}