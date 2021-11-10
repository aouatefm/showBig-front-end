import React from 'react';
import "./VendorPage.css";
import {Row} from "react-bootstrap";
import VendorCard from "../../components/VendorCard/VendorCard";

const VendorPage = ({vendors}) => {
         return (
        <Row className="row-vendor">
            {
                vendors.map(vendor => (
                    <div key={vendor.id}><VendorCard vendor={vendor}/></div>
                ))
            }

        </Row>
    );
}
export default VendorPage;


