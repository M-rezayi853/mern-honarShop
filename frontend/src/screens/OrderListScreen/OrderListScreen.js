import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { listOrders } from '../../redux/actions/orderActions';

const OrderListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const orderList = useSelector(state => state.orderList);
    const { error, loading, orders } = orderList;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(!userInfo || !userInfo.isAdmin) {
            history.push('/login');
        } else {
            dispatch(listOrders());
        }
    }, [userInfo, history, dispatch]);

    // eslint-disable-next-line
    String.prototype.toPersianDigit = function() {
        var id= ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        return this.replace(/[0-9]/g, function(w) {
            return id[+w]
        });
    }

    return (
        <>
            <h2>سفارشات</h2>

            {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <Table striped hover responsive bordered className='table-sm text-center my-3'>
                    <thead>
                        <tr>
                            <th>شناسه سفارش</th>
                            <th>کاربر</th>
                            <th>تاریخ</th>
                            <th>جمع قیمت</th>
                            <th>پرداخت شده در</th>
                            <th>دریافت شده در</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{`${order._id}`.toPersianDigit()}</td>
                                <td>{order.user && order.user.name}</td>
                                <td>{`${order.createdAt.substring(0, 10)}`.toPersianDigit()}</td>
                                <td>تومان {`${order.totalPrice},000`.toPersianDigit()}</td>
                                <td>
                                    {order.isPaid ? `${order.paidAt.substring(0, 10)}`.toPersianDigit() : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}
                                </td>

                                <td>
                                    {order.isDelivered ? `${order.deliveredAt.substring(0, 10)}`.toPersianDigit() : (
                                        <i className='fas fa-times' style={{color: 'red'}}></i>
                                    )}
                                </td>

                                <td>
                                    <LinkContainer to={`/order/${order._id}`}>
                                        <Button
                                            variant='light'
                                            size='sm'
                                        >
                                            جزئیات
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}   
        </>
    )
}

export default OrderListScreen;
