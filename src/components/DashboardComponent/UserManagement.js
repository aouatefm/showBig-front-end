import React, {useEffect, useState} from 'react';
import DashboardService from "../../services/DashboardService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import Logo from "../../assets/blck.png";
import {userRole} from "../../utils";
import {Link} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import {useToasts} from "react-toast-notifications";

import {
    AddressIcon,
    ConnectedProfileIcon,
    DeleteIcon,
    EditIcon,
    PlusIcon,
    ProfileIcon,
    ShopIcon,
    TrashIcon
} from "../../assets/icons";
import "./UserManagement.css"
import UserService from "../../services/UserService";
import Button from "react-bootstrap/Button";
const useUsers = () => {
    const [users, setUsers] = useState([]);
    useEffect(async () => {
        const NewUsers = await DashboardService.getUserList()
        setUsers(NewUsers);
    }, [])
    return users
}

const UserManagement = () => {
    const users = useUsers()
    const {addToast} = useToasts();
    const handleDelete = async (id) => {
        const rest = await UserService.deleteUser(id)
        addToast("User successfully deleted", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 2000,
            TransitionState: "exiting",
        });
        window.location.reload(false);

    }
    return (
        <div>
            <h1>User Management </h1>
            <Link className="add-user-link" to={{pathname: `/add-user`}}><span className="add-user">Add User</span></Link>
            <table className="table table-hover table-sm" style={{margin: '15px'}}>
                <thead>
                <tr>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>#</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Full Name</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Email</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>System Role</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Joined</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Action</th>
                </tr>
                </thead>
                {
                    users ?
                        users.length === 0 ?
                            <td colSpan="5" style={{color: 'red', textAlign: 'center', margin: '35px'}}> Sorry ! No User
                                Found</td> :
                            (
                                <tbody>
                                {
                                    users.map((user, index) => (
                                        <tr key={index}>
                                            <th scope="row"
                                                style={{verticalAlign: "middle", textAlign: "center"}}>{index + 1}</th>
                                            <td style={{verticalAlign: "middle"}}><img src={user.avatar}
                                                                                       className="img-thumbnail"
                                                                                       alt="user img"
                                                                                       style={{
                                                                                           verticalAlign: "middle",
                                                                                           width: "50px",
                                                                                           height: "50px",
                                                                                           marginRight: "3px"
                                                                                       }}/>{user.first_name} {user.last_name}
                                            </td>
                                            <td style={{verticalAlign: "middle", color: "blueviolet"}}>{user.email}</td>
                                            <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                                {/*{userRole(user)}*/}
                                                {
                                                    userRole(user) === 'user' ? <ProfileIcon width={25}/> :
                                                        userRole(user) === 'vendor' ? <><ShopIcon width={25}/> <br/><a href={`/vendors/${user.store_id}`}>{user.store_id}</a></> :
                                                            <img src={Logo} alt="Avatar" style={{
                                                                verticalAlign: "middle",
                                                                width: "25px",
                                                                height: "25px"
                                                            }}/>
                                                }
                                            </td>
                                            <td style={{verticalAlign: "middle", textAlign: "center"}}>{user.created_at ? user.created_at : ""}</td>
                                            <td style={{verticalAlign: "middle"}}>

                                                {/*<span style={{margin: "3px",cursor :"pointer"}} data-toggle="modal"*/}
                                                {/*      data-target="#exampleModalCenter" className="action">*/}
                                                <span style={{margin: "3px", cursor: "pointer"}}>
                                                     <Link to={{pathname: `/edit_profile/${user.uid}`}}>
                                                     <EditIcon width={18} color="orange"/>
                                                     </Link>
                                                    </span>

                                                <span style={{margin: "3px", cursor: "pointer"}} className="action"><img
                                                    src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg"
                                                    alt="delete" style={{
                                                    verticalAlign: "middle",
                                                    width: "18px",
                                                    height: "18px"}}
                                                    onClick={() => {handleDelete(user.uid)}}/>
                                                </span>
                                                <div className="modal fade" id="exampleModalCenter" tabIndex="-1"
                                                     role="dialog" aria-labelledby="exampleModalCenterTitle"
                                                     aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title"
                                                                    id="exampleModalLongTitle">Modal title</h5>
                                                                <button type="button" className="close"
                                                                        data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                {user.first_name} {user.last_name}
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary"
                                                                        data-dismiss="modal">Close
                                                                </button>
                                                                <button type="button" className="btn btn-primary">Save
                                                                    changes
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

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


export default UserManagement;