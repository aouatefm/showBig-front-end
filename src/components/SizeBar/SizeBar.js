import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Slider } from '@material-ui/core';
import './SizeBar.css';

const SizeBar = () => {
    const [value, setValue] = useState([7, 10]);
    const [maxVal, setMaxVal] = useState(10000000)
    const [minVal, setMinVal] = useState(500000)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Card className="sizebar">
            <Accordion.Toggle as={Card.Header} eventKey="2">
                Size
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
                <Card.Body>
                    <Slider
                        style={{width:"90%", left:'5%', right:'5%', color:'3fb558'}}
                        value={value}
                        min={0}
                        max={20}
                        onChange={handleChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"/>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default SizeBar;