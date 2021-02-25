import React, { useRef, useState } from 'react';
import { Container, Row, Col, Form, Button, FormLabel } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './SellPage.css';

const SellPage = (props) => {
    const file = useRef(null);
    const [checked, setChecked] = useState(false)

    const handleFileChange = (event) => {
        file.current = event.target.files[0];
    }

    const handleChecked = (event) => {
        setChecked(event.target.checked);
    }

    let formInfo = (
        <>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>HỌ VÀ TÊN</Form.Label>
                    <Form.Control placeholder="NGUYỄN VĂN A" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>EMAIL</Form.Label>
                    <Form.Control type="email" placeholder="sample@email.com" />
                </Form.Group>
            </Form.Row>
            <Form.Group controlId="formGridAddress1">
                <Form.Label>ĐỊA CHỈ</Form.Label>
                <Form.Control placeholder="123 Đường Điện Biên Phủ" />
            </Form.Group>
            <Form.Row>
                <Form.Group as={Col} controlId="formGridDistrict">
                    <Form.Label>QUẬN/ THỊ XÃ</Form.Label>
                    <Form.Control placeholder="Quận 3"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>THÀNH PHỐ</Form.Label>
                    <Form.Control placeholder="Hồ Chí Minh"/>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>ZIP</Form.Label>
                    <Form.Control placeholder="700000"/>
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="formCondition">
                    <Form.Label>TÌNH TRẠNG</Form.Label>
                    <Form.Control
                        as="select"
                        id="inlineFormCustomSelectPref"
                        custom
                    >
                        <option value="0">MỚI</option>
                        <option value="1">XÀI RỒI</option>
                    </Form.Control>
                </Form.Group>
                <Form.Group as={Col} controlId="formBug">
                    <FormLabel>NÊU KHUYẾT ĐIỂM (Optional - Used)</FormLabel>
                    <Form.Control />
                </Form.Group>
            </Form.Row>
        </>
    );

    let formPics = (
        <>
            <Form.Row>
                <Form.Group as={Col} controlId="hop">
                    <Form.Label>HỘP</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="giay">
                    <Form.Label>GIÀY + NAMETAG</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="mui">
                    <Form.Label>MŨI GIÀY</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="de">
                    <Form.Label>ĐẾ GIÀY</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="mong">
                    <Form.Label>MÔNG GIÀY</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="ngoai">
                    <Form.Label>GÓC NGOÀI</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="trong">
                    <Form.Label>GÓC TRONG</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="tem">
                    <Form.Label>TEM</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
                <Form.Group as={Col} controlId="lot">
                    <Form.Label>LÓT GIÀY</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
            </Form.Row>
            <Form.Row>
                <Form.Group as={Col} controlId="bug">
                    <Form.Label>KHIẾM KHUYẾT (Nếu có/ Xài rồi)</Form.Label>
                    <Form.Control onChange={handleFileChange} type="file" />
                </Form.Group>
            </Form.Row>
        </>
    );

    return (
        <div className="sell-page">
            <img
                alt="background"
                className="background"
                src="assets/images/sell-page.jpg"
                style={{"position":"fixed", "zIndex":-1, objectFit:'cover', height: '100%', width: '100%'}}
            />
            <Container style={{alignItems:'center'}}>
                <Form>
                    <h1 className="mb-5">Đồng hành cùng VIGG</h1>
                    {formInfo}
                    <h2>ẢNH TOÀN DIỆN THEO TIÊU CHUẨN CỦA VIGG (*)</h2>
                    {formPics}
                    <h2>GIÁ MONG MUỐN (ĐƠN VỊ: VND)</h2>
                    <Form.Control className="mb-5"/>
                    <Form.Check
                        type="checkbox"
                        id="default-checkbox"
                        label="BẠN HIỂU RẰNG VIGG SẼ THU 5% PHÍ DỊCH VỤ CHO MỖI ĐỢT GIAO DỊCH"
                        style={{textAlign:'center'}}
                        onChange={handleChecked}
                    />
                    <Button
                        className="mt-4"
                        variant="primary"
                        type="submit"
                        style={{float:'right'}}
                        size="lg"
                        disabled={!checked}
                    >
                        Submit
                    </Button>
                </Form>
                <Link to="/image-standards"><h6>(*) Bấm vào đây để xem tiêu chuẩn đơn hàng!</h6></Link>
            </Container>
        </div>
    );
};

export default SellPage;