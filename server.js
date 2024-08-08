const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// MongoDB connection string
const mongoURI = "mongodb+srv://ecommerce:ecommerce1@cluster0.du9aiso.mongodb.net/samet-data?retryWrites=true&w=majority&appName=samet-data";

// Connect to MongoDB
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB!');
  // Start the server only after the connection is established
  app.listen(3001, () => {
    console.log('Server started on port 3000');
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});


// Sample route to demonstrate fetching data from MongoDB
app.get('/get-products', async (req, res) => {
  try {
    console.log('Querying samet-data.produits collection');
    const db = mongoose.connection.db;
    const productsData = await db.collection("produits").find({}).toArray();
    console.log('Products data:', productsData);
    res.json(productsData);
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).send('Server Error');
  }
});


