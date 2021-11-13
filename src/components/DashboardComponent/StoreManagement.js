import React, {useEffect, useState} from 'react';
import VendorService from "../../services/VendorService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";


const  useVendors= () =>{
    const [vendors, setVendors] = useState([]);
    useEffect(async() => {
        const newVendors = await VendorService.getVendorList()
        setVendors(newVendors);
    }, [])
    return vendors
}

const StoreManagement = () => {
    const vendors = useVendors()
        return (
            <div className="container">
                <h1 style={{textAlign :'center',fontFamily: "fantasy" ,padding :"12px"}} >Store Management</h1>
                <p>
                    <a> All (15)</a> |
                    <a style={{color :"#28A745"}}> Completed (3)</a> |
                    <a style={{color :"#17A2B8"}}> Pending (2)</a> |
                    <a style={{color :"#DC3545"}}> Canceled (1)</a> |
                    <a style={{color :"#FFC107"}}> Processing (9)</a>
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
                                        vendors.map((vendor,index) => (
                                        <tr>
                                        <th scope="row">{index+1}</th>
                                        <td>{vendor.name}</td>
                                        <td>{vendor.description}</td>
                                        <td>{vendor.phone_number}</td>
                                        <th scope="col">Pending</th>
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