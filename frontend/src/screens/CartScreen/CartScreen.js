import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import { addToCart, removeFromCart } from '../../redux/actions/cartActions';
import './CartScreen.scss';

const CartScreen = ({ match, location, history }) => {
    const productId = match.params.id;

    const qty = location.search ? Number(location.search.split('=')[1]) : 1;

    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    useEffect(() => {
        if(productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [productId, dispatch, qty]);

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping');
    }

    return (
        <Row className='my-5 cartScreen'>
            <Col md={8}>
                <h1 className='pb-5'>سبد خرید</h1>

                {cartItems.length === 0 ? <Message variant='info'>سبد خرید شما خالی است</Message> : (
                    <ListGroup variant='flush' className='text-center'>
                        {cartItems.map(item => (
                            <ListGroup.Item key={item.product} className='my-2'>
                                <Row className='d-flex align-items-center'>
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid />
                                    </Col>

                                    <Col md={3}>
                                        <Link to={`/product/${item.product}`} className='cartScreen cartScreen__name'>
                                            {item.name}
                                        </Link>
                                    </Col>

                                    <Col md={2} className='cartScreen cartScreen__num'>
                                        <span>{item.price}&nbsp;</span> تومان
                                    </Col>

                                    <Col md={2}>
                                        <Form.Control 
                                            as='select'
                                            value={item.qty}
                                            onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))}
                                        >
                                            {[...Array(item.countInStock).keys()].map(x => (
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </Col>

                                    <Col md={2}>
                                        <Button 
                                            type='button'
                                            onClick={() => removeFromCartHandler(item.product)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                )}
            </Col>

            <Col md={4} className='text-center'>
                <Card>
                    <ListGroup variant='flush' >
                        <ListGroup.Item className='py-5'>
                            <h4 className='py-3 cartScreen cartScreen__count'>جمع سبد خرید <span>{cartItems.reduce((acc, item) => acc + item.qty , 0)}</span> مورد</h4>
                            <h5 className='py-3 cartScreen cartScreen__price'><span>{cartItems.reduce((acc, item) => acc + item.qty * item.price , 0)}&nbsp;</span> تومان</h5>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                                type='button'
                                variant='success'
                                className='py-3'
                                block
                                disabled={cartItems.length === 0}
                                onClick={checkoutHandler}
                            >
                                ادامه پرداخت
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    )
}

export default CartScreen;
