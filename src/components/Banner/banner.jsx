import React from 'react'
import { Link } from "react-router-dom";
import "./banner.css"
import { Box, Container, Grid, Button } from '@mui/material'

export default() => {
  return <Box sx={{bgcolor: "primary.main", mb: 2}}>
        <Container >
            <Grid container spacing={0} sx={{minHeight: '350px'}}>
                <Grid item xs={12} md={6} sx={{display:'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start'}}>
                    <h1>Крафтовые лакомства для собак</h1>
                    <p>Всегда свежие лакомства ручной работы с доставкой по России</p>
                    <Button  component={Link} to="/catalog" sx={{color: 'black', bgcolor: 'white', borderRadius: '20px', px: 3}}>Каталог</Button>
                </Grid>
                <Grid item xs="auto" md={6} className="left-side">
                </Grid>
            </Grid>
        </Container>
    </Box>
}
