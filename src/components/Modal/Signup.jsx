import React, { useState, useContext } from "react";
import Ctx from "../../Ctx";

export default ({changeAuth, close}) => {
    const {api, setToken} = useContext(Ctx);
    const [inp1, setInp1] = useState("");
    const [pass1, setPass1] = useState(""); 
    const [pass2, setPass2] = useState(""); 
    const [testPwd, setTestPwd] = useState(true);

    const checkPwd = (val, type="main") => {
        type === "main" ? setPass1(val) : setPass2(val);
        if(val) {
            if (type === "main"){
                setTestPwd(val !== pass2);
            } else {
                setTestPwd(val !== pass1);
            }
        }
    }

    const sendForm = (e) => {
        e.preventDefault();
        const body = {
            email: inp1,
            password: pass1
        }
        api.signUp(body)
            .then(res => res.json())
            .then(data =>{
                if(!data.err) {
                    api.signIn(body)
                        .then(res => res.json())
                        .then(data => {
                                localStorage.setItem("user", JSON.stringify(data.data));
                                localStorage.setItem("token", data.token);
                                setToken(data.token);
                        })
                    setInp1("");
                    setPass1("");
                    setPass2("");
                    close(false);
                } else {
                    alert(data.message);
                }
            })
    }

    return <form onSubmit={sendForm}>
        <input type="email" placeholder="Введите почту" value={inp1} onChange={(e) => {setInp1(e.target.value)}}/>
        <input type="password" placeholder="Пароль" value={pass1} onChange={(e) => {checkPwd(e.target.value)}}/>
        <input type="password" placeholder="Повторите пароль" value={pass2} onChange={(e) => {checkPwd(e.target.value, "second")}}/>

        <button className="btn" type="submit" disabled={testPwd}>Зарегистрироваться</button>
        <button className="btn link" type="button" onClick={()=>{changeAuth(prev => !prev)}}>Войти</button>
    </form>
}