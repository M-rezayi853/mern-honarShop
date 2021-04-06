import React, { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import Product from '../../components/Product/Product';
// import products from '../../products';
import Loader from '../../components/Loader/Loader';
import Message from '../../components/Message/Message';
import { listProduct } from '../../redux/actions/productActions';
import './HomeScreen.scss';

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList;

    useEffect(() => {
        // const fetchProducts = async () => {
        //     const res = await axios.get('/api/products');
        //     setProducts(res.data);
        // }
        // fetchProducts();
        dispatch(listProduct());
    }, [dispatch])

    return (
        <>
            <h1 className='my-4 py-2'>جدید ترین محصولات</h1>
            {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                <Row>
                    {products.map(product => (
                        <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            )}
        </>
    )
}

export default HomeScreen;
