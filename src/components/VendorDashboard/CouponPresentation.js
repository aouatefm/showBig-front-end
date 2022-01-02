import React, {useEffect, useState} from "react";
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import CouponService from "../../services/CouponService";
import UserService from "../../services/UserService";
import Button from "react-bootstrap/Button";
import {EditIcon, EyeIcon, EyeSlash, TrashIcon} from "../../assets/icons";
import {Link} from "react-router-dom";
import Moment from "moment";


const CouponPresentation = ({currentUser}) => {
    const [coupons, setCoupons] = useState([]);
    const [store, setStore] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userProfile = await UserService.getUser(currentUser.uid)
                setStore(userProfile.store_id);
                const NewCoupons = await CouponService.getAllCouponsByStore(store)
                setCoupons(NewCoupons);
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, [store, currentUser]);

    console.log(coupons)
    const handleDelete = async (id) => {
        const rest = await CouponService.deleteCoupon(id)
        window.location.reload(false);

    }

    return (
        <div className="container">
            {coupons ?
                <table className="table table-striped">
                    <thead>
                    <tr>
                        <th scope="col">Code</th>
                        <th scope="col">Expiry Date</th>
                        <th scope="col">Discount Type</th>
                        <th scope="col">Discount Amount</th>
                        <th scope="col">Description</th>
                        <th scope="col">Created At</th>
                        <th scope="col">Visible</th>
                        <th scope="col">Expired ? </th>
                        <th scope="col">details</th>
                    </tr>
                    </thead>
                    <tbody>


                    {
                        coupons.length === 0 ?
                            <td colSpan="9" style={{color :'red' , textAlign: 'center' ,margin :'35px'}}> Sorry ! No Coupon Found</td> :
                            (coupons.map((coupon, index) => (
                        <tr  style={{backgroundColor: coupon.is_expired ? 'darkgray' : 'none',}}>
                            <th scope="row" style={{textAlign: "center"}}>
                                <span className="badge circle circle-md bg-primary mr-2">{coupon.name}</span>
                            </th>
                            <td>{Moment(coupon.expiry_date).format('YYYY-MMM-DD')}</td>
                            <td>{coupon.discount_type}</td>
                            <td>{coupon.discount_amount}</td>
                            <td>{coupon.description}</td>
                            <td>{Moment(coupon.created_at).format('YYYY-MMM-DD')}</td>
                            <td>{coupon.visible === true ? <EyeIcon/> : <EyeSlash/>}</td>
                            <td>{coupon.is_expired && "Expired"}</td>
                            <td>
                                <div className="btn-group">

                                <Button className="btn btn-danger" style={{textAlign: "center", marginRight: "4px"}}
                                        onClick={() => {handleDelete(coupon.name)}}><TrashIcon width="15"/>
                                </Button>

                                <Link to={{ pathname: `/edit-coupon/${coupon.id}`}}>
                                <Button className="btn btn-info" style={{textAlign: "center", backgroundColor: coupon.is_expired ? 'gray' : 'none'}} disabled={coupon.is_expired}>
                                    <EditIcon width="15"/>
                                </Button>
                                </Link>
                                </div>
                            </td>
                        </tr>

                    )))


                    }

                    </tbody>
                </table>
                :
                <h1>Loading ..</h1>}

        </div>

    )


}

const mapStateToProps = createStructuredSelector(
    {
        currentUser: selectCurrentUser,
    }
);
export default connect(mapStateToProps)(CouponPresentation);