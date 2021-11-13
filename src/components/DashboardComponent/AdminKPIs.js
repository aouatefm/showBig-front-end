import React, {Component, useEffect, useState} from 'react';
import ComboChart from "./ComboChart";
import Spline from "./Spline";
import DonutChart from "./DonutChart";
import Line from "./Line";
import DashboardService from "../../services/DashboardService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import './AdminKpIs.css'
const useStats = () => {
    const [stats, setStats] = useState([]);
    useEffect(async () => {
        const newStats = await DashboardService.get_general_stats()
        setStats(newStats);
    }, [])
    return stats
}

const AdminKpIs = () => {
    const stats = useStats()
    return (
        <div className="container">
            <h1 className="kpi_title">Key performance indicators</h1>
            {stats.monthly_sales_products ? <>

            <div className="d-flex" style={{height: "70px"}}>
                <span className="border kpi_values" >{stats.total_sales} <br/><span className="kpi_labels">Total Sales</span></span>
                <span className="border kpi_values">{stats.sale_per_day.toFixed(2)}  <br/><span className="kpi_labels">Average Sale</span></span>
                <span className="border kpi_values" >{stats.total_orders} <br/><span className="kpi_labels">Count Of Orders</span></span>
                <span className="border kpi_values" >{stats.total_products}  <br/><span className="kpi_labels">Count Of Products</span></span>
                <span className="border kpi_values">{stats.total_stores}  <br/><span className="kpi_labels">Count Of Stores </span></span>
                <span className="border kpi_values" >{stats.total_users} <br/><span className="kpi_labels">Count Of Users</span></span>
            </div>

                <ComboChart sales={stats.monthly_sales_products.sales} products={stats.monthly_sales_products.products} dates={stats.monthly_sales_products.dates} />
                <Spline sales={stats.daily_sales_products.sales} products={stats.daily_sales_products.products} dates={stats.daily_sales_products.dates} />
                <div className="row">
                    <div className="col">
                        <DonutChart stores={stats.top_stores}/>
                    </div>
                    <div className="col">
                        <Line sales={stats.monthly_sales_products.sales} dates={stats.monthly_sales_products.dates} />
                    </div>
                </div>

            </> : <SpinnerPage/>}

        </div>
    );
}

export default AdminKpIs;