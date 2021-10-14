import React from 'react';
import { useHistory } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { axios_instance as axios, fireBaseMediaURL } from '../../config';

import { selectCurrentUser } from '../../redux/user/user-selectors';
import { clearCart } from '../../redux/cart/cart-action';

const StripeCheckoutButton = ({ price, currentUser, clearCart }) => {
    const history = useHistory();
    const priceForStripe = price * 100;
    const publishableKey = 'pk_test_RbGyqUNtLADfy0AbvHBnDwVc00B55LwkFH';
    const onToken = token => {
        currentUser ? (
            axios({
                url: 'payment',
                method: 'post',
                withCredentials: true,
                data: {
                    amount: priceForStripe,
                    token
                }
            }).then(response => {
                alert('Payment Successful!');
                clearCart();
                history.push('/');
            }).catch(error => {
                console.log(error.response.data.error);
                alert('There was an issue. Please sure you use the provided credit card!');
            })
        ) : (
            alert('You have to log in first!')
        );
    }

    return (
        <StripeCheckout
            label='Pay Now'
            name='VIGG Marketplace'
            billingAddress
            shippingAddress
            image={ fireBaseMediaURL('icons%2Fvigg_small_icon.png') }
            description={`Your total is $${price}`}
            amount={priceForStripe}
            panelLabel='Pay Now'
            token={onToken}
            stripeKey={publishableKey}
        />
    )
}

const mapStatetoProps = createStructuredSelector({
    currentUser: selectCurrentUser,
});

const mapDispatchtoProps = dispatch => ({
    clearCart: () => dispatch(clearCart()),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(StripeCheckoutButton);