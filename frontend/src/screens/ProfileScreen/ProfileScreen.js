import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { getDetailUser, updateDetailUser } from '../../redux/actions/userActions';
import { USER_UPDATE_DETAIL_RESET } from '../../redux/constants/userConstants';

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

    useEffect(() => {
        if(!userInfo) {
            history.push('/login');
        } else {
            if(!user || success) {
                dispatch({ type: USER_UPDATE_DETAIL_RESET });
                dispatch(getDetailUser('profile'));
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
                        className='py-2 px-3'
                    >
                        به روز رسانی
                    </Button>
                </Form>
            </Col>
            
            <Col md={9}>
                <h2>سفارشات من</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen;
