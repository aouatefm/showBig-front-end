import React, {Component, useRef, useState} from 'react';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser, selectUserProfile} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import firebase, {storage} from "../../firebase/firebase";
import './ProfilePage.scss'
import {useToasts} from "react-toast-notifications";
import VendorService from "../../services/VendorService";
import UserService from "../../services/UserService";


const ProfilePage = ({ profile}) => {
    const uid = profile.uid
    console.log(profile)
    const [email, setEmail] = useState(profile.email)
    const [firstName, setFirstName] = useState(profile.first_name)
    const [lastName, setLastName] = useState(profile.last_name)
    const [phoneNumber, setPhoneNumber] = useState(profile.phone_number)
    const [shippingAddress, setShippingAddress] = useState(profile.shipping_address)
    const [billingAddress, setBillingAddress] = useState(profile.billing_address)
    const [image, setImage] = useState(profile.avatar)
    const [imageURL, setImageURL] = useState('')
    const [preview, setPreview] = useState(profile.avatar)
    const imageRef= useRef(null);
    const [ imageAdded, setImageAdded ] = useState(imageRef.current != null);
    const [loading, setLoading] = useState(false)

    const {addToast} = useToasts();
    const onImageChange = (e) => {
        const reader = new FileReader();
        let file = e.target.files[0]; // get the supplied file
        imageRef.current = e.target.files[0];
        setImageAdded(imageRef.current != null);
        setPreview(URL.createObjectURL(e.target.files[0]))
        if (file) {
            reader.onload = () => {
                if (reader.readyState === 2) {
                    //console.log(file);
                    setImage(file);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setImage(null);
        }
    };

    const uploadToFirebase = async () => {
        if (imageAdded) {
            setLoading(true)
            const storageRef = storage.ref(`shoBig/${imageRef.current.name}`);
            storageRef.put(imageRef.current)
            .then(async () => {
                const imageLogoUrl = await storageRef.getDownloadURL();
                console.log("ImageURL")
                console.log(imageLogoUrl)

            const response = await UserService.updateUser(email,firstName,lastName,phoneNumber,shippingAddress,billingAddress,imageLogoUrl,uid)
            if (response.status === 200) {
                addToast("Info successfully updated",
                    {
                        appearance: "success",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                        TransitionState: "exiting",
                    });
                setLoading(false)
            }


            else {
                addToast(response.data.message,
                    {
                        appearance: "error",
                        autoDismiss: true,
                        autoDismissTimeout: 1500,
                    });
                setLoading(false)
            }
            });

        }

        else
            {
                setLoading(true)
        const response = await UserService.updateUser(email,firstName,lastName,phoneNumber,shippingAddress,billingAddress,image,uid)
        if (response.status === 200) {
            addToast("Info successfully updated",
                {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                    TransitionState: "exiting",
                });
            setLoading(false)
        }
     else {
        addToast(response.data.message,
            {
                appearance: "error",
                autoDismiss: true,
                autoDismissTimeout: 1500,
            });
            setLoading(false)
    }
            }
    }


    return (
        <div className='container'>

            <img
                src={preview}
                alt="Uploaded Images"
                style={{width: '150px', borderRadius: '50%', marginLeft: '10px'}}
            />
            <br/>

            <div className="button-wrap">
                <label className="new-button" htmlFor="upload">Choose different picture
                    <input id="upload"  accept='image/*' type="file" onChange={(e) => {
                        onImageChange(e)
                    }}/>
                </label>
            </div>

            <h2>Personal Information</h2>
            <ul className="list-group">
                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Email</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">User name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={email} onChange={e => setEmail(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">First Name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={firstName} onChange={e => setFirstName(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Last Name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={lastName} onChange={e => setLastName(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Phone Number</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={phoneNumber} onChange={e => setPhoneNumber(e.currentTarget.value)}/>
                    </div>
                </li>



                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Sipping address</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={shippingAddress} onChange={e => setShippingAddress(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Billing address</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={billingAddress} onChange={e => setBillingAddress(e.currentTarget.value)}/>
                    </div>
                </li>

            </ul>
            <button type="button" className="btn btn-success" style={{margin: "30px"}} onClick={uploadToFirebase} disabled={loading}>Update Info</button>
        </div>
    );
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    profile: selectUserProfile,

});
export default connect(mapStateToProps)(ProfilePage);