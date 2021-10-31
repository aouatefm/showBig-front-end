import React, {Component} from 'react';
import NavThree from "../NavBar/NavThree";
import ComboChart from "../DashboardComponent/ComboChart";

class VendorDashboard extends Component {


    render() {
        return (
            <div className="row">
                <div className="col col-lg-2">
                    <NavThree/>
                </div>
                <div className="col">
                    <ComboChart />

                </div>
            </div>
        );
    }
}

export default VendorDashboard;
