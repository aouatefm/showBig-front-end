import { Row} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import VendorCard from "../VendorCard/VendorCard";
import './VendorGrid.css'
import SpinnerPage from "../../containers/Spinner/SpinnerPage";


const VendorGrid =  ({vendors}) => {
    return (
        <div>

            {
                vendors ?
                    (
                        <Row className="row-vendor">

                            {
                                vendors.map(vendor => (
                                    <div key={vendor.store_id}><VendorCard vendor={vendor} /></div>
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