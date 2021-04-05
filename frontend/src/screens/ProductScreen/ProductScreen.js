import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';

import Rating from '../../components/Rating/Rating';
import products from '../../products';
import './ProductScreen.scss';

const ProductScreen = ({ match }) => {
    const product = products.find(p => p._id === match.params.id);

    return (
        <div className='productScreen'>
            <Link className='btn btn-light my-3 py-3' to='/'>برگشت به صفحه قبل</Link>
            
            <Row>
                <Col md={6}>
                    <Image src={product.image} alt={product.name} fluid />
                </Col>

                <Col md={3} className='text-center'>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>
                    </ListGroup>
                    <ListGroup.Item>
                        <Rating value={product.rating} text={product.numReviews} />
                    </ListGroup.Item>
                    <ListGroup.Item className='productScreen productScreen__price'>
                        قیمت: <span>{product.price}</span> تومان
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
                                    <Col className='productScreen productScreen__otherPrice'>
                                        <span>{product.price}</span> تومان
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
                                <Button variant='success' className='btn-block py-3' type='button' disabled={product.countInStock === 0}>
                                    افزودن به سبد خرید
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen;
