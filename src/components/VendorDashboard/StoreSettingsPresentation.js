import React, {useEffect, useRef, useState} from 'react';
import AutoComplete from "react-google-autocomplete";
import { storage} from "../../firebase/firebase";
import VendorService from "../../services/VendorService";
import {useHistory} from "react-router";

const StoreSettingsPresentation = ({store}) => {

    const history = useHistory ();

    const logo = useRef(null);
    const cover = useRef(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState(null);
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [youtube, setYoutube] = useState("");
    const [socials, setSocials] = useState("");
    const [loading, setLoading] = useState(false)
    const [logoAdded, setLogoAdded] = useState(logo.current != null);
    const [coverAdded, setCoverAdded] = useState(cover.current != null);
    const [logoURL, setLogoURL] = useState("");
    const [coverURL, setCoverURL] = useState("");
    const [lat, setLat] = useState("");
    const [lng, setLng] = useState("");


    useEffect(async () => {
        setName(store.name)
        setDescription(store.description)
        setAddress(store.address)
        setPhone(store.phone_number)
        setSocials(store.socials)
        setFacebook(store.facebook)
        setInstagram(store.instagram)
        setYoutube(store.youtube)
        setLogoURL(store.logo)
        setCoverURL(store.cover_image)
        console.log(logoURL)
        console.log(coverURL)
    }, [store]);


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
        if(logoAdded | coverAdded)
        {
        const storageLogoRef = storage.ref(`vendors/logo/${logo.current.name}`);
        const storageCoverRef = storage.ref(`vendors/cover/${cover.current.name}`);
        storageCoverRef.put(cover.current)
        storageLogoRef.put(logo.current)
            .then(async () => {
                const imageLogoUrl = await storageLogoRef.getDownloadURL();
                const imageCoverUrl = await storageCoverRef.getDownloadURL();
                await setLogoURL(imageLogoUrl)
                await setCoverURL(imageCoverUrl)
                console.log("logoURL")
                console.log(logoURL)
                //console.log(imageLogoUrl)
            })
        }
                const res = await VendorService.editVendor(name, description, address, phone, logoURL, coverURL, facebook, instagram, youtube, lat, lng,store.store_id)
                setLoading(false);
                history.push (`/vendors/${store.store_id}`);

    }
        return (
            <div>
                {store &&
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Name"
                               name="name"
                               value={name}
                               required
                               disabled
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
                    {socials &&
                    <div className="form-group">
                        <label>Socials</label>
                        <input className="form-control form-control-sm" type="url" placeholder="Facebook Link"
                               name="facebook" onChange={e => setFacebook(e.currentTarget.value)}
                               value={socials.facebook}/>
                        <input className="form-control form-control-sm" type="url" placeholder="Instagram Link"
                               name="instagram" onChange={e => setInstagram(e.currentTarget.value)}
                               value={socials.instagram}/>
                        <input className="form-control form-control-sm" type="url" placeholder="Youtube Link"
                               name="youtube" onChange={e => setYoutube(e.currentTarget.value)}
                               value={socials.youtube}/>
                    </div>
                    }
                    <button type="submit" className="btn btn-success" disabled={loading}>Edit Store</button>
                </form>
                }
            </div>
        );
}

export default StoreSettingsPresentation;