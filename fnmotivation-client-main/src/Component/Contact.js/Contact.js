import { CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { useForm } from 'react-hook-form';
import OgData from '../OgData';

const Contact = () => {

    // ReCaptcha

    const [error, setError] = useState({
        isVerified: false,
        email: false,
    })
    const [successMsg, setSuccessMsg] = useState([])
    const [preloaderVisibale, setPreloaderVisibale] = useState(false)

    var verifyCallback = function (response) {
        if (response) {
            setError({ isVerified: true })
        }
    };
    const { register, handleSubmit, errors } = useForm();
    // let validationEmail;
    const onSubmit = (data, e) => {
        setError({ sent: 'Sending...' })
        setPreloaderVisibale(true)
        // if (data.email) {
        //     validationEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(data.email)
        //     if (!validationEmail) {
        //         setError({ email: true })
        //     } else if (validationEmail) {
        //         setError({ email: false })
        //     }
        // }
        if (error.isVerified) {
            fetch('http://localhost:5000/sendContactInfo', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        setSuccessMsg({ sent: 'Error Occured. Try gain..' })
                        setPreloaderVisibale(false)
                    }
                    setSuccessMsg({ sent: 'Email Sent. We will contact you soon!' })
                    setPreloaderVisibale(false)
                    e.target.reset()
                })

        }
    }

    return (
        <section className="login-sec register-sec contact-us">
            <OgData url={'http://fnmotivation.com/contact'} title={'Contact - FNMotivation'} description={'This new social network is a unique platform that is centered around health and wellness. This platform will provide a central location for people to like-minded people to connect.'} image={'http://localhost:5000/fnmotivation-logo.png'} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="login-inner">
                            <div className="login-title mb-5">
                                <h3>Contact Us</h3>
                            </div>
                            <p className="msgText">{successMsg.sent}</p>
                            <form onSubmit={handleSubmit(onSubmit)}>

                                <div className="form-group mt-5">
                                    <label>Name</label>
                                    <input name="name" type="text" className="form-control" placeholder="" ref={register({ required: true })} />
                                    {errors.name && <span>This field is required</span>}

                                </div>
                                <div className="form-group ">
                                    <label>Email</label>
                                    <input name="email" type="text" className="form-control" placeholder=""
                                        ref={register({
                                            required: true
                                        })} />
                                    {errors.email && <span>This field is required</span>}
                                    {error.email && <span>Please type correct Email</span>}
                                </div>

                                <div className="form-group ">
                                    <label>Subject</label>
                                    <input name="subject" type="text" className="form-control" placeholder="" ref={register({ required: true })} />
                                    {errors.subject && <span>This field is required</span>}
                                </div>

                                <div className="form-group">
                                    <label for="">Message</label>
                                    <textarea name="message" className="form-control message" id="" rows="3" ref={register({ required: true })} />
                                    {errors.message && <span>This field is required</span>}
                                </div>
                                {/* <div className="form-group ">
                                    <label className="check ">I am not a robat
                                    <input type="checkbox" name="is_name" />
                                        <span className="checkmark"></span>
                                    </label>
                                </div> */}
                                <div className="captcha mt-5">
                                    <div className="d-flex justify-content-center">
                                        <ReCAPTCHA
                                            sitekey="6LdH5mMaAAAAALlyeFqMa7Qz0JdRyU6HTs8zNlWl"
                                            onChange={verifyCallback}
                                        />
                                    </div>
                                </div>
                                {preloaderVisibale ?
                                    <div className="alert alert-primary m-3 text-center" role="alert">
                                        <CircularProgress className="mt-2" /><br></br>...Sending...
                                        </div>
                                    :
                                    <>
                                        {error.isVerified ?
                                            <div className="form-group mt-5">
                                                <input type="submit" className="btn btn-default" value="Send Message" />
                                            </div> :
                                            <div className="form-group mt-5">
                                                <input type="submit" disabled className="btn btn-default" value="Send Message" />
                                            </div>}
                                    </>}

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;