import React, { useState, useEffect } from 'react';
import { Form, Button, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { getDetailUser, updateUser } from '../../redux/actions/userActions';
import { USER_UPDATE_RESET } from '../../redux/constants/userConstants';

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    const dispatch = useDispatch();

    const userDetail = useSelector(state => state.userDetail);
    const { error, loading, user } = userDetail;

    const userUpdate = useSelector(state => state.userUpdate);
    const { error: errorUpdate, loading: loadingUpdate, success: successUpdate } = userUpdate;

    useEffect(() => {
        if(successUpdate) {
            dispatch({ type: USER_UPDATE_RESET });

            history.push('/admin/userlist');
        } else {
            if(!user || !user.name || user._id !== userId) {
                dispatch(getDetailUser(userId));
            } else {
                setName(user.name);
                setEmail(user.email);
                setIsAdmin(user.isAdmin);
            }
        }
    }, [dispatch, history, userId, user, successUpdate]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(updateUser({ _id: userId, name, email, isAdmin }));
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light py-2 mb-3'>
                برگشت به صفحه قبل
            </Link>
            <FormContainer>
                <h2>ویرایش کاربر</h2>
                
                {errorUpdate && <Message>{errorUpdate}</Message>}
                {loadingUpdate && <Loader />}
                {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                    <Form onSubmit={submitHandler} className='my-5'>
                        <Form.Group controlId='name'>
                            <Form.Label>نام</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='نام را وارد کنید'
                                value={name}
                                onChange={e => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='email'>
                            <Form.Label>ایمیل</Form.Label>
                            <Form.Control
                                type='email'
                                placeholder='ایمیل را وارد کنید'
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='isadmin'>
                            <Row className='mr-1'>
                                <Form.Check
                                    className='mt-1'
                                    type='checkbox'
                                    checked={isAdmin}
                                    onChange={e => setIsAdmin(e.target.checked)}
                                ></Form.Check>
                                <Form.Label className='mr-1 mt-2'>ادمین است</Form.Label>
                            </Row>
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

export default UserEditScreen;
