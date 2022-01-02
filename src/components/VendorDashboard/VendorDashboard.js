import React, {Component, useEffect, useState} from 'react';
import NavThree from "../NavBar/NavThree";
import ComboChart from "../DashboardComponent/ComboChart";
import Spline from "../DashboardComponent/Spline";
import DonutChart from "../DashboardComponent/DonutChart";
import Line from "../DashboardComponent/Line";
import DashboardService from "../../services/DashboardService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import './VendorDashboard.css'
import PolarAreaCharts from "../DashboardComponent/PolarAreaCharts";
const useStats = () => {
    const [stats, setStats] = useState([]);
    useEffect(async () => {
        const response = await DashboardService.get_vendor_stats()
        setStats(response);
    }, [])
    return stats
}

const VendorDashboard = () => {
    const stats = useStats()
    if (!stats )
        return (
        <div className="row">
            <div className="col col-lg-2" >
                <NavThree/>
            </div>
            <div className="container" >
                <h1 className="kpi_title">Key performance indicators</h1>
                <h4 style={{color :'red' , textAlign: 'center' ,margin :'35px'}}>
                Sorry ! No Stats Found</h4>

            </div>
        </div>
    )
    else
      return (
            <div className="row">
                <div className="col col-lg-2" >
                    <NavThree/>
                </div>
                <div className="container" >
                    <h1 className="kpi_title">Key performance indicators</h1>
                    {stats.monthly_sales_products ? <>
                        <div className="d-flex" style={{height: "70px"}}>
                            <span className="border values_kpis" >{stats.total_sales} <br/><span className="kpi_labels">Total Sales</span></span>
                            <span className="border values_kpis">{stats.sale_per_day.toFixed(2)}  <br/><span className="kpi_labels">Average Sale</span></span>
                            <span className="border values_kpis" >{stats.total_orders} <br/><span className="kpi_labels">Count Of Orders</span></span>
                            <span className="border values_kpis" >{stats.total_products}  <br/><span className="kpi_labels">Count Of Products</span></span>
                    </div>
                            <ComboChart sales={stats.monthly_sales_products.sales} products={stats.monthly_sales_products.products} dates={stats.monthly_sales_products.dates} />
                            <Spline sales={stats.daily_sales_products.sales} products={stats.daily_sales_products.products} dates={stats.daily_sales_products.dates} />
                    <div className="row">
                        <div className="col">
                            <PolarAreaCharts/>
                           {/*#TODO add top 5 products in the backend*/}
                        </div>
                        <div className="col">
                            <Line sales={stats.monthly_sales_products.sales} dates={stats.monthly_sales_products.dates} />
                        </div>
                    </div>
                        </> :
                        <SpinnerPage/>}
                </div>
            </div>
        );
}

export default VendorDashboard;
