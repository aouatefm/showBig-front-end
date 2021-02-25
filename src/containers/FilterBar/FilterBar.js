import React, { Component } from 'react'
import './ProductPage.css';
import PriceBar from './PriceBar';
import SizeBar from './SizeBar';
import ConditionBar from './ConditionBar';
import BrandBar from './BrandBar';

const FilterBar = () => {
    return (
        <div className ="container">
            <h5>Filter by</h5>
            <hr/>
            <BrandBar/>
            <hr/>
            <PriceBar/>
            <hr/>
            <SizeBar/>
            <hr/>
            <ConditionBar/>
        </div>
    )
}