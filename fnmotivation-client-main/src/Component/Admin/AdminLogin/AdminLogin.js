import React, { useState } from 'react';
import { CircularProgress } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { scrollToTop } from '../../../App';

const AdminLogin = () => {
    const { register, handleSubmit, errors } = useForm();

    const [preloaderVisibale, setPreloaderVisibale] = useState(false)
    const [error, setError] = useState(null)

    const onSubmit = (data) => {
        setError(false)
        setPreloaderVisibale(true)
        fetch('http://68.183.178.196/adminLogin?email=' + data.email, {
            method: 'GET',
            headers: {
                'Content-Type': 'Application/json',
                authorization: data.password
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.error) {
                    setError(true)
                    setPreloaderVisibale(false)
                } else {
                    localStorage.setItem('admiNToken', data.token)
                    scrollToTop()
                    if (typeof window !== 'undefined') {
                        // it's safe to use window now
                        window.location = '/admin'
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
                            <h3>Admin Login</h3>
                            <form onSubmit={handleSubmit(onSubmit)}>
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

                                {preloaderVisibale ?
                                    <div className="alert alert-primary m-3 text-center" role="alert">
                                        <CircularProgress className="mt-2" /><br></br>...Login in Progress...
                                        </div>
                                    :
                                    <div className="form-group">
                                        <input type="submit" className="btn btn-default" value="Login" />
                                    </div>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AdminLogin;