import React from 'react';
import { Alert } from 'react-bootstrap';
import './Message.scss';

const Message = ({ variant, children }) => {
    return (
        <Alert variant={variant} className='message'>
            {children}
        </Alert>
    )
}

Message.defaultProps = {
    variant: 'danger'
}

export default Message;
