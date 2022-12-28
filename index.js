const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5000 ;

// middleware 
app.use(cors())
app.use(express.json())

// task-manager
// KgyjSJ06LrmAIa9r


// MongoDB connection 
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.rz3ftkv.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri);



app.get('/', (req, res)=>{
    res.send('Task management server is running')
});

app.listen(port,()=>{
    console.log(`task-management server is running on ${port}`)
})