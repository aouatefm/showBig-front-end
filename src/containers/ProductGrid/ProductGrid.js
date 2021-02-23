import React from 'react';
import Card from '../../components/Card/Card';

import './ProductGrid.css';

const Grid = (props) => (
    <div className="container">
        <h3 className="style">BEST SELLERS</h3>
        <div className="row">
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
            <div className="col-9 col-md-6 col-lg-3 my-3"><Card img="https://target.scene7.com/is/image/Target/GUEST_acf7e487-009f-4c9f-afc0-b62da7261c92?wid=488&hei=488&fmt=pjpeg"/></div>
        </div>
    </div>
);

export default Grid;