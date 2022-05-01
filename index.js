const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000;
require('dotenv').config();

const { MongoClient, ServerApiVersion } = require('mongodb');


const app = express();

// middleware
app.use(cors());
app.use(express.json());

// O9BhHaoiAj0qHhkT
console.log(process.env.DB_USER)
console.log(process.env.DB_PASSWORD)
// console.log(process.env)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vqrww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const hikingCollection = client.db("hikingGears").collection("Gears");
        console.log('try is try to connect')

        app.get("/gears",async(req,res)=>{
                    const query={};
                    const cursor=hikingCollection.find(query);
                    const hikingGears= await cursor.toArray();
                    console.log('gears are colllecting')
                    res.send('gears are colllecting');
                })
    }
    finally{

    }
}

run().catch(console.dir);
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   console.log('new user')
//   // perform actions on the collection object
//   client.close();
// });




// client.connect(err => {
//     const hikingCollection = client.db("hikingGears").collection("Gears");
  
//     app.get("/gears",async(req,res)=>{
//         const query={};
//         const cursor=hikingCollection.find(query);
//         const hikingGears= await cursor.toArray();
//       //   console.log('gears are colllecting')
//         res.send('gears are colllecting');
//     })
//     console.log('MONGO IS CONNECTED')
//     // perform actions on the collection object
//   //   client.close();
//   });
  




app.get("/",(req,res)=>{
    res.send('hiking server is connected')
})
app.listen(port, () => {
    console.log('Hiking House is Listening to port', port);
})