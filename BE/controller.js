const { error } = require('console');
const { MongoClient, ObjectId } = require('mongodb');

const mongoURL = 'mongodb+srv://khoa:1234567890@cluster0.5snb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURL);
let db;

async function connectDB() {
    try {
        await client.connect();
        db = client.db('shop');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
}

async function registerUser(req, res) {
    const { name, email, password } = req.body;

    try {
        //const usersCollection = db.collection('users');
        const existingUser = await db.collection('user').findOne({ email });

        if (existingUser) return req.status(400).json({ error: 'User exist' });
        await usersCollection.insertOne({ full_Name: fullName, email, password });
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    try {
        const usersCollection = db.collection('user');
        
        //const existingUser = await db.collection('users').findOne({ email, password });
        if (!user) return res.status(400).json({ error: 'Invalid credetail' });
        res.status(200).json({ message: 'Login successful', user: { id: user._id, name: user.name, email: user.email } });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await db.collection('products').find().toArray();

        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    connectDB,
    registerUser,
    loginUser,
    getAllProducts
};

