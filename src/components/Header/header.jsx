import React, {useState} from "react";
import Search from "../Search/search";
import "./header.css";

import burger from "./img/Menu.svg"

export default ({user, setUser, products, setModalActive}) => {
    // const [user, setUser] = useState(localStorage.getItem("user"));
    
    const logIn = (e) => {
        e.preventDefault();
        // let name = prompt("Как вас зовут");
        // if(name){
        //     setUser(name);
        // }
        setModalActive(prev => !prev);
        setMobileMenu(false);
    }
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("user");
        setUser("");
    }
    const [isActiveMenu, setMobileMenu] = useState(false);
    let styleMobileMenu = {
        display: isActiveMenu && "block",
    }
    return <header>
        <div className="logo"></div>
        <Search data={products}/>
        <nav className="menu">
            {user && <a href="">{user}</a>}
            {!user && <a className="button-primary" href="" onClick={logIn} >Войти</a>}
            {user && <a className="button-primary" href="" onClick={logOut}>Выйти</a>}
        </nav>
        <div className="burger">
            <button onClick={()=>setMobileMenu(true)}>
                    <img className="burger-icon" src={burger} alt="" />
            </button>
        </div>
        <div className="mobile-menu" style={styleMobileMenu}>
            <div className="mobile-menu-header">
                <button className="mobile-menu-close" onClick={()=>setMobileMenu(false)}>
                    <i class="fa fa-solid fa-xmark"></i>
                </button>
                {user && <a href="">{user}</a>}
                {!user && <a className="button-primary" href="" onClick={logIn}>Войти</a>}
                {user && <a className="button-primary" href="" onClick={logOut}>Выйти</a>}
            </div>
            <nav className="mobile-menu-nav">
                <li>Главная страница</li>
                <li>Каталог</li>
            </nav>
            
        </div>
    </header>
}