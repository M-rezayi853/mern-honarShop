import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Footer.scss';

const Footer = () => {
    return (
        <footer className='footer mt-3'>
            <Container>
                <Row className='text-center'>
                    <Col xs={12} md={2} className='footer footer__link'><Link to='#'>نحوه ثبت سفارش</Link></Col>
                    <Col xs={12} md={2} className='footer footer__link'><Link to='#'>حریم خصوصی</Link></Col>
                    <Col xs={12} md={4} className='footer footer__link'><Link to='#'>پاسخ به پرسش‌های متداول</Link></Col>
                    <Col xs={12} md={2} className='footer footer__link'><Link to='#'>درباره هنرشاپ</Link></Col>
                    <Col xs={12} md={2} className='footer footer__link'><Link to='#'>فروش در هنرشاپ</Link></Col>
                </Row>
                <Row>
                    <Col className='text-center'>
                        <p className='footer footer__text'>
                            Copyright &copy; HonarShop by Mahdi Rezayi.<br />
                            Built my <a href={`https://www.instagram.com/m_hazara_77/`} target='_blank' rel='noreferrer'>M-HAZARA-77</a> for his online course ADVENCED CSS AND SASS.
                            You are 100% allowed to use this webpage for both personal and commercial use, but NOT to claim it as your design. A credit to the original author, Mahdi rezayi, is of course highly appreciated!
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;
