import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import Product from '../../components/Product/Product';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { listProduct } from '../../redux/actions/productActions';
import Paginate from '../../components/Paginate/Paginate';
import ProductCarousel from '../../components/ProductCarousel/ProductCarousel';
import Meta from '../../components/Meta/Meta';
import './HomeScreen.scss';

const HomeScreen = ({ match }) => {
    const keyword = match.params.keyword;
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { error, loading, products, page, pages } = productList;

    useEffect(() => {
        dispatch(listProduct(keyword, pageNumber));
    }, [dispatch, keyword, pageNumber]);

    return (
        <div className='homeScreen'>
            <Meta />
            
            <h1 className='py-2'>جدید ترین محصولات</h1>

            {!keyword ? <ProductCarousel /> : <Link to='/' className='btn btn-light py-2 mb-3'>برگشت به صفحه قبل</Link>}
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <>
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Product product={product} />
                            </Col>
                        ))}
                    </Row>
                    
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ''} />
                </>
            )}
        </div>
    )
}

export default HomeScreen;
