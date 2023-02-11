import React from "react";
import { Box, Paper, Typography, Rating } from "@mui/material";

// import { Star, StarFill } from "react-bootstrap-icons"

export default ({author, rating, text, created_at}) => {
    const setRating = (n) => {
        let stars = [];
        for (let i = 0; i < n; i++) {
            // stars.push(<StarFill key={i}/>);
            
        }
        for (let i = stars.length; i < 5; i++) {
            // stars.push(<Star key={i}/>);
        }
        return stars;
    }
    return <>
        <Paper elevation={1} sx={{p:2, my: 2 }}>
            <Typography variant="h6" fontWeight="bold">{author || ""}</Typography>
            <Box sx={{display: 'flex', gap: 2}}>
                <Rating name="read-only" value={rating} readOnly />
                <Typography variant="subtitle1">{new Date(created_at).toLocaleString()}</Typography>
            </Box>
            <Typography variant="h6" sx={{pt: 1}}>{text}</Typography>
        </Paper>
        <div>{setRating(rating)}</div>
 
    </>
}