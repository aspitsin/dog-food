import React, {useState, useEffect, useContext} from "react";
import {useParams, Link} from "react-router-dom";
import Review from "../components/Review/review";
import Ctx from "../Ctx";
import { Grid, Box, Typography, Button, Rating, Paper  } from "@mui/material";


export default ({}) => {
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
   
    return <>
        <Box sx={{ py: 2 }}>
        <Typography  variant="caption" component={Link} to="/catalog" sx={{color: 'grey'}}>&#60; Назад</Typography>
        <Typography variant="h4">{product.name}</Typography>
        <Typography variant="subtitle1" sx={{color: 'grey'}}>Артикул: <b style={{color: 'black'}}>{id}</b></Typography>
        <Grid container spacing={2}>
            <Grid item md={8} xs={12} >
            <Box sx={{backgroundColor:'red', borderRadius: '20px',textAlign: 'center', width:'56px'}}>
                <Typography variant="body1" color="#fff">-{product.discount}%</Typography>
            </Box>
            <Typography variant="subtitle1"></Typography>
                <Box sx={{display: "block", height: "450px", maxHeight: '450px'}}>
                    <img style={{height:'100%'}} src={product.pictures}  alt={product.name} />
                </Box>
            </Grid>
            <Grid item md={4} xs={12}>
                <Box>
                    
                    <Typography>{product.price}</Typography>
                    <Button>В корзину</Button>

                </Box>
            </Grid>
        </Grid>
        <Box>
            <Typography variant="h6">Описание</Typography>
            <Typography>{product.description}</Typography>
        </Box>
        <Box>
            <Typography variant="h6">Характеристики</Typography>
            <Typography>{product.wight}</Typography>
        </Box>
        </Box>
        <h1></h1>
        <p>{id}</p>
        
        
        <span className="card-name">{product.text}</span>
        
        <button className="button-primary"> В корзину</button>
        <div className="reviews">
            {product.reviews && product.reviews.length > 0 && product.reviews.map((el, i) => <Review {...el} key={i}/>)}
        </div>
      
    </>
}