import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { getDetailUser, updateDetailUser } from '../../redux/actions/userActions';
import { USER_UPDATE_DETAIL_RESET } from '../../redux/constants/userConstants';
import { listMyOrder } from '../../redux/actions/orderActions';

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const userDetail = useSelector(state => state.userDetail);
    const { error, loading, user } = userDetail;

    const userUpdateDetail = useSelector(state => state.userUpdateDetail);
    const { success } = userUpdateDetail;

    const orderMyList = useSelector(state => state.orderMyList);
    const { error: errorOrders, loading: loadingOrders, orders } = orderMyList;

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
            if(!user || !user.name || success) {
                dispatch({ type: USER_UPDATE_DETAIL_RESET });
                dispatch(getDetailUser('profile'));
                dispatch(listMyOrder());
            } else {
                setName(user.name);
                setEmail(user.email);
            }
        }
    }, [userInfo, history, user, success, dispatch]);

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setMessage('رمز عبور مطابقت ندارد');
        } else {
            dispatch(updateDetailUser({ id: user._id, name, email, password }));
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
        <Row>
            <Col md={3}>
                <h2>پروفایل کاربر</h2>

                {message && <Message>{message}</Message>}
                {error && <Message>{error}</Message>}
                {success && <Message variant='success'>پروفایل به روز رسانی شد</Message>}
                {loading && <Loader />}
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
                            dir='ltr'
                            type='email'
                            placeholder='ایمیل را وارد کنید'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='password'>
                        <Form.Label>رمز عبور</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='رمز عبور را وارد کنید'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='confirmpassword'>
                        <Form.Label>تایید رمز عبور</Form.Label>
                        <Form.Control
                            type='password'
                            placeholder='تایید رمز عبور را وارد کنید'
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button
                        type='submit'
                        variant='info'
                        className='py-2 mt-3 px-3'
                    >
                        به روز رسانی
                    </Button>
                </Form>
            </Col>
            
            <Col md={9}>
                <h2>سفارشات من</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm my-5 text-center'>
                        <thead>
                            <tr>
                                <th>کد</th>
                                <th>تاریخ</th>
                                <th>قیمت کل</th>
                                <th>تاریخ پرداخت</th>
                                <th>تاریخ دریافت</th>
                                <th></th>
                            </tr>
                        </thead>
                            
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td>{`${order._id}`.toPersianDigit()}</td>
                                    <td>{`${order.createdAt.substring(0, 10)}`.toPersianDigit()}</td>
                                    <td>تومان {`${order.totalPrice},000`.toPersianDigit()}</td>
                                    <td>{order.isPaid ? `${order.paidAt.substring(0, 10)}`.toPersianDigit() : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>{order.isDelivered ? `${order.deliveredAt.substring(0, 10)}`.toPersianDigit() : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}</td>
                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button size='sm' variant='light'>جزئیات</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen;
