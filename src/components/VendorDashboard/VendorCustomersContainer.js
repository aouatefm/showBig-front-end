import React from 'react';
import {Link} from "react-router-dom";
import {DotsIcon} from "../../assets/icons";

const VendorCustomersContainer = ({customers}) => {
    return (

                    <div className="container">
                        <h1>Customers</h1>
                        <table className="table table-hover table-striped" style={{width: "1000px"}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Id</th>
                                <th scope="col">Name</th>
                                <th scope="col">Phone Number</th>
                                <th scope="col">Total orders</th>
                                <th scope="col">Balances</th>
                                <th scope="col">.</th>
                            </tr>
                            </thead>
                            <tbody>
                            {customers &&
                            <>
                                {customers.map((customer, index) => (
                                    <tr>
                                        <th scope="row">{index + 1}</th>
                                        <td>{customer.uid}</td>
                                        <td>{customer.display_name}</td>
                                        <td>{customer.phone_number}</td>
                                        <td>{customer.orders.length}</td>
                                        <td>{customer.orders_total} $</td>
                                        <td><Link to={{
                                            pathname: 'vendor-customers/VendorCustomersDetails',
                                            state :customer,
                                        }}><DotsIcon width="20"/></Link></td>
                                    </tr>
                                ))}
                            </>
                            }
                            </tbody>
                        </table>

                    </div>

    );
}

export default VendorCustomersContainer;