import React, { useEffect, useState} from 'react';
import "./SearchBar.css"
import {GridIcon, ListIcon} from "../../assets/icons";
import ProductService from "../../services/ProductService";
import SearchInput from "../SearchInput/SearchInput";
import SortBar from "../SortBar/SortBar";
import {toggleViewBarGridList} from "../../redux/filters/filters-actions";
import {createStructuredSelector} from "reselect";
import { selectViewBarGridList} from "../../redux/filters/filters-selectors";
import {connect} from "react-redux";

const  useVendorProducts = (id) =>{
    const [products, setProducts] = useState([]);
    useEffect(async() => {
        const newProducts = await ProductService.getProductsByStore(id)
        setProducts(newProducts);
    }, [])
    return products
}
const SearchBar =  ({vendor, viewbargrid,toggleViewBarGridList}) => {
    const products = useVendorProducts(vendor)
    const productNumber = products.length
        return (
            <div className="ps-shopping__header" data-selected="true" data-label-id="0" data-metatip="true">
                <p><strong>{productNumber}</strong> Product(s) found.</p>
                    <p style={{marginTop :'20px'}}><SearchInput /></p>
                <div className="ps-shopping__actions">
                    <SortBar />
                    <div className="ps-shopping__view">
                        <div className="view"><p >View</p></div>
                        <div style={{margin : "5px",cursor :"pointer"}} onClick={toggleViewBarGridList}>{viewbargrid ? <ListIcon/>: <GridIcon/>}</div>
                    </div>
                </div>
            </div>

            // <div className="ps-shopping__header" data-selected="true" data-label-id="0" data-metatip="true">
            //     <p>
            //         <strong>{productNumber}</strong> Product(s) found.
            //     </p>
            //     <div className="ps-shopping__actions">
            //         <select className="form-control" data-placeholder="Sort Items">
            //             <option>Sort by latest</option>
            //             <option>Sort by popularity</option>
            //             <option>Sort by average rating</option>
            //             <option>Sort by price: low to high</option>
            //             <option>Sort by price: high to low</option>
            //         </select>
            //         <div className="ps-shopping__view">
            //             <div className="view"><p >View</p></div>
            //             <div style={{margin : "5px"}}><GridIcon/></div>
            //             <div style={{margin : "5px"}}><ListIcon/></div>
            //         </div>
            //     </div>
            // </div>
        );

}
const mapStatetoProps = createStructuredSelector({
    viewbargrid :selectViewBarGridList
});
const mapDispatchtoProps = dispatch => ({
    toggleViewBarGridList: () => dispatch(toggleViewBarGridList()),
});
export default connect(mapStatetoProps,mapDispatchtoProps)(SearchBar);
