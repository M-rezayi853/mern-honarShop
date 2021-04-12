import React, { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../../components/Message/Message';
import Loader from '../../components/Loader/Loader';
import { listUsers, deleteUser } from '../../redux/actions/userActions';

const UserListScreen = ({ history }) => {
    const dispatch = useDispatch();

    const userList = useSelector(state => state.userList);
    const { error, loading, users } = userList;

    const userDelete = useSelector(state => state.userDelete);
    const { success: successDelete } = userDelete;

    const userLogin = useSelector(state => state.userLogin);
    const { userInfo } = userLogin;

    useEffect(() => {
        if(userInfo && userInfo.isAdmin) {
            dispatch(listUsers());
        } else {
            history.push('/login');
        }
    }, [userInfo, history, dispatch, successDelete]);

    const deleteHandler = (id) => {
        if(window.confirm('آیا شما مطمعن هستید؟')) {
            dispatch(deleteUser(id));
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
        <>
            <h2>کاربران</h2>

            {loading ? <Loader /> : error ? <Message>{error}</Message> : (
                <Table bordered striped hover responsive className='table-sm text-center my-5'>
                    <thead>
                        <tr>
                            <th>شناسه کاربر</th>
                            <th>نام کاربر</th>
                            <th>ایمیل</th>
                            <th>ادمین</th>
                            <th></th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{`${user._id}`.toPersianDigit()}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? (
                                    <i className='fas fa-check' style={{color: 'green'}}></i>
                                ) : (
                                    <i className='fas fa-times' style={{color: 'red'}}></i>
                                )}</td>
                                <td>
                                    {!user.realAdmin && (
                                        <LinkContainer to={`/admin/user/${user._id}/edit`}>
                                            <Button variant='light' size='sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                    )}

                                    {!user.realAdmin && (
                                        <Button variant='danger' size='sm' onClick={() => deleteHandler(user._id)}>
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}            
        </>
    )
}

export default UserListScreen;
