import React, { useEffect, useState} from 'react';
import "./VendorDetail.css"
import ReactStars from "react-rating-stars-component";
import {FacebookIcon, InstagramIcon, PinterestIcon} from "../../assets/icons";
import SearchBar from "../SearchBar/SearchBar";
import VendorService from "../../services/VendorService";
import {useParams} from "react-router-dom";
import VendorProducts from "../VendorProducts/VendorProducts";
import MapContainer from "./MapContainer";
import RatingService from "../../services/RatingService";
import {createStructuredSelector} from "reselect";
import {
    selectSearchBarKeywords,
    selectSideBarFilters,
    selectSortBar,
    selectViewBar
} from "../../redux/filters/filters-selectors";
import {connect} from "react-redux";

function useVendorId(id) {
    const [vendor, setVendor] = useState([]);
    const [ratings, setRating] = useState([]);
    useEffect(async () => {
        const newVendor = await VendorService.getVendorById(id);
        setVendor(newVendor);
        const newRating = await RatingService.getRatingsOfProduct(id);
        setRating(newRating)
    }, [])
    return [vendor,ratings]
}
const VendorDetail = () => {
    let { id } = useParams();
    const [vendor, ratings] = useVendorId(id);
        return (
            <div className="container">
                <div className="row">
                    <div className="col-3 left-side" style={{backgroundColor: "#F1F1F1"}}>
                        <div className="row">
                            <div className="col">
                                <img src={vendor.cover_image} className="banner-image"/>
                            </div>
                            <div className="col">
                                <div className="ps-block__container">
                                    <div className="ps-block__header"><h4>{vendor.name}</h4>
                                        <span className="ps-rating">
                                    <div className="val-rating">
                                    <ReactStars {...{size: 25, value: 3, edit: false}} />
                                    </div>
                                        </span>
                                        <p data-metatip="true"><strong>85% Positive</strong> (562 rating)</p></div>
                                    <div className="ps-block__divider" data-selected="true" data-label-id="0"
                                         style={{borderTop: "solid 1px #D5D5D5"}}/>
                                    <div className="ps-block__content" style={{marginTop: "15px"}}><p>
                                        <strong>Address:</strong> {vendor.address}</p>

                                        <figure>
                                            <figcaption>Follow us on social</figcaption>
                                            <div style={{margin: "10px"}}>
                                                <span style={{margin: "10px"}}><FacebookIcon/></span>
                                                <span style={{margin: "10px"}}><InstagramIcon/></span>
                                                <span style={{margin: "10px"}}><PinterestIcon/></span>
                                            </div>
                                        </figure>
                                    </div>
                                    <div className="ps-block__footer"><p>Call us directly <strong>{vendor.phone_number}</strong>
                                    </p>
                                        <p>or Or if you have any question</p>
                                        <button className="shelf-item__buy-btn ">Contact Seller</button>
                                        <MapContainer/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-9" >
                        <SearchBar vendor={id}  />
                        <VendorProducts vendor={id}/>
                    </div>
                </div>
            </div>
        );
}
const mapStatetoProps = createStructuredSelector({
    Keywords:  selectSearchBarKeywords,
    viewbar: selectViewBar,
    filters: selectSideBarFilters,
    sortbar: selectSortBar,
});

export default connect(mapStatetoProps)(VendorDetail);