import React, { useState } from 'react';
import { useForm } from 'react-hook-form';


const UserVerify = () => {
    const { register, handleSubmit, errors } = useForm();
    const [preloaderVisibale, setPreloaderVisible] = useState(false)

    const [errorMessage, setErrorMessage] = useState([])


    const onSubmit = (data, e) => {
        setPreloaderVisible(true)
        fetch('http://68.183.178.196/verifyIdentity?code=' + data.code)
            .then(res => res.json())
            .then(data => {
                setPreloaderVisible(false)
                if (data.error) {
                    setErrorMessage(data.error)
                }
                else if(data.affectedRows > 0) {
                    
                    setErrorMessage([])
                    if (typeof window !== 'undefined') {
                        // it's safe to use window now
                        window.location = "/login"
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
                                <h3>Give your secret Token</h3>
                            </div>

                            {errorMessage.length !== 0 &&
                                <div className="alert alert-warning m-3 text-center" role="alert">
                                    {errorMessage}
                                </div>}

                            {preloaderVisibale &&
                                <div className="alert alert-primary m-3 text-center" role="alert">
                                    Matching Code
                    </div>}



                            {/* Reset Form */}

                            <form onSubmit={handleSubmit(onSubmit)}>
                                <div className="form-group mt-5">

                                    <div className="form-group ">
                                        <input name="code" type="text" className="form-control" placeholder=""
                                            ref={register({
                                                required: true
                                            })} />
                                        {errors.code && <span>Code is required</span>}
                                    </div>

                                    <div className="form-group">
                                        <input type="submit" className="btn btn-default" value="Verify Code" />
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

export default UserVerify;