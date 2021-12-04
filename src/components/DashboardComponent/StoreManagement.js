import React, {useEffect, useState} from 'react';
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import DashboardService from "../../services/DashboardService";
import './StoreManagement.css'
import VendorService from "../../services/VendorService";
import Toggle from "../Toggle/Toggle.component";

const useVendors = () => {
    const [vendors, setVendors] = useState([]);
    useEffect(async () => {
        const newVendors = await DashboardService.getVendorList()
        setVendors(newVendors);
    }, [])
    return vendors
}

const StoreManagement = () => {
    const vendors = useVendors()
        return (
        <div className="container">
            <h1 style={{textAlign: 'center', fontFamily: "fantasy", padding: "12px"}}>Store Management</h1>
            <p>
                <a style={{color: "#17A2B8"}}> All ({vendors.length})</a> |
                {/*:TODO update filter */}
                <a style={{color :"#28A745"}}> Active ({vendors.filter(function(item){return item.is_active === true}).length})</a> |
                <a style={{color :"#DC3545"}}> Pending ({vendors.filter(function(item){return item.is_active === false}).length})</a>
            </p>
            <table className="table">
                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Status</th>
                </tr>
                </thead>
                {
                    vendors ?
                        (
                            <tbody>
                            {
                                vendors.map((vendor, index) => (
                                    <tr key={index}>
                                        <th scope="row">{index + 1}</th>
                                        <td>{vendor.name}</td>
                                        <td>{vendor.description}</td>
                                        <td>{vendor.phone_number}</td>
                                        <th scope="col">

                                            <Toggle
                                                store={vendor.store_id}
                                                store_status={vendor.is_active}
                                                size={"large"}
                                                offstyle="btn-danger"
                                                onstyle="btn-success"
                                            />

                                        </th>
                                    </tr>
                                ))
                            }
                            </tbody>) :
                        (
                            <SpinnerPage/>
                        )
                }


            </table>
        </div>
    );
}

export default StoreManagement;