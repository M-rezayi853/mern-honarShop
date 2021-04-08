import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import FormContainer from '../../components/FormContainer/FormContainer';
import { registerUser } from '../../redux/actions/userActions';
import { Link } from 'react-router-dom';

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState(null);

    const dispatch = useDispatch();

    const userRegister = useSelector(state => state.userRegister);
    const { error, loading, userInfo } = userRegister;

    const redirect = location.search ? location.search.split('=')[1] : '/';

    useEffect(() => {
        if(userInfo) {
            history.push(redirect);
        }
    }, [userInfo, history, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            setMessage('رمز عبور مطابقت ندارد');
        } else {
            dispatch(registerUser(name, email, password));
        }
    }

    return (
        <FormContainer>
            <h2>فرم ثبت نام</h2>

            {message && <Message>{message}</Message>}
            {error && <Message>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler} className='mt-4'>
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
                    className='py-2 px-4 mt-4'  
                >
                    ثبت نام
                </Button>
            </Form>

            <Row className='py-3 my-3'>
                <Col>
                    آیا حساب کاربری دارید؟ <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>وارد شوید</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen;
