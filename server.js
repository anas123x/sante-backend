const express = require('express');
const app = express();
const cors = require('cors');
const port = 3000;
const { MongoClient } = require('mongodb');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
const mongoURI = 'mongodb+srv://anas:anas@clubsante.t8u8geo.mongodb.net/?retryWrites=true&w=majority';
const dbName = 'club-sante';
const client = new MongoClient(mongoURI);


// Sample route handling GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Sample route handling POST requests to the root URL
app.post('/', async (req, res) => {
    const { email, selectedOption, selectedDropdown } = req.body;

    try {
        await client.connect();
        const db = client.db(dbName);
      // Access the collection in the database
      const collection = db.collection('forms');

      // Insert the data into the collection
      await collection.insertOne(req.body);

      res.status(201).json({ message: 'Data saved to MongoDB' });
    } catch (error) {
      console.error('Error saving data to MongoDB:', error);
      res.status(500).json({ error: 'Unable to save data to MongoDB' });
    }
  });
app.options('*', cors());
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
