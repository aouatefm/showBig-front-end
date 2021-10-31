import { Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import VendorCard from "../VendorCard/VendorCard";
import './VendorGrid.css'
import VendorService from "../../services/VendorService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import SearchInput from "../SearchInput/SearchInput";

const  useVendors= () =>{
    const [vendors, setVendors] = useState([]);
    useEffect(async() => {
        const newVendors = await VendorService.getVendorList()
        setVendors(newVendors);
    }, [])
    return vendors
}
const VendorGrid =  () => {
    const vendors = useVendors()
    return (
        <div>

            {
                vendors ?
                    (
                        <Row className="row-vendor">

                            {
                                vendors.map(vendor => (
                                    <div key={vendor.id}><VendorCard vendor={vendor}/></div>
                                ))
                            }

                        </Row>
                    )
                    :
                    (
                        <SpinnerPage/>
                    )
            }

        </div>

    )
}

export default (VendorGrid)