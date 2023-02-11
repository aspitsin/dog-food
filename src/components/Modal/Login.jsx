import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';

import Ctx from "../../Ctx";
import{Button, TextField}  from '@mui/material';

export default ({setAuth, closeModal}) => {
    const {api, setToken} = useContext(Ctx);

    const validationSchema = yup.object({
        email: yup.string('Введите e-mail').email('Invalid email address').required('Required'),
        password: yup.string('Введите пароль').min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
    })

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            console.log(values)
            api.signIn(values)
            .then(res => res.json())
            .then(data => {
                // Не забыть отловить сообщение с ошибкой
           
                localStorage.setItem("user", JSON.stringify(data.data));
                localStorage.setItem("token", data.token);
                setToken(data.token);
                closeModal(false);
            })
            .catch(error => alert(error.message));
        },
      });

    return <>
        <form onSubmit={formik.handleSubmit}>
            <TextField
            fullWidth
            id="email"
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
            fullWidth
            id="password"
            name="password"
            label="Password"
            type="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
            Войти
            </Button>
            <Button color="primary" variant="contained" fullWidth type="button" onClick={()=>{setAuth(prev => !prev)}}>
                Зарегестрироваться
            </Button>
        </form>
    </>
}