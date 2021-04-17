import React from 'react';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Route } from 'react-router-dom';

import { logoutUser } from '../../redux/actions/userActions';
import SearchBox from '../SearchBox/SearchBox';
import './Header.scss';

const Header = () => {
    const dispatch = useDispatch();

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    const logoutHandler = () => {
        dispatch(logoutUser());
    }

    return (
        <header className='header'>
            <Navbar className='header__nav' bg='primary' variant='light' expand='md'>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>هنرشاپ</Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Route render={({ history }) => <SearchBox history={history} />} />

                        <Nav className='mr-auto header header__admin'>
                            {userInfo && userInfo.isAdmin && (
                                <NavDropdown title='ادمین سایت' id='adminmenu'>
                                    <LinkContainer to='/admin/userlist' className='header header__link'>
                                        <NavDropdown.Item>کاربران</NavDropdown.Item>
                                    </LinkContainer>
                                
                                    <LinkContainer to='/admin/productlist' className='header header__link'>
                                        <NavDropdown.Item>محصولات</NavDropdown.Item>
                                    </LinkContainer>

                                    <LinkContainer to='/admin/orderlist' className='header header__link'>
                                        <NavDropdown.Item>سفارشات</NavDropdown.Item>
                                    </LinkContainer>
                              </NavDropdown>
                            )}

                            <LinkContainer to='/cart'>
                                <Nav.Link>لیست خرید <i className='fas fa-shopping-cart'></i> &nbsp;<span></span></Nav.Link>
                            </LinkContainer>

                            {userInfo ? (
                                <NavDropdown title={userInfo.name} id='username' dir='rtl'>
                                    <LinkContainer to='/profile' className='header header__link'>
                                        <NavDropdown.Item eventKey='1' dir='rtl'>پروفایل</NavDropdown.Item>
                                    </LinkContainer>

                                    <NavDropdown.Item eventKey='2' onClick={logoutHandler} className='header header__link'>خروج از حساب کاربری</NavDropdown.Item>
                                </NavDropdown>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>ورود به حساب <i className='fas fa-user'></i> &nbsp;<span></span></Nav.Link>
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
