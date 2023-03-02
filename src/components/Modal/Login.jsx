import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import { red } from "@mui/material/colors";

import Ctx from "../../Ctx";
import { Button, TextField, Typography } from '@mui/material';

export default ({ setAuth, closeModal }) => {
    const { api, setToken } = useContext(Ctx);
    const [errorMessage, setErrorMessage] = useState('');

    const validationSchema = yup.object({
        email: yup.string('Введите почту').email('Неверный формат почты').required('Обязательно'),
		password: yup.string('Введите пароль').min(3, 'Длина пароля минимум 3 символа').required('Обязательно')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            api.signIn(values)
                .then(res => res.json())
                .then(data => {
                    if (!data.err) {
                        localStorage.setItem("user", JSON.stringify(data.data));
                        localStorage.setItem("token", data.token);
                        setToken(data.token);
                        closeModal(false);
                    } else {
                        setErrorMessage(`${data.message} 😑`);
                    }
                })
        },
    });

    return <>
        <form onSubmit={formik.handleSubmit}>
        {errorMessage && <Typography variant="body1" color={red[400]}>{errorMessage}</Typography>}
            <TextField
                fullWidth
                id="email"
                name="email"
                label="Почта"
                value={formik.values.email}
                onChange={formik.handleChange}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
                fullWidth
                id="password"
                name="password"
                label="Пароль"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                error={formik.touched.password && Boolean(formik.errors.password)}
                helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
                Войти
            </Button>
            <Button color="primary" variant="contained" fullWidth type="button" onClick={() => { setAuth(prev => !prev) }}>
                Зарегистрироваться
            </Button>
        </form>
    </>
}