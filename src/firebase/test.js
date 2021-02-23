import React from "react";
import "./sign-in.styles.scss";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
//
// class SignIn extends React.Component {
//     constructor(props) {
//         super(props);
//
//         this.state = {
//             email: "",
//             password: ""
//         };
//     }



//     handleSubmit = async event => {
//         event.preventDefault();
//         const { email, password } = this.state;
//
//         try {
//             await auth.signInWithEmailAndPassword(email, password);
//             this.setState({ email: "", password: "" });
//         } catch (error) {
//             console.error("cannot log user in!", error);
//         }
//     };
//
//     handleChange = event => {
//         // console.log(event);
//         // console.log(event.nativeEvent);
//         const { value, name } = event.target;
//         this.setState({ [name]: value });
//     };
//
//     render() {
//         return (
//             <div className="sign-in">
//                 <h2>I already have an account !</h2>
//                 <span>Sign in with your email and password</span>
//                 <form onSubmit={this.handleSubmit}>
//                     <FormInput
//                         name="email"
//                         value={this.state.email}
//                         type="email"
//                         required
//                         handleChange={this.handleChange}
//                         label="Email"
//                     />
//                     <FormInput
//                         name="password"
//                         value={this.state.password}
//                         type="password"
//                         required
//                         handleChange={this.handleChange}
//                         label="password"
//                     />
//                     <CustomButton type="submit">Sign in</CustomButton>
//
//
//                 </form>
//                 <div className="buttons">
//                     <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>
//                         Google Sign in
//                     </CustomButton>
//                 </div>
//             </div>
//         );
//     }
// }
//
// export default SignIn;