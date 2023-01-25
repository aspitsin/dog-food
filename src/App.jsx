import React, {useEffect, useState} from "react";
import {Routes, Route} from "react-router-dom";

import "./style.css";

import Header from "./components/Header/header";
import Footer from "./components/Footer/footer";
import Modal from "./components/Modal/modal";

import Home from "./pages/Home";
import Catalog from "./pages/Catalog";
import Profile from "./pages/Profile";
import Product from "./pages/Product";
import AddForm from "./pages/AddForm";

import { Api } from "./Api";
import Ctx from "./Ctx";

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
                setGoods(data.products);
            })
        }
    }, [api]);
    
    useEffect(()=>{
        setSearchData(goods)
    }, [goods]);


    return (
        <Ctx.Provider value={{
            user: user,
            token: token,
            api: api,
            modalActive: modalActive,
            goods: goods,
            searchData: searchData,
            setUser: setUser,
            setToken: setToken,
            setApi: setApi,
            setGoods: setGoods,
            setModalActive: setModalActive,
            setSearchData: setSearchData,
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
            </Routes>
        </main>
        
        <Footer/>
    </div>
    <Modal />
    </Ctx.Provider>
    )
}

export default App;