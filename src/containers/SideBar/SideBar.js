import React, { Component } from 'react'
import { Accordion, Button } from 'react-bootstrap';
import CatBar from '../../components/CatBar/CatBar';
import SizeBar from '../../components/SizeBar/SizeBar';
import PriceBar from '../../components/PriceBar/PriceBar';
import ConditionBar from '../../components/ConditionBar/ConditionBar';

const SideBar = () => {
    return (
        <>
            <Accordion className="accordion">
                <CatBar/>
                <PriceBar/>
                <SizeBar/>
                <ConditionBar/>
            </Accordion>
            <Button
                type="submit"
                style={{
                    marginTop:"1cm",
                    width:"3cm",
                    float:"right",
                    backgroundColor:"gray",
                    borderColor:"gray",
                }}
            >
                Save
            </Button>
        </>
    )
}

export default SideBar;