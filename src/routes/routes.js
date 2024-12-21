const { getDB } = require('../controller/controller');
const bcrypt = require('bcrypt');

/**
 * Handle user registration
 */
async function registerUser (req, res) {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const db = await getDB();
        const usersCollection = db.collection('user');

        // Check if the user already exists
        const existingUser  = await usersCollection.findOne({ email });
        if (existingUser ) {
            return res.status(400).json({ error: 'User  already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert the new user into the database
        const newUser  = { fullName, email, password: hashedPassword };
        await usersCollection.insertOne(newUser );

        res.status(201).json({ message: 'User  registered successfully' });
    } catch (error) {
        console.error('Error during user registration:', error);
        res.status(500).json({ error: 'Registration failed. Please try again.' });
    }
}

/**
 * Handle user login
 */
async function loginUser (req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const db = await getDB();
        const usersCollection = db.collection('user');

        // Check if the user exists
        const user = await usersCollection.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: 'User  not found' });
        }

        // Compare the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            user: { id: user._id, name: user.fullName, email: user.email },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Login failed. Please try again later.' });
    }
}

/**
 * Fetch all products
 */
async function getAllProducts(req, res) {
    try {
        const db = await getDB();
        const products = await db.collection('products').find().toArray();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

module.exports = {
    registerUser ,
    loginUser ,
    getAllProducts,
};