import React, {useRef, useState} from 'react';
import './BecomeVendor.css'
import {auth, storage} from "../../firebase/firebase";
import VendorService from "../../services/VendorService";
import AutoComplete from "react-google-autocomplete";

const BecomeVendor = () => {
    const logo = useRef(null);
    const cover = useRef(null);
    const [ name, setName ]= useState("");
    const [ description, setDescription ]= useState("");
    const [ address, setAddress ]= useState("");
    const [ phone, setPhone ]= useState(null);
    const [ facebook, setFacebook ]= useState("");
    const [ instagram, setInstagram ]= useState("");
    const [ youtube, setYoutube ]= useState("");
    const [ loading, setLoading ] = useState(false)
    const [ logoAdded, setLogoAdded ] = useState(logo.current != null);
    const [ coverAdded, setCoverAdded ] = useState(cover.current != null);
    const [ logoURL, setLogoURL ] = useState("");
    const [ coverURL, setCoverURL ] = useState("");
    const [ lat, setLat ]= useState("");
    const [ lng, setLng ]= useState("");

    const handleLogoChange = (event) => {
        logo.current = event.target.files[0];
        setLogoAdded(logo.current != null);
    }
    const handleCoverChange = (event) => {
        cover.current = event.target.files[0];
        setCoverAdded(cover.current != null);
    }
    const handlePlaceSelected = (place) => {
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());
    }

       const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
           if (!auth.currentUser) {
               alert('You have to log in first!')
               return;
           }
           const storageLogoRef = storage.ref(`vendors/logo/${logo.current.name}`);
           const storageCoverRef = storage.ref(`vendors/cover/${cover.current.name}`);
           storageLogoRef.put(logo.current)
           storageCoverRef.put(cover.current)
               .then(async () => {
                   const imageLogoUrl = await storageLogoRef.getDownloadURL();
                   const imageCoverUrl = await storageCoverRef.getDownloadURL();
                   await setLogoURL(logoURL)
                   await setCoverURL(coverURL)
                   const res =  VendorService.addVendor(name,description,address,phone,imageLogoUrl,imageCoverUrl,facebook,instagram,youtube,lat,lng)

                   setLoading(false);
           }).catch(error => {
               console.log(error);
               alert(error)
           });
    }
    return (
            <div className="container">
                <h1>Join Us</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name"
                               name="name"
                               value={name}
                               required
                               onChange={e => setName(e.currentTarget.value)}/>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Description"
                               name="description"
                               value={description}
                               onChange={e => setDescription(e.currentTarget.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <AutoComplete
                            type="text"
                            className="form-control" placeholder="Address"
                            value={address}
                            onChange={e => setAddress(e.currentTarget.value)}
                            apiKey={"AIzaSyB8BtMRdu9tvtEaHDsoRFKafb3eDeiUcGA"}
                            required
                            // onPlaceSelected={(place) => {
                            //     setLat(place.geometry.location.lat())
                            //     setLng(place.geometry.location.lng())
                            // }}
                            onPlaceSelected={handlePlaceSelected}
                        />
                    </div>
                    <div className="form-group">
                        <input type="number" className="form-control" placeholder="Phone Number"
                               name="phone"
                               value={phone}
                               onChange={e => setPhone(e.currentTarget.value)}
                               required/>
                    </div>
                    <div className="form-group">
                        <label>Store Logo</label>
                        <input type="file" className="form-control" placeholder="logo"
                               name="logo"
                               id="logoFile"
                               accept='image/*'
                               onChange={handleLogoChange}/>

                    </div>
                    <div className="form-group">
                        <label>Store Cover Image</label>
                        <input type="file" className="form-control" placeholder="cover"
                               name="cover"
                               id="coverFile"
                               accept='image/*'
                               onChange={handleCoverChange}/>
                    </div>
                    <div className="form-group">
                        <label>Socials</label>
                        <input className="form-control form-control-sm" type="url" placeholder="Facebook Link" name="facebook" onChange={e => setFacebook(e.currentTarget.value)}/>
                        <input className="form-control form-control-sm" type="url" placeholder="Instagram Link" name="instagram" onChange={e => setInstagram(e.currentTarget.value)}/>
                        <input className="form-control form-control-sm" type="url" placeholder="Youtube Link" name="youtube" onChange={e => setYoutube(e.currentTarget.value)}/>
                    </div>
                    <button type="submit" className="btn-add-store">Add Store</button>
                </form>
            </div>
        );

}

export default BecomeVendor;