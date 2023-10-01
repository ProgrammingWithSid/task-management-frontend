import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputText, FullPageLoader, Button } from "../../component";
import "./SignUp.css";
import { generateApiUrl } from "../../api/apihelper";
import { signupUserAct } from "../../store/Signup/Signupthunk";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const initialValues = {
    name: "",
    email: "",
    password: "",
    re_password: "",
};

const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required."),
    email: Yup.string().required("Email is required.").email("Invalid email format."),
    password: Yup.string().required("Password is required."),
    re_password: Yup.string()
        .required("Confirm password is required.")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
});

export default function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { apiCallLoading, signupResp, loggedInUserResp, authErrorResp } = useSelector(
        (state) => ({
            apiCallLoading: state.globalData.apiCallLoading,
            signupResp: state.auth.signupResp,
            loggedInUserResp: state.auth.signupUserResp,
            authErrorResp: state.auth.signupErrorResp,
        }),
        shallowEqual
    );

    const signupRespRef = useRef({
        prevSignupResp: signupResp,
        prevLoggedInUserResp: loggedInUserResp,
        prevAuthErrorResp: authErrorResp,
    });

    const signupForm = useFormik({
        enableReinitialize: false,
        initialValues: initialValues,
        validationSchema,
        onSubmit: (values) => {
            console.log(initialValues)
            dispatch(signupUserAct(generateApiUrl("signup"), values));
            console.log(authErrorResp);
            
        },
    });

    return (
        <>
            {apiCallLoading && <FullPageLoader />}

            <div className="signup-container">
                <ToastContainer
                    autoClose={2000}
                    position="top-right"
                    icon={true}
                />
                <div className="right-panel">
                    <div className="signup-form" style={{ width: '100%' }}>
                        <h1 className="signup-title">Create an Account</h1>
                        <form onSubmit={signupForm.handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="name" className="text-gray-dark fw-bold">
                                    Name
                                </label>
                                <InputText
                                    placeholder="Name"
                                    name="name"
                                    id="name"
                                    value={signupForm.values.name}
                                    onBlur={signupForm.handleBlur}
                                    onChange={signupForm.handleChange}
                                    invalid={signupForm.touched.name && signupForm.errors.name ? true : false}
                                    error={signupForm.touched.name && signupForm.errors.name ? signupForm.errors.name : ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email" className="text-gray-dark fw-bold">
                                    Email
                                </label>
                                <InputText
                                    placeholder="Email"
                                    name="email"
                                    id="email"
                                    value={signupForm.values.email}
                                    onBlur={signupForm.handleBlur}
                                    onChange={signupForm.handleChange}
                                    invalid={signupForm.touched.email && signupForm.errors.email ? true : false}
                                    error={signupForm.touched.email && signupForm.errors.email ? signupForm.errors.email : ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password" className="text-gray-dark fw-bold">
                                    Password
                                </label>
                                <InputText
                                    placeholder="Password"
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={signupForm.values.password}
                                    onBlur={signupForm.handleBlur}
                                    onChange={signupForm.handleChange}
                                    invalid={signupForm.touched.password && signupForm.errors.password ? true : false}
                                    error={signupForm.touched.password && signupForm.errors.password ? signupForm.errors.password : ""}
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="re_password" className="text-gray-dark fw-bold">
                                    Confirm Password
                                </label>
                                <InputText
                                    placeholder="Confirm Password"
                                    type="password"
                                    name="re_password"
                                    id="re_password"
                                    value={signupForm.values.re_password}
                                    onBlur={signupForm.handleBlur}
                                    onChange={signupForm.handleChange}
                                    invalid={signupForm.touched.re_password && signupForm.errors.re_password ? true : false}
                                    error={signupForm.touched.re_password && signupForm.errors.re_password ? signupForm.errors.re_password : ""}
                                />
                            </div>
                            <Button type="submit" className="btn-primary w-100" btnText="Signup" />
                            <div style={{ margin: '4%' }}>
                                <p>Have an existing account? <a href="#" onClick={() => navigate('/')}>Login</a></p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
