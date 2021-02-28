import React, {Component} from 'react';
import Button from 'react-bootstrap/Button';
import {AddressIcon, PhoneIcon} from "../../assets/icons";
import ReactStars from "react-rating-stars-component";
import './VendorCard.css'
class VendorCard extends Component {
    render() {
        return (
            <div className="card">
                <div className="header-card">
                    <img src="https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg" alt="" className="banner-image"/>
                    <div className="vendor-info" >
                        <div className="row">
                            <div className="col-12 vendor-name">rosita store</div>
                        </div>
                        <div className="row">
                            <div className="col-1"><PhoneIcon width="18" height="18"/></div>
                            <div className="col-7">00 55 698 4782</div>
                        </div>
                        <div className="row">
                            <div className="col-1"><AddressIcon width="18" height="18"/></div>
                            <div className="col-7 addr">78 van Dyke ave.
                                Holbrook, NY 11741 </div>
                        </div>
                        <div className="row">
                            <div className="col-7">
                                <ReactStars {...{size: 30, value: 4.5, edit: false}} />
                            </div>
                        </div>

                    </div>

                </div>
                <div className="body-card">
                    <img src="https://techcommunity.microsoft.com/t5/image/serverpage/image-id/217078i525F6A9EF292601F/image-size/large?v=1.0&px=999" alt="" className="rounded-circle"/>
                </div>
                <div className="footer-card">
                    <Button className="block" variant="success">Follow</Button>
                </div>
            </div>
        );
    }
}

export default VendorCard;