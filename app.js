const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = 3000;

// Connection URI
const uri= "mongodb+srv://rishithaj9:Sairam%40software24@cluster0.q1zypxh.mongodb.net/?retryWrites=true&w=majority"

const dbName = 'todoappdb'; 

app.get('/api/data', async (req, res) => {
  try {
    // Create a new MongoClient
    const client = new MongoClient(uri, {serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }})

    // Connect to the server
     await client.connect();

    // Access the database
    const database = client.db(dbName);

    // Access the collection
    const collection = database.collection('todoappcollection'); // Replace with your collection name

    // Retrieve data from the collection
    const data = await collection.find({}).toArray();

    // Send the data as JSON in the response
    res.json(data);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    // Close the connection
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
