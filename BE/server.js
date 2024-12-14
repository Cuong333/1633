const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
//const {connectDB, registerUser, loginUser, getAllProducts, getUserProfile } = require('./controller');

const{
    connectDB,
    registerUser,
    loginUser,
    getAllProducts,
}= require('./controller');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(cors());

connectDB;

app.post('/register', registerUser);
app.post('/login', loginUser);
app.get('/products', getAllProducts);
app.get('/profile', getUserProfile);

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}...`);
});
