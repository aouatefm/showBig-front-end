import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {useEffect, useState} from "react";
import UserService from "../../services/UserService";
import {Image} from "react-bootstrap";

const Store = () => {
    const [data, setData] = useState('initial');
    useEffect(() => {
        UserService.getVendorList()
            .then((res) => {
                setData(res.data)
                console.log(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])
    return (
        <div>
            <Card style={{width: '18rem'}}>
                <Card.Img variant="top" src="https://i.pinimg.com/originals/b9/ba/e5/b9bae586861a4591e0bc7cf0b7a2c8ce.jpg"/>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.ImgOverlay>Card Title</Card.ImgOverlay>
                    <Image src="https://i.pinimg.com/originals/b9/ba/e5/b9bae586861a4591e0bc7cf0b7a2c8ce.jpg"
                           roundedCircle
                           height='80'
                           width='80'/>
                    <Card.Text>
                        Some quick example text to build on the card title and make up the bulk of
                        the card's content.
                    </Card.Text>
                    <Button variant="primary">Go somewhere</Button>
                </Card.Body>
            </Card>
        </div>
    )
}
export default Store