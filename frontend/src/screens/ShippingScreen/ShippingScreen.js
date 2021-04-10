import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../../components/FormContainer/FormContainer';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { saveShippingAddress } from '../../redux/actions/cartActions';

const ShippingScreen = ({ history }) => {
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
    const [country, setCountry] = useState(shippingAddress.country);

    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(saveShippingAddress({ address, city, postalCode, country }));
        history.push('/payment')
    }

    return (
        <>
            <CheckoutSteps step1 step2 />

            <FormContainer>
                <h2>فرم آدرس</h2>

                <Form onSubmit={submitHandler} className='my-4'>
                    <Form.Group controlId='address'>
                        <Form.Label>آدرس</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='آدرس را وارد کنید'
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='city'>
                        <Form.Label>نام شهر</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='نام شهر را وارد کنید'
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='postalcode'>
                        <Form.Label>کد پستی</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='کد پستی را وارد کنید'
                            value={postalCode}
                            onChange={e => setPostalCode(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='country'>
                        <Form.Label>نام کشور</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='نام کشور را وارد کنید'
                            value={country}
                            onChange={e => setCountry(e.target.value)}
                        ></Form.Control>
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
        </>
    )
}

export default ShippingScreen;
