import React, { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from 'yup';
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import { Grid, Box, Typography, Button, Container, Paper, TextField, Rating, Stack } from "@mui/material";

import LocalShippingIcon from '@mui/icons-material/LocalShippingOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremiumOutlined';

export default () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token, api, setGoods, user, setBasket } = useContext(Ctx);
    const [product, setProduct] = useState({});
    const [valueRating, setValueRating] = useState(2);
    const [lengthList, setLengthlist] = useState(3);

    const validationSchema = yup.object({
        text: yup.string().required(),
    })

    const formik = useFormik({
        initialValues: {
            text: '',
            rating: valueRating,
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            values.rating = valueRating;
            api.addReview(id, values)
                .then(res => res.json())
                .then(data => {
                    if (!data.error) {
                        setProduct(data);
                    }
                })
        }
    });

    const remove = () => {
        api.delProduct(id)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setGoods(prev => prev.filter(g => g._id !== data._id))
                    navigate(`/`);
                }
            })
    }

    const buy = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setBasket(prev => {
            const test = prev.filter(el => el.id === product._id)
            if (test.length) {
                return prev.map(el => {
                    if (el.id === product._id) {
                        el.cnt++
                    }
                    return el;
                })
            } else {
                return [...prev, { id: product._id, cnt: 1 }]
            }
        })
    }

    const moreReviews = () => {
        setLengthlist(lengthList + 3)
    }
    const edit = () => {
        navigate(`/addform/${id}`)
    }

    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setProduct(data);
            })
    }, [])

    return <Container sx={{ mb: 1 }}>
        <Box sx={{ py: 2 }}>
            <Typography variant="caption" component={Link} to="/catalog" sx={{ color: 'grey' }}>&#60; Назад</Typography>
            <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
            <Typography variant="subtitle1" sx={{ color: 'grey' }}>Артикул: </Typography>
            <Grid container spacing={2} sx={{ pt: 1 }}>
                <Grid item md={8} xs={12} sx={{ position: 'relative' }}>
                    {
                        product.discount > 0 &&
                        <Button size="small" component="span" variant="contained" color="warning" sx={{ borderRadius: '20px', position: 'absolute' }}>-{product.discount}%</Button>
                    }
                    <Typography variant="subtitle1"></Typography>
                    <Box sx={{ height: '350px', display: 'flex' }}>
                        <img style={{ width: '100%', objectFit: 'contain' }} src={product.pictures} alt={product.name} />
                    </Box>
                </Grid>
                <Grid item md={4} xs={12}>
                    <Box>
                        {product.discount > 0 &&
                            <Typography variant="body1" sx={{ textDecoration: 'line-through' }}>{Math.ceil(product.price * 100 / (100 - product.discount))}</Typography>
                        }
                        <Typography variant="h4" color="red" fontWeight="bold" >{product.price} ₽</Typography>
                        <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                            <Button variant="contained" sx={{ borderRadius: 20, mt: 2, backgroundColor: 'warning.light' }} onClick={buy}>Купить</Button>
                            {product && product.author && product.author._id === user._id &&
                                <Button variant="contained" sx={{ borderRadius: 20, mt: 2, backgroundColor: 'red' }} onClick={remove}>Удалить</Button>
                            }
                            {product && product.author && product.author._id === user._id &&
                                <Button variant="contained" sx={{ borderRadius: 20, mt: 2, backgroundColor: 'red' }} onClick={edit}>Редактировать</Button>
                            }
                        </Stack>

                        <Paper elevation={0} sx={{ p: 2, mt: 2, display: 'flex', gap: 2, bgcolor: 'grey.200' }}>
                            <LocalShippingIcon fontSize="large" />
                            <Box >
                                <Typography fontWeight="bold" gutterBottom>Доставка по всему миру!</Typography>
                                <Typography>Доставка курьером - <b>от 399</b> ₽</Typography>
                                <Typography>Доставка в пункт выдачи - <b>от 199</b> ₽</Typography>
                            </Box>
                        </Paper>
                        <Paper elevation={0} sx={{ p: 2, mt: 2, display: 'flex', gap: 2, bgcolor: 'grey.200' }}>
                            <WorkspacePremiumIcon fontSize="large" />
                            <Box >
                                <Typography fontWeight="bold" gutterBottom>Гарантия качества</Typography>
                                <Typography>Если Вам не понравилось качсевто нашей продукции, мы вернем деньги, либо сделаем все возможное, удволитоварить ваши нужды.</Typography>
                            </Box>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ minHeight: '100px' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Описание</Typography>
                <Typography >{product.description}</Typography>
            </Box>
            <Box sx={{ minHeight: '100px' }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>Характеристики</Typography>
                <Typography >{product.wight}</Typography>
            </Box>
        </Box>
        <Box>
            <Typography variant="h5" fontWeight="bold">Отзывы</Typography>

            <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
                <Rating
                    name="simple-controlled"
                    value={valueRating}
                    onChange={(event, newValue) => {
                        setValueRating(newValue);
                    }} />
                <TextField
                    fullWidth
                    id="text"
                    name="text"
                    label="Ваш отзыв"
                    value={formik.values.text}
                    multiline
                    minRows={2}
                    onChange={formik.handleChange}
                    error={formik.touched.text && Boolean(formik.errors.text)}
                    helperText={formik.touched.text && formik.errors.text}
                />
                <Button type="submit" sx={{ mr: 'auto' }}>Добавить отзыв</Button>
            </Box>
            {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => i < lengthList && <Review {...el} key={i} setProduct={setProduct} id={id} />)}
            {product.reviews && product.reviews.length > lengthList && <Button variant="contained" size="large" sx={{ ml: 'auto', mr: 'auto' }} onClick={moreReviews}>Еще отзывы</Button>
            }
        </Box>
    </Container>
}