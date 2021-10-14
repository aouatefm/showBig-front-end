import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import './AuthenticationPage.css';
import LoginForm from './Login';
import RegisterForm from './Register';

const AuthenticationPage = (props) => {
    const [ width, setWidth ] = useState(window.innerWidth);
        return (
        <div className="authentication-page">
            {
                width > 992 ? (
                    <>
                        <Col lg={6}>
                            <div className='register'>
                                <h3 className="form-title mb-3">
                                    LOGIN HERE
                                </h3>
                                <h6>Already registered? Login in here!</h6>
                                <LoginForm/>
                            </div>
                        </Col>
                        <Col lg={6}>
                            <div className='register'>
                                <h3 className="form-title mb-3">
                                    REGISTER HERE
                                </h3>
                                <h6>Have not registered? Sign up here!</h6>
                                <RegisterForm/>
                            </div>
                        </Col>
                    </>
                ) : (
                    <div className="small-page">
                        <Row>
                            <div className='form-container'>
                                <h3 className="form-title mb-3">
                                    LOGIN HERE
                                </h3>
                                <h6>Already registered? Login in here!</h6>
                                <LoginForm/>
                            </div>
                        </Row>
                        <Row>
                            <div className='form-container'>
                                <h3 className="form-title mb-3">
                                    REGISTER HERE
                                </h3>
                                <h6>Have not registered? Sign up here!</h6>
                                <RegisterForm/>
                            </div>
                        </Row>
                    </div>
                )
            }
        </div>
    )
}

export default AuthenticationPage;