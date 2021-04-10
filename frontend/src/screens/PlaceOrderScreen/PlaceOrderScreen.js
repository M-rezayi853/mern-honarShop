import React, { useEffect } from 'react';
import { Button, ListGroup, Card, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import CheckoutSteps from '../../components/CheckoutSteps/CheckoutSteps';
import { createOrder } from '../../redux/actions/orderActions';
import { ORDER_CREATE_RESET } from '../../redux/constants/orderConstants';
import { USER_DETAIL_RESET } from '../../redux/constants/userConstants';

import './PlaceOrderScreen.scss';

const PlaceOrderScreen = ({ history}) => {
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems, shippingAddress, paymentMethod } = cart;

    if(!shippingAddress.address) {
        history.push('/shipping');
    } else if(!paymentMethod) {
        history.push('/payment');
    }

    const orderCreate = useSelector(state => state.orderCreate);
    const { error, success, order } = orderCreate;

    cart.itemsPrice = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    cart.taxPrice = Math.round(0.01 * cart.itemsPrice);
    cart.shippingPrice = cart.itemsPrice > 100 ? 0 : 100;
    cart.totalPrice = Number(cart.itemsPrice) + Number(cart.taxPrice) + Number(cart.shippingPrice);

    useEffect(() => {
        if(success) {
            history.push(`/order/${order._id}`);

            dispatch({ type: ORDER_CREATE_RESET });
            dispatch({ type: USER_DETAIL_RESET });
        }
    }, [success, history, dispatch, order]);

    const palceOrderHandler = () => {
        dispatch(createOrder({
            orderItems: cartItems,
            shippingAddress: shippingAddress,
            paymentMethod: paymentMethod,
            taxPrice: cart.taxPrice,
            shippingPrice: cart.shippingPrice,
            totalPrice: cart.totalPrice,
            itemsPrice: cart.itemsPrice
        }));
    }

    // eslint-disable-next-line
    String.prototype.toPersinaDigit= function() {
        var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w) {
            return id[+w]
        });
    }

    return (
        <div className='placeOrderScreen'>
            <CheckoutSteps step1 step2 step3 step4 />

            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4 className='my-3'>اطلاعات آدرس</h4>
                            <p className='my-3'>
                                <strong>آدرس: </strong>
                                {shippingAddress.address}, {shippingAddress.city}, {shippingAddress.postalCode}, {shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4 className='my-3'>روش پرداخت</h4>
                            <p className='my-3'>
                                <strong>استفاده از: </strong>
                                {paymentMethod}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h4 className='my-3'>موارد سفارش</h4>
                            {cartItems.length === 0 ? <Message variant='info'>سبد سفارش شما خالی است</Message> : (
                                <ListGroup variant='flush' className='my-3'>
                                    {cartItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image src={item.image} alt={item.name} fluid />
                                                </Col>

                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>

                                                <Col md={5}>
                                                    تومان {`${item.qty * item.price},000`.toPersinaDigit()} = {`${item.qty}`.toPersinaDigit()} &lowast; {`${item.price},000`.toPersinaDigit()}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={4}>
                    <Card className='text-center'>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h4>خلاصه سفارش</h4>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه کالاها</Col>
                                    <Col>تومان {`${cart.itemsPrice},000`.toPersinaDigit()}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه پست</Col>
                                    <Col>تومان {`${cart.shippingPrice},000`.toPersinaDigit()}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>هزینه مالیات</Col>
                                    <Col>تومان {`${cart.taxPrice},000`.toPersinaDigit()}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>جمع کل</Col>
                                    <Col>تومان {`${cart.totalPrice},000`.toPersinaDigit()}</Col>
                                </Row>
                            </ListGroup.Item>

                            {error && (
                                <ListGroup.Item>
                                    <Message>{error}</Message>
                                </ListGroup.Item>
                            )}

                            <ListGroup.Item>
                                <Button
                                    type='button'
                                    variant='success'
                                    className='py-2'
                                    block
                                    disabled={cartItems === 0}
                                    onClick={palceOrderHandler}
                                >
                                    ادامه پرداخت
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
          </Row>
        </div>
    )
}

export default PlaceOrderScreen;
