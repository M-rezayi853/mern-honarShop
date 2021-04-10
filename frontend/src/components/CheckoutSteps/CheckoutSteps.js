import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

import './CheckoutSteps.scss';

const CheckoutSteps = ({ step1, step2, step3, step4 }) => {
    return (
        <Nav className='checkoutSteps justify-content-center mb-4'>
            <Nav.Item>
                {step1 ? (
                    <LinkContainer to='/login'>
                        <Nav.Link>ورود به حساب کاربری</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>ورود به حساب کاربری</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step2 ? (
                    <LinkContainer to='/shipping'>
                        <Nav.Link>فرم آدرس</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>فرم آدرس</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step3 ? (
                    <LinkContainer to='/payment'>
                        <Nav.Link>روش پرداخت</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>روش پرداخت</Nav.Link>
                )}
            </Nav.Item>

            <Nav.Item>
                {step4 ? (
                    <LinkContainer to='/placeorder'>
                        <Nav.Link>صفحه سفارش</Nav.Link>
                    </LinkContainer>
                ) : (
                    <Nav.Link disabled>صفحه سفارش</Nav.Link>
                )}
            </Nav.Item>
        </Nav>
    )
}

export default CheckoutSteps;
