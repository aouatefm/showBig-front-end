import React, {useEffect, useRef, useState} from 'react';
import {auth, storage} from "../../firebase/firebase";
import ProductService from "../../services/ProductService";
import CategoriesService from "../../services/CategoriesService";
import NavThree from "../NavBar/NavThree";
import { useHistory } from "react-router";

const  useCategories= () =>{
    const [categories, setCategories] = useState([]);
    useEffect(async() => {
        CategoriesService.getCategoriesList().then(cat =>{
            setCategories(cat.data);
        })
    }, [])
    return categories
}
const AddProduct = () => {
    const categories = useCategories()
    const history = useHistory();

    const file = useRef(null);
    const [ fileAdded, setFileAdded ] = useState(file.current != null);
    const [ name, setName ] = useState("");
    const [ price, setPrice ]= useState(null);
    const [ shipping, setShipping ]= useState("");
    const [ category, setCategory ]= useState("");
    const [ stock, setStock ]= useState(null);
    const [ ptype, setPtype ]= useState("");
    const [ description, setDescription ]= useState("");
    const [ video, setVideo ]= useState("");
    const [ loading, setLoading ] = useState(false)

    const handleFileChange = (event) => {
        file.current = event.target.files[0];
        setFileAdded(file.current != null);
    }
    const onSubmit = async (event) =>
    {
        event.preventDefault();
        setLoading(true);
        if (!auth.currentUser) {
            alert('You have to log in first!')
            return;
        }
        const storageRef = storage.ref(`products/${file.current.name}`);
        storageRef.put(file.current)
            .then(async () => {
                const imageUrl = await storageRef.getDownloadURL();
                const jwtToken = await auth.currentUser.getIdToken();
                setLoading(true);
                const res =  await ProductService.addProduct(name,price,shipping,category,stock,ptype,imageUrl,description)
                history.push("/vendor-listing");
                setLoading(false)
            }).catch(error => {
            console.log(error);
            setLoading(false)
            alert('An error happened!')
        });
        setLoading(false);
    }
    return (
        <div className="row">
            <div className="col col-lg-2" >
                <NavThree/>
            </div>
            <div className="col ">
                <div style={{marginLeft: "200px"}} className="container">
                    <form onSubmit={onSubmit} style={{width:"60%"}}>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" className="form-control" placeholder="Name"
                                   value={name}
                                   name="name"
                                   required
                                   onChange={e => setName(e.currentTarget.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Price</label>
                            <div className="input-group">
                                <input type="number" min="0" className="form-control"
                                       aria-label="Dollar amount (with dot and two decimal places)"
                                       onChange={e => setPrice(e.currentTarget.value)}/>
                                    <span className="input-group-text">$</span>
                            </div>
                            {/*<input type="number" min="0" className="form-control" placeholder="Price"*/}
                            {/*       value={price}*/}
                            {/*       name="price"*/}
                            {/*       required*/}
                            {/*       onChange={e => setPrice(e.currentTarget.value)}/>*/}
                            <small className="form-text text-muted">Price $</small>
                        </div>
                        <div className="form-group">
                            <label>Shipping Price</label>
                            <input type="number" className="form-control" placeholder="Shipping Price"
                                   value={shipping}
                                   min="0"
                                   name="shipping"
                                   required
                                   onChange={e => setShipping(e.currentTarget.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select onChange={e => setCategory(e.currentTarget.value)} className="form-control" required >
                                {categories.map((option) => (
                                    <option value={option.name}>{option.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Stock</label>
                            <input type="number" className="form-control" placeholder="Stock"
                                   name="stock"
                                   value={stock}
                                   min="1"
                                   required
                                   onChange={e => setStock(e.currentTarget.value)}/>
                        </div>
                        <div className="form-group">
                            <label>Product Type</label>
                            <input type="text" className="form-control" placeholder="Product Type"
                                   name="ptype"
                                   value={ptype}
                                   required
                                   onChange={e => setPtype(e.currentTarget.value)}/>
                        </div>

                        <div className="form-group">
                            <label>Image</label>
                            <input type="file" className="form-control" placeholder="Image"
                                   name="image"
                                   id="myFile"
                                   accept='image/*'
                                   required
                                   onChange={handleFileChange}/>
                        </div>
                        <div className="form-group">
                            <label>Video</label>
                            <input type="text" className="form-control" placeholder="Video URL"
                                   name="video"
                                   value={video}
                                   onChange={e => setVideo(e.currentTarget.value)}/>
                            <small className="form-text text-muted">Optional</small>

                        </div>
                        <button type="submit" className="btn btn-primary" disabled={loading}>Add Product</button>
                    </form>
                </div>
            </div>
        </div>

    );
}

export default AddProduct;