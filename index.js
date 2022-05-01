const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// HikingUser
// euRVdekfOqgNvIrN


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eczke.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  console.log('mongodb is smilling')
//   client.close();
});




app.get("/",(req,res)=>{
    res.send('hiking server is connected')
})
app.listen(port, () => {
    console.log('Hiking House is Listening to port', port);
})