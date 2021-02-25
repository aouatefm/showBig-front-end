import React from 'react';
import './Footer.css';
import './Footer.css';
import fb from '../../img/fb-icon.png';
import insta from '../../img/insta-icon.png';
import lkn from '../../img/linkedin-icon.png';

const Footer = (props) => (
    <div>
        <div className="footer-left">
            <h3>
                <img alt="Vigg Icon"
                     src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTBXASQBA5XMRIwPbUaXAcC0x0Iw34lzr44g&usqp=CAU" width="250px"/>
            </h3>
            <p className="footer-links">
                <a href="/">Home</a>{' '}
                <a href="/about-us">About Us</a>{' '}
                <a href="/contact-us">Contact Us</a>{' '}
                <a href="/register">Register</a>
            </p>
            <p className="footer-company-name">@2020 Copyright: vie-com.com. All rights reserved.</p>
        </div>
        <div className="footer-center">
            <div>
                <svg className="icon bi bi-map" width="3em" height="3em" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M15.817.613A.5.5 0 0 1 16 1v13a.5.5 0 0 1-.402.49l-5 1a.502.502 0 0 1-.196 0L5.5 14.51l-4.902.98A.5.5 0 0 1 0 15V2a.5.5 0 0 1 .402-.49l5-1a.5.5 0 0 1 .196 0l4.902.98 4.902-.98a.5.5 0 0 1 .415.103zM10 2.41l-4-.8v11.98l4 .8V2.41zm1 11.98l4-.8V1.61l-4 .8v11.98zm-6-.8V1.61l-4 .8v11.98l4-.8z"/>
                </svg>
                <p>123 Allegre Ave, Corona, Texas 45678</p>
            </div>
            <div>
                <svg className="icon bi bi-phone" width="3em" height="3em" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M11 1H5a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z"/>
                    <path fillRule="evenodd" d="M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
                <p>(123)-456-7890</p>
            </div>
            <div>
                <svg className="icon bi bi-envelope" width="3em" height="3em" viewBox="0 0 16 16" fill="white" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M14 3H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2z"/>
                    <path d="M.05 3.555C.017 3.698 0 3.847 0 4v.697l5.803 3.546L0 11.801V12c0 .306.069.596.192.856l6.57-4.027L8 9.586l1.239-.757 6.57 4.027c.122-.26.191-.55.191-.856v-.2l-5.803-3.557L16 4.697V4c0-.153-.017-.302-.05-.445L8 8.414.05 3.555z"/>
                </svg>
                <p>
                    <a href="mailto:viecom@gmail.com">viecom@gmail.com</a>
                </p>
            </div>
            </div>
        <div className="footer-right">
            <div className="social-media">
                <a href="https://facebook.com">
                    <img src={fb} alt="fb-logo" width="50em" height="50em" className="icon"/>
                </a>
                <a href="https://instagram.com">
                    <img src={insta} alt="insta-logo" width="50em" height="50em" className="icon"/>
                </a>
                <a href="https://linkedin.com">
                    <img src={lkn} alt="linkedin-logo" width="50em" height="50em" className="icon"/>
                </a>
            </div>
        </div>
    </div>
);

export default Footer;