import React, { useEffect } from 'react';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Loader from '../Loader/Loader';
import Message from '../Message/Message';
import { topProducts } from '../../redux/actions/productActions';
import './ProductCarousel.scss';

const ProductCarousel = () => {
    const dispatch = useDispatch();

    const prodcutTop = useSelector(state => state.prodcutTop);
    const { error, loading, products } = prodcutTop;

    useEffect(() => {
        dispatch(topProducts());
    }, [dispatch]);

    // eslint-disable-next-line
    String.prototype.toPersianDigit = function() {
        var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w) {
            return id[+w]
        });
    }

    return (
        <div className='productCarousel'>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <Carousel pause='hover' >
                    {products.map(product => (
                        <Carousel.Item key={product._id}>
                            <Link to={`/product/${product._id}`}>
                                <Image src={product.image} alt={product.name} fluid />

                                <Carousel.Caption className='carousel-caption'>
                                    <h4>{product.name} (تومان {`${product.price},000`.toPersianDigit()})</h4>
                                </Carousel.Caption>
                            </Link>
                        </Carousel.Item>
                    ))}
                </Carousel>
            )}
        </div>
    )
}

export default ProductCarousel;
