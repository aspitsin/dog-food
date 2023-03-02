import React, {useState} from "react";
import "./modal.css";

import Signup from "./Signup";
import Login from "./Login";

export default ({modalActive, setModalActive}) => {
    const [auth, setAuth] = useState(true);

    let className = 'modal-container';
    if (modalActive) {
        className += ' menu-active';
    }

    return <div className={className} >
        <div className="modal">
            <button className="modal-close" onClick={()=>setModalActive(false)}>
                <i className="fa fa-solid fa-xmark"></i></button>
        <h2>{auth ? "Войти" : "Зарегистрироваться"}</h2>
        {auth 
            ? 
            <Login setAuth={setAuth}  closeModal={setModalActive} /> 
            : 
            <Signup setAuth={setAuth}  closeModal={setModalActive} />}
        </div>
    </div>
}
