import React from "react";
import {Box, Container, Typography } from "@mui/material";

export default () => {
    const year = new Date().getFullYear();

    return (
        <Box component="footer" sx={{bgcolor: 'primary.main', py: 2, mt: 'auto'}}>
            <Container>
                <Typography variant="h6" align="center" gutterBottom>
                    ©{year}
                </Typography>
                <Typography
                    variant="subtitle1"
                    align="center"
                    color="text.secondary"
                    component="p"
                >
                    Сайт разработан c использованием<br/>библиотеки React
                </Typography>
            </Container>
        </Box>
    )
}