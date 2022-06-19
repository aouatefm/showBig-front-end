import React, {useEffect, useState} from 'react';
import {Row, Col, ListGroup} from 'react-bootstrap';
import ProductService from '../../services/ProductService'
import './VendorProducts.css';
import {Link} from "react-router-dom";
import ProductCard from "../ProductCard/ProductCard";
import {createStructuredSelector} from "reselect";
import {
    selectSearchBarKeywords,
    selectSideBarFilters,
    selectSortBar,
    selectViewBar, selectViewBarGridList
} from "../../redux/filters/filters-selectors";
import {connect} from "react-redux";
import { toggleViewBarGridList} from "../../redux/filters/filters-actions";
import ProductCardList from "../ProductCard/ProductCardList";

const useVendorProducts = (id) => {
    const [products, setProducts] = useState([]);
    useEffect(async () => {
        const newProducts = await ProductService.getProductsByStore(id)
        setProducts(newProducts);
    }, [])
    return products
}
const VendorProducts = ({vendor, Keywords, sortbar, filters, viewbargrid}) => {
    const products = useVendorProducts(vendor)
    const keywordsMatched = (item) => {
        const formattedKeywords = Keywords.trim().replace(/\s/g, '').toLowerCase();
        if (formattedKeywords.length === 0) return true;
        const {name} = item;
        const formattedName = name.toLowerCase();
        return formattedName.includes(formattedKeywords)
    }

    const applyFilters = (items) => {
        let itemsToDisplay = items.filter(
            item =>
                (filters.conditions.includes(item.condition) || filters.conditions.length === 0) && keywordsMatched(item)
        );
        if (sortbar === 'low-to-high') {
            itemsToDisplay = itemsToDisplay.sort((a, b) => (parseFloat(a.price) >= parseFloat(b.price)) ? 1 : -1);
        } else if (sortbar === 'high-to-low') {
            itemsToDisplay = itemsToDisplay.sort((a, b) => (parseFloat(a.price) <= parseFloat(b.price)) ? 1 : -1);
        }
        return itemsToDisplay;
    }
    return (
        <div className="container">
            {viewbargrid ?
            <Row className="grid">
                {
                    applyFilters(products).map(product => (
                        <Link to={{pathname: `/products/${product.id}`}} style={{textDecoration: "none"}}>
                            <Col lg={3.5}><ProductCard key={product.id} product={product}/></Col>
                        </Link>
                    ))
                }
            </Row>
               :
                <ListGroup>

                    {
                        applyFilters(products).map(product => (
                            <Link to={{pathname: `/products/${product.id}`}} style={{textDecoration: "none"}}>
                                <ListGroup.Item><ProductCardList key={product.id} product={product}/></ListGroup.Item>
                            </Link>
                        ))
                    }
                </ListGroup>

                }

        </div>
    )
}
const mapStatetoProps = createStructuredSelector({
    Keywords: selectSearchBarKeywords,
    viewbar: selectViewBar,
    filters: selectSideBarFilters,
    sortbar: selectSortBar,
    viewbargrid :selectViewBarGridList
});
const mapDispatchtoProps = dispatch => ({
    toggleViewBarGridList: () => dispatch(toggleViewBarGridList()),
});
export default connect(mapStatetoProps,mapDispatchtoProps)(VendorProducts);
