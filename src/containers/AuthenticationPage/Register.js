import React, {Component} from "react";
import {Button} from "react-bootstrap";
import { connect } from "react-redux";
import FormInput from '../../components/FormInput/FormInput';
import UserService from "../../services/UserService";
import {login} from "../../firebase/auth";
import {setLoading} from "../../redux/spinner/spinner-actions";
import {setCurrentUser} from "../../redux/user/user-action";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {withRouter} from "react-router-dom";


class RegisterForm extends Component {
    state = {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        showAlert :false,
    }
    render() {
        const validateForm = () => {
            return (
                this.state.displayName.length > 0 &&
                this.state.email.length > 0 &&
                this.state.password.length > 0
                 &&
                 this.state.password.length === this.state.confirmPassword.length
            );
        }
        const {setLoading} = this.props;
        const handleSubmit = async (event) => {
            event.preventDefault();
            if (this.state.password !== this.state.confirmPassword) {
                alert('The password confirmation does not match!');
            }
            setLoading(true);
            const {isUserCreated, errorMsg} = await UserService.register(this.state)
            if (isUserCreated) {
                console.log("USER CREATED!")
                await login(this.state.email,this.state.password)
                this.setState({ email: '', password: '',displayName :'',confirmPassword :'' });
                this.props.history.push("/product-listing");


            } else {
                console.log(errorMsg)
            }
            setLoading(false);

        }

        const handleChange = (event) => {
            const {value, name} = event.target
            this.setState({[name]: value})
        }


        return (
            <form className="form-content" onSubmit={handleSubmit}>
                <FormInput
                    label={'User Name'}
                    name='displayName'
                    type='input'
                    value={this.state.displayName}
                    required
                    handleChange={handleChange}

                />
                <FormInput
                    label='Email'
                    name='email'
                    type='email'
                    value={this.state.email}
                    required
                    handleChange={handleChange}

                />
                <FormInput
                    label='Password'
                    name='password'
                    type='password'
                    value={this.state.password}
                    required
                    handleChange={handleChange}
                />
                <FormInput
                    label='Confirm Password'
                    name='confirmPassword'
                    type='password'
                    value={this.state.confirmPassword}
                    required
                    handleChange={handleChange}
                />
                <Button
                    className="form-button mb-3"
                    block
                    type="submit"
                    variant="outline-dark"
                    bssize="large"
                    disabled={!validateForm()}>
                    Register
                </Button>
                {this.state.showAlert &&
                <div className="alert alert-danger" role="alert" style={{marginTop: "10px"}}>
                    Password does not match ! Please try again
                </div>}
            </form>
        );
    }
}
const mapStatetoProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchtoProps = dispatch => ({
    setLoading: loadingState => dispatch(setLoading(loadingState)),
    setCurrentUser: userAuth => dispatch(setCurrentUser(userAuth)),
})

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(RegisterForm));