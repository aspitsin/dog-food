import React, { useState } from "react";

export default ({changeAuth, api, close, setToken}) => {
    const [inp1, setInp1] = useState("");
    const [pass1, setPass1] = useState(""); 
  
    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            email: inp1,
            password: pass1,
        }
        console.log(body);
        api.signIn(body)
            .then(res => res.json())
            .then(data => {
                console.log(data);
                api.signIn(body)
                .then(res => res.json())
                .then(data => {
                        localStorage.setItem("user", data.data.name);
                        localStorage.setItem("token", data.token);
                        setToken(data.token);
                })
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