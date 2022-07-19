import React, {useEffect, useState} from 'react';
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import DashboardService from "../../services/DashboardService";
import './StoreManagement.css'
import Toggle from "../Toggle/Toggle.component";
import {DeleteIcon} from "../../assets/icons";
import UserService from "../../services/UserService";
import {useToasts} from "react-toast-notifications";
import DeleteConfirmation from "../VendorDashboard/DeleteConfirmation";
import VendorService from "../../services/VendorService";

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
    const {addToast} = useToasts();
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [id, setId] = useState(null);

    const showDeleteModal = ( id) => {
        setId(id);
        setDeleteMessage(`Are you sure you want to delete the store '${id}'?`);
        setDisplayConfirmationModal(true);
    };

    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };
    const submitDelete = async (id) => {
        const rest = await VendorService.deleteVendor(id)
        console.log(rest)
        if (rest.status === 200)
        {
            addToast("Store successfully deleted", {
                appearance: "success",
                autoDismiss: true,
                autoDismissTimeout: 2000,
                TransitionState: "exiting",
            });
        }
        else
        {
            addToast("An error occurred ", {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 2000,
                TransitionState: "exiting",
            });
        }
        setDisplayConfirmationModal(false);
        window.location.reload(false);
    }

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
                    <td scope="col">Action</td>
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
                                        <td style={{alignItems: "center", alignContent :"center"}}>
                                            <img
                                                src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg"
                                                alt="delete" style={{
                                                verticalAlign: "middle",
                                                width: "40px",
                                                height: "40px", cursor :'pointer'}}
                                                onClick={() => {showDeleteModal(vendor.store_id)}}
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
            <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}  id={id} message={deleteMessage}  />
        </div>
    );
}

export default StoreManagement;