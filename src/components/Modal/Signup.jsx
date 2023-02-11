import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from 'yup';
import{Button, TextField}  from '@mui/material';
import Ctx from "../../Ctx";

export default ({setAuth, closeModal}) => {
    const {api, setToken} = useContext(Ctx);

    const validationSchema = yup.object({
        email: yup.string('Введите e-mail').email('Invalid email address').required('Required'),
        password: yup.string('Введите пароль').min(3, 'Password should be of minimum 3 characters length').required('Password is required'),
        confirmPassword: yup.string()
        .min(3)
        .when("password", {
          is: (val: any) => (val && val.length > 0 ? true : false),
          then: yup.string().oneOf(
            [yup.ref("password")],
            "Both password need to be the same"
          ),
        })
        .required("Confirm Password Required"),
        // проверка пароля, пример из интернета
    })

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
          confirmPassword: '',
        },
        validationSchema: validationSchema,
        onSubmit: values => {
            delete values.confirmPassword;
            api.signUp(values)
            .then(res => res.json())
            .then(data =>{
                if(!data.err) {
                    api.signIn(values)
                        .then(res => res.json())
                        .then(data => {
                                localStorage.setItem("user", JSON.stringify(data.data));
                                localStorage.setItem("token", data.token);
                                setToken(data.token);
                        })
                    closeModal(false);
                } else {
                    alert(data.message);
                }
            })
        },
      });

    return <form onSubmit={formik.handleSubmit}>
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
            <TextField
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            value={formik.values.confirmPassword}
            onChange={formik.handleChange}
            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
            />
            <Button color="primary" variant="contained" fullWidth type="submit">
                Зарегестрироваться
            </Button>
            <Button color="primary" variant="contained" fullWidth type="button" onClick={()=>{setAuth(prev => !prev)}}>
                Войти
            </Button>
        </form>
}