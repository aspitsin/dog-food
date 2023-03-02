import React, { useContext } from "react";
import Ctx from "../../Ctx";
import { Box, Paper, Typography, Rating, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

export default ({ author, rating, text, created_at, setProduct, id, _id }) => {
    const { api, users, user } = useContext(Ctx);

    const setName = (us, au) => {
        let nameAuthor = "";
        for (let i = 0; i < us.length; i++) {
            if (us[i]._id === au
            ) {
                nameAuthor = us[i].name
            } else { }
        }
        return nameAuthor;
    }

    const remove = (e) => {
        api.delReview(id, _id)
            .then(res => res.json())
            .then(data => {
                if (!data.error) {
                    setProduct(data);
                }
            })
    }

    return <>
        <Paper elevation={1} sx={{ p: 2, my: 2 }}>
            <Typography variant="h6" fontWeight="bold">{setName(users, author)}</Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
                <Rating name="read-only" value={rating} readOnly />
                <Typography variant="subtitle1">{new Date(created_at).toLocaleString()}</Typography>
            </Box>
            <Typography variant="h6" sx={{ pt: 1 }}>{text}</Typography>
            {author && author === user._id &&
                <IconButton onClick={remove}>
                    <DeleteOutlineOutlinedIcon />
                </IconButton>}
        </Paper>
    </>
}