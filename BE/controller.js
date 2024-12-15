const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');

const mongoURL = 'mongodb+srv://khoa:1234567890@cluster0.5snb8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(mongoURL);
let db;

// Kết nối cơ sở dữ liệu
async function connectDB() {
    try {
        await client.connect();
        db = client.db('shop');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1); // Dừng server nếu kết nối thất bại
    }
}

// Hàm đăng ký người dùng
async function registerUser(fullName, email, password) {
    try {
        const usersCollection = db.collection('user');

        // Kiểm tra xem email đã tồn tại chưa
        const existingUser = await usersCollection.findOne({ email });
        if (existingUser) {
            throw new Error('User already exists');
        }

        // Hash mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10);

        // Thêm người dùng mới vào cơ sở dữ liệu
        const newUser = { fullName, email, password: hashedPassword };
        await usersCollection.insertOne(newUser);

        console.log('User registered successfully:', newUser);
        return { success: true, message: 'User registered successfully' };
    } catch (error) {
        console.error('Error during user registration:', error);
        throw new Error(error.message || 'Registration failed');
    }
}

module.exports = { connectDB, registerUser };


async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    try {
        const usersCollection = db.collection('user');
        const user = await usersCollection.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: 'User not found' });
        }

        // Compare hashed password
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

async function getAllProducts(req, res) {
    try {
        const products = await db.collection('products').find().toArray();
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
}

module.exports = {
    connectDB,
    registerUser,
    loginUser,
    getAllProducts,
};
