import React, {Component} from 'react';
import AdminKpIs from "../../components/DashboardComponent/AdminKPIs";
import StoreManagement from "../../components/DashboardComponent/StoreManagement";

class AdminDashboard extends Component {
    render() {
        return (
            <div className="container">
                <ul className="nav nav-tabs  mb-3" id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                type="button" role="tab" aria-controls="home" aria-selected="true">KPIs
                        </button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">Store Management
                        </button>
                    </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                        <AdminKpIs/>
                    </div>
                    <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab"><StoreManagement/></div>
                    <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
                </div>

            </div>
        );
    }
}

export default AdminDashboard;