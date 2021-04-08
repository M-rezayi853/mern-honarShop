import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { loginUser } from '../../redux/actions/userActions';

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { error, loading, userInfo } = userLogin;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        dispatch(loginUser(email, password));
    }

    return (
        <FormContainer>
            <h2>ورود به حساب کاربری</h2>
            
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className='my-5'>
                <Form.Group controlId='email'>
                    <Form.Label>آدرس ایمیل</Form.Label>
                    <Form.Control
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

                <Button 
                    type='submit' 
                    variant='info'
                    className='py-2 px-2 mt-4'
                >
                    ورود به حساب کاربری
                </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    کاربر جدید هستید؟ <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>ثبت نام کنید</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen;
