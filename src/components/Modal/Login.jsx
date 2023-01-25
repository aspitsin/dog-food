import React, { useState, useContext } from "react";
import Ctx from "../../Ctx";

export default ({changeAuth, close}) => {
    const {api, setToken} = useContext(Ctx);
    const [inp1, setInp1] = useState("");
    const [pass1, setPass1] = useState(""); 
  
    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            email: inp1,
            password: pass1,
        }
        api.signIn(body)
            .then(res => res.json())
            .then(data => {
                // Не забыть отловить сообщение с ошибкой
                console.log(data);
                localStorage.setItem("user", JSON.stringify(data.data));
                localStorage.setItem("token", data.token);
                setToken(data.token);
                setInp1("");
                setPass1("");
                close(false);
            })
    }

    return <form onSubmit={sendForm}>
        <input type="email" placeholder="Введите почту" value={inp1} onChange={(e) => {setInp1(e.target.value)}}/>
        <input type="password" placeholder="Пароль" value={pass1} onChange={(e) => {setPass1(e.target.value)}}/>

        <button className="btn" type="submit" >Войти</button>
        <button className="btn link" type="button" onClick={()=>{changeAuth(prev => !prev)}}>Зарегестрироваться</button>
    </form>
}