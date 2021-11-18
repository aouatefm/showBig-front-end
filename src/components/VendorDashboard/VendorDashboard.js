import React, {Component} from 'react';
import NavThree from "../NavBar/NavThree";
import ComboChart from "../DashboardComponent/ComboChart";
import Spline from "../DashboardComponent/Spline";
import DonutChart from "../DashboardComponent/DonutChart";
import Line from "../DashboardComponent/Line";

class VendorDashboard extends Component {


    render() {
        return (
            <div className="row">
                <div className="col col-lg-2" >
                    <NavThree/>
                </div>
                <div className="col" >
                    <h1 className="kpi_title">Key performance indicators</h1>
                                        <div className="d-flex" style={{height: "70px"}}>
                        <span className="border kpi_values" >25 <br/><span className="kpi_labels">Total Sales</span></span>
                        <span className="border kpi_values">23569  <br/><span className="kpi_labels">Average Sale</span></span>
                        <span className="border kpi_values" >22 <br/><span className="kpi_labels">Count Of Orders</span></span>
                        <span className="border kpi_values" >61 <br/><span className="kpi_labels">Count Of Products</span></span>
                    </div>
                    <ComboChart  sales={[440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]}
                                 products={[23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]}
                                 dates={['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001']}/>
                    <Spline sales={[440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]}
                            products={[23, 42, 35, 27, 43, 22, 17, 31, 22, 22, 12, 16]}
                            dates={['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001']}/>
                    <div className="row">
                        <div className="col">
                            <DonutChart stores={[44, 55, 13, 43, 22]}/>
                        </div>
                        <div className="col">
                            <Line sales={[440, 505, 414, 671, 227, 413, 201, 352, 752, 320, 257, 160]}
                                  dates={['01 Jan 2001', '02 Jan 2001', '03 Jan 2001', '04 Jan 2001', '05 Jan 2001', '06 Jan 2001', '07 Jan 2001', '08 Jan 2001', '09 Jan 2001', '10 Jan 2001', '11 Jan 2001', '12 Jan 2001']}/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default VendorDashboard;
