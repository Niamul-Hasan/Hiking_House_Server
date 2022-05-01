const express = require('express');
const cors = require('cors');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());


app.get("/",(req,res)=>{
    res.send('hiking server is connected')
})
app.listen(port, () => {
    console.log('Hiking House is Listening to port', port);
})