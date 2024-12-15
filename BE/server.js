const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');

const {
    connectDB,
    registerUser ,
    loginUser ,
    getAllProducts,
} = require('./controller');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
connectDB();

// Routes
app.post('/register', registerUser );
app.post('/login', loginUser );
app.get('/products', getAllProducts);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}...`);
});