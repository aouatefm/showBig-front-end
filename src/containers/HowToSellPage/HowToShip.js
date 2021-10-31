import React, { Component } from 'react'
import './HowToShip.css';
import { Row } from 'react-bootstrap';

export default class HowToShip extends Component {
    render() {
        return (
            <div className = "container ">
                <h1 className ="first-line text-center mt-5 " style={{color:'white', paddingTop: '2cm',fontSize: '300%',fontWeight: '700'}}>
                    How to ship
                </h1>
                <h1 className ="text-center" style={{color:'white',fontSize: '300%',fontWeight: '700'}}>
                    and receive money!
                </h1>
                <div className="row mt-5 mb-5">
                    <div className ="col-4 text-center titlebox align-middle">
                        <h2 className ="mt-5">
                            SHIP SHOES
                        </h2>
                    </div>
                    <div className ="col-8 infobox">
                        <div className ="ml-5 mt-3">1. We will notify when your shoes is sold via email.</div>
                        <div className ="ml-5 mt-3">2. The email includes shipping label.</div>
                        <div className ="ml-5 mt-3">3. First stop of the shoes is our warehouse.</div>
                        <div className ="ml-5 mt-3 mb-3">4. We'll legit-check and ensure your shoes is delivered to the customer.</div>
                    </div>
                </div>
                <div className="row mt-5 mb-3" style ={{paddingBottom:"7cm"}}>
                    <div className ="col-4 text-center justify-content-center titlebox2">
                        <h2 className ="mt-5" >
                            Delivery
                        </h2>
                    </div>
                    <div className ="col-8 infobox2">
                        <div className ="ml-5 mt-3">1. We collect money from the customer when the product is delivered.</div>
                        <div className ="ml-5 mt-3">2. We get 5% of the transaction fee.</div>
                        <div className ="ml-5 mt-3 mb-3">3. Finally, you receive the rest!</div>
                    </div>
                </div>
            </div>
        )
    }
}