// Import necessary modules
import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import hash from 'hash.js';
import expressSession from 'express-session';
import fileUpload from 'express-fileupload';


// Create an Express application
const app = express();
app.use(bodyParser.json());
app.use(fileUpload());

// Serve static files from the 'public' directory
app.use(express.static(path.join(process.cwd(), 'public')));

// Set up session middleware
app.use(
    expressSession({
        secret: 'cst2120cw2', // Secret used to sign the session ID cookie
        cookie: { maxAge: 60000 }, // Expiration time for the cookie (in milliseconds)
        resave: false, // Whether to save session data on each request even if it hasn't been modified
        saveUninitialized: true // Whether to save sessions that are new but not modified
    })
);

// Database credentials
const password = "sJGmRWlzEelHY889";
const userName = "hvd";
const server = "cst2120cw2.0hms7ov.mongodb.net";

// Encode username and password for MongoDB connection URI
const encodedUsername = encodeURIComponent(userName);
const encodedPassword = encodeURIComponent(password);

// MongoDB connection URI
const connectionURI = `mongodb+srv://${encodedUsername}:${encodedPassword}@${server}/?retryWrites=true&w=majority`;

// Create a new MongoClient instance
const client = new MongoClient(connectionURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

// Function to connect to the MongoDB database
async function connectDB() {
    try {
        await client.connect(); // Connect to the MongoDB server
        console.log("Connected to the database");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        throw err;
    }
}

// Middleware to serve index.html for all routes except '/M00953762' and '/signup'
app.get('*', (req, res, next) => {
    if (req.path !== '/M00953762' && req.path !== '/signup') {
        return res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
    }
    next();
});

// Route for user signup
app.post('/signup', async (request, response) => {
    const newUser = request.body;

    try {
        await connectDB(); // Connect to the database

        const database = client.db("cst2120cw2");
        const collection = database.collection("users");

        // Hash the password before storing it in the database
        const hashedPassword = hash.sha256().update(newUser.password).digest('hex');
        newUser.password = hashedPassword;

        const result = await collection.insertOne(newUser); // Insert the new user into the collection
        console.log("Data saved to database:", result.insertedCount === 1);

        response.send({ "message": "Data saved to database" });
    } catch (err) {
        console.error("Failed to insert data:", err);
        response.status(500).send({ "error": "Failed to save data to database" });
    } finally {
        await client.close(); // Close the database connection
    }
});

// Route for handling front-end submission requirements
app.post('/M00953762', async (request, response) => {
    const newUser = request.body;

    try {
        await connectDB(); // Connect to the database

        const database = client.db("cst2120cw2");
        const collection = database.collection("users");

        const result = await collection.insertOne(newUser); // Insert the new data into the collection
        console.log("Data saved to database:", result.insertedCount === 1);

        response.send({ "message": "Data saved to database" });
    } catch (err) {
        console.error("Failed to insert data:", err);
        response.status(500).send({ "error": "Failed to save data to database" });
    } finally {
        await client.close(); // Close the database connection
    }
});

// Route for user login
app.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        await connectDB(); // Connect to the database

        const database = client.db("cst2120cw2");
        const collection = database.collection("users");

        const user = await collection.findOne({ email }); // Find the user by email in the collection

        if (user) {
            const hashedPassword = hash.sha256().update(password).digest('hex');

            if (hashedPassword === user.password) {
                const { password, ...userDataWithoutPassword } = user;
                response.json({ message: 'Login successful!', userData: userDataWithoutPassword });
            } else {
                response.status(401).json({ error: 'Invalid email or password.' });
            }
        } else {
            response.status(404).json({ error: 'User not found.' });
        }
    } catch (error) {
        console.error('Error:', error);
        response.status(500).json({ error: 'Internal server error.' });
    } finally {
        await client.close(); // Close the database connection
    }
});

// Start the Express server
app.listen(8080, () => {
    console.log("Listening on port 8080");
});