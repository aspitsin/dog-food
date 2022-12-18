import React, {useState} from "react";
import "./modal.css";

import Signup from "./Signup";
import Login from "./Login";

export default ({isActive, setState, api, setToken}) => {
    const [auth, setAuth] = useState(true);
    let style = {
        display: isActive && "flex",
    }
    return <div className="modal-container" style={style}>
        <div className="modal">
            <button className="modal-close" onClick={()=>setState(false)}>
                <i class="fa fa-solid fa-xmark"></i></button>
        <h2>{auth ? "Войти" : "Зарегестрироваться"}</h2>
        {auth 
            ? 
            <Login changeAuth={setAuth} api={api} close={setState} setToken={setToken}/> 
            : 
            <Signup changeAuth={setAuth} api={api} close={setState} setToken={setToken}/>}
        </div>
    </div>
}
