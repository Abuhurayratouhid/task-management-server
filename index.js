const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const cors = require('cors')
const port = process.env.PORT || 5000;

// middleware 
app.use(cors())
app.use(express.json())




// MongoDB connection 
const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.USER_PASSWORD}@cluster0.rz3ftkv.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri);


// function for create api 
async function run() {
    try {
        const taskDB = client.db('taskDB')
        const addedTask = taskDB.collection('addedTask')
        // add a task 
        app.post('/taskAdd', async (req, res) => {
            const task = req.body;
            const result = await addedTask.insertOne(task)
            res.send(result)
            // console.log(result)
        })

        // get all task 
        app.get('/allTask',async(req, res)=>{
            const query = {};
            const result = await addedTask.find(query).toArray()
            res.send(result)
        })

        // update a task 
        app.put('/taskComplete/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const options = {upsert: true}
            const updateDoc = {
                $set: {
                    type: 'completed'
                }
            }
            const result = await addedTask.updateOne(query, updateDoc,options)
            res.send(result)
        })

        // ReUpdate a task 
        app.put('/taskUnComplete/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const options = {upsert: true}
            const updateDoc = {
                $set: {
                    type: 'uncompleted'
                }
            }
            const result = await addedTask.updateOne(query, updateDoc,options)
            res.send(result)
        })

        // delete a task 
        app.delete('/taskDelete/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await addedTask.deleteOne(query)
            res.send(result)
        })

        // get only  completed task 
        app.get('/completedTask', async(req,res)=>{
            const query = {type: 'completed'}
            const result = await addedTask.find(query).toArray();
            res.send(result)
        })

        // get single task info by ID 
        app.get('/task/:id', async(req, res)=>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const result = await addedTask.findOne(query)
            res.send(result)
        })

        // Edit a task
        app.put('/editTask/:id',async(req, res)=>{
            const id = req.params.id;
            const filter = {_id: ObjectId(id)}
            const options = {upsert: true}
            const task = req.body;
            const updatedDoc = {
                $set: {
                    date: task.date,
                    details: task.details,
                    taskName: task.taskName
                }
            }
            const result = await addedTask.updateOne(filter, updatedDoc, options)
            res.send(result)
            // console.log(task)
        }) 

    }
    finally {

    }
}
run().catch((e) => console.log(e))


app.get('/', (req, res) => {
    res.send('Task management server is running')
});

app.listen(port, () => {
    console.log(`task-management server is running on ${port}`)
})