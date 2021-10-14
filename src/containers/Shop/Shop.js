import React, {useState} from 'react';
import './Shop.css'
import {Button} from "react-bootstrap";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartItemsCount} from "../../redux/cart/cart-selectors";
import {connect} from "react-redux";
import {CashIcon, StripeIcon} from "../../assets/icons";
import OrderService from "../../services/OrderService";


import {Link} from "react-router-dom";

const Shop = ({cartItems, cartLength}) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [billingAdr, setBillingAdr] = useState("");
    const [shippingAdr, setShippingAdr] = useState("");
    const [phone, setPhone] = useState(null);
    const [secondPhone, setSecondPhone] = useState("");
    const [delivery, setDelivery] = useState("");
    const [notes, setNotes] = useState("");
    const [payment, setPayment] = useState("");
    // const [products, setProducts] = useState([]);
    // const [totPrice, setTotalPrice] = useState(0);

    let totalPrice = 0;
    cartItems.map(item => totalPrice += (item.price * item.quantity));

    const handleSubmit = async ()  => {
     const res = await OrderService.createOrder(name,lastName,billingAdr,shippingAdr,phone,secondPhone,delivery,payment,cartItems, totalPrice,notes)
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
                                                   onChange={(e) => {
                                                       setName(e.target.value)
                                                   }}/>
                                        </div>
                                        <div className="col">
                                            <label className="form-label required">Last name</label>
                                            <input type="text" className="form-control inp" placeholder="Last name"
                                                   required
                                                   onChange={(e) => {
                                                       setLastName(e.target.value)
                                                   }}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label required">Billing Address</label>
                                            <input type="text" className="form-control inp"
                                                   placeholder="Billing Address" required
                                                   onChange={(e) => {setBillingAdr(e.target.value)}}/>
                                        </div>
                                        <div className="col">
                                            <label className="form-label required">Shipping Address</label>
                                            <input type="text" className="form-control inp"
                                                   placeholder="Shipping Address" required
                                                   onChange={(e) => {setShippingAdr(e.target.value)}}/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col">
                                            <label className="form-label required">Contact Number</label>
                                            <input type="text" className="form-control inp" placeholder="Contact Number"
                                                   required
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
                                    <div className="form-check" onChange={(e) => setDelivery(e.target.value)}>
                                        <input className="form-check-input" type="radio" name="delivery" value="5"/>
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
                                               name="payment"/><label className="form-check-label"
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
                                               onChange={(e) => {setNotes(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Button style={{width: "400px", margin: "50px"}} className="btn btn-dark" onClick={handleSubmit}>Submit Order</Button>
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
                                                        <span style={{fontWeight: 'bold', color: "#ff6d00"}}>
                                                                        Price : $ {item.price}
                                                                    </span>
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
                                style={{fontWeight: 'bold', color: "#06d6a0"}}>$ {totalPrice.toFixed(0)}</span></h5>
                            </li>
                            <li className="list-group-item"><h5>Delivery Cost : <span
                                style={{fontWeight: 'bold', color: "#06d6a0"}}>$ {5}</span></h5></li>
                            <li className="list-group-item" style={{backgroundColor: "gainsboro", color: "#577590"}}>
                                <h3 style={{fontWeight: "bold"}}>TOTAL $ {totalPrice.toFixed(1)}</h3>
                            </li>
                            <li className="list-group-item" style={{textAlign: "center"}}>
                                        <span style={{textAlign: "center"}}>
                                        <Link to='/cart'>Back To Cart</Link>
                                        </span>
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
});

export default connect(mapStateToProps)(Shop);