import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Rating from '../../components/Rating/Rating';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { detailProduct, createReviewProduct } from '../../redux/actions/productActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../../redux/constants/productConstants';
import Meta from '../../components/Meta/Meta';
import './ProductScreen.scss';

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const dispatch = useDispatch();

    const productDetail = useSelector(state => state.productDetail);
    const { error, loading, product } = productDetail;

    const productCreateReview = useSelector(state => state.productCreateReview);
    const { error: errorCreateReview, success: successCreateReview } = productCreateReview;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(successCreateReview) {
            alert('نظر شماارسال شد');
            setRating(0);
            setComment('');
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
        }
        dispatch(detailProduct(match.params.id));
    }, [dispatch, match, successCreateReview]);

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`);
    }

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(createReviewProduct(match.params.id, { rating, comment }));
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
                <>
                    <Meta title={product.name} />

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
                </>
            )}

            <Row>
                <Col md={6} className='my-3'>
                    <h3 className='mb-5'>نظر کاربران</h3>

                    {product.reviews.length === 0 && <Message variant='info'>هیچ دیدگاهی وجود ندارد</Message>}
                    <ListGroup variant='flush'>
                        {product.reviews.map(review => (
                            <ListGroup.Item key={review._id}>
                                <Row>
                                    <strong>{review.name}</strong>
                                    <Rating value={review.rating} />
                                    <p>&nbsp; {`${review.createdAt.substring(0, 10)}`.toPersianDigit()}</p>
                                </Row>
                                <p>{review.comment}</p>
                            </ListGroup.Item>
                        ))}

                        <ListGroup.Item>
                            <h4  className='mb-5'>نوشتن دیدگاه کالای مورد نظر</h4>
                            {errorCreateReview && <Message>{errorCreateReview}</Message>}
                            {userInfo ? (
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='rating'>
                                        <Form.Label>امتیاز دهی</Form.Label>
                                        <Form.Control
                                            as='select'
                                            value={rating}
                                            onChange={e => setRating(e.target.value)}
                                        >
                                            <option value=''>انتخاب...</option>
                                            <option value='1'>۱ - ضعیف</option>
                                            <option value='2'>۲ - نسبتا خوب</option>
                                            <option value='3'>۳ - خوب</option>
                                            <option value='4'>۴ - خیلی خوب</option>
                                            <option value='5'>۵ - عالی</option>
                                        </Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='comment'>
                                        <Form.Label>دیدگاه</Form.Label>
                                        <Form.Control
                                            as='textarea'
                                            rows='3'
                                            value={comment}
                                            onChange={e => setComment(e.target.value)}
                                        ></Form.Control>
                                    </Form.Group>

                                    <Button
                                        type='submit'
                                        variant='info'
                                        className='py-1 px-3'
                                    >
                                        ارسال
                                    </Button>
                                </Form>
                            ) : (
                                <Message variant='info'>
                                    برای نوشتن دیدگاه لطفا <Link to='/login'>وارد حساب کاربری</Link> شوید
                                </Message>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
            </Row>
        </div>
    )
}

export default ProductScreen;
