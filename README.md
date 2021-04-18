# mern-honarShop
### For using:
<h5>clone or download Zip file the project.</h5>
<h5>installation with ($ npm install or $ yarn) in terminal first in root then in frontend folder.</h5>

#### in root folder:
<h5>(npm run server) for start backend.</h5>
<h5>(npm run client) for start frontend.</h5>
<h5>(npm run dev) for start frontend and backend concurrently in development.</h5>

### Sample User Logins

<p>admin@example.com (Admin)<p>
<p>password: qwerty<p>

<p>mahdi@example.com (Customer)</p>
<p>password: 123456</p>

<p>ben@example.com (Customer)</p>
<p>passowrd: 123456</p>

### Import data
npm run data:import

### Destroy data
npm run data:destroy

### Env Variables
Create a .env file in then root and add the following

NODE_ENV = development<br/>
PORT = 5000<br/>
MONGO_URI = your mongodb uri<br/>
JWT_SECRET = 'madi1234'<br/>
PAYPAL_CLIENT_ID = your paypal client id<br/>

