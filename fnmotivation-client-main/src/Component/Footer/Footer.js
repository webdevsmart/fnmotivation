/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import logo from '../../images/logo.png';
import twitter from '../../images/twitter-icon.svg';
import instagram from '../../images/instagram.svg';
import linkedIn from '../../images/linkdin-icon.svg';
import facebook from '../../images/facebook-icon.svg'
import moment from 'moment';

const Footer = () => {
    return (
        <div>
            <footer className="footer">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="footer-logo">
                                <a><img src={logo} alt="" className="img-fluid" /></a>
                                <h3>FN Motivation</h3>
                                <div className="copyright">
                                    <p>All Rights Reserved {moment().format('YYYY')}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="footer-link">
                                <ul>
                                    <li><a href="/about"> About FNM</a></li>
                                    <li><a href="/contact">Contact</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="footer-social">
                                <ul>
                                    <li><a target="_blank" rel="noopener noreferrer" href="https://twitter.com/FNMotivation1"><img src={twitter} alt="twitter" /></a></li>
                                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.instagram.com/Futurenowmotivation/"><img src={instagram} alt="instagram" /></a></li>
                                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.linkedin.com/company/fnmotivation"><img src={linkedIn} alt="linkedIn" /></a></li>
                                    <li><a target="_blank" rel="noopener noreferrer" href="https://www.facebook.com/FNMotivation/"><img src={facebook} alt="facebook" /></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="copyright mobile-version">
                        <p>All Rights Reserved {moment().format('YYYY')}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;