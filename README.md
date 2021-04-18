## mern-honarShop
<h3>for using:</h3>
<h5>clone or download Zip file the project.</h5>
<h5>installation with ($ npm install or $ yarn) in terminal first in root then in frontend folder.</h5>

in root folder:
<h5>(npm run server) for start backend.</h5>
<h5>(npm run client) for start frontend.</h5>
<h5>(npm run dev) for start frontend and backend concurrently in development.</h5>

### Sample User Logins

admin@example.com (Admin)
qwerty

mahdi@example.com (Customer)
123456

ben@example.com (Customer)
123456

### Import data
npm run data:import

### Destroy data
npm run data:destroy

### Env Variables
Create a .env file in then root and add the following

NODE_ENV = development
PORT = 5000
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
PAYPAL_CLIENT_ID = your paypal client id


