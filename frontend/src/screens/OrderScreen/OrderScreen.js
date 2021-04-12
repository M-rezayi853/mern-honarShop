import React, { useState, useEffect } from 'react';
import { Card, ListGroup, Image, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { PayPalButton } from 'react-paypal-button-v2';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { detailOrder, payOrder } from '../../redux/actions/orderActions';
import { ORDER_PAY_RESET } from '../../redux/constants/orderConstants';

import './OrderScreen.scss';

const OrderScreen = ({ match, history }) => {
    const orderId = match.params.id;

    const [sdkReady, setSdkReady] = useState(false);

    const dispatch = useDispatch();

    const orderDetail = useSelector(state => state.orderDetail);
    const { error, loading, order } = orderDetail;

    const orderPay = useSelector(state => state.orderPay);
    const { loading: loadingPay, success: successPay } = orderPay;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    if(!loading) {
        order.itemsPrice = order.orderItems.reduce((acc, item) => acc + item.qty * item.price, 0);
    }

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        }

        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal');

            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            }
            document.body.appendChild(script);
        }

        if(!order || order._id !== orderId || successPay) {
            dispatch({ type: ORDER_PAY_RESET });

            dispatch(detailOrder(orderId));
        } else if(!order.isPaid) {
            if(!window.paypal) {
                addPayPalScript();
            } else {
                setSdkReady(true);
            }
        }
    }, [userInfo, history, order, dispatch, orderId, successPay]);

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult);

        dispatch(payOrder(orderId, paymentResult));
    }

    // eslint-disable-next-line
    String.prototype.toPersianDigit = function() {
        var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w) {
            return id[+w]
        });
    }

    return (
        <div className='orderScreen'>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <>
                    <h4>سفارش با کد <span>{`${order._id}`.toPersianDigit()}</span></h4>
                    <Row>
                        <Col md={8}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h4 className='my-3'>اطلاعات </h4>
                                    <p className='my-3'>
                                        <strong>نام: </strong> {order.user.name}</p>
                                    <p className='my-3'>
                                        <strong>ایمیل: </strong>
                                        <a href={`mailto:${order.user.email}`}> {order.user.email}</a>
                                    </p>
                                    <p>
                                        <strong>آدرس: </strong>
                                        {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.postalCode}, {order.shippingAddress.country}
                                    </p>

                                    {order.isDelivered
                                        ? <Message variant='success'>تحویل داده شده در {order.deliveredAt}</Message>
                                        : <Message>تحویل داده نشده است</Message>
                                    }
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    <h4 className='my-3'>روش پرداخت</h4>
                                    <p className='my-3'>
                                        <strong>استفاده از: </strong>
                                        {order.paymentMethod}
                                    </p>

                                    {order.isPaid 
                                        ? <Message variant='success'>پرداخت شده در {`${order.paidAt}`.toPersianDigit()}</Message>
                                        : <Message>پرداخت نشده است</Message>
                                    }
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    <h4 className='my-3'>موارد سفارش</h4>
                                    {order.orderItems.length === 0 ? <Message variant='info'>سبد سفارش شما خالی است</Message> : (
                                        <ListGroup variant='flush' className='my-3'>
                                            {order.orderItems.map((item, index) => (
                                                <ListGroup.Item key={index}>
                                                    <Row className='d-flex align-items-center text-center'>
                                                        <Col md={2}>
                                                            <Image src={item.image} alt={item.name} fluid rounded />
                                                        </Col>
        
                                                        <Col>
                                                            <Link to={`/product/${item.product}`}>
                                                                {item.name}
                                                            </Link>
                                                        </Col>
        
                                                        <Col md={5}>
                                                            تومان {`${item.qty * item.price},000`.toPersianDigit()} = {`${item.qty}`.toPersianDigit()} &lowast; {`${item.price},000`.toPersianDigit()}
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
                                            <Col>تومان {`${order.itemsPrice},000`.toPersianDigit()}</Col>
                                        </Row>
                                    </ListGroup.Item>
        
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>هزینه پست</Col>
                                            <Col>تومان {`${order.shippingPrice},000`.toPersianDigit()}</Col>
                                        </Row>
                                    </ListGroup.Item>
        
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>هزینه مالیات</Col>
                                            <Col>تومان {`${order.taxPrice},000`.toPersianDigit()}</Col>
                                        </Row>
                                    </ListGroup.Item>
        
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>جمع کل</Col>
                                            <Col>تومان {`${order.totalPrice},000`.toPersianDigit()}</Col>
                                        </Row>
                                    </ListGroup.Item>
        
                                    {!order.isPaid && (
                                        <ListGroup.Item>
                                            {loadingPay && <Loader />}
                                            {!sdkReady ? <Loader /> : (
                                                <PayPalButton 
                                                    amount={order.totalPrice}
                                                    onSuccess={successPaymentHandler}
                                                />
                                            )}
                                        </ListGroup.Item>
                                    )}
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </div>
    )
}

export default OrderScreen;
