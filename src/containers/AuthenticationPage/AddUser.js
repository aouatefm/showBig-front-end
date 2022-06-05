import React, {Component} from "react";
import {Button, Col} from "react-bootstrap";
import { connect } from "react-redux";
import FormInput from '../../components/FormInput/FormInput';
import UserService from "../../services/UserService";
import {login} from "../../firebase/auth";
import {setLoading} from "../../redux/spinner/spinner-actions";
import {setCurrentUser} from "../../redux/user/user-action";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {withRouter} from "react-router-dom";
import withToast from "../../components/ui/withToast";




class AddUser extends Component {
    state = {
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
        showAlert :"",
        error :"",
        loading : false
    }

    render() {
        const validateForm = () => {
            return (
                this.state.displayName.length > 0 &&
                this.state.email.length > 0 &&
                this.state.password.length > 0 &&
                this.state.password.length === this.state.confirmPassword.length
            );
        }
        const validatePassword = () => {
            return (this.state.displayName.length > 0 &&
                this.state.email.length > 0 &&
                this.state.password.length > 0 &&
                this.state.confirmPassword.length > 0 &&
                this.state.confirmPassword.length > this.state.password.length &&
                this.state.password.length !== this.state.confirmPassword.length
            )

        }

        const {setLoading} = this.props;
        const handleSubmit = async (event) => {

            event.preventDefault();
            this.setState({error :''})

            if (this.state.password !== this.state.confirmPassword) {
                //this.setState({error: "password does not match "})
            }
            setLoading(true);
            this.setState({loading :true})
            const {isUserCreated, errorMsg} = await UserService.register(this.state)
            if (isUserCreated) {

                this.setState({ email: '', password: '',displayName :'',confirmPassword :'' });
                this.props.history.push("/admin");
            } else {
                this.setState({error :errorMsg.message})

            }
            this.setState({loading :false})


        }

        const handleChange = (event) => {
            const {value, name} = event.target
            this.setState({[name]: value})
        }


        return (
            <div className="container">
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
                    id='password'
                    type='password'
                    value={this.state.password}
                    required
                    handleChange={handleChange}
                />

                <FormInput
                    label='Confirm Password'
                    name='confirmPassword'
                    id='confirm_password'
                    type='password'
                    value={this.state.confirmPassword}
                    required
                    handleChange={handleChange}
                />
                {validatePassword() &&
                <div style={{color :'red',marginTop :'0px'}}>
                    Password doesn't match
                </div>

                }
                <br/>
                <Button
                    className="form-button mb-3"
                    block
                    type="submit"
                    variant="outline-dark"
                    bssize="large"
                    disabled={!validateForm()}
                >
                    Register
                </Button>



                {this.state.error &&
                <div className="alert alert-danger" role="alert">
                    {this.state.error}
                </div>
                }
            </form>
            </div>
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

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(withToast(AddUser)));
