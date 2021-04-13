import React, { useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { detailProduct, updateProduct } from '../../redux/actions/productActions';
import { PRODUCT_UPDATE_RESET } from '../../redux/constants/productConstants';

const ProductEditScreen = ({ match, history }) => {
    const productId = match.params.id;

    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);
    const [countInStock, setCountInStock] = useState(0);
    const [uploading, setUploading] = useState(false);

    const dispatch = useDispatch();

    const productDetail = useSelector(state => state.productDetail);
    const { error, loading, product } = productDetail;

    const productUpdate = useSelector(state => state.productUpdate);
    const { error: errorUpdated, loading: loadingUpdated, success: successUpdated } = productUpdate;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }

        if(successUpdated) {
            dispatch({ type: PRODUCT_UPDATE_RESET });

            history.push('/admin/productlist');
        } else {
            if(!product || !product.name || product._id !== productId ) {
                dispatch(detailProduct(productId));
            } else {
                setName(product.name);
                setImage(product.image);
                setDescription(product.description);
                setCategory(product.category);
                setPrice(product.price);
                setCountInStock(product.countInStock);
            }
        }
    }, [userInfo, successUpdated, dispatch, history, product, productId]);

    const sumbitHandler = (e) => {
        e.preventDefault();

        dispatch(updateProduct({ _id: productId, name, image, description, category, price, countInStock }));
    }

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setUploading(true);

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/upload', formData, config);

            setImage(data);
            setUploading(false);
        } catch(error) {
            console.error(error);
            setUploading(false);
        }
    }

    return (
        <>
            <Link to='/admin/productlist' className='btn btn-light py-2 mb-3'>برگشت به صفحه قبل</Link>
            <FormContainer>
                <h2>ویرایش محصول</h2>

                {loadingUpdated && <Loader />}
                {errorUpdated && <Message>{errorUpdated}</Message>}
                {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                    <Form onSubmit={sumbitHandler} className='my-5'>
                        <Form.Group controlId='name'>
                            <Form.Label>نام</Form.Label>

                            <Form.Control
                                type='text'
                                placeholder='نام را وارد کنید'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>تصویر</Form.Label>

                            <Form.Control
                                type='text'
                                placeholder='آدرس تصویر را وارد کنید'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>

                            <Form.File 
                                id='imageuploading'
                                label
                                custom
                                onChange={uploadFileHandler}
                            />
                            {uploading && <Loader />}
                        </Form.Group>

                        <Form.Group controlId='description'>
                            <Form.Label>توضیحات</Form.Label>

                            <Form.Control
                                type='text'
                                placeholder='توضیحات را وارد کنید'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='category'>
                            <Form.Label>دسته بندی</Form.Label>

                            <Form.Control
                                type='text'
                                placeholder='دسته بندی را وارد کنید'
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='price'>
                            <Form.Label>قیمت</Form.Label>

                            <Form.Control
                                type='number'
                                placeholder='قیمت را وارد کنید'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='countInStock'>
                            <Form.Label>تعداد موجود</Form.Label>

                            <Form.Control
                                type='number'
                                placeholder='تعداد موجود را وارد کنید'
                                value={countInStock}
                                onChange={(e) => setCountInStock(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Button
                            type='submit'
                            variant='info'
                            className='py-2 px-3 mt-3'
                        >
                            به روز رسانی
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </>
    )
}

export default ProductEditScreen;
