import React, {useState, useContext} from "react";
import "./modal.css";

import Signup from "./Signup";
import Login from "./Login";

import Ctx from "../../Ctx";

export default () => {
    const {modalActive, setModalActive} = useContext(Ctx);
    
    const [auth, setAuth] = useState(true);
    let style = {
        display: modalActive && "flex",
    }
    return <div className="modal-container" style={style}>
        <div className="modal">
            <button className="modal-close" onClick={()=>setModalActive(false)}>
                <i class="fa fa-solid fa-xmark"></i></button>
        <h2>{auth ? "Войти" : "Зарегестрироваться"}</h2>
        {auth 
            ? 
            <Login changeAuth={setAuth}  close={setModalActive} /> 
            : 
            <Signup changeAuth={setAuth}  close={setModalActive} />}
        </div>
    </div>
}
