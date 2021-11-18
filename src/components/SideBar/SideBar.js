import React, { useState } from 'react'
import { Button } from 'react-bootstrap';
import { Slider } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectSideBarFilters, selectSideBarDropped } from '../../redux/filters/filters-selectors';
import { setSideBarFilters, toggleSideBarDropped } from '../../redux/filters/filters-actions';

import "./SideBar.css";

const SideBar = (props) => {
    const {dropped, toggleSideBarDropped, filters, setSideBarFilters,} = props;
    const {brands, staticBrands, minPrice, maxPrice, minRate, maxRate, conditions,} = filters;

    const [ priceVal, setPrice ] = useState([minPrice, maxPrice]);
    const [ RateVal, setRate ] = useState([minRate, maxRate]);
    const [ selectedConditions, setSelectedConditions ] = useState([...conditions]);
    const [ selectedBrands, setSelectedBrands ] = useState([...brands]);


    const handlePriceChange = (event, newPrice) => {
        console.log("newPrice")
        console.log(newPrice)
        setPrice(newPrice);
    }

    const handleRateChange = (event, newRate) => {
        console.log("newRate")
        console.log(newRate)
        setRate(newRate);
    };

    const handleBrandCheckboxClicked = (brand) => {
        if (selectedBrands.includes(brand)) {
            const currentBrands = [...selectedBrands];
            currentBrands.splice(selectedBrands.indexOf(brand), 1);
            setSelectedBrands(currentBrands);
        } else {
            setSelectedBrands([ ...selectedBrands, brand ]);
        }
    }

    const handleConditionsCheckboxClicked = (condition) => {
        if (selectedConditions.includes(condition)) {
            const currentConditions = [...selectedConditions];
            currentConditions.splice(selectedConditions.indexOf(condition), 1);
            setSelectedConditions(currentConditions);
        } else {
            setSelectedConditions([ ...selectedConditions, condition ]);
        }
    }

    const handleApply = () => {
        setSideBarFilters(
            {
                brands: selectedBrands,
                minPrice: priceVal[0],
                maxPrice: priceVal[1],
                minRate: RateVal[0],
                maxRate: RateVal[1],
                conditions: selectedConditions,
            }
        );
    };

    const dropdownToggle = (
        dropped
            ? <span className='dropdown-icon' aria-labelledby='minus' role='img'>&#10134;</span>
            : <span className='dropdown-icon' aria-labelledby='plus' role='img'>&#10133;</span>
    );

    const catagories = (
        <div className='items'>
            {
                staticBrands.map((brand, index) =>
                    <p key={ index }>
                        <input
                            className='items-icon'
                            type='checkbox'
                            id='catagories'
                            value={ brand }
                            defaultChecked={ selectedBrands.includes(brand) }
                            onClick={ () => handleBrandCheckboxClicked(brand) }/>
                        <span>{ brand.toUpperCase() }</span>
                    </p>
                )
            }
        </div>
    );

    const price = (
        <div className='sidebar-slider'>
            <Slider
                value={priceVal}
                min={0}
                max={1000}
                onChange={ handlePriceChange }
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"/>
            <h6 style={{textAlign:"center",}}>{priceVal[0]} &lt; Price ($) &lt; {priceVal[1]}</h6>
        </div>
    );

    const rate = (
        <div className='sidebar-slider' >
            <Slider
                value={RateVal}
                min={0}
                max={5}
                onChange={ handleRateChange }
                valueLabelDisplay="auto"
                aria-labelledby="range-slider"/>
            <h6 style={{textAlign:"center",}}>{RateVal[0]} &lt; Ratings (&#9733;) &lt; {RateVal[1]}</h6>

        </div>
    );

    const conditionsOptions = (
        <div className='items'>
            <p>
                <input
                    className='items-icon'
                    type='checkbox'
                    id='catagories'
                    value='new'
                    defaultChecked={ selectedConditions.includes('new') }
                    onClick={ () => handleConditionsCheckboxClicked('new') }/>
                <span>NEW</span>
            </p>
            <p>
                <input
                    className='items-icon'
                    type='checkbox'
                    id='catagories'
                    value='free-shipping'
                    defaultChecked={ selectedConditions.includes('free-shipping') }
                    onClick={ () => handleConditionsCheckboxClicked('free-shipping') }/>
                <span>FREE SHIPPING</span>
            </p>
        </div>
    );

    return (
        <div className={dropped ? 'sidebar dropped' : 'sidebar'} style={{marginTop : "150px"}}>
            <div className='sidebar-cell'>
                <div className='sidebar-header' onClick={toggleSideBarDropped}>
                    <span className='sidebar-header-title'>Stores</span>
                    {dropdownToggle}
                </div>
                { dropped ? catagories : "" }
            </div>
            <div className='sidebar-cell'>
                <div className='sidebar-header' onClick={toggleSideBarDropped}>
                    <span className='sidebar-header-title'>Price</span>
                    {dropdownToggle}
                </div>
                { dropped ? price : "" }
            </div>
            <div className='sidebar-cell'>
                <div className='sidebar-header' onClick={toggleSideBarDropped}>
                    <span className='sidebar-header-title'>Ratings</span>
                    {dropdownToggle}
                </div>
                { dropped ? rate : "" }
            </div>
            <div className='sidebar-cell-2'>
                <div className='sidebar-header' onClick={toggleSideBarDropped}>
                    <span className='sidebar-header-title'>Conditions</span>
                    {dropdownToggle}
                </div>
                { dropped ? conditionsOptions : "" }
            </div>
            { dropped ? (
                <div className='sidebar-cell-2'>
                    <Button
                        className='sidebar-button'
                        variant="outline-dark"
                        type="submit"
                        onClick={ handleApply } >
                        Apply
                    </Button>
                </div>
            ) : "" }
        </div>
    )
}
const mapStatetoProps = createStructuredSelector({
    filters: selectSideBarFilters,
    dropped: selectSideBarDropped,
});

const mapDispatchtoProps = dispatch => ({
    setSideBarFilters: newValues => dispatch(setSideBarFilters(newValues)),
    toggleSideBarDropped: () => dispatch(toggleSideBarDropped()),
});

export default connect(mapStatetoProps, mapDispatchtoProps)(SideBar);