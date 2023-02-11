import React, { useState } from "react";
import "./card.css";
import Ctx from "../../Ctx";
import { useContext, useEffect } from "react";
import { Box, Card, CardMedia, CardContent, CardActions, Typography, Button } from "@mui/material";
import { height } from "@mui/system";


export default ({text, price, discount, pictures, wight, likes, _id}) => {
    const {user, setFavorites, api, setGoods, setBasket, setSearchData} = useContext(Ctx);
    const [like, setLike] = useState(likes && likes.includes(user._id));
    const [flag, setFlag] = useState(false);
    
    const update = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setFlag(true);
        setLike(!like); // false => true
        api.setLike(_id, like) // false
            .then(res => res.json())
            .then(data => {
                setFavorites(prev => {
                    let arr = prev.filter(el => el._id === _id);
                    console.log(arr)
                    return arr.length > 0 ? 
                        prev.filter(el => el._id !== _id) : 
                        [...prev, data]
                })
                setGoods(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
                setSearchData(prev => prev.map(el => {
                    if (el._id === data._id) {
                        return data;
                    } else {
                        return el;
                    }
                }));
            })
    }

    const addInBasket = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setBasket(prev => {
            const test = prev.filter(el => el.id === _id)
            console.log(test)
            if (test.length){
                return prev.map(el => {
                    if (el.id === _id){
                        el.cnt++;
                    }
                    return el;
                })
            } else {
                return [...prev, {id: _id, cnt: 1} ]
            }
        })
    }

    return <>
        <Card sx={{ minHeight:'445px', display: 'flex', position: 'relative', flexDirection: 'column', justifyContent: 'space-between', borderRadius: '20px',}} >
            {
                discount > 0 && 
                <Button size="small" component="span"  variant="contained" color="warning" sx={{borderRadius: '20px', position: 'absolute', top: 6, left: 6}}>-{discount}%</Button>
            }
            <CardMedia  component="img"
                image={pictures}
                title={text}>
            </CardMedia>
            <CardContent >
                <Typography variant="h6" sx={{fontWeight: '900'}}>{price} ₽</Typography>
                <Typography variant="body2">{wight}</Typography>
                <Typography variant="body1">{text}</Typography>

            </CardContent>
            <CardActions  sx={{justifyContent: 'space-between'}}>
                <Button size="small" variant="contained" sx={{borderRadius: '20px'}} onClick={addInBasket}>В корзину</Button>
                <Button onClick={update}>
                    {
                        like
                        ? <i className="fa-solid fa-heart"></i>
                        : <i className="fa-regular fa-heart"></i>
                    }
                </Button>
            </CardActions>
        </Card>
    </>
    
}