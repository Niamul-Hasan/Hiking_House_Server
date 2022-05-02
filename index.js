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


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.vqrww.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
async function run(){
    try{
        await client.connect();
        const hikingCollection = client.db("hikingGears").collection("Gears");
        console.log('try is connected')

        app.get("/gears",async(req,res)=>{
                    const query={};
                    const cursor=hikingCollection.find(query);
                    const hikingGears= await cursor.limit(6).toArray();
                    console.log('gears are colllecting')
                    res.send(hikingGears);
                });
                app.get('/inventories',async(req,res)=>{
                    const query={};
                    const cursor=hikingCollection.find(query);
                    const hikingGears= await cursor.toArray();
                    res.send(hikingGears);
                })

                app.post('/gears',async(req,res)=>{
                    const newInventory=req.body;
                    const result=await hikingCollection.insertOne(newInventory);
                    res.send(result);
                })
    }
    finally{

    }
}

run().catch(console.dir);


app.get("/",(req,res)=>{
    res.send('hiking server is connected')
})
app.listen(port, () => {
    console.log('Hiking House is Listening to port', port);
})