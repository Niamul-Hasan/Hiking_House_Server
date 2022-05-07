const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 4000;
require('dotenv').config();

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


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
        const myCollection=client.db("hikingGears").collection("MyGears");
        console.log('try is connected')
        // Api for homepage Inventory load
        app.get("/gears",async(req,res)=>{
                    const query={};
                    const cursor=hikingCollection.find(query);
                    const hikingGears= await cursor.limit(6).toArray();
                    console.log('gears are colllecting')
                    res.send(hikingGears);
                });
                // Api for loading all inventories to Inventory manage component
                app.get('/inventories',async(req,res)=>{
                    console.log('All inventories are getting')
                    const query={};
                    const cursor=hikingCollection.find(query);
                    const hikingGears= await cursor.toArray();
                    res.send(hikingGears);
                })

                // Api for loading selected inventory details
                app.get('/inventories/:id', async(req,res)=>{
                    const id=req.params.id;
                    const query={_id:ObjectId(id)};
                    const result=await hikingCollection.findOne(query);
                    res.send(result);

                })
                // Api for Deleting selected inventory
                app.delete('/inventories/:id', async(req,res)=>{
                    const id=req.params.id;
                    const query={_id:ObjectId(id)};
                    const deletedInventory=await hikingCollection.deleteOne(query);
                    res.send(deletedInventory);

                })
                 // Api for updating quantity
                 app.put('/inventories/:id',async(req,res)=>{
                     const id=req.params.id;
                     const updatedData=req.body;
                     const filter={_id:ObjectId(id)};
                     const options = { upsert: true };
                     const updatedDoc = {
                        $set: {
                            quantity:updatedData.quantity,
                            suplier:updatedData.suplier
                        }
                    };
                    const result = await hikingCollection.updateOne(filter, updatedDoc, options);
                    res.send(result);
        

                 })

                // Api for insert an inventory for mongodb 
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