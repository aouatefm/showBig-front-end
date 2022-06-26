import React, {useEffect, useState} from 'react';
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import DashboardService from "../../services/DashboardService";
import './StoreManagement.css'
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
                    <td scope="col">#</td>
                    <td scope="col">Name</td>
                    <td scope="col">Description</td>
                    <td scope="col">Phone Number</td>
                    <td scope="col">Owner</td>
                    <td scope="col">Status</td>
                </tr>
                </thead>
                {
                    vendors ?
                        vendors.length === 0 ? <td colSpan="5" style={{color :'red' , textAlign: 'center' ,margin :'35px'}}> Sorry ! No Store Found</td> :
                        (
                            <tbody>
                            {
                                vendors.map((vendor, index) => (
                                    <tr key={index}>
                                        <td scope="row">{index + 1}</td>
                                        <td><a href={`/vendors/${vendor.store_id}`}>{vendor.name}</a></td>
                                        <td>{vendor.description}</td>
                                        <td>{vendor.phone_number}</td>
                                        <td><a href={`/edit_profile/${vendor.owner_id}`}>View owner profile</a></td>
                                        <td scope="col">

                                            <Toggle
                                                store={vendor.store_id}
                                                store_status={vendor.is_active}
                                                size={"large"}
                                                offstyle="btn-danger"
                                                onstyle="btn-success"
                                            />

                                        </td>
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