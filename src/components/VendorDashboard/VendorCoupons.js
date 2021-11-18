import React, {useEffect, useState} from 'react';
import {Modal, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavThree from "../NavBar/NavThree";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import UserService from "../../services/UserService";
import ProductService from "../../services/ProductService";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import {MultiSelect} from "react-multi-select-component";
import CouponService from "../../services/CouponService";
import CouponPresentation from "./CouponPresentation";
import Moment from "moment";
import {useToasts} from "react-toast-notifications";

const VendorCoupons = ({vendor, currentUser}) => {
    const { addToast } = useToasts();
    const [show, setShow] = useState(false);
    const [store, setStore] = useState(null);
    const [products, setProducts] = useState([]);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("percentage");
    const [amount, setAmount] = useState(null);
    const [expireDays, setExpireDays] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showOnStore, setShowOnStore] = useState(false);

    const onSubmit = async (e) =>    {
        e.preventDefault();
        const res = await CouponService.createCoupon(name,description,type,amount,expireDays,selectedProducts,showOnStore)
        addToast("Coupon successfully added ", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 2000,
            TransitionState: "exiting",
        })
        setShow(false);
        window.location.reload(false);
    }


    const convertProductOptions = (products) =>{
        return  products.map((p) => {
          return  {label : p.name, value : p.id}
        })
    }
    const handleToggle = () =>{
        setShowOnStore(!showOnStore);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await UserService.getUser(currentUser.uid)
                setStore(userProfile.store_id);
                // Use resutlt in the second request
                const newProducts = await ProductService.getProductsByStore(store)
                setProducts(newProducts);
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, [store, currentUser]);

    return (
        <div>
            <div className="row">
                <div className="col col-lg-2">
                    <NavThree/>
                </div>
                <div className="col">
                    <h1>Coupons</h1>
                    <div style={{position: "relative", left: "953px"}}>
                        <Button variant="warning" onClick={handleShow} style={{marginBottom: "10px"}}>
                            Add New Coupon
                        </Button>
                    </div>
                    <Modal show={show} onHide={handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add Coupon</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>

                            <form onSubmit={onSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">Coupon Name</label>
                                    <input type="text" className="form-control" placeholder="Coupon Name"
                                           value={name}
                                           name="name"
                                           required
                                           onChange={(e)=>{setName(e.target.value)}}/>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="exampleFormControlTextarea1">Description</label>
                                    <textarea className="form-control" id="exampleFormControlTextarea1"
                                              rows="3" placeholder="Description" value={description}
                                              name="description"
                                              required
                                              onChange={(e)=>{setDescription(e.target.value)}}/>
                                </div>
                                <div className="form-group">
                                    <label> Discount Type</label>
                                    <select onChange={e => setType(e.target.value)} className="form-control" required>
                                            <option value="percentage" >Percentage discount</option>
                                            <option value="fixed">Fixed product discount</option>
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label>Amount</label>
                                    <input type="number" className="form-control" placeholder="Enter an Amount"
                                           name="stock"
                                           value={amount}
                                           min="1"
                                           required
                                           onChange={(e)=>{setAmount(e.target.value)}}/>
                                </div>


                                <div className="form-group">
                                    <label> Expire Days</label>
                                    <input type="date" className="form-control" placeholder="Will expired in  .. days"
                                           name="stock"
                                           value={expireDays}
                                           min={Moment(new  Date()).format('YYYY-MM-DD')}
                                           onChange={(e)=>{setExpireDays(e.target.value)}}
                                    />
                                </div>


                                <div className="form-group">
                                    <label> Products</label>
                                        {products &&
                                        <MultiSelect
                                            options={convertProductOptions(products)}
                                            value={selectedProducts}
                                            onChange={setSelectedProducts}
                                            labelledBy="Select"
                                        />}
                                </div>

                                <div className="form-group">
                                    <label> Show on store</label>
                                    <Form.Check type="checkbox"
                                                label="Check this box if you want to show this coupon in store page."
                                                value={showOnStore}
                                                onChange={handleToggle}/>
                                </div>
                                <button type="submit" className="btn btn-primary">Add Coupon</button>
                                <Button variant="dark" onClick={handleClose} style={{marginLeft :"250px"}}>
                                    Cancel
                                </Button>
                            </form>
                        </Modal.Body>
                        {/*<Modal.Footer>*/}

                        {/*</Modal.Footer>*/}
                    </Modal>
                   <CouponPresentation />
                </div>
            </div>
        </div>

    );
}

const mapStateToProps = createStructuredSelector(
    {currentUser: selectCurrentUser,}
);
export default connect(mapStateToProps)(VendorCoupons);