import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Product from '../../components/Product/Product';
import products from '../../products';
import './HomeScreen.scss';

const HomeScreen = () => {
    return (
        <>
            <h1 className='my-4 py-2'>جدید ترین محصولات</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen;
