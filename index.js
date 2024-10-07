//here we will be adding our api methods, lets import all the dependencies we installed

const express = require('express')
const { MongoClient, ObjectId, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors')

const app = express();
const port = 3000;

app.use(cors())

//To connect with the Mongodb URL
const uri= "mongodb+srv://rishithaj9:Sairam%40software24@cluster0.q1zypxh.mongodb.net/?retryWrites=true&w=majority"

//Give the database and collection names you want to connect to
const dbName = 'todoappdb'
const collectionName ='todoappcollection'

//To Use bodyParser middleware globally 
// .json() => to parse json encoded objects from the request of the API call
app.use(bodyParser.json()) 

//To connect with the Mongo DB client
const client = new MongoClient(uri, {serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }})
client.connect();


//Post method: to add a new note
app.post('/todo', async (req,res)=>{
    try{
    const {taskId, description} = req.body;
   console.log("The value of the taskId and description " + taskId, description);
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    const result = await collection.insertOne({taskId, description})
    res.json({taskId, description})
    }
    catch(err){
        console.error('Error posting todo: ', err)
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Get Method: to get all notes
app.get('/todos', async (req, res)=>{
    try{
        const db = client.db(dbName)
        const collection = db.collection(collectionName)
        const todos = await collection.find({}).toArray();
        res.json(todos);
    }
    catch(err){
        console.error('Error receiving todos: ', err)
        res.status(500).json({error: 'Internal Server Error'});
    }
});

//Update a Todo by id
app.put('/todos/:taskId', async (req,res)=>{
    try{
        const {taskId} = req.params;
        const {description} = req.body;
        const db = client.db(dbName)
        const collection = db.collection(collectionName) 
        const result = await collection.findOneAndUpdate(
           // { _id: new ObjectId(taskId) },
            {taskId},
            { $set: {description}},
            { returnDocument: 'after'}
        );
        console.log("Inside the put method " + JSON.stringify(result));
        res.json({taskId, description})
    }
    catch(err){
        console.error('Error updating todos: ', err)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

//Delete a Todo by ID
app.delete('/todos/:taskId', async (req,res)=>{
    try{
    const {taskId} = req.params
    //taskId ='65a1a7a7b05345a438d3a14b' : if i want to delete with the _id string
    //const {description} 
    console.log(taskId);
    const db = client.db(dbName)
    const collection = db.collection(collectionName) 
    //const result = await collection.deleteOne({_id :  new ObjectId(taskId)});
    const result = await collection.deleteOne({taskId: taskId})
    console.log("the value of the result is "+result.body, result, result._id);
    res.json({message: "deleted successfully"});
    }
    catch(err){
        console.error('Error deleting todos: ', err)
        res.status(500).json({error: 'Internal Server Error'});
    }
})

// Close the MongoDB connection when the server is closed
process.on('SIGINT', () => {
    client.close();
    process.exit();
  });

app.listen(3000, ()=>{
    console.log("Console listening");
})

