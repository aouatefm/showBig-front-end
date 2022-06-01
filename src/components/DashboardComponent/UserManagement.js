import React, {useEffect, useState} from 'react';
import DashboardService from "../../services/DashboardService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import Logo from "../../assets/blck.png";
import {userRole} from "../../utils";
import {Link} from 'react-router-dom';
import {ConnectedProfileIcon, DeleteIcon, EditIcon, PlusIcon, ProfileIcon, ShopIcon} from "../../assets/icons";
import "./UserManagement.css"
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
    console.log("users")
    console.log(users)
    return (
        <div>

            <table className="table table-hover table-sm">
                <thead>
                <tr>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>#</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Full Name</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Email</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>System Role</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Joined</th>
                    <th scope="col" style={{verticalAlign: "middle", textAlign: "center"}}>Action</th>
                    {/*<th scope="col">Status</th>*/}
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
                                            <td style={{verticalAlign: "middle",  color : "blueviolet"}}>{user.email}</td>
                                            <td style={{verticalAlign: "middle", textAlign: "center"}}>
                                                {/*{userRole(user)}*/}
                                                {
                                                    userRole(user) === 'user' ? <ProfileIcon width={25}/> :
                                                        userRole(user) === 'vendor' ? <ShopIcon width={25}/> :
                                                            <img src={Logo} alt="Avatar" style={{
                                                                verticalAlign: "middle",
                                                                width: "25px",
                                                                height: "25px"
                                                            }}/>
                                                }
                                            </td>
                                            <td style={{
                                                verticalAlign: "middle",
                                                textAlign: "center"
                                            }}>{user.created_at ? user.created_at : ""}</td>
                                            <td style={{verticalAlign: "middle"}}>

                                                    {/*<span style={{margin: "3px",cursor :"pointer"}} data-toggle="modal"*/}
                                                    {/*      data-target="#exampleModalCenter" className="action">*/}
                                                <span style={{margin: "3px",cursor :"pointer"}} >
                                                         <a role="menuitem"  tabIndex="-1" className="profile_page" href="/profile_page">
                                                        <EditIcon width={18} color="orange"/>
                                                         </a>


                                                    </span>

                                                <span style={{margin: "3px",cursor :"pointer"}} className="action"><img
                                                    src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg"
                                                    alt="delete" style={{
                                                    verticalAlign: "middle",
                                                    width: "18px",
                                                    height: "18px"
                                                }}/></span>
                                                <div className="modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                                                    <div className="modal-dialog modal-dialog-centered" role="document">
                                                        <div className="modal-content">
                                                            <div className="modal-header">
                                                                <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
                                                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                                                    <span aria-hidden="true">&times;</span>
                                                                </button>
                                                            </div>
                                                            <div className="modal-body">
                                                                {user.first_name} {user.last_name}
                                                            </div>
                                                            <div className="modal-footer">
                                                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                                                <button type="button" className="btn btn-primary">Save changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </td>
                                            {/*<th scope="col">*/}

                                            {/*    <Toggle*/}
                                            {/*        store={vendor.store_id}*/}
                                            {/*        store_status={vendor.is_active}*/}
                                            {/*        size={"large"}*/}
                                            {/*        offstyle="btn-danger"*/}
                                            {/*        onstyle="btn-success"*/}
                                            {/*    />*/}

                                            {/*</th>*/}
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