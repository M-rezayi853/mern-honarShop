import React from 'react';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import Rating from '../Rating/Rating';
import './Product.scss';

const Product = ({ product }) => {
    // eslint-disable-next-line
    String.prototype.toPersianDigit = function() {
        var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w) {
            return id[+w]
        });
    }

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

                <Card.Text as='h6' className='text-center'>
                    <span>{`${product.price},000`.toPersianDigit()}</span> تومان
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product;
