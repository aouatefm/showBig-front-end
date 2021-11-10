import React, {Component} from 'react';

class AboutUs extends Component {
    render() {
        return (

            <div className="container">
                <h1 style={{textAlign: "center", fontSize: "93px"}}>Our <span style={{color :"#FFFD38", backgroundColor :"black"}}>Mission</span></h1>
                <div className="row">
                    <div className="col-sm">
                        <p style={{fontSize:" xx-large", fontFamily: "system-ui" ,fontWeight: "bolder",color : "gray",fontStyle: "italic"}}>
                            We believe that technology has the potential to transform everyday life in Africa, for the better.
                            We built ShoBig to help consumers access millions of goods and services conveniently and at the best
                            prices while opening up a new way for sellers to reach consumers and grow their businesses.
                        </p>
                    </div>
                    <div className="col-sm">
                        <img src="https://www.webmarketing-com.com/wp-content/uploads/2017/07/tof-ecommerce.jpg" style={{width :"600px", }}/>
                    </div>

                </div>
            </div>

        );
    }
}

export default AboutUs;