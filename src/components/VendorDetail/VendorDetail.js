import React, { useEffect, useState} from 'react';
import "./VendorDetail.css"
import ReactStars from "react-rating-stars-component";
import {FacebookIcon, InstagramIcon, PinterestIcon} from "../../assets/icons";
import SearchBar from "../SearchBar/SearchBar";
import VendorService from "../../services/VendorService";
import {useParams} from "react-router-dom";
import VendorProducts from "../VendorProducts/VendorProducts";
import MapContainer from "./MapContainer";
import {createStructuredSelector} from "reselect";
import {
    selectSearchBarKeywords,
    selectSideBarFilters,
    selectSortBar,
    selectViewBar
} from "../../redux/filters/filters-selectors";
import {connect} from "react-redux";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";

function useVendorId(id) {
    const [vendor, setVendor] = useState([]);
    useEffect(async () => {
        const newVendor = await VendorService.getVendorById(id);
        setVendor(newVendor);
    }, [])
    return vendor
}
const VendorDetail = () => {
    let { id } = useParams();
    const vendor = useVendorId(id);
    const rating_avg = vendor.avg_rating;
    console.log(vendor.avg_rating)
    return rating_avg != undefined ?
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
                                     <ReactStars
                                         count={5}
                                         value={rating_avg}
                                         size={30}
                                         isHalf={true}
                                         activeColor="#ffd700"
                                         edit={false}
                                     />
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
                        <SearchBar vendor={id}/>
                        {vendor ?
                        <VendorProducts vendor={id}/>:
                            <SpinnerPage/>
                        }
                    </div>
                </div>
            </div>
        : <SpinnerPage/>

}
const mapStatetoProps = createStructuredSelector({
    Keywords:  selectSearchBarKeywords,
    viewbar: selectViewBar,
    filters: selectSideBarFilters,
    sortbar: selectSortBar,
});

export default connect(mapStatetoProps)(VendorDetail);
