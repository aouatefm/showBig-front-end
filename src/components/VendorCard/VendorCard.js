import React from 'react';
import Button from 'react-bootstrap/Button';
import {AddressIcon, PhoneIcon} from "../../assets/icons";
import ReactStars from "react-rating-stars-component";
import './VendorCard.css'
import {Link} from "react-router-dom";
const VendorCard = ({vendor}) => {
    return (
    <div className="main-card">
        <div className="header-card" style={{height : "72%" ,width : "375px" ,backgroundImage: "url(" + vendor.cover_image + ")" }} >
            <div className="am" style={{backgroundColor:' #7c8085bd', padding: '14px' ,color :'white'}}>
            <h4 className="store-name" style={{fontFamily: 'Pushster cursive', letterSpacing :'4px' , textTransform : 'uppercase'}}>{vendor.name}</h4>
            <div className="store-rating"><ReactStars {...{size: 30, value: 3, edit: false}} /></div>
            <div style={{marginTop : "15px" , position: 'relative', display: 'flex'}}><AddressIcon width={20}/><p className="store-adr">{vendor.address}</p></div>
                <div className="store-name"> <PhoneIcon  width={20}/> {"   "+vendor.phone_number}</div>
            </div>
        </div>
        <div className="footer-card">
            <Link to={{ pathname: `/vendors/${vendor.store_id}`}} className="btn btn-link btn-sm mr-2" >
                <Button variant="danger" className="store-btn" >Visit Store</Button>
            </Link>
            <img src={vendor.logo} alt="profile" className="store-img"/>
        </div>
    </div>
        );

}

export default VendorCard;

