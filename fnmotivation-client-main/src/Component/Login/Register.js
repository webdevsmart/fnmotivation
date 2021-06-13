/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React, {  useState, useEffect } from 'react';
import google from '../../images/google-icon.svg';
import facebook from '../../images/facebook-icon2.svg';
import { useForm } from 'react-hook-form';
import { Link, useLocation } from 'react-router-dom';
import ReCAPTCHA from "react-google-recaptcha";
import 'react-toastify/dist/ReactToastify.css';
import { FacebookProvider, Login } from 'react-facebook';
import { CircularProgress } from '@material-ui/core';
import { GoogleLogin } from 'react-google-login';
import { scrollToTop } from '../../App';





const Register = () => {


    const [preloaderVisibale, setPreloaderVisibale] = useState(false)
    const [msg, setMsg] = useState(null)
    const [userName, setUserName] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/getAllUser')
            .then(res => res.json())
            .then(data => {
                setUserName(data)
            })
    }, [])

    const faceBookLogin = (res) => {
        setMsg(null)
        setPreloaderVisibale(true)
        if (res.profile) {
            fetch('http://localhost:5000/facebookSignUp', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(res.profile)
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setMsg(data.error)
                        setPreloaderVisibale(false)
                    }
                    else if (data.userID) {
                        localStorage.setItem('username', JSON.stringify(data.username))
                        localStorage.setItem('userID', JSON.stringify(data.userID))
                        localStorage.setItem('avatar', JSON.stringify('avatar.jpg'))
                        localStorage.setItem('fc', true)
                        localStorage.setItem('token', data.token)
                        localStorage.setItem('new', true)
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now

                            window.location = `/edit/user/${data.username}`
                        }
                        setPreloaderVisibale(false)
                    }
                })
        }
    }

    const facebookError = () => {
        setPreloaderVisibale(false)
        setMsg('An error occured. Try after some time.')
    }

    const responseGoogle = (res) => {
        setMsg(null)
        if (res.profileObj) {
            setPreloaderVisibale(true)
            fetch('http://localhost:5000/googleSignUp', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(res.profileObj)
            }).then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setMsg(data.error)
                        setPreloaderVisibale(false)
                    }
                    else if (data.userID) {
                        localStorage.setItem('username', JSON.stringify(data.username))
                        localStorage.setItem('userID', JSON.stringify(data.userID))
                        localStorage.setItem('avatar', JSON.stringify('avatar.jpg'))
                        localStorage.setItem('fc', true)
                        localStorage.setItem('token', data.token)
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now

                            window.location = `/edit/user/${data.username}`
                        }
                        setPreloaderVisibale(false)
                    }
                })
        }
    }


    const { register, handleSubmit, watch, errors } = useForm();
    const [error, setError] = useState({
        userError: false,
        password: false,
        login: false,
        userEmailError: false
    })

    const [res, setRes] = useState(null)
    var callback = function () {
    };
    var verifyCallback = function (response) {
        if (response) {
            setRes(response)
        }
    };


    const [login, setLogin] = useState([])
    let location = useLocation();

    const user = userName.map(user => user.username)
    const userEmail = userName.map(user => user.email)

    const [emptyUserName, setEmptyUserName] = useState(false)

    const handleBlur = (e) => {
        if (e.target.name === 'username') {

            let empty = /^$|\s+/.test(e.target.value)
            if (empty) {
                setEmptyUserName(true)
            } else if (!empty) {
                setEmptyUserName(false)
            }

            const userTest = user.find(user => user === e.target.value.toLowerCase())
            if (userTest === e.target.value.toLowerCase()) {
                setError({ userError: true })
            } else if (userTest !== e.target.value.toLowerCase()) {
                setError({ userError: false })
            }
        }
        if (e.target.name === 'email') {
            const userEmailTest = userEmail.find(user => user === e.target.value.toLowerCase())
            if (userEmailTest === e.target.value.toLowerCase()) {
                setError({ userEmailError: true })
            } else if (userEmailTest !== e.target.value.toLowerCase()) {
                setError({ userEmailError: false })
            }
        }
    }

    const [checked, setChecked] = useState(false)
    const handleCheck = (e) => {
        if (e.target.checked) {
            setChecked(true)
        } else if (!e.target.checked) {
            setChecked(false)
        }
    }
    const [validation, setValidation] = useState({
        email: true,
        userNameEmpty: false
    })


    const onSubmit = (data) => {
        setError({ isVerified: true })
        setMsg(null)

        if (data.email) {
            validation.email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)
        }
        if (data.username) {
            validation.userNameEmpty = /^$|\s+/.test(data.username)
        }

        if (validation.email && !errors.userError && !error.userEmailError && !emptyUserName && res) {

            console.log(data)
            setPreloaderVisibale(true)
            //Register USER
            fetch('http://localhost:5000/registerUser', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userName: data.username.toLowerCase(),
                    fullname: data.fullname,
                    email: data.email.toLowerCase(),
                    gender: data.gender,
                    birthdate: data.birthdate,
                    password: data.password,
                })
            })
                .then(res => res.json())
                .then(result => {
                    if (result.error) {
                        setMsg(result.error)
                    }
                    setPreloaderVisibale(false)
                    if (result.affectedRows > 0) {
                        setPreloaderVisibale(false)
                        setLogin({ loggedIn: true })
                        setPreloaderVisibale(false)
                        localStorage.setItem('new', true)
                        scrollToTop()
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now

                            window.location = "/login"
                        }
                    }
                })

        }
    }

    return (
        <div>
            <section className="login-sec register-sec">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="login-inner">
                                <div className="login-title">
                                    <h3>Sign Up</h3>
                                    <p>Please Sign Up with one of your existing third party accounts </p>
                                    {preloaderVisibale &&
                                        <div className="alert alert-primary m-3 text-center" role="alert">
                                            <CircularProgress className="mt-2" /><br></br>...Registering...
                                        </div>}
                                    {msg &&
                                        <div className="alert alert-danger m-3 text-center" role="alert">
                                            {msg}
                                        </div>}
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className="form-group">
                                        <div className="social-media">
                                            <ul>

                                                <GoogleLogin
                                                    clientId="853847782605-2btunrrc2n7rkuk9ourbrg3nb2dvp4p5.apps.googleusercontent.com"
                                                    render={renderProps => (
                                                        <li onClick={renderProps.onClick} disabled={renderProps.disabled}><a><img src={google} alt="google" /></a></li>
                                                    )}
                                                    buttonText="Login"
                                                    onSuccess={responseGoogle}
                                                    onFailure={responseGoogle}
                                                    cookiePolicy={'single_host_origin'}
                                                />


                                                <FacebookProvider appId="182933076457767">
                                                    <Login
                                                        scope="email"
                                                        onCompleted={faceBookLogin}
                                                        onError={facebookError}
                                                    >
                                                        {({ handleClick, error }) => (
                                                            <span onClick={handleClick}>
                                                                <li onClick={faceBookLogin}><a className="facebook-icon"><img src={facebook} alt="facebook" /></a></li>
                                                            </span>
                                                        )}
                                                    </Login>
                                                </FacebookProvider>

                                                {/* <li><a className="twitter-icon" ><img src={twitter} alt="twitter" /></a></li> */}
                                            </ul>
                                        </div>
                                        <div className="or">
                                            <span>OR</span>
                                        </div>
                                        <h4>Sign Up by providing information below:</h4>
                                        <p>{error.login}</p>
                                    </div>
                                    <div className="form-group">
                                        <label>Username</label>
                                        <input type="text" name="username" className="form-control" placeholder="Username" ref={register({ required: true })} onBlur={handleBlur} />
                                        {emptyUserName && <p className="password-must">*Username cannot contain spaces.</p>}
                                        {error.userError && <p className="password-must">*Username Exist. Try New One</p>}
                                        {/* {emptyUserName === false && <p className="password-must">*Username may contain only letters, numbers, and @/./+/-/_ characters. Username cannot contain spaces.</p>} */}
                                    </div>
                                    <div className="form-group ">
                                        <label>Fullname</label>
                                        <input type="text" name="fullname" className="form-control" placeholder="Full Name" ref={register({ required: true })} />
                                        {errors.fullname && <p className="password-must">*This field is required</p>}
                                    </div>
                                    <div className="form-group ">
                                        <label>Email</label>
                                        <input type="text" name="email" className="form-control" placeholder="" onBlur={handleBlur} ref={register({ required: true })} />
                                        {errors.email && <p className="password-must">*This field is required</p>}
                                        {error.userEmailError && <p className="password-must">*Email already exist</p>}
                                        {validation.email === false && <p className="password-must">*Please give a valid Email</p>}
                                    </div>

                                    <div className="form-group ">
                                        <label>Gender</label>
                                        <div className="select-gender">
                                            <ul>
                                                <li>
                                                    <label className="radio">Male
                                                        <input type="radio" name="gender" value="male" onChange={handleBlur} ref={register} />
                                                        <span className="checkround"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="radio">Female
                                                        <input type="radio" name="gender" value="female" onChange={handleBlur} ref={register} />
                                                        <span className="checkround"></span>
                                                    </label>
                                                </li>
                                                <li>
                                                    <label className="radio">Non-Binary
                                                        <input type="radio" name="gender" value="binary" onChange={handleBlur} ref={register} />
                                                        <span className="checkround"></span>
                                                    </label>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="form-group ">
                                        <label>Date of Birth</label>
                                        <input type="text" name="birthdate" className="form-control" placeholder="mm/dd/yyyy" ref={register({ required: true })} />
                                        {errors.birthdate && <p className="password-must">*This field is required</p>}
                                    </div>
                                    <div className="form-group ">
                                        <label>Password</label>
                                        <input type="password" name="password" className="form-control" placeholder="" ref={register({ validate: (value) => /^.{6,}$/.test(value)})} />
                                        {/* {errors.password?.type === "required" && <p className="password-must">*This field is required</p>}<br></br> */}
                                        {errors.password && <p className="password-must">*Minimum 6 characters</p>}
                                    </div>
                                    <div className="form-group ">
                                        <label>Confirm Password</label>
                                        <input type="password" name="confirmpassword" className="form-control" placeholder="" ref={register({ validate: (value) => value === watch('password') })} />
                                        {errors.confirmpassword && <p className="password-must">*Passwords don't match</p>}
                                    </div>
                                    <div className="form-group mb-5">
                                        <label className="check ">I have read and agree to the <Link target="_blank" rel="noopener noreferrer" to="/terms-and-conditions">Terms</Link> and <Link target="_blank" rel="noopener noreferrer" to="/privacy-policy">Privacy Policy</Link>

                                            <input type="checkbox" name="check" ref={register({ required: true })} />
                                            <span className="checkmark"></span>
                                        </label>


                                        <div className="d-flex justify-content-center">
                                            <ReCAPTCHA
                                                sitekey="6LdH5mMaAAAAALlyeFqMa7Qz0JdRyU6HTs8zNlWl"
                                                onChange={verifyCallback}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-center">
                                            {!res && <span className="text-center mt-2" style={{ color: 'red' }}>*Verify you are human</span>}
                                        </div>
                                    </div>

                                    {errors.check && <p className="password-must">*Need to Agree the Terms and Privacy Policy</p>}

                                    {preloaderVisibale ?
                                        <div className="alert alert-primary m-3 text-center" role="alert">
                                            <CircularProgress className="mt-2" /><br></br>...Registering...
                                        </div>
                                        :
                                        <>
                                            {res ?
                                                <div className="form-group">
                                                    < input type="submit" className="btn btn-default" value="Sign Up" />
                                                </div> :
                                                <div className="form-group">
                                                    < input type="submit" disabled className="btn btn-default" value="Sign Up" />
                                                </div>}
                                        </>}

                                    {msg &&
                                        <div className="alert alert-danger m-3 text-center" role="alert">
                                            {msg}
                                        </div>}


                                    <div className="form-group">
                                        <p className="register-ac">Already have an account?<a href="/login">Login</a></p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div >
    );
};

export default Register;