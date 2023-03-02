import React, { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import { TextField, MenuItem, Box, Button, Grid, Stack, Container, Typography } from "@mui/material";

import Ctx from "../Ctx";

export default () => {
    const { id } = useParams();
    const { api, setGoods } = useContext(Ctx);
    const navigate = useNavigate();
    const [picture, setPicture] = useState("");

    const validationSchema = yup.object({

    })

    const formik = useFormik({
        initialValues: {
            name: '',
            price: '',
            discount: '',
            wight: '',
            stock: '',
            description: '',
            pictures: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            setPicture(values.pictures);
            api.addProduct(values)
                .then(res => res.json())
                .then(data => {

                    if (!data.error) {
                        setGoods(prev => [...prev, data]);
                        navigate(`/catalog/${data._id}`);
                    }
                })
        }
    });

   
    const numberProps = {
        step: 10,
        min: 0,
    };

    const discountValue = [0, 5, 10, 15, 20, 25]

    return <Container maxWidth="lg" sx={{ mb: 1 }}>
        <Typography variant="h4" component="h1" sx={{ py: 2 }}>Добавить товар</Typography>
        <Box component="form" onSubmit={formik.handleSubmit} >
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <TextField
                            id="name"
                            name="name"
                            label="Название товара"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                        <TextField
                            id="price"
                            name="price"
                            type="number"
                            label="Цена"
                            value={formik.values.price}
                            onChange={formik.handleChange}
                            inputProps={numberProps}
                            error={formik.touched.price && Boolean(formik.errors.price)}
                            helperText={formik.touched.price && formik.errors.price}
                        />
                        <TextField
                            select
                            id="discount"
                            name="discount"
                            label="Скидка"
                            value={formik.values.discount}
                            onChange={formik.handleChange}
                        >
                            {discountValue.map((dValue) => (
                                <MenuItem
                                    key={dValue}
                                    value={dValue}
                                >
                                    {dValue}%
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            id="wight"
                            name="wight"
                            label="Вес"
                            placeholder="100 г"
                            value={formik.values.wight}
                            onChange={formik.handleChange}
                            error={formik.touched.wight && Boolean(formik.errors.wight)}
                            helperText={formik.touched.wight && formik.errors.wight}
                        />
                        <TextField
                            id="stock"
                            name="stock"
                            type="number"
                            label="Количество"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            inputProps={numberProps}
                            error={formik.touched.stock && Boolean(formik.errors.stock)}
                            helperText={formik.touched.stock && formik.errors.stock}
                        />
                        <TextField
                            id="description"
                            name="description"
                            label="Описание"
                            value={formik.values.description}
                            multiline
                            minRows={4}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <Box sx={{
                            height: 312,
                            backgroundSize: 'contain',
                            backgroundRepeat: 'no-repeat',
                            backgroundImage: picture ?
                                `url(${picture})` :
                                "url(https://www.chanchao.com.tw/images/default.jpg)",
                        }}>

                        </Box>
                        <TextField
                            id="pictures"
                            name="pictures"
                            label="Изображение"
                            type="url"
                            value={formik.values.pictures}
                            onChange={formik.handleChange}
                            error={formik.touched.pictures && Boolean(formik.errors.pictures)}
                            helperText={formik.touched.pictures && formik.errors.pictures}
                        />
                        <Button variant="contained" type="submit">
                            Добавить
                        </Button>
                    </Stack>
                </Grid>
            </Grid>
        </Box>
    </Container>
}