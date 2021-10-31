import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from '../../redux/user/user-selectors';
import {auth} from "../../firebase/firebase";
import {selectCartItemsCount} from "../../redux/cart/cart-selectors";
import {isAuthenticated} from "../../utils";


const AuthenticatedRoute = ({currentUser, children,cartLength, ...rest }) => {
    console.log("currentUser")
    console.log(cartLength)
    return (
        <Route {...rest}>
            {isAuthenticated ? (children) : (<Redirect to='/register'/>)}
        </Route>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    cartLength: selectCartItemsCount,

});

export default connect(mapStateToProps)(AuthenticatedRoute);