import React, {useEffect, useState} from "react";
import "./style.css";
import products from "./assets/data.json";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal/modal";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";

import { Api } from "./Api";


const App = () =>{
    const [user, setUser] = useState(localStorage.getItem("user"))
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [modalActive, setModalActive] = useState(false);
    const [api, setApi] = useState(new Api(token));
    const [goods, setGoods] = useState([]);

    useEffect(() => {
        if(token) {
            api.getProducts()
                .then(res => res.json())
                .then(data => {
                    setGoods(data.products);
                })
        }
    }, [])

    useEffect(() => {
        setApi(new Api(token));
        setUser(localStorage.getItem("user"));
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
                setGoods(data.products);
            })
        }
    }, [api])

    console.log(goods);
    return (
    <>
    <div className="container">
        <Header 
        user={user} 
        setUser={setUser} 
        products={products} 
        setModalActive={setModalActive}/>
        <Home />
        <main>
            {user && <Catalog data={goods}/> }
        </main>
        
        <Footer/>
    </div>
    <Modal isActive={modalActive} setState={setModalActive} api={api} setToken={setToken}/>
    </>
    )
}

export default App;