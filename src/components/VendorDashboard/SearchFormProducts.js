import React, {useEffect, useState} from 'react';

import {Link} from "react-router-dom";
import Moment from "moment";
import CategoriesService from "../../services/CategoriesService";
import SearchInput from "../SearchInput/SearchInput";
import {SetVProductsFilters} from "../../redux/filters/filters-actions";
import {connect} from "react-redux";
import './SearchFormProducts.css'
import {PlusIcon, SignOutIcon} from "../../assets/icons";

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    useEffect(async () => {
        CategoriesService.getCategoriesList().then(cat => {
            setCategories(cat.data);
        })
    }, [])
    return categories
}
const SearchFormProducts = ({prods, SetVProductsFilters,store}) => {
    const unique_dates = [...new Set(prods.map(item => Moment(item.created_at).format('MMMM')))]
    const categories = useCategories()
    const handleDateChange = (e) => {
        SetVProductsFilters(
            {
                date: e.target.value,
            }
        );
    }
    const handleStatusChange = (e) => {
        SetVProductsFilters(
            {
                status: e.target.value,
            });

    }
    const handleCategoryChange = (e) => {
        SetVProductsFilters(
            {
                category: e.target.value,
            }
        );
    }

    const handleClearFilter = () => {
        SetVProductsFilters(
            {
                date: "",
                status: "",
                category: "",
            }
        );
    };
    return (
        <div style={{marginTop: "5%", marginRight: "5%"}}>
            <h1 style={{textTransform: "uppercase",fontWeight:"bold"}}>{store}</h1>
            <h5 style={{textTransform: "lowercase",margin :"10px",position: "absolute", right:"90px", top:"100px"}} >
                <Link to={{ pathname: `/vendors/${store}`}} className="storeLink">VIEW YOUR STORE <span><SignOutIcon width="20"/></span></Link>
            </h5>
            <Link to='/add'>
                <button type="button" className="btn btn-dark add"
                        style={{margin :"10px",position: "absolute", right:"90px", top:"51px"}}>
                    <PlusIcon width="20"/><span style={{margin :"7px"}}> Add Product</span></button>
            </Link>
            <div className="row">

                <div className="col-md-4 mb-3">
                    <SearchInput/>

                </div>
                <div className="col-md-4 mb-3">

                    <select className="form-control form-control-sm"
                            style={{  height: "38px",}}
                            onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {
                            categories &&
                            <>
                                {categories.map(category => (
                                    <option key="{category.id}" value={category.name}>{category.name}</option>
                                ))}
                            </>
                        }
                    </select>
                </div>
                <>
                    <div className="row">
                        <div className="col-md-4 mb-3">
                            <select className="form-control form-control-sm"
                                    style={{width: "206px",marginLeft :"14px",height :"38px",marginRight :"100px"}} onChange={handleStatusChange}>
                                <option value="">Status</option>
                                <option>Draft</option>
                                <option>Online</option>
                            </select>
                        </div>
                        <div className="col-md-4 mb-3">
                            <select className="form-control form-control-sm"
                                    style={{width: "206px",height :"38px",marginLeft :"0px"}}
                                    onChange={handleDateChange}>
                                <option value="">All Dates</option>
                                {
                                    unique_dates &&
                                    <>
                                        {unique_dates.map(date => (
                                            <option value={date}>{date}</option>
                                        ))}
                                    </>
                                }

                            </select>
                        </div>

                        <button type="button" className="btn btn-dark clear"
                                style={{marginRight: "10px",height :"38px",width :"180px",}}
                                onClick={handleClearFilter}>Clear Filter
                        </button>
                    </div>
                </>
            </div>



        </div>
    );
}

const mapDispathtoProps = dispatch => (
    {
        SetVProductsFilters: filter => dispatch(SetVProductsFilters(filter)),
    }
);

export default connect(null, mapDispathtoProps)(SearchFormProducts);
