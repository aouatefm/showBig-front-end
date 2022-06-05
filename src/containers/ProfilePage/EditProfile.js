import React, {useEffect, useRef, useState} from 'react';
import './EditProfile.css'
import {createStructuredSelector} from "reselect";
import { selectUserProfile} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import {useParams} from "react-router-dom";
import UserService from "../../services/UserService";
import ProfilePage from "./ProfilePage";
import {useToasts} from "react-toast-notifications";
import {storage} from "../../firebase/firebase";
import CouponService from "../../services/CouponService";
import ProductService from "../../services/ProductService";
import SpinnerPage from "../Spinner/SpinnerPage";

function useUser(id) {
    const [user, setUser] = useState([]);
    useEffect(async () => {
        const newUser = await UserService.getUser(id);
        setUser(newUser);
    }, [])
    return [user]
}
const EditProfile = ({ props}) => {
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [phoneNumber, setPhoneNumber] = useState(null)
    const [shippingAddress, setShippingAddress] = useState("")
    const [billingAddress, setBillingAddress] = useState("")
    const [image, setImage] = useState(null)
    const [imageURL, setImageURL] = useState('')
    const [preview, setPreview] = useState('')
    const imageRef= useRef(null);
    const [ imageAdded, setImageAdded ] = useState(imageRef.current != null);
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState();

    let {uid} = useParams();
    //const [profile] = useUser(uid);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const profile = await UserService.getUser(uid)
                setProfile(profile);
                setEmail(profile.email)
                setFirstName(profile.first_name)
                setLastName(profile.last_name)
                setPhoneNumber(profile.phone_number)
                setShippingAddress(profile.shipping_address)
                setBillingAddress(profile.billing_address)
                setPreview(profile.avatar)
                setImage(profile.avatar)

            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, []);


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
            {profile ?
            <div>
            <img
                src={preview}
                alt="Uploaded Images"
                style={{width: '150px', borderRadius: '50%', marginLeft: '10px'}}
            />
            <br/>

            <div className="button-wrap">
                <label className="new-button" htmlFor="upload">Choose different picture
                    <input id="upload" accept='image/*' type="file" onChange={(e) => {
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
                               aria-describedby="inputGroup-sizing-sm" value={email}
                               onChange={e => setEmail(e.currentTarget.value)}/>
                    </div>
                </li>
                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">User name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={email}
                               onChange={e => setEmail(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">First Name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={firstName}
                               onChange={e => setFirstName(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Last Name</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={lastName}
                               onChange={e => setLastName(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Phone Number</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={phoneNumber}
                               onChange={e => setPhoneNumber(e.currentTarget.value)}/>
                    </div>
                </li>


                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Sipping address</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={shippingAddress}
                               onChange={e => setShippingAddress(e.currentTarget.value)}/>
                    </div>
                </li>

                <li className="list-group-item">
                    <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                            <span className="input-group-text" id="inputGroup-sizing-sm">Billing address</span>
                        </div>
                        <input type="text" className="form-control" aria-label="Small"
                               aria-describedby="inputGroup-sizing-sm" value={billingAddress}
                               onChange={e => setBillingAddress(e.currentTarget.value)}/>
                    </div>
                </li>

            </ul>
            <button type="button" className="btn btn-success" style={{margin: "30px"}} onClick={uploadToFirebase}
                    disabled={loading}>Update Info
            </button>
        </div>
            : <SpinnerPage/>}
</div>
    );
}



const mapStateToProps = createStructuredSelector({
    profile: selectUserProfile,
});
export default connect(mapStateToProps)(EditProfile);