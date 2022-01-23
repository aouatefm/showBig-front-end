import React, {useEffect, useState} from "react";
import ProductService from "../../services/ProductService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import ProductCard from "./ProductCard";
import {useHistory} from 'react-router-dom';
import {Row} from "react-bootstrap";

function useProduct(id) {
    const [response, setResponse] = useState(null);
    useEffect(async () => {
        const res = await ProductService.productRecommendations(id);
        await setResponse(res);
    }, [])
    return response
}


const Recommendations = ({id}) => {
    const response = useProduct(id);
    const history = useHistory();

    const goTo = (id) => {
        history.replace({ pathname: `/products/${id}`})
        history.go(0)
    }
    return (
        <>
            <h1 style={{
                margin: '25px',
                padding: "5px",
                textAlign: 'center',
                letterSpacing: '8px',
                textTransform: 'uppercase',
            }}>Articles related to your search</h1>
            {
                response ?
                    <>
                        <Row style={{marginRight: '10px', marginLeft: '10px', justifyContent: "center"}}>
                            {
                                response.map(product => (
                                    <Row lg={3.5}>
                                        <span onClick={() => goTo(product.id)}>
                                            <ProductCard key={product.id} product={product}/>
                                        </span>
                                    </Row>
                                ))
                            }
                        </Row>
                    </>
                    :
                    <SpinnerPage/>
            }
        </>
    )

}
export default Recommendations
