import React from 'react';
import { Link } from 'react-router-dom';

const Banner = () => {
    return (
        <div>
            <section className="pre-login-banner">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="text-box">
                                <h1>Future Now Motivation is a social community</h1>
                                <p>where everyone can share their stories about their issues for others to read,
                                    learn, engage and connect.</p>
                                <Link to="/register">REGISTER NOW</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
        </div>
    );
};

export default Banner;