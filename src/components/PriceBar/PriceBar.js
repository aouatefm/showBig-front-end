import React, { useState } from 'react';
import { Accordion, Card } from 'react-bootstrap';
import { Slider } from '@material-ui/core';

const PriceBar = () => {
    const [value, setValue] = useState([0, 100]);
    const [maxVal, setMaxVal] = useState(10000000)
    const [minVal, setMinVal] = useState(500000)

    const handleChange = (event, newValue) => {
        setValue(newValue);
        const min = newValue[0]/100*9500000+500000;
        const max = newValue[1]/100*9500000+500000;
        setMaxVal(max);
        setMinVal(min);
    };

    return (
        <Card className="pricebar">
            <Accordion.Toggle as={Card.Header} eventKey="1">
                Price
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
                <Card.Body>
                    <Slider
                        style={{width:"90%", left:'5%', right:'5%',}}
                        value={value}
                        onChange={handleChange}
                        aria-labelledby="range-slider"/>
                </Card.Body>
            </Accordion.Collapse>
            <Accordion.Collapse eventKey="1">
                <Card.Body style={{paddingLeft:"10%",}}>
                    <h6>{minVal} VND &lt; $$$ &lt; {maxVal} VND</h6>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    );
};

export default PriceBar;