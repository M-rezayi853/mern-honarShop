import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const SearchBox = ({ history }) => {
    const [keyword, setKeyword] = useState('');

    const submitHandler = (e) => {
        e.preventDefault();

        if(keyword.trim()) {
            history.push(`/search/${keyword}`);
        } else {
            history.push('/');
        }
    }

    return (
        <Form onSubmit={submitHandler} inline>
            <Form.Control
                className='ml-sm-2 mr-sm-5 my-1'
                type='text'
                name='q'
                placeholder='جستوجوی محصولات...'
                onChange={e => setKeyword(e.target.value)}
            ></Form.Control>

            <Button
                type='submit'
                variant='outline-success'
                className='my-1'
            >
                جستوجو
            </Button>
        </Form>
    )
}

export default SearchBox;
