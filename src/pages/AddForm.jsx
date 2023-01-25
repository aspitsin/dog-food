import React, {useState, useContext} from "react";
import { useNavigate } from "react-router";
import { TextField, MenuItem, Box, Button, Grid, Stack } from "@mui/material";

import Ctx from "../Ctx";

/*
    Название товара
    Цена
    Количтво на складе
    Вес
    Скидка
    Описание
    Изображение
*/

export default () => {
    const [name, setName] = useState("");
    const [price, setPrice] = useState(100);
    const [wight, setWight] = useState("");
    const [stock, setStock] = useState(10);
    const [discount, setDiscount] = useState(0);
    const [description, setDescription] = useState("");
    const [pictures, setPictures] = useState("");

    const {api, setGoods} = useContext(Ctx);
    const navigate = useNavigate();
    const handler = (e) => {
        e.preventDefault();
        let body = {
            name: name || "Название отсутствует",
            price: price || 0,
            wight: wight || "unknown",
            stock: stock || 0,
            description: description || "Тут скоро появится описание товара",
            discount: discount,
            pictures: pictures
        }
        api.addProduct(body)
            .then(res => res.json())
            .then(data => {
               
                if (!data.error) {
                    setGoods(prev => [...prev, data]);
                    clear();
                    navigate(`/catalog/${data._id}`);
                }
            })
    }
    const clear = (e) => {
        setName("");
        setPrice(100);
        setWight("");
        setDiscount(0);
        setStock(10);
        setDescription("");
        setPictures("");
    }
    const numberProps = {
        step: 10,
        min: 0,
      };
      
    return <>
        <h1>Добавить товар</h1>
        <Box component="form" onSubmit={handler} >
        <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
                <Stack spacing={1}>
                <TextField
                    label="Название товара"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <TextField
                    type="number"
                    label="Цена"
                    value={price}
                    onChange={e => setPrice(e.target.value)}
                    inputProps={numberProps}
                />
                <TextField
                    select
                    label="Скидка"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                >
                    <MenuItem value={0}>Без скидки</MenuItem>
                    <MenuItem value={5}>5%</MenuItem>
                    <MenuItem value={10}>10%</MenuItem>
                    <MenuItem value={15}>15%</MenuItem>
                    <MenuItem value={20}>20%</MenuItem>
                    <MenuItem value={25}>25%</MenuItem>
                </TextField>
                <TextField
                    label="Вес"
                    placeholder="100 г"
                    value={wight}
                    onChange={e => setWight(e.target.value)}
                />   
                <TextField
                    type="number"
                    label="Количество"
                    value={stock}
                    onChange={e => setStock(e.target.value)}
                    inputProps={numberProps}
                />
                <TextField
                    label="Описание"
                    value={description}
                    multiline
                    minRows={4}
                    onChange={e => setDescription(e.target.value)}
                />
                </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
            <Stack spacing={1}>
                <Box sx={{
                        height: 300,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundImage: pictures ? 
                            `url(${pictures})` : 
                            "url(https://www.chanchao.com.tw/images/default.jpg)",
                    }}>

                </Box>
            <TextField
                label="Изображение"
                type="url"
                value={pictures}
                onChange={e => setPictures(e.target.value)}
            />
            <Button variant="contained" type="submit">
                Добавить
            </Button>
            </Stack>
            </Grid>
        </Grid>
        </Box>
    </>
}