import React, { useState } from 'react';
import { InputGroup, FormControl } from 'react-bootstrap';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import { selectSearchBarKeywords } from '../../redux/filters/filters-selectors';
import { setSearchBarFilters } from '../../redux/filters/filters-actions';

import './SearchInput.css';

const SearchInput = ({ keywords, setSearchBarFilters }) => {
    const [ currentKeywords, setCurrentKeywords ]= useState(keywords);

    const handleInput = (event) => {
        setCurrentKeywords(event.target.value);
        setSearchBarFilters(event.target.value);
    }

    return (
        <InputGroup>
            <FormControl
                placeholder="Search ..."
                aria-label="Search"
                aria-describedby="basic-addon2"
                value={ currentKeywords }
                onChange={ handleInput }/>
        </InputGroup>
    );
};

const mapStatetoProps = createStructuredSelector({
    keywords: selectSearchBarKeywords
});

const mapDispathtoProps = dispatch => ({
    setSearchBarFilters: (newKeywords) => dispatch(setSearchBarFilters(newKeywords))
});

export default connect(mapStatetoProps, mapDispathtoProps)(SearchInput);