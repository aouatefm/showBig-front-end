import React from 'react';

import { connect } from 'react-redux';

import { setSortBarValue } from '../../redux/filters/filters-actions';

const SortBar = ({ setSortBarValue }) => {
    return (
        <div className='sort-bar'>
            <label htmlFor='sort' style={{paddingRight : '0.5rem'}}>Sort by price:</label>{' '}
            <select id='sort' onChange={ (event) => {
                console.log(event.target.value);
                setSortBarValue(event.target.value);
            } }>
                <option value='none' defaultChecked>None</option>
                <option value='high-to-low'>High to low</option>
                <option value='low-to-high'>Low to high</option>
            </select>
        </div>
    );
}

const mapDispathtoProps = dispatch => ({
    setSortBarValue: value => dispatch(setSortBarValue(value)),
});

export default connect(null, mapDispathtoProps)(SortBar);