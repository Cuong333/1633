const { MongoClient } = require('mongodb');

const mongoURL = 'mongodb+srv://khoa:1234567890@cluster0.5snb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURL);
let db;

/**
 * Connect to MongoDB
 */
async function connectDB() {
    try {
        await client.connect();
        db = client.db('shop');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw new Error('MongoDB connection failed');
    }
}

async function getDB() {
    if (!db) {
        throw new Error('Database not connected. Call connectDB first.');
    }
    return db;
}

module.exports = { connectDB, getDB };