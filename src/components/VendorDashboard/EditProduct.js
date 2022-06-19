import React, {useEffect, useRef, useState} from 'react';
import {useHistory} from "react-router";
import {useToasts} from "react-toast-notifications";
import {auth, storage} from "../../firebase/firebase";
import ProductService from "../../services/ProductService";
import NavThree from "../NavBar/NavThree";
import ImageUploader from "react-images-upload";
import CategoriesService from "../../services/CategoriesService";
import {useParams} from "react-router-dom";
import UserService from "../../services/UserService";
const  useCategories= () =>{
    const [categories, setCategories] = useState([]);
    useEffect(async() => {
        CategoriesService.getCategoriesList().then(cat =>{
            setCategories(cat.data);
        })
    }, [])
    return categories
}
const EditProduct = () => {
    let {uid} = useParams();
    const categories = useCategories()
    const history = useHistory();
    const { addToast } = useToasts();

    const file0 = useRef(null);
    const file1 = useRef(null);
    const file2 = useRef(null);
    const file3 = useRef(null);
    const file4 = useRef(null);

    const [ fileAdded, setFileAdded ] = useState(false);
    const [ name, setName ] = useState("");
    const [ price, setPrice ]= useState(null);
    const [ shipping, setShipping ]= useState(null);
    const [ category, setCategory ]= useState("");
    const [ stock, setStock ]= useState(null);
    const [ ptype, setPtype ]= useState("");
    const [ description, setDescription ]= useState("");
    const [ video, setVideo ]= useState("");
    const [ loading, setLoading ] = useState(false)
    const [product, setProduct] = useState();
    const [preview, setPreview] = useState('')
    const imageRef= useRef(null);
    const [image, setImage] = useState(null)
    const [ imageAdded, setImageAdded ] = useState(imageRef.current != null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const product = await ProductService.getProductById(uid)
                setProduct(product);

                setName(product.name)
                setPrice(product.price)
                setShipping(product.shipping_price)
                setCategory(product.category)
                setStock(product.stock)
                setPtype(product.product_type)
                setDescription(product.description)
                setVideo(product.video)
                setPreview(product.images)
                setImage(product.images)
            } catch (e) {
                console.log(e)
            }
        };
        fetchData();
    }, []);

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

    const handleFileChange = async (event) => {
        file0.current = event[0];
        if(event[0]){await setFileAdded(true)}
    }

    // const onSubmit = async (event) =>
    // {
    //     event.preventDefault();
    //     setLoading(true);
    //     if (!auth.currentUser) {
    //         alert('You have to log in first!')
    //         return;
    //     }
    //     const storageRef = storage.ref(`products/${file0.current.name}`);
    //     storageRef.put(file0.current)
    //         .then(async () => {
    //             const imageUrl = await storageRef.getDownloadURL();
    //             const jwtToken = await auth.currentUser.getIdToken();
    //             setLoading(true);
    //             const res =  await ProductService.addProduct(name,price,shipping,category,stock,ptype,imageUrl,description)
    //             addToast("Product successfully added to your store", {
    //                 appearance: "success",
    //                 autoDismiss: true,
    //                 autoDismissTimeout: 2000,
    //                 TransitionState: "exiting",
    //             });
    //             history.push("/vendor-products");
    //             setLoading(false)
    //         }).catch(error => {
    //         console.log(error);
    //         setLoading(false)
    //         alert('An error happened!')
    //     });
    //     setLoading(false);
    // }

    const uploadToFirebase = async () => {
        if (imageAdded) {
            setLoading(true)
            const storageRef = storage.ref(`products/${imageRef.current.name}`);
            storageRef.put(imageRef.current)
                .then(async () => {
                    const imageProdUrl = await storageRef.getDownloadURL();
                    console.log("imageProdUrl")
                    console.log(imageProdUrl)

                    const response = await ProductService.editProduct(name,price,shipping,category,stock,ptype,imageProdUrl,description,video,uid)
                    if (response.status === 201) {
                        addToast("Product successfully updated",
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
            const response = await ProductService.editProduct(name,price,shipping,category,stock,ptype,image,description,video,uid)
            if (response.status === 201) {

                addToast("Product successfully updated",
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
        <div className="row">
            <div className="col col-lg-2" >
                <NavThree/>
            </div>
            <div className="col ">
                <div style={{marginLeft: "200px"}} className="container">
                    <div style={{width:"60%"}}>
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
                                <input type="number" min="0" step="0.01" className="form-control"
                                       aria-label="Dollar amount (with dot and two decimal places)"
                                       value={price}
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
                                   onChange={e => setShipping(parseInt(e.currentTarget.value))}/>
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <select onChange={e => setCategory(e.currentTarget.value)} className="form-control" required >
                                <option value={category} selected>{category}</option>
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
                            <label>Product Description</label>
                            <input type="textarea" className="form-control" placeholder="Description"
                                   name="description"
                                   value={description}
                                   required
                                   onChange={e => setDescription(e.currentTarget.value)}/>
                        </div>
                        <img
                            src={preview}
                            alt="Uploaded Images"
                            style={{width: '150px', borderRadius: '50%', marginLeft: '10px'}}
                        />
                        <br/>

                        <div className="button-wrap">
                            <label className="new-button" htmlFor="upload">Choose image
                                <input id="upload" accept='image/*' type="file" onChange={(e) => {
                                    onImageChange(e)
                                }}/>
                            </label>
                        </div>
                        <div className="form-group">
                            <label>Video</label>
                            <input type="text" className="form-control" placeholder="Video URL"
                                   name="video"
                                   value={video}
                                   onChange={e => setVideo(e.currentTarget.value)}/>
                            <small className="form-text text-muted">Optional</small>
                        </div>
                        <button type="submit" className="btn btn-secondary" disabled={loading} onClick={uploadToFirebase}>Save</button>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default EditProduct;