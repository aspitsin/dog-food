import React, {useState, useEffect, useContext} from "react";
import {useParams, Link} from "react-router-dom";
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import { Grid, Box, Typography, Button, Container, Paper } from "@mui/material";

import LocalShippingIcon from '@mui/icons-material/LocalShippingOutlined';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremiumOutlined';

export default () => {
    const {id} = useParams();
    const {token, api} = useContext(Ctx);
    const [product, setProduct] = useState({});
    
    useEffect(() => {
        api.getProduct(id)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
            })
    },[])
    
    return <Container>
        <Box sx={{ py: 2 }}>
        <Typography  variant="caption" component={Link} to="/catalog" sx={{color: 'grey'}}>&#60; Назад</Typography>
        <Typography variant="h4" fontWeight="bold">{product.name}</Typography>
        <Typography variant="subtitle1" sx={{color: 'grey'}}>Артикул: </Typography>
        <Grid container spacing={2} sx={{pt: 1}}>
            <Grid item md={8} xs={12} sx={{position: 'relative'}}>
            {
                product.discount > 0 &&
                <Button size="small" component="span" variant="contained" color="warning" sx={{borderRadius: '20px', position: 'absolute'}}>-{product.discount}%</Button>
            }     
            <Typography variant="subtitle1"></Typography>
                <Box sx={{ height: '350px', display: 'flex' }}>
                    <img style={{width:'100%',  objectFit: 'contain'}} src={product.pictures}  alt={product.name} />
                </Box>
            </Grid>
            <Grid item md={4} xs={12}>
                <Box>
                    <Typography variant="body1" sx={{textDecoration: 'line-through'}}>{Math.ceil(product.price * 100 / (100 - product.discount))}</Typography>
                    <Typography variant="h4" color="red" fontWeight="bold" >{product.price} ₽</Typography>
                    <Button variant="contained" sx={{borderRadius: 20, mt: 2, backgroundColor: 'warning.light'}}>В корзину</Button>
                    <Paper elevation={0} sx={{p:2, mt: 2, display:'flex', gap: 2, bgcolor: 'grey.200'}}>
                        <LocalShippingIcon fontSize="large"/>
                        <Box >
                            <Typography fontWeight="bold" gutterBottom>Доставка по всему миру!</Typography>
                            <Typography>Доставка курьером - <b>от 399</b> ₽</Typography>
                            <Typography>Доставка в пункт выдачи - <b>от 199</b> ₽</Typography>
                        </Box>
                    </Paper>
                    <Paper elevation={0} sx={{p:2, mt: 2, display:'flex', gap: 2, bgcolor: 'grey.200' }}>
                        <WorkspacePremiumIcon fontSize="large"/>
                        <Box >
                            <Typography fontWeight="bold" gutterBottom>Гарантия качества</Typography>
                            <Typography>Если Вам не понравилось качсевто нашей продукции, мы вернем деньги, либо сделаем все возможное, удволитоварить ваши нужды.</Typography>
                        </Box>
                    </Paper>
                </Box>
            </Grid>
        </Grid>
        <Box sx={{minHeight: '100px'}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Описание</Typography>
            <Typography >{product.description}</Typography>
        </Box>
        <Box sx={{minHeight: '100px'}}>
            <Typography variant="h5" fontWeight="bold" gutterBottom>Характеристики</Typography>
            <Typography >{product.wight}</Typography>
        </Box>
        </Box>
       <Box>
            <Typography variant="h5" fontWeight="bold">Отзывы</Typography>
       </Box>
        <div className="reviews">
            {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => i < 3 && <Review {...el} key={i}/>)}
            {product.reviews && product.reviews.length > 0 &&  <Button variant="contained" component={Link} to={`/review/${id}`} size="large" sx={{ml: 'auto', mr: 'auto'}}>Еще отзывы</Button>
            }
        </div>
      
    </Container>
}