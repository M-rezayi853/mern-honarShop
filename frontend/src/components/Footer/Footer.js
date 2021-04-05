import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <Container>
                <Row className='text-center'>
                    <Col>نحوه ثبت سفارش</Col>
                    <Col>پاسخ به پرسش‌های متداول</Col>
                    <Col>حریم خصوصی</Col>
                    <Col>درباره هنرشاپ</Col>
                    <Col>فروش در هنرشاپ</Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <p className='footer footer__text'>
                            Copyright &copy; HonarShop by Mahdi Rezayi.<br />
                            Built my M-HAZARA-77 for his online course ADVENCED CSS AND SASS.
                            You are 100% allowed to use this webpage for both personal and commercial use, but NOT to claim it as your design. A credit to the original author, Mahdi rezayi, is of course highly appreciated!
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
