import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import hash from 'hash.js';

const app = express();

const password = "sJGmRWlzEelHY889";
const userName = "hvd";
const server = "cst2120cw2.0hms7ov.mongodb.net";

const encodedUsername = encodeURIComponent(userName);
const encodedPassword = encodeURIComponent(password);

const connectionURI = `mongodb+srv://${encodedUsername}:${encodedPassword}@${server}/?retryWrites=true&w=majority`;

const client = new MongoClient(connectionURI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: false,
        deprecationErrors: true,
    }
});

app.use(express.static('public'));
app.use(bodyParser.json());

async function connectDB() {
    try {
        await client.connect();
        console.log("Connected to the database");
    } catch (err) {
        console.error("Failed to connect to the database:", err);
        throw err;
    }
}

app.get('*', (req, res, next) => {
    if (req.path !== '/M00953762' && req.path !== '/signup') {
        return res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
    }
    next();
});

// Route for signup
app.post('/signup', async (request, response) => {
    const newUser = request.body;

    try {
        await connectDB();

        const database = client.db("cst2120cw2");
        const collection = database.collection("users");

        // Hash the password before storing it in the database
        const hashedPassword = hash.sha256().update(newUser.password).digest('hex');
        newUser.password = hashedPassword;

        const result = await collection.insertOne(newUser);
        console.log("Data saved to database:", result.insertedCount === 1);

        response.send({ "message": "Data saved to database" });
    } catch (err) {
        console.error("Failed to insert data:", err);
        response.status(500).send({ "error": "Failed to save data to database" });
    } finally {
        await client.close();
    }
});

// Route for handling existing data route
app.post('/M00953762', async (request, response) => {
    const newUser = request.body;

    try {
        await connectDB();

        const database = client.db("cst2120cw2");
        const collection = database.collection("users");

        const result = await collection.insertOne(newUser);
        console.log("Data saved to database:", result.insertedCount === 1);

        response.send({ "message": "Data saved to database" });
    } catch (err) {
        console.error("Failed to insert data:", err);
        response.status(500).send({ "error": "Failed to save data to database" });
    } finally {
        await client.close();
    }
});

// Route for login
app.post('/login', async (request, response) => {
    const { email, password } = request.body;

    try {
        await connectDB();

        const database = client.db("cst2120cw2");
        const collection = database.collection("users");

        const user = await collection.findOne({ email });

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
        await client.close();
    }
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
