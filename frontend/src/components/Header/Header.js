import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../../redux/actions/userActions';
import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logoutUser());
    }

    return (
        <header className='mb-5'>
            <Navbar className='header' bg='primary' variant='light' expand='md'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>هنرشاپ</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='mr-auto'>
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='ادمین سایت' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>کاربران</NavDropdown.Item>
                                    </LinkContainer>
                                
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>محصولات</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>سفارشات</NavDropdown.Item>
                                    </LinkContainer>
                              </NavDropdown>
                            )}

                            <LinkContainer to='/cart'>
                                <Nav.Link><i className='fas fa-shopping-cart'></i> &nbsp;<span>لیست خرید</span></Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username'>
                                    <LinkContainer to='/profile'>
                                        <NavDropdown.Item eventKey='1'>پروفایل</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item eventKey='2' onClick={logoutHandler}>خروج از حساب کاربری</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link><i className='fas fa-user'></i> &nbsp;<span>ورود به حساب</span></Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header;
