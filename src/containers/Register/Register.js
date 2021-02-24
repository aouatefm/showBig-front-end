import React, { useState } from "react";
import {
    FormGroup,
    FormControl,
    Button
} from "react-bootstrap";
import { useFormFields } from "../../libs/hooksLib";
import "./Register.css";

const Register = ()  => {
    const [fields, handleFieldChange] = useFormFields({
        email: "",
        password: "",
        confirmPassword: "",
    });
    // const [isActive, setIsActive] = useState(false);

    const validateForm = () => {
        return (
            fields.email.length > 0 &&
            fields.password.length > 0 &&
            fields.password === fields.confirmPassword
        );
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // setIsLoading(true);
    }

    const renderForm = () => {
        return (
            <div>
                <h3 className="register_title">
                    REGISTER HERE
                </h3>
                <form onSubmit={handleSubmit} className="register_form" >
                    <Button
                        id = "facebook_oauth"
                        className="register_form_box"
                        block
                        href="/oauth/facebook"
                        bssize="large"
                    >
                        <img src="https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png" alt="fb-logo" width="50em" height="50em" className="icon"/>
                        Register with Facebook
                    </Button>
                    <FormGroup controlId="email" bssize="large">
                        <h6>Email</h6>
                        <FormControl
                            className="register_form_box"
                            autoFocus
                            type="email"
                            value={fields.email}
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="password" bssize="large">
                        <h6>Password</h6>
                        <FormControl
                            className="register_form_box"
                            type="password"
                            value={fields.password}
                            onChange={handleFieldChange}
                        />
                    </FormGroup>
                    <FormGroup controlId="confirmPassword" bssize="large">
                        <h6>Confirm Password</h6>
                        <FormControl
                            className="register_form_box"
                            type="password"
                            onChange={handleFieldChange}
                            value={fields.confirmPassword}
                        />
                    </FormGroup>
                    <Button
                        id = "register_button"
                        className="register_form_box"
                        block
                        type="submit"
                        bssize="large"
                        disabled={!validateForm()}
                    >
                        Register
                    </Button>
                </form>
            </div>

        );
    }

    return (
        <div className="register">
            <div className="container">
                <div className="row">
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}

export default Register;