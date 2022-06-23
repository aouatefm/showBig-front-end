import React, {useEffect, useState} from "react";
import ProductService from "../../services/ProductService";
import SpinnerPage from "../../containers/Spinner/SpinnerPage";
import ProductCard from "./ProductCard";
import {Link, useHistory} from 'react-router-dom';
import {Row} from "react-bootstrap";

function useProduct(id) {
    const [response, setResponse] = useState(null);
    useEffect(async () => {
        const res = await ProductService.productRecommendations(id);
        await setResponse(res);
    }, [])
    return response
}
const arrayChunk = (arr, n) => {
    const array = arr.slice();
    const chunks = [];
    while (array.length) chunks.push(array.splice(0, n));
    return chunks;
};

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
                        {/*<Row style={{marginRight: '10px', marginLeft: '10px', justifyContent: "center"}}>*/}
                        {/*    {*/}
                        {/*        response.map(product => (*/}
                        {/*            <Row lg={3.5}>*/}
                        {/*                <span onClick={() => goTo(product.id)}>*/}
                        {/*                    <ProductCard key={product.id} product={product}/>*/}
                        {/*                </span>*/}
                        {/*            </Row>*/}
                        {/*        ))*/}
                        {/*    }*/}
                        {/*</Row>*/}
                        {arrayChunk(response, 5).map((row, i) => (
                            <div key={i} className="row mx-auto">
                                {row.map((product, i) => (
                                    <Link to={{ pathname: `/products/${product.id}`}}>
                                        <ProductCard key={product.id} product={product} />
                                    </Link>
                                ))}
                            </div>
                        ))}
                    </>
                    :
                    <SpinnerPage/>
            }
        </>
    )

}
export default Recommendations
