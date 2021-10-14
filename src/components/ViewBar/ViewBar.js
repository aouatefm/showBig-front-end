import React from 'react';

import { connect } from 'react-redux';
import { setViewBarValue } from '../../redux/filters/filters-actions';

const ViewBar = ({ collection, setViewBarValue }) => {
    const generateViewOptions = (items) => {
        if (items.length <= 5) {
            return (
                <option
                    disabled
                    defaultChecked
                    value={ items.length }>
                    { items.length } of { items.length }
                </option>
            );
        }
        let content = [];
        content.push(<option key={5} value={5} defaultChecked>5 of { items.length }</option>);
        content.push(<option key={10} value={10}>10 of { items.length }</option>);
        if (items.length > 20) {
            content.push(<option key={20} value={20}>20 of { items.length }</option>);
        }
        content.push(<option key={ items.length } value={ items.length }>{ items.length } of { items.length }</option>);
        return content;
    }
    return (
        <div className='view-bar'>
            <label htmlFor='sort' style={{paddingRight : '0.5rem'}}>View:</label>{' '}
            <select id='sort' onChange={ (event) => {
                setViewBarValue(event.target.value);
            } }>
                { generateViewOptions(collection) }
            </select>
        </div>
    );
}



const mapDispathtoProps = dispatch => ({
    setViewBarValue: value => dispatch(setViewBarValue(value)),
});

export default connect(null, mapDispathtoProps)(ViewBar);