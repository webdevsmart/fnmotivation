/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { scrollToTop } from '../../App';
import { FacebookProvider, Login } from 'react-facebook';
import { CircularProgress } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { NotificationsStore } from '../contexts/StoreEmailSettings';


const LoginUser = () => {

    const { register, handleSubmit, errors } = useForm();

    const [errorMessage, setErrorMessage] = useState([])
    const [error, setError] = useState(null)

    const [preloaderVisibale, setPreloaderVisibale] = useState(false)
    const [msg, setMsg] = useState(null)


    const responseGoogle = (res) => {
        setMsg(null)
        if (res.profileObj) {
            setPreloaderVisibale(true)
            fetch(`http://localhost:5000/googleLogin?id=` + res.profileObj.googleId)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                        setMsg(data.error)
                        setPreloaderVisibale(false)
                    }
                    else if (data.userID) {
                        localStorage.setItem('username', JSON.stringify(data.username))
                        localStorage.setItem('userID', JSON.stringify(data.userID))
                        localStorage.setItem('avatar', JSON.stringify(data.avatar))
                        localStorage.setItem('fc', true)
                        localStorage.setItem('token', data.token)
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now
                            window.location = '/'
                        }
                        setPreloaderVisibale(false)
                    }
                })
        }
    }
    const faceBookLogin = (res) => {
        setMsg(null)
        if (res.profile) {
            setPreloaderVisibale(true)
            fetch(`http://localhost:5000/facebookLogin?id=` + res.profile.id)
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        console.log(data.error)
                        setMsg(data.error)
                        setPreloaderVisibale(false)
                    }
                    else if (data.userID) {
                        localStorage.setItem('username', JSON.stringify(data.username))
                        localStorage.setItem('userID', JSON.stringify(data.userID))
                        localStorage.setItem('avatar', JSON.stringify(data.avatar))
                        localStorage.setItem('fc', true)
                        localStorage.setItem('token', data.token)
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now
                            window.location = '/'
                        }
                        setPreloaderVisibale(false)
                    }
                })
        }
    }
    //Store in local

    const newLogin = localStorage.getItem('new')

    const onSubmit = (data) => {
        setMsg(null)
        setErrorMessage([])
        setPreloaderVisibale(true)
        fetch('http://localhost:5000/loginUser?email=' + data.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                authorization: data.password
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setErrorMessage(data.error)
                    setPreloaderVisibale(false)
                } else {
                    localStorage.setItem('username', JSON.stringify(data.info.username))
                    localStorage.setItem('userID', JSON.stringify(data.info.user_id))
                    localStorage.setItem('avatar', JSON.stringify(data.info.avatar))
                    localStorage.setItem('token', data.token)
                    localStorage.setItem('fc', true)
                    if (newLogin) { NotificationsStore() }
                    scrollToTop()
                    localStorage.removeItem('new')
                    if (typeof window !== 'undefined') {
                        // it's safe to use window now
                        window.location = '/'
                    }
                    setPreloaderVisibale(false)
                }
            })
    }
    return (
        <section className="login-sec">
            <div className="container-fluid">
                <div className="row">

                    {/* Login */}

                    <div className="col-12">
                        <div className="login-inner">
                            <h3>Login</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {msg &&
                                    <div className="alert alert-danger m-3 text-center" role="alert">
                                        {msg}
                                    </div>}
                                {errorMessage.length !== 0 &&
                                    <div className="alert alert-primary m-3 text-center" role="alert">
                                        {errorMessage}
                                    </div>}

                                <div className="form-group mb-5">
                                    <label>Email</label>
                                    <input type="text" name="email" className="form-control" placeholder="Email" ref={register({ required: true })} />
                                    {errors.email && <span>This field is required</span>}
                                </div>
                                <div className="form-group ">
                                    <label>Password</label>
                                    <input type="password" name="password" className="form-control" placeholder="Password" ref={register({ required: true })} />
                                    {errors.password && <span>This field is required</span>}
                                    {error && <span className="arror-sms">Wrong email or password. Please enter correct login info</span>}
                                </div>
                                <div className="form-group mb-5">
                                    <label className="check ">Remember Me
                                            <input type="checkbox" name="is_name" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div>

                                {preloaderVisibale ?
                                    <div className="alert alert-primary m-3 text-center" role="alert">
                                        <CircularProgress className="mt-2" /><br></br>...Login in Progress...
                                        </div>
                                    :
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-default" value="Login" />
                                    </div>}
                                <div className="form-group">
                                    <Link to="verifyEmail" onClick={scrollToTop}><p>Reset Password</p></Link>
                                    <div className="or">
                                        <span>OR</span>
                                    </div>
                                    <div className="social-btn">
                                        <ul>
                                            <GoogleLogin
                                                clientId="853847782605-2btunrrc2n7rkuk9ourbrg3nb2dvp4p5.apps.googleusercontent.com"
                                                render={renderProps => (
                                                    <li onClick={renderProps.onClick} disabled={renderProps.disabled}><a>Login with Google</a></li>
                                                )}
                                                buttonText="Login"
                                                onSuccess={responseGoogle}
                                                cookiePolicy={'single_host_origin'}
                                            />


                                            <FacebookProvider appId="182933076457767">
                                                <Login
                                                    scope="email"
                                                    onCompleted={faceBookLogin}
                                                >
                                                    {({ handleClick, error }) => (
                                                        <li onClick={handleClick} ><a className="facebook-btn">Login with Facebook</a></li>
                                                    )}
                                                </Login>
                                            </FacebookProvider>

                                        </ul>
                                    </div>
                                    <p className="register-ac">Don't have an account? <a href="/register">Register</a></p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginUser;