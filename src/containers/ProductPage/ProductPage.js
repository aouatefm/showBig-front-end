import React, {useEffect, useState} from 'react';
import {Row, Col, Pagination} from 'react-bootstrap';
import ProductGrid from '../../components/ProductGrid/ProductGrid';
import "./ProductPage.css";
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCollections} from "../../redux/product/product-selectors";
import {select_v_products_filters, selectSearchBarKeywords, selectViewBar} from "../../redux/filters/filters-selectors";
import ViewBar from "../../components/ViewBar/ViewBar";
import SortBar from "../../components/SortBar/SortBar";
import SearchInput from "../../components/SearchInput/SearchInput";
import SideBar from "../../components/SideBar/SideBar";
import {useParams} from "react-router-dom";
import {setSortBarValue, SetVProductsFilters} from "../../redux/filters/filters-actions";
import useReactRouter from "use-react-router";
import SpinnerPage from "../Spinner/SpinnerPage";

const ProductPage = ({products, viewbar,setSortBarValue}) => {
    let {name} = useParams();
    const {location} = useReactRouter();
    const params = new URLSearchParams(location.search);
    const SearchTerm = params.get('find_desc');
    const categoryParam = params.get('find_cat');
    SetVProductsFilters({category :name})
const [pageValue, setPageValue] = useState(1);


    const keywordsMatched = (item) => {
        const formattedKeywords = SearchTerm.trim().replace(/\s/g, '').toLowerCase();
        if (formattedKeywords.length === 0) return true;
        const { name, store_id } = item;
        const formattedName = name.toLowerCase();
        const formattedStore = store_id.toLowerCase();
        return formattedName.includes(formattedKeywords) || formattedStore.includes(formattedKeywords);
    }

const handlePageChange = (event, value) => {
    setPageValue(value);
}
const paginateItems = (items) => {
    const lastIndex = pageValue * viewbar;
    const firstIndex = lastIndex - viewbar;
    let itemsToDisplay = [];
    for (let i = 0; i < items.length; ++i) {
        if (firstIndex <= i && i < lastIndex) {
            itemsToDisplay.push(items[i]);
        }
    }
    return itemsToDisplay
}
const applyFiltersCatsTerm = (items) => {
    let itemsToDisplay = items.filter
    (
        item =>
             (categoryParam.replace(/[^A-Za-z0-9]/g, '').includes(item.category.replace(/[^A-Za-z0-9]/g, '')) || categoryParam.length === 0) &&
             keywordsMatched(item)
    )
    return itemsToDisplay;
}

return (
    <div className="productpage">
        {
            products ?
                (
                    <>
                        <Col lg={4} md={12}>
                            <SideBar/>
                        </Col>
                        <Col lg={8} md={12} className="products">
                            <Row className="search-bar">
                                <SearchInput placeholder="Search by product or name .."/>
                            </Row>
                            <Row className='select-bar'>
                                <ViewBar collection={products}/>
                                <SortBar/>
                            </Row>
                            <Row className="product-grid">
                                { (categoryParam || SearchTerm) ?
                               <ProductGrid products={paginateItems(applyFiltersCatsTerm(products))}/> :
                               <ProductGrid products={paginateItems(products)}/> }

                            </Row>
                            <Row className='pagination-row'>
                                <Pagination
                                    className='pagination-bar'
                                    count={Math.ceil(products.length / viewbar)}
                                    size='large'
                                    variant='outlined'
                                    color='primary'
                                    onChange={handlePageChange}/>
                            </Row>
                        </Col>
                    </>
                )
                :
                (
                    <SpinnerPage/>
                )
        }

    </div>
)}

const mapStatetoProps = createStructuredSelector({
    products: selectCollections,
    viewbar: selectViewBar,
    Keywords: selectSearchBarKeywords,
    v_products_filters: select_v_products_filters
});

const mapDispathtoProps = dispatch => (
    {
        SetVProductsFilters: filter => dispatch(SetVProductsFilters(filter)),
        setSortBarValue: value => dispatch(setSortBarValue(value)),

    }
);
export default connect(mapStatetoProps, mapDispathtoProps)(ProductPage);
