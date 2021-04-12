import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../../components/Rating/Rating';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { detailProduct } from '../../redux/actions/productActions';
import './ProductScreen.scss';

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();

    const productDetail = useSelector(state => state.productDetail);
    const { error, loading, product } = productDetail;

    useEffect(() => {
        dispatch(detailProduct(match.params.id));
    }, [dispatch, match]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    // eslint-disable-next-line
    String.prototype.toPersianDigit = function() {
        var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w) {
            return id[+w]
        });
    }

    return (
        <div className='productScreen'>
            <Link className='btn btn-light py-2 mb-3' to='/'>برگشت به صفحه قبل</Link>
            
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    <Col md={5}>
                        <Image src={product.image} alt={product.name} fluid />
                    </Col>

                    <Col md={4} className='text-center'>
                        <ListGroup className='my-2'>
                            <ListGroup.Item>
                                <h5>{product.name}</h5>
                            </ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item>
                            <Rating value={product.rating} text={product.numReviews} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            قیمت: <span>{`${product.price},000`.toPersianDigit()}</span> تومان
                        </ListGroup.Item>
                        <ListGroup.Item>
                            توضیحات محصول: {product.description}
                        </ListGroup.Item>
                    </Col>

                    <Col md={3}>
                        <Card className='text-center'>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            قیمت:
                                        </Col>
                                        <Col>
                                            <span>{`${product.price},000`.toPersianDigit()}</span> تومان
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            وضعیت:
                                        </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'موجود' : 'اتمام موجودی'}
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Row>
                                        <Col>
                                            تعداد:
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                as='select'
                                                value={qty}
                                                onChange={e => setQty(e.target.value)}
                                            >
                                                {[...Array(product.countInStock).keys()].map(x => (
                                                    <option key={x + 1} value={x + 1}>
                                                        {x + 1}
                                                    </option>
                                                ))}
                                            </Form.Control>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>

                                <ListGroup.Item>
                                    <Button 
                                        variant='success' 
                                        className='py-2'
                                        block
                                        type='button' 
                                        disabled={product.countInStock === 0}
                                        onClick={addToCartHandler}
                                    >
                                        افزودن به سبد خرید
                                    </Button>
                                </ListGroup.Item>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}
        </div>
    )
}

export default ProductScreen;
