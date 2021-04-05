import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from '../Rating/Rating';
import './Product.scss';

const Product = ({ product }) => {
    return (
        <Card className='product my-3 p-3 text-center'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body>
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' variant='light' className='mt-3'>
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <Rating value={product.rating} text={product.numReviews} />
                </Card.Text>

                <Card.Text as='h3' className='product product__price text-center'>
                    <span>{product.price}</span> تومان
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;
