import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className='footer mt-5'>
            <Container>
                <Row className='text-center'>
                    <Col><Link to='#'>نحوه ثبت سفارش</Link></Col>
                    <Col><Link to='#'>پاسخ به پرسش‌های متداول</Link></Col>
                    <Col><Link to='#'>حریم خصوصی</Link></Col>
                    <Col><Link to='#'>درباره هنرشاپ</Link></Col>
                    <Col><Link to='#'>فروش در هنرشاپ</Link></Col>
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
