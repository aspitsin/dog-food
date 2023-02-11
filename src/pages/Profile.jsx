import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Container, Button, IconButton, Typography, TextField } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/CheckBoxOutlined';
import DisabledIcon from '@mui/icons-material/DisabledByDefaultOutlined';

import Ctx from "../Ctx";

export default () => {
    const {user, setUser, api} = useContext(Ctx);
    const navigate = useNavigate();
    const [nameFlag, setNameFlag] = useState(false);
    const [name, setName] = useState(user.name);
    const [textFlag, setTextFlag] = useState(false);
    const [text, setText] = useState(user.about);

    const logOut = (e) => {
        e.preventDefault();
        setUser(null);
        localStorage.removeItem("user");
        navigate("/");
    }
    const updUser = () => {
        api.updUser({
            name: name,
            about: text
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                setNameFlag(false);
                setTextFlag(false);
            });
    }

    return  <Container maxWidth="lg">
        <h1>Личный кабинет </h1>
        <Typography>
            { !nameFlag 
                ? <>
                    <Typography gutterBottom sx={{display: 'inline'}}>{user.name}</Typography>
                    <IconButton size="small" onClick={() => setNameFlag(true)}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </>
                :<>
                    <TextField id="outlined-basic" label="Имя" variant="outlined" sx={{pt: 2}} value={name} required onChange={e => setName(e.target.value)}/>
                    <IconButton size="large" onClick={updUser}><CheckIcon fontSize="inherit" /></IconButton>
                    <IconButton size="large" onClick={() => {
                            setName(user.name);
                            setNameFlag(false);
                        }}><DisabledIcon fontSize="inherit" />
                    </IconButton>
                </>
            }
        </Typography>
        <Typography>
            { !textFlag  
                ? <>
                    <Typography gutterBottom sx={{display: 'inline'}}>{user.about}</Typography>
                    <IconButton size="small" onClick={() => setTextFlag(true)}>
                        <EditIcon fontSize="inherit" />
                    </IconButton>
                </>
                :<>
                    <TextField id="outlined-basic" label="Описание" variant="outlined" sx={{pt: 2}} value={text} required onChange={e => setText(e.target.value)}/>
                    <IconButton size="large" onClick={updUser}><CheckIcon fontSize="inherit" /></IconButton>
                    <IconButton size="large" onClick={() => {
                         setText(user.about);
                         setTextFlag(false);
                        }}><DisabledIcon fontSize="inherit" />
                    </IconButton>
                </>
            }
        </Typography>
        <Typography gutterBottom>{user.email}</Typography>
        {user.group && <Typography gutterBottom>{user.group}</Typography>}
        <Button variant="contained" sx={{color: "black", mt: 2}} onClick={logOut}>Выйти</Button>
    </Container>
     

}