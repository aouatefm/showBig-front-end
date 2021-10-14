import { Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {createStructuredSelector} from "reselect";
import {selectCartItems, selectCartItemsCount} from "../../redux/cart/cart-selectors";
import {connect} from "react-redux";
import ProductCell from "../../components/CartPageCells/ProductCell/ProductCell";
import QuantityCell from "../../components/CartPageCells/QuantityCell/QuantityCell";
import PriceCell from "../../components/CartPageCells/PriceCell/PriceCell";
import { LinkContainer } from 'react-router-bootstrap';
import {TimesIcon} from "../../assets/icons";
import React from "react";
import { clearItem} from "../../redux/cart/cart-action";
import StripeCheckoutButton from "../../components/StripeButton/StripeButton";

const CartPage = ({cartItems,cartLength,clearItem }) => {
    let totalPrice = 0;
    cartItems.map(item => totalPrice += (item.price * item.quantity));
    return (
        <div className="container">
            <div>
                {cartLength === 0?(
                    <h1>
                        YOUR CART IS EMPTY
                    </h1>
                ):(
                    <div className="cart-table">
                        <div>
                            <h1>
                                YOUR CART
                            </h1>
                        </div>
                        <div>
                            <Table striped bordered hover>
                                <thead>
                                <tr>
                                    <th>X</th>
                                    <th>#</th>
                                    <th>Product</th>
                                    {/*<th>Seller</th>*/}
                                    <th>Quantity</th>
                                    <th>Price</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    cartItems.map((item, index) => {
                                        return (
                                            <tr key={item.id}>
                                                <th><span onClick={()=>clearItem(item)}><TimesIcon width="20px"/></span></th>
                                                <td>{index+1}</td>
                                                <ProductCell
                                                    img_src={item.images}
                                                    name={item.name}
                                                    description="This is the description of this shoes"
                                                    id={item.id}/>
                                                {/*<SellerCell*/}
                                                {/*    name="Seller Name"*/}
                                                {/*    phone="(+84)1234567890"*/}
                                                {/*    email="sample123@gmail.com"/>*/}
                                                <QuantityCell item={item}/>
                                                <PriceCell price={item.quantity * item.price}/>
                                            </tr>
                                        );
                                    })
                                }
                                </tbody>
                            </Table>
                        </div>
                        <div>
                            <h3>Total: ${totalPrice.toFixed(2)}</h3>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <LinkContainer to="#">
                    <Button variant="outline-info">
                        Continue Shopping
                    </Button>
                </LinkContainer>
                <LinkContainer to="/shop">
                    <Button variant="outline-warning">
                        Check Out
                    </Button>
                </LinkContainer>
                {cartLength > 0 ? <StripeCheckoutButton price={totalPrice}/> : ''}
            </div>
            {/*<div className="test-warning">*/}
            {/*    *Please use the following test credit card for payments**/}
            {/*    <br />*/}
            {/*    4242 4242 4242 4242 - Exp: 01/21 - CVV 123*/}
            {/*</div>*/}
        </div>
    )
}
const mapStateToProps = createStructuredSelector({
    cartItems: selectCartItems,
    cartLength: selectCartItemsCount,
});
const mapDispatchToProps = (dispatch) => ({
    clearItem: item => dispatch(clearItem(item)),
});
export default connect(mapStateToProps,mapDispatchToProps)(CartPage);