/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const ResetPassword = () => {

    const { register, handleSubmit, watch, errors } = useForm();
    const [preloaderVisibale, setPreloaderVisible] = useState(false)

    const [errorMessage, setErrorMessage] = ('')



    const [validation, setValidation] = useState({
        password: true,
    })

    const resetPass = (data, e) => {

        if (data.password) {
            validation.password = /^.{6,}$/.test(data.password)
        }

        if(validation.password){
            fetch('http://localhost:5000/changePassword', {
                method: 'POST',
                headers: { 
                    'content-type': 'application/json',
                    authorization: JSON.parse(localStorage.getItem('lcs'))
                 },
                body: JSON.stringify({ password: data.password, userID: localStorage.getItem('userID') })
            })
                .then(res => res.json())
                .then(data => {
                    
                    if(data.error){
                        setErrorMessage(data.error)
                    }
                    if (data.affectedRows > 0) {
                        localStorage.removeItem('userID')
                        localStorage.removeItem('username')
                        localStorage.removeItem('token')
                        localStorage.removeItem('lcs')
                        if (typeof window !== 'undefined') {
                            // it's safe to use window now
                            
                            window.location = "/login"
                          }
                    }
    
                })
        }
    }

    return (
        <section className="login-sec register-sec contact-us">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="login-inner">
                            <div className="login-title mb-5">
                                <h3>Reset Password</h3>
                            </div>

                            {errorMessage &&
                                <div className="alert alert-warning m-3 text-center" role="alert">
                                    {errorMessage}
                                </div>}

                            {!validation.password &&
                                <div className="alert alert-warning m-3 text-center" role="alert">
                                    Password must be 6 characters long
                                </div>}

                            {preloaderVisibale &&
                                <div className="alert alert-primary m-3 text-center" role="alert">
                                    Searching Email
                            </div>}

                            {/* Password Form */}

                            <form onSubmit={handleSubmit(resetPass)}>
                                <div className="form-group mt-5">

                                    <div className="form-group ">
                                        <input name="password" type="password" className="form-control" placeholder="Password"
                                            ref={register({
                                                required: true
                                            })} />

                                        {errors.password && <span>Password is required</span>}
                                        
                                    </div>
                                    <div className="form-group ">
                                        <input name="confirmPassword" type="password" className="form-control" placeholder="Confirm Password" ref={register({ validate: (value) => value === watch('password') })} />
                                        {errors.confirmPassword && <span>Password not matched</span>}
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" className="btn btn-default" value="Set Password" />
                                    </div>

                                </div>
                            </form>




                        </div>
                    </div>
                </div>
            </div>
        </section >
    );
};

export default ResetPassword;