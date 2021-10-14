import React, {Component} from 'react';
import NavThree from "../NavBar/NavThree";

class VendorDashboard extends Component {
    render() {
        return (
                    <div className="row">
                        <div className="col col-lg-2" >
                            <NavThree/>
                        </div>
                        <div className="col" >
                            One of three columns
                        </div>
                    </div>
        );
    }
}
export default VendorDashboard;
