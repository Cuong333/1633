const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { connectDB } = require('./controller/controller');
const { registerUser , loginUser , getAllProducts } = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3000; // Use environment variable for port

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to the database
connectDB()
    .then(() => {
        // Start the server only after DB is connected
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}...`);
        });
    })
    .catch((error) => {
        console.error('Failed to start server:', error.message);
    });

// Routes
app.post('/register', registerUser );
app.post('/login', loginUser );
app.get('/products', getAllProducts);