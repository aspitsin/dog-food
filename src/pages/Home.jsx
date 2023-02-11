import React from "react";
import "../style.css";
import PromoBox from "../components/Promo/promoBox";
import Banner from "../components/Banner/banner";

import { Container } from '@mui/material'

export default () => {
    return <>
        <Banner/>
        <Container maxWidth="lg">
            <PromoBox promoText={"Крафтовые лакомства"} size={"promo-big"} />
            <PromoBox promoText={"Крафтовые лакомства"} size={"promo-small"}/>
        </Container>
    </>
}