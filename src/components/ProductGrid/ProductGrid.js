import React, {useEffect, useState} from 'react';
import { Row, Col } from 'react-bootstrap';
import './ProductGrid.css';
import ProductCard from "../ProductCard/ProductCard";
import {Link} from "react-router-dom";
import {createStructuredSelector} from "reselect";
import {connect} from "react-redux";
import {selectSearchBarKeywords, selectSideBarFilters, selectSortBar, selectViewBar} from "../../redux/filters/filters-selectors";
import {dateDiffInDays} from "../../utils";

const  useProducts = (p) =>{
    const [products, setProducts] = useState([]);
    useEffect(async() => {
       // const newProducts = await ProductService.getProductList()
        const newProducts = await p
        setProducts(newProducts);
    }, [p])
    return products
}
const Grid =  ({ Keywords,products ,filters,sortbar}) => {
    console.log(dateDiffInDays(products[1].created_at))
    console.log(filters.conditions.includes("new"))
    console.log(filters)
    const productsCollection = useProducts(products)
    const keywordsMatched = (item) => {
        const formattedKeywords = Keywords.trim().replace(/\s/g, '').toLowerCase();
        if (formattedKeywords.length === 0) return true;
        const { name, store_id } = item;
        const formattedName = name.toLowerCase();
        const formattedStore = store_id.toLowerCase();
        return formattedName.includes(formattedKeywords) || formattedStore.includes(formattedKeywords);
    }

    const applyFilters = (items) => {
        let itemsToDisplay = items.filter(
            item =>
                parseFloat(filters.minPrice) < parseFloat(item.price) && parseFloat(item.price) <= parseFloat(filters.maxPrice) &&
                 parseInt(filters.minRate) <= parseInt(item.ratings_avg) && parseInt(item.ratings_avg) <= parseInt(filters.maxRate) &&
                (filters.brands.includes(item.store_id) || filters.brands.length === 0) &&
                (filters.conditions.includes("free-shipping") && item.shipping_price === null) || (filters.conditions.length === 0) ||
                (filters.conditions.includes('new') && dateDiffInDays(item.created_at) <= 31) || (filters.conditions.length === 0) &&
                 keywordsMatched(item)
        );

        if(sortbar === 'low-to-high'){
            itemsToDisplay = itemsToDisplay.sort((a, b) => (parseFloat(a.price) >= parseFloat(b.price)) ? 1 : -1);
        }
        else if(sortbar === 'high-to-low'){
            itemsToDisplay = itemsToDisplay.sort((a, b) => (parseFloat(a.price) <= parseFloat(b.price)) ? 1 : -1);
        }

        return itemsToDisplay;
    }

    return (

        <>
            { productsCollection &&
    <div className="container">
    <Row className="grid">

        {
            applyFilters(productsCollection).map(product => (
                <Link to={{ pathname: `/products/${product.id}`}} style={{textDecoration : "none"}}>
                    <Row lg={3.5}><ProductCard key={product.id} product={product} /></Row>
                </Link>
            ))
        }
         </Row>

    </div> }</>
    )
}
const mapStatetoProps = createStructuredSelector({
    Keywords:  selectSearchBarKeywords,
    viewbar: selectViewBar,
    filters: selectSideBarFilters,
    sortbar: selectSortBar,
});

export default connect(mapStatetoProps)(Grid);
