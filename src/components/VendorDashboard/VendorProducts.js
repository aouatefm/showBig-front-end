import React, {useState} from 'react';
import Moment from 'moment';
import {createStructuredSelector} from "reselect";
import {selectCurrentUser} from "../../redux/user/user-selectors";
import {connect} from "react-redux";
import {select_v_products_filters, selectSearchBarKeywords} from "../../redux/filters/filters-selectors";
import NavThree from "../NavBar/NavThree";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import {Link} from "react-router-dom";
import ProductService from "../../services/ProductService";
import {useToasts} from "react-toast-notifications";
import {EditIcon} from "../../assets/icons";
import DeleteConfirmation from "./DeleteConfirmation";


const VendorProducts =  ({prods,Keywords,v_products_filters }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [displayConfirmationModal, setDisplayConfirmationModal] = useState(false);
    const [deleteMessage, setDeleteMessage] = useState(null);
    const [uid, setId] = useState(null);

    const {addToast} = useToasts();
    const keywordsMatched = (item) => {
        const formattedKeywords = Keywords.trim().replace(/\s/g, '').toLowerCase();
        if (formattedKeywords.length === 0) return true;
        const {name} = item;
        const formattedName = name.toLowerCase();
        return formattedName.includes(formattedKeywords)
    }
    const applyFilters = (items) => {
        let itemsToDisplay = items.filter(
            item =>
                (v_products_filters.category.includes(item.category) || v_products_filters.category.length === 0) &&
               (v_products_filters.date === (Moment(item.created_at).format('MMMM')) || v_products_filters.date.length === 0) &&
                keywordsMatched(item))
        return itemsToDisplay;
    }
    // const handleDelete = async (id) => {
    //     const rest = await ProductService.deleteProduct(id)
    //     addToast("User successfully deleted", {
    //         appearance: "success",
    //         autoDismiss: true,
    //         autoDismissTimeout: 2000,
    //         TransitionState: "exiting",
    //     });
    //     window.location.reload(false);
    //
    // }
    // Handle the displaying of the modal based on type and id
    const showDeleteModal = ( id) => {
        setId(id);
            setDeleteMessage(`Are you sure you want to delete the product '${id}'?`);
        setDisplayConfirmationModal(true);
    };

    // Hide the modal
    const hideConfirmationModal = () => {
        setDisplayConfirmationModal(false);
    };
    const submitDelete = async (id) => {
        const rest = await ProductService.deleteProduct(id)
        addToast("User successfully deleted", {
            appearance: "success",
            autoDismiss: true,
            autoDismissTimeout: 2000,
            TransitionState: "exiting",
        });
        setDisplayConfirmationModal(false);
        window.location.reload(false);
    };
    return (
                <div>
                    <div style={{display: "flex"}}>
                    </div>
                    <div className="container">
                        <table className="table table-hover table-bordered border-warning" style={{alignItems: "center"}}>
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Image</th>
                                <th scope="col">Name</th>
                                <th scope="col">Stock</th>
                                <th scope="col">Price</th>
                                <th scope="col">Categories</th>
                                <th scope="col">Date</th>
                                <th scope="col">Control</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                prods ?
                                <>
                                    {prods.length ===0 ? <td colSpan="8" style={{color :'red' , textAlign: 'center' ,margin :'35px'}}> Sorry ! No Product Found</td> :
                                        applyFilters(prods).map((product,index) => (
                                                <tr key={product.id}>
                                                    <th scope="row">{index+1}</th>
                                                    <td>
                                                        <img src={product.images}
                                                             alt={product.name}
                                                             className="avatar"
                                                             width="50px" height="50px"/>
                                                    </td>
                                                    <td><Link to={`/products/${product.id}`}>{product.name}</Link></td>
                                                    <td>{product.stock}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.category}</td>
                                                    <td>{Moment(product.created_at).format('MMMM DD YYYY')}</td>
                                                    <td>
                                                        <Link to={{pathname: `/edit_product/${product.id}`}}>
                                                            <EditIcon width={18} color="orange"/>
                                                        </Link>

                                                        <span style={{margin: "3px", cursor: "pointer"}} className="action">
                                                            <img
                                                            src="https://icon-library.com/images/icon-delete/icon-delete-16.jpg"
                                                            alt="delete" style={{
                                                            verticalAlign: "middle",
                                                            width: "18px",
                                                            height: "18px"}}
                                                            // onClick={() => {handleDelete(product.id)}}/>
                                                            //onClick={() => {handleShow()}}
                                                            onClick={() => showDeleteModal(product.id)}
                                                            />
                                                </span>
                                                    </td>
                                                </tr>
                                            ))}
                                </> :
                                    <div className="row">
                                        <div className="col col-lg-2">
                                            <NavThree/>
                                        </div>
                                        <div className="col" >
                                            <SpinnerPage/>
                                        </div>
                                    </div>

                            }
                            </tbody>
                        </table>
                    </div>
                    <DeleteConfirmation showModal={displayConfirmationModal} confirmModal={submitDelete} hideModal={hideConfirmationModal}  id={uid} message={deleteMessage}  />
                </div>

    );
}
const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    Keywords:  selectSearchBarKeywords,
    v_products_filters : select_v_products_filters
});
export default connect(mapStateToProps)(VendorProducts);
