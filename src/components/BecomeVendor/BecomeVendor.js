import React, {useRef, useState} from 'react';
import './BecomeVendor.css'
import {auth, storage} from "../../firebase/firebase";
import VendorService from "../../services/VendorService";
import AutoComplete from "react-google-autocomplete";
import ImageUploader from "react-images-upload";
import { useToasts } from "react-toast-notifications";
import useReactRouter from "use-react-router";

const BecomeVendor = () => {
    const {history} = useReactRouter();
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
    const [ logoAdded, setLogoAdded ] = useState(false);
    const [ coverAdded, setCoverAdded ] = useState(false);
    const [ logoURL, setLogoURL ] = useState("");
    const [ coverURL, setCoverURL ] = useState("");
    const [ lat, setLat ]= useState("");
    const [ lng, setLng ]= useState("");
    const { addToast } = useToasts();
    const [imgStyleLogo,setImgStyleLogo] =useState({})
    const [imgStyleCover,setImgStyleCover] =useState({})
    const [logoError,setLogoError] =useState("")
    const [coverError,setCoverError] =useState("")
    const handleLogoChange = async (event) => {
        logo.current = event[0]
        if(event[0]){await setLogoAdded(true)}
    }
    const handleCoverChange = async (event) => {
        cover.current = event[0];
        if(event[0]){await setCoverAdded(true)}
    }
    const handlePlaceSelected = (place) => {
        setLat(place.geometry.location.lat());
        setLng(place.geometry.location.lng());
    }
       const onSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (logoAdded && coverAdded)

        { const storageLogoRef = storage.ref(`vendors/logo/${logo.current.name}`);
           const  storageCoverRef = storage.ref(`vendors/cover/${cover.current.name}`);
           storageCoverRef.put(cover.current)
           storageLogoRef.put(logo.current)
               .then(async () => {
                   const imageLogoUrl = await storageLogoRef.getDownloadURL();
                   const imageCoverUrl = await storageCoverRef.getDownloadURL();
                   await setLogoURL(imageLogoUrl)
                   await setCoverURL(imageCoverUrl)
                   const res =  VendorService.addVendor(name,description,address,phone,imageLogoUrl,imageCoverUrl,facebook,instagram,youtube,lat,lng)
                   setLoading(false);
                   addToast("Store successfully added we are reviewing your application", {
                       appearance: "success",
                       autoDismiss: true,
                       autoDismissTimeout: 2000,
                       TransitionState: "exiting",
                   });
                   history.push(`/vendor-listing`);

           }).catch(error => {
               setLoading(false);
               addToast(error, {
                   appearance: "error",
                   autoDismiss: true,
                   autoDismissTimeout: 2000,
                   TransitionState: "exiting",
               });
           });
        }
        else {
           if (!logoAdded){
               setImgStyleLogo({border :'red 2px solid'})
               setLogoError('Please upload a logo img')
               setLoading(false)
           }
            if (!coverAdded){
                setImgStyleCover({border :'red 2px solid'})
                setCoverError('Please upload a cover img')
                setLoading(false)
            }
        }
       }

    return (
            <div className="container" >
                <h1 style={{backgroundColor :'black', color :'#FFFD38',textAlign :'center',padding :'18px',}}>Join Our Team and Start Selling !</h1>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Store Name"
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

                    <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        label="Store Logo"
                        buttonText="Upload Logo"
                        onChange={handleLogoChange}
                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                        maxFileSize={1048576}
                        fileSizeError=" file size is too big"
                        singleImage={true}
                        fileContainerStyle={imgStyleLogo}
                    />
                    <span style={{color :'red'}}>{logoError}</span>
                       <ImageUploader
                        withIcon={false}
                        withPreview={true}
                        label="Store Cover Image"
                        buttonText="Upload Cover Image"
                        onChange={handleCoverChange}
                        imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
                        maxFileSize={1048576}
                        fileSizeError=" file size is too big"
                        singleImage={true}
                        fileContainerStyle={imgStyleCover}
                       />

                    <span style={{color :'red'}}>{coverError}</span>

                    <div className="form-group">
                        <fieldset >
                        <legend>Socials</legend>
                        <input className="form-control form-control-sm" type="url" placeholder="Facebook Link" name="facebook" onChange={e => setFacebook(e.currentTarget.value)}/>
                        <input className="form-control form-control-sm" type="url" placeholder="Instagram Link" name="instagram" onChange={e => setInstagram(e.currentTarget.value)}/>
                        <input className="form-control form-control-sm" type="url" placeholder="Youtube Link" name="youtube" onChange={e => setYoutube(e.currentTarget.value)}/>
                        </fieldset>
                    </div>
                    {/*<button type="submit" className="btn-add-store">Add Store</button>*/}
                    <button type="submit" className="btn btn-success" disabled={loading}>Add Store</button>

                </form>
            </div>
        );

}

export default BecomeVendor;