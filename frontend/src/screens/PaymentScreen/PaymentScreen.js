import React, { useState } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../components/FormContainer/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { savePaymentMethod } from '../../redux/actions/cartActions';
import './PaymentScreen.scss';

const PaymentScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if(!shippingAddress) {
        history.push('/shipping');
    }

    const dispatch = useDispatch();

    const [paymentMethod, setPaymentMethod] = useState('PayPal');

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(savePaymentMethod(paymentMethod));
        history.push('/placeorder');
    }

    return (
        <div className='paymentScreen'>
            <CheckoutSteps step1 step2 step3 />

            <FormContainer>
                <h2>روش پرداخت</h2>

                <Form onSubmit={submitHandler} className='my-4'>
                    <Form.Group>
                        <Form.Label >انتخاب روش پرداخت</Form.Label>

                        <Row className='my-5'>
                            <Form.Check
                                className='mr-5'
                                type='radio'
                                id='PayPal'
                                name='paymentMethod'
                                value='PayPal'
                                onChange={e => setPaymentMethod(e.target.value)}
                                checked
                            ></Form.Check>

                            <Form.Label className='my-1'>PayPal یا Credit Card</Form.Label>
                        </Row>
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='success'
                        className='py-2 px-3 mt-3'
                    >
                        ادامه پرداخت
                    </Button>
                </Form>
            </FormContainer>
        </div>
    )
}

export default PaymentScreen;
