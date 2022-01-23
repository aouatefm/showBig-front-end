import ReactStars from "react-rating-stars-component";
import React, {useEffect, useState} from "react";
import RatingService from "../../services/RatingService";
import VendorService from "../../services/VendorService";
import {useToasts} from "react-toast-notifications";

function useRating(product_id) {
    const [ratings, setRating] = useState([]);
    useEffect(async () => {
        const newRating = await RatingService.canIRate(product_id);
        setRating(newRating.res)
    }, [])
    return ratings
}

const ProductRating = ({product_id,product}) => {
    const [ratingValue, setRatingValue] = useState(0);
    const [experienceValue, setExperienceValue] = useState("");
    const [loading, setLoading] = useState(false);
    const [edit, setEdit] = useState(true);
    const {addToast} = useToasts();
    const canIRate = useRating(product_id)
    // const store_id = product.store_id
    console.log(typeof (canIRate))
    const handleSubmit = async () => {
        setLoading(true)

        try {
            await RatingService.createRating(ratingValue, product_id,product.store_id);
            addToast("Thank you !",
                {
                    appearance: "success",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                    TransitionState: "exiting",
                });
            setLoading(false)
            setEdit(false)
        } catch (error) {
            addToast(error,
                {
                    appearance: "error",
                    autoDismiss: true,
                    autoDismissTimeout: 1500,
                    TransitionState: "exiting",
                });
            setLoading(false)
        }
    }

    const ratingChanged = async (newRating) => {
        setRatingValue(newRating)
            };
    return (
        <div >
            {canIRate ?
                <div>
                    <h4 style={{color: "#669900", justifyItems: "center"}}>
                        How was your experience about our product?
                    </h4>

                    {edit ?
                    <><div style={{display: "inline", textAlign: 'center'}}>
                        <span
                            style={{fontSize: '20px'}}>{ratingValue === 1 ? "Poor" : ratingValue === 2 ? "Too bad" : ratingValue === 3 ? "Average" : ratingValue === 4 ? "Nice" : ratingValue === 5 ? "Very good" : ""}</span>
                    </div>
                        <ReactStars
                        count={5}
                        value={ratingValue}
                        size={50}
                        isHalf={false}
                        activeColor="#ffd700"
                        edit={edit}
                        onChange={ratingChanged}
                    />
                        <div style={{display: "inline", textAlign: 'center'}}>
                            {ratingValue === 5 && <h3>😁</h3>}
                        </div>
                        <div style={{display: "inline", alignItems: 'center'}}>
                        <button type="button" className="btn btn-warning" disabled={loading} onClick={handleSubmit}>Add
                        review
                        </button>
                        </div></>
                    :
                        <span>Thank you for reviewing !</span> }

                </div>
                : <></>}
        </div>
    )


   }

export default ProductRating
