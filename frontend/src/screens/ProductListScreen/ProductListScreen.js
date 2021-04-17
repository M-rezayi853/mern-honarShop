import React, { useEffect } from 'react';
import { Table, Button, Row } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { listProduct, createProduct, deleteProduct } from '../../redux/actions/productActions';
import { PRODUCT_CREATE_RESET } from '../../redux/constants/productConstants';
import Paginate from '../../components/Paginate/Paginate';
import './ProductListScreen.scss';

const ProductListScreen = ({ history, match }) => {
    const pageNumber = match.params.pageNumber || 1;

    const dispatch = useDispatch();

    const productList = useSelector(state => state.productList);
    const { error, loading, products, page, pages } = productList;

    const productCreate = useSelector(state => state.productCreate);
    const { error: errorCreated, loading: loadingCreated, success: successCreated, product: productCreated } = productCreate;

    const productDelete = useSelector(state => state.productDelete);
    const { error: errorDelete, loading: loadingDelete, success: successDelete } = productDelete;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        dispatch({ type: PRODUCT_CREATE_RESET });

        if(!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        }

        if(successCreated) {
            history.push(`/admin/product/${productCreated._id}/edit`);
        } else {
            dispatch(listProduct('', pageNumber));
        }
        
    }, [dispatch, userInfo, successCreated, history, productCreated, successDelete, pageNumber]);

    const createProductHandler = () => {
        dispatch(createProduct());
    }

    const deleteHandler = (id) => {
        if(window.confirm('آیا مطمعن هستید؟')) {
            dispatch(deleteProduct(id));
        }
    }

    // eslint-disable-next-line
    String.prototype.toPersianDigit = function() {
        var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w) {
            return id[+w]
        });
    }

    return (
        <div className='productListScreen'>
            <Row className='mb-3'>
                <h2>محصولات</h2>
                <Button
                    className='mr-auto px-3'
                    variant='info'
                    onClick={createProductHandler}
                ><i className='fas fa-plus'></i> ایجاد محصول</Button>
            </Row>
            
            {errorDelete && <Message>{errorDelete}</Message>}
            {loadingDelete && <Loader />}
            {loadingCreated && <Loader />}
            {errorCreated && <Message>{errorCreated}</Message>}
            {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <>
                    <Table striped bordered hover responsive className='table-sm text-center mt-2 mb-5'>
                        <thead>
                            <tr>
                                <th>شناسه محصول</th>
                                <th>نام محصول</th>
                                <th>قیمت</th>
                                <th>دسته بندی</th>
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {products.map(product => (
                                <tr key={product._id}>
                                    <td>{`${product._id}`.toPersianDigit()}</td>
                                    <td>{product.name}</td>
                                    <td>تومان {`${product.price},000`.toPersianDigit()}</td>
                                    <td>{product.category}</td>
                                    <td>
                                        <LinkContainer to={`/admin/product/${product._id}/edit`}>
                                            <Button variant='light' size='sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>

                                        <Button
                                            variant='danger'
                                            onClick={() => deleteHandler(product._id)}
                                            size='sm'
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>

                    <Paginate page={page} pages={pages} isAdmin={true} />
                </>            
            )}
        </div>
    )
}

export default ProductListScreen;
