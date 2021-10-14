import React, { Component } from 'react'
import { Accordion, Button } from 'react-bootstrap';
import "./SideBar.css";


const SideBar = () => {
    return (
        <div className='sidebar'>
            <div className='sidebar-cell'>
                <div className='sidebar-header' >
                    <span className='sidebar-header-title'>Brands</span>

                </div>

            </div>
            <div className='sidebar-cell'>
                <div className='sidebar-header' >
                    <span className='sidebar-header-title'>Price</span>

                </div>

            </div>
            <div className='sidebar-cell'>
                <div className='sidebar-header' >
                    <span className='sidebar-header-title'>Size</span>

                </div>

            </div>
            <div className='sidebar-cell-2'>
                <div className='sidebar-header' >
                    <span className='sidebar-header-title'>Conditions</span>

                </div>

            </div>

                <div className='sidebar-cell-2'>
                    <Button
                        className='sidebar-button'
                        variant="outline-dark"
                        type="submit"

                    >
                        Apply
                    </Button>
                </div>

        </div>

    )
}

export default SideBar;