import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';
import hash from 'hash.js';

const app = express();

//Details for database connection
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

//Function to Connect to Database
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
    if (req.path !== '/M00953762') {
        return res.sendFile(path.join(process.cwd(), 'public', 'index.html'));
    }
    next();
});

app.post('/M00953762', async (request, response) => {
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

app.get('/M00953762', async (request, response) => {
    try {
        await connectDB();

        const database = client.db("cst2120cw2");
        const collection = database.collection("users");

        const data = await collection.find({}).toArray();
        response.json(data);
    } catch (err) {
        console.error("Failed to fetch data:", err);
        response.status(500).send({ "error": "Failed to fetch data from database" });
    } finally {
        await client.close();
    }
});

app.listen(8080, () => {
    console.log("Listening on port 8080");
});
