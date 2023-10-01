import React, { useState, useMemo, useEffect, useRef } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { InputText, FullPageLoader, Button } from "../../component";
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import "./Login.css";

// Storage Constants
import { refreshTokenKey, accessTokenKey } from "../../constants/storageconstants";
import { setLocalStorage } from "../../utility/storageutility";
// Api Actions
import { generateApiUrl } from "../../api/apihelper";
import { loginUserAct, getLoggedInuserAct } from "../../store/auth/auththunk";
import { setLoginAct } from "../../store/auth/authslice";

const initialValues = {
    email: "",
    password: "",
  };
  
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required."),
    password: Yup.string().required("Password is required."),
  });
  
  export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch(),
      { apiCallLoading, loginResp, loggedInUserResp, authErrorResp } = useSelector(
        ({ globalData, auth }) => ({
          apiCallLoading: globalData.apiCallLoading,
          loginResp: auth.loginResp,
          loggedInUserResp: auth.loggedInUserResp,
          authErrorResp: auth.authErrorResp,
        }),
        shallowEqual
      );
  
    const loginRespRef = useRef({
      prevLoginResp: loginResp,
      prevLoggedInUserResp: loggedInUserResp,
      prevAuthErrorResp: authErrorResp,
    });
  
    useEffect(() => {
      const { prevLoginResp, prevLoggedInUserResp, prevAuthErrorResp } =
        loginRespRef.current;
      if (loginResp && loginResp !== prevLoginResp) {
        const { access, id, refresh } = loginResp;
        setLocalStorage(accessTokenKey, access);
        setLocalStorage(refreshTokenKey, refresh);
        // dispatch(getLoggedInuserAct(generateApiUrl("loggedin_user", { userId: id })));
        navigate("/listview");
  
        toast.success("Login successful!", {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else if (authErrorResp && authErrorResp !== prevAuthErrorResp) {
        const errorMessage = "Incorrect email or password. Please try again.";
  
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 2000,
        });
      } else if (loggedInUserResp && loggedInUserResp !== prevLoggedInUserResp) {
        dispatch(setLoginAct(undefined));
        navigate("/login");
      }
      loginRespRef.current.prevLoginResp = loginResp;
      loginRespRef.current.prevLoggedInUserResp = loggedInUserResp;
      loginRespRef.current.prevAuthErrorResp = authErrorResp;
    }, [loginResp, loggedInUserResp, authErrorResp]);
  
    const loginForm = useFormik({
      enableReinitialize: false,
      initialValues: initialValues,
      validationSchema,
      onSubmit: (values) => {
        dispatch(loginUserAct(generateApiUrl("login"), values));
        console.log(values);
      },
    });
  
    return (
        <div className="login-container d-flex justify-content-center align-items-center login-bg" >
            {apiCallLoading && <FullPageLoader />}
            <div className="right-panel">
                <div className="login-form" style={{width:'100%'}}>
                    <h1 className="login-title" style={{textAlign:'center'}}>Welcome To Tasky</h1>
                    <form onSubmit={loginForm.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="email" className="text-gray-dark fw-bold">
                                Login
                            </label>
                            <InputText
                                placeholder="Login"
                                name="email"
                                id="email"
                                value={loginForm.values.email}
                                onBlur={loginForm.handleBlur}
                                onChange={loginForm.handleChange}
                                invalid={
                                    loginForm.touched.email && loginForm.errors.email ? true : false
                                }
                                error={
                                    loginForm.touched.email && loginForm.errors.email ? loginForm.errors.email : ""
                                }
                                className="rounded"
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
                                value={loginForm.values.password}
                                onBlur={loginForm.handleBlur}
                                onChange={loginForm.handleChange}
                                invalid={
                                    loginForm.touched.password && loginForm.errors.password ? true : false
                                }
                                error={
                                    loginForm.touched.password && loginForm.errors.password ? loginForm.errors.password : ""
                                }
                                className="rounded"
                            />
                        </div>
                        <Button
                            type="submit"
                            className="btn-primary w-100 rounded"
                            btnText="Login"
                        />
                    </form>
                </div>
                <div style={{ margin: '4%' }}>
                    <p>Create a New Account ? <a href="#" onClick={() => navigate('/signup')}>Sign Up</a></p>
                </div>
            </div>

            <ToastContainer />
        </div>
    );
}