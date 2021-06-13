import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const VerifyEmail = () => {

    const { register, handleSubmit, errors } = useForm();
    const [preloaderVisibale, setPreloaderVisible] = useState(false)

    const [errorMessage, setErrorMessage] = useState([])
    const [noEmail, setNoEmail] = useState(null)
    const [emailError, setEmailError] = useState(false)
    const [resetEmail, setResetEmail] = useState(false)
    const [formSwitch, setFormSwitch] = useState(false)

    let validationEmail;

    const onSubmit = (data, e) => {
        setNoEmail(null)

        if (data.email) {
            validationEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)
            if (!validationEmail) {
                setEmailError(true)
            } else if (validationEmail) {
                setEmailError(false)
            }
        }
        if (validationEmail) {
            setPreloaderVisible(true)
            const newEmail = data.email.toLowerCase()
            fetch('http://68.183.178.196/getEmailforPass?email=' + newEmail)
                .then(res => res.json())
                .then(data => {
                    setPreloaderVisible(false)
                    if (data.error) {
                        setResetEmail(false)
                        setNoEmail(data.error)
                    }
                    else {
                        setResetEmail(true)
                        setNoEmail(null)
                        setFormSwitch(true)
                        localStorage.setItem('userID', JSON.stringify(data.userID))
                    }
                })
        }
    }

    const verifyCode = (data, e) => {
        setResetEmail(false)
        fetch('http://68.183.178.196/verifyCode', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ code: data.code, userID: localStorage.getItem('userID') })
        })
            .then(res => res.json())
            .then(data => {
                
                if (data.error) {
                    setErrorMessage(data.error)
                }
                else {
                    setErrorMessage([])
                        localStorage.setItem('lcs', JSON.stringify(data.token))
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now
                            
                            window.location = '/resetPassword'
                            
                          }
                }
            })
    }



    return (
        <section className="login-sec register-sec contact-us">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="login-inner">
                            <div className="login-title mb-5">
                                <h3>Verify Email</h3>
                            </div>

                            {resetEmail &&
                                <div className="alert alert-warning m-3 text-center" role="alert">
                                    We have sent you a varification code in your email.
                        </div>}

                            {noEmail &&
                                <div className="alert alert-warning m-3 text-center" role="alert">
                                    {noEmail}
                                </div>}

                            {errorMessage.length !== 0 &&
                                <div className="alert alert-warning m-3 text-center" role="alert">
                                    {errorMessage}
                                </div>}

                            {preloaderVisibale &&
                                <div className="alert alert-primary m-3 text-center" role="alert">
                                    Searching Email
                        </div>}

                            {/* Email Form */}

                            {!formSwitch &&

                                <form onSubmit={handleSubmit(onSubmit)}>

                                    <div className="form-group mt-5">


                                        <div className="form-group ">
                                            <label>Email</label>
                                            <input name="email" type="text" className="form-control" placeholder=""
                                                ref={register({
                                                    required: true
                                                })} />
                                            {errors.email && <span>This field is required</span>}
                                            {emailError && <span>Please type correct Email</span>}
                                        </div>

                                        <div className="form-group">
                                            <input type="submit" className="btn btn-default" value="Send" />
                                        </div>

                                    </div>

                                </form>}

                            {/* Reset Form */}

                            {formSwitch &&
                                <form onSubmit={handleSubmit(verifyCode)}>
                                    <div className="form-group mt-5">

                                        <div className="form-group ">
                                            <input name="code" type="number" className="form-control" placeholder=""
                                                ref={register({
                                                    required: true
                                                })} />
                                            {errors.code && <span>Code is required</span>}
                                        </div>

                                        <div className="form-group">
                                            <input type="submit" className="btn btn-default" value="Verify Code" />
                                        </div>

                                    </div>
                                </form>}



                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default VerifyEmail;