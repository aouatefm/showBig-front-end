import React, {useEffect, useState} from 'react';
import './Shop.css'
import {Button} from "react-bootstrap";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartItemsCount} from "../../redux/cart/cart-selectors";
import {connect} from "react-redux";
import {CashIcon, StripeIcon} from "../../assets/icons";
import {Link} from "react-router-dom";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import UserService from "../../services/UserService";
import {setLoading} from "../../redux/spinner/spinner-actions";
import {selectLoading} from "../../redux/spinner/spinner-selectors";
import {useHistory} from "react-router";
import 'react-toastify/dist/ReactToastify.css';
import OrderService from "../../services/OrderService";
import { clearCart,  updateItems} from "../../redux/cart/cart-action";
import CouponService from "../../services/CouponService";
import {useSession} from "../../firebase/UserProvider";
import {useToasts} from "react-toast-notifications";
import StripeCheckout from "react-stripe-checkout";
import {stripeKey} from "../../config";
import axios from "axios";
import Logo from "../../assets/blck.png"


const Shop = ({cartItems, cartLength, currentUser, spinner, setLoading, clearCart, updateItems}) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [billingAdr, setBillingAdr] = useState("");
    const [shippingAdr, setShippingAdr] = useState("");
    const [phone, setPhone] = useState(null);
    const [secondPhone, setSecondPhone] = useState("");
    const [delivery, setDelivery] = useState(0);
    const [notes, setNotes] = useState("");
    const [coupon, setCoupon] = useState("");
    const [payment, setPayment] = useState("");
    const [userProfile, setUserProfile] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const history = useHistory();
    const { user } = useSession()
    const { addToast } = useToasts();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await UserService.getUser(currentUser.uid)
                setUserProfile(userProfile);
                if (userProfile) {
                    setName(userProfile.first_name)
                    setLastName(userProfile.last_name)
                    setBillingAdr(userProfile.billing_address)
                    setShippingAdr(userProfile.shipping_address)
                    setPhone(userProfile.phone_number)
                }
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, [currentUser]);

    let totalPrice = delivery;
    cartItems.map(item => totalPrice += (item.discounted_price ? item.discounted_price * item.quantity : item.price * item.quantity));
    const priceForStripe = totalPrice * 100;

    const handleCoupon = async () => {
        let resp = await CouponService.applyCoupon(coupon, cartItems)
        if (resp) {
            updateItems(resp)

        } else {
            setShowAlert(true)
            setCoupon("")
        }

    }
    const handleSubmit = async () => {
        setLoading(true)
        if (user)
        {
            if (delivery === "" || payment === "") {
                //alert("Please make sure to choose the delivery and payment method ");
                addToast("Please make sure to choose the delivery and payment method",
                    {
                        appearance: "error",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                        TransitionState: "exiting",
                    });
                setLoading(false)
            } else {
                try {
                    const res = await OrderService.createOrder(name, lastName, billingAdr, shippingAdr, phone, secondPhone, delivery, payment, cartItems, totalPrice, notes)

                } catch (e) {
                    console.log(e)
                }
                clearCart()
                addToast("You order successfully submitted",
                    {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                        TransitionState: "exiting",
                    });
                history.push({pathname: "/product-listing"});
                setLoading(false)
            }
        }
        else {
            history.push({pathname: "/register"});
        }
    }

    const onToken = async (token) => {
        console.log(token)
        setLoading(true)
        if (user)
        {
            if (delivery === "" || payment === "") {
                //alert("Please make sure to choose the delivery and payment method ");
                addToast("Please make sure to choose the delivery and payment method",
                    {
                        appearance: "error",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                        TransitionState: "exiting",
                    });
                setLoading(false)
            } else {
                try {
                    const res = await OrderService.createOrder(name, lastName, billingAdr, shippingAdr, phone, secondPhone, delivery, payment, cartItems, totalPrice, notes)

                } catch (e) {
                    console.log(e)
                }
                clearCart()
                addToast("You order successfully submitted",
                    {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                        TransitionState: "exiting",
                    });
                history.push({pathname: "/product-listing"});
                setLoading(false)
            }
        }
        else {
            history.push({pathname: "/register"});
        }
    }
    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <div className="accordion" id="accordionExample">
                        <div className="accordion-item" style={{border: "2px solid #e5e5e5", padding: "20px"}}>
                            <h2 className="accordion-header" id="headingOne">
                                <button className="btn btn-dark"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                        style={{borderRadius: "10px 100px / 120px"}}>
                                    Address #1
                                </button>
                            </h2>
                            <div id="collapseOne" className="accordion-collapse collapse show"
                                 aria-labelledby="headingOne"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label required">First name</label>
                                            <input type="text" className="form-control inp" placeholder="First name"
                                                   required
                                                   value={name}
                                                   onChange={(e) => {
                                                       setName(e.target.value)
                                                   }}/>
                                        </div>
                                        <div className="col">
                                            <label className="form-label required">Last name</label>
                                            <input type="text" className="form-control inp" placeholder="Last name"
                                                   required
                                                   value={lastName}
                                                   onChange={(e) => {
                                                       setLastName(e.target.value)
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label required">Billing Address</label>
                                            <input type="text" className="form-control inp"
                                                   placeholder="Billing Address"
                                                   value={billingAdr}
                                                   required
                                                   onChange={(e) => {
                                                       setBillingAdr(e.target.value)
                                                   }}/>
                                        </div>
                                        <div className="col">
                                            <label className="form-label required">Shipping Address</label>
                                            <input type="text" className="form-control inp"
                                                   placeholder="Shipping Address" required
                                                   value={shippingAdr}
                                                   onChange={(e) => {
                                                       setShippingAdr(e.target.value)
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label required">Contact Number</label>
                                            <input type="text" className="form-control inp" placeholder="Contact Number"
                                                   required
                                                   value={phone}
                                                   onChange={(e) => {
                                                       setPhone(e.target.value)
                                                   }}/>
                                        </div>
                                        <div className="col">
                                            <label className="form-label ">Second Phone Number</label>
                                            <input type="text" className="form-control inp"
                                                   placeholder="Add a second phone number"
                                                   onChange={(e) => {
                                                       setSecondPhone(e.target.value)
                                                   }}/>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="accordion-item" style={{border: "2px solid #e5e5e5", padding: "20px"}}>
                            <h2 className="accordion-header" id="headingTwo">
                                <button className="btn btn-dark" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo"
                                        style={{borderRadius: "10px 100px / 120px"}}> Delivery Method #2
                                </button>
                            </h2>
                            <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <h5>How do you want your order to be delivered ? </h5>
                                    <div className="form-check" onChange={(e) => setDelivery(parseInt(e.target.value))}>
                                        <input className="form-check-input" type="radio" name="delivery" value="5"
                                               required/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                            Regular Shipping (5$)
                                        </label><br/>
                                        <input className="form-check-input" type="radio" name="delivery" value="0"/>
                                        <label className="form-check-label" htmlFor="flexRadioDefault2">
                                            Local pickup (Free)
                                        </label>
                                    </div>

                                    <br/>
                                    <a href="#">Choose a relay point</a>

                                </div>
                            </div>
                        </div>
                        <div className="accordion-item" style={{border: "2px solid #e5e5e5", padding: "20px"}}>
                            <h2 className="accordion-header" id="headingThree">
                                <button className="btn btn-dark" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false"
                                        aria-controls="collapseThree"
                                        style={{borderRadius: "10px 100px / 120px"}}>
                                    Payment #3
                                </button>
                            </h2>
                            <div id="collapseThree" className="accordion-collapse collapse"
                                 aria-labelledby="headingThree"
                                 data-bs-parent="#accordionExample">
                                <h5>Which payment method do you want to use ? </h5>
                                <div className="form-check">
                                    <div onChange={(e) => setPayment(e.target.value)}>
                                        <input className="form-check-input" type="radio" value="cash"
                                               name="payment" required/>
                                        <label className="form-check-label"
                                               htmlFor="flexRadioDefault1"><CashIcon
                                            width={30}/> Cash on delivery</label><br/>
                                        <input className="form-check-input" type="radio" value="stripe" name="payment"/><label
                                        className="form-check-label" htmlFor="flexRadioDefault2"><StripeIcon
                                        width={40}/> Pay With Stripe</label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="accordion-item" style={{border: "2px solid #e5e5e5", padding: "20px"}}>
                            <h2 className="accordion-header" id="headingFour">
                                <button className="btn btn-dark" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseTwo"
                                        style={{borderRadius: "10px 100px / 120px"}}> Note #3
                                </button>
                            </h2>
                            <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
                                 data-bs-parent="#accordionExample">
                                <div className="accordion-body">
                                    <label>Order notes (optional)</label>
                                    <textarea className="form-control" aria-label="With textarea"
                                              placeholder="Notes about your order, e.g. special notes for delivery."
                                              onChange={(e) => {
                                                  setNotes(e.target.value)
                                              }}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    {payment === '' | payment === 'cash' &&
                    <Button style={{width: "400px", margin: "50px"}} className="btn btn-dark" onClick={handleSubmit}
                            disabled={spinner}>
                        Submit Order
                    </Button>
                    }

                    {payment=== 'stripe' &&
                    <>
                    <StripeCheckout
                     style={{width: "400px", margin: "50px"}}
                     stripeKey={stripeKey}
                     label='Pay Now'
                     name='Sho Big'
                     amount={priceForStripe}
                     token={onToken}
                     panelLabel='Pay Now'
                    />
                    <div className='test-warning'>
                        *Please use the following test credit card for payments*
                        <br />
                        4242 4242 4242 4242 - Exp: 04/24 - CVV: 123
                    </div>
                        </>
                    }
                </div>


                <div className="col" style={{backgroundColor: ""}}>
                    <div className="card" style={{
                        width: "20rem",
                        display: "block",
                        marginLeft: "auto",
                        marginRight: "auto",
                        marginTop: "30px"
                    }}>
                        <div className="card-header"
                             style={{textAlign: "center", backgroundColor: "black", color: "white"}}>
                            <h4>Your Order ({cartLength} items)</h4>
                        </div>
                        <ul className="list-group list-group-flush">
                            {
                                cartItems.map((item) => {
                                        return (
                                            <li className="list-group-item" key={item.id}
                                                style={{border: "1px solid #eeeeee"}}>
                                                <div className="row">
                                                    <div className="col-4">
                                                        <img src={item.images} alt={item.name}
                                                             style={{width: "58px", height: "60px"}}/>
                                                    </div>
                                                    <div className="col-8">
                                                        <h5 style={{fontWeight: 'bold'}}>{item.name}</h5>
                                                        {item.discounted_price ?
                                                            <>
                                                                <span style={{
                                                                    fontWeight: 'bold',
                                                                    color: "#ff6d00",
                                                                    textDecoration: "line-through"
                                                                }}>Price : $ {item.price}</span><br/>
                                                                <span style={{fontWeight: 'bold', color: "#ff6d00",}}>Price : $ {item.discounted_price}</span>
                                                            </> :
                                                            <span style={{
                                                                fontWeight: 'bold',
                                                                color: "#ff6d00"
                                                            }}>Price : $ {item.price}</span>
                                                        }
                                                        <h6>
                                                            Qty : {item.quantity}
                                                        </h6>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    }
                                )
                            }
                        </ul>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><h5>Subtotal : <span
                                style={{fontWeight: 'bold', color: "#06d6a0"}}>$ {totalPrice - delivery}</span></h5>
                            </li>
                            <li className="list-group-item"><h5>Delivery Cost : <span
                                style={{fontWeight: 'bold', color: "#06d6a0"}}> $ {delivery}</span></h5></li>
                            <li className="list-group-item" style={{backgroundColor: "gainsboro", color: "#577590"}}>
                                <h3 style={{fontWeight: "bold"}}>TOTAL $ {totalPrice}</h3>
                            </li>
                            <li className="list-group-item" style={{textAlign: "center"}}>
                                        <span style={{textAlign: "center"}}>
                                        <Link to='/cart'>Back To Cart</Link>
                                        </span>
                            </li>
                            <li className="list-group-item" style={{textAlign: "center"}}>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Enter your coupon here"
                                           aria-label="Recipient's username" aria-describedby="button-addon2"
                                           value={coupon}
                                           onChange={(e) => {
                                               setCoupon(e.target.value)
                                           }}/>
                                    <button className="btn btn-outline-success" type="button" id="button-addon2"
                                            onClick={handleCoupon}>
                                        Add Coupon
                                    </button>
                                    {showAlert &&
                                    <div className="alert alert-danger" role="alert" style={{marginTop: "10px"}}>
                                       Coupon Not Found ! Please Try another One
                                    </div>}
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartLength: selectCartItemsCount,
    currentUser: selectCurrentUser,
    spinner: selectLoading

});

const mapDispatchToProps = dispatch => ({
    setLoading: loadingState => dispatch(setLoading(loadingState)),
    clearCart: cart => dispatch(clearCart()),
    updateItems: items => dispatch(updateItems(items)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Shop);