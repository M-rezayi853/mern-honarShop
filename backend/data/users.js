import bcrypt from 'bcryptjs';

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('qwerty', 10),
        isAdmin: true
    },
    {
        name: 'Mahdi Rezayi',
        email: 'mahdi@example.com',
        password: bcrypt.hashSync('123456', 10)
    },
    {
        name: 'Ben Rezayi',
        email: 'ben@example.com',
        password: bcrypt.hashSync('123456', 10)
    }
];

export default users;