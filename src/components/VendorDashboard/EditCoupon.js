import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {MultiSelect} from "react-multi-select-component";
import Form from "react-bootstrap/Form";
import ProductService from "../../services/ProductService";
import CouponService from "../../services/CouponService";
import {useHistory} from "react-router";
import Moment from "moment";

const EditCoupon = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("percentage");
    const [amount, setAmount] = useState(null);
    const [expireDays, setExpireDays] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [showOnStore, setShowOnStore] = useState(false);
    const [products, setProducts] = useState([]);
    const [coupon, setCoupon] = useState();
    let {id} = useParams();
    const history = useHistory();

    const convertProductOptions = (products) =>{
        return  products.map((p) => {
            return  {label : p.name, value : p.id}
        })
    }
    const handleToggle = () =>{
        setShowOnStore(!showOnStore);
        console.log(showOnStore)
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const coupon = await CouponService.getCouponsById(id)
                setCoupon(coupon);
                setSelectedProducts(coupon.products)
                setName(coupon.name)
                setDescription(coupon.description)
                setAmount(coupon.discount_amount)
                setExpireDays(coupon.expiry_date)
                setShowOnStore(coupon.visible)
                setType(coupon.type)
                const newProduct = await ProductService.getProductsByStore(coupon.store_id);
                setProducts(newProduct)
                console.log(products)
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, []);

    const onSubmit = async (e) =>    {
        e.preventDefault();
        const res = await CouponService.createCoupon(name,description,type,amount,expireDays,selectedProducts,showOnStore)
        history.push("/vendor-coupons");

    }
        return (
            <div className="container">
                {coupon &&
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Coupon Name / ID</label>
                        <input type="text" className="form-control" placeholder="Coupon Name"
                               value={name}
                               name="name"
                               required
                               onChange={(e)=>{setName(e.target.value)}}
                        disabled/>
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
                        <select onChange={e => setType(e.target.value)} className="form-control" required value={type}>
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
                        {coupon.products &&
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
                                    onChange={handleToggle}
                                    value={showOnStore}
                                    checked={showOnStore}
                                    />
                    </div>
                    <button type="submit" className="btn btn-success">Edit Product</button>


                </form>}
            </div>
        );

}

export default EditCoupon;