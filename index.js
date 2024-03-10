const express =require('express');
const cors =require('cors');
const {MongoClient} =require('mongodb');
const bcrypt =require ('bcrypt')


//object
const app =new express();
app.use(express.json());
app.use(cors());
app.get('/home',(req,res)=> {
    res.send("My Home Page")
})

const client = new MongoClient('mongodb+srv://paul:admin@paul.l1luj7e.mongodb.net/?retryWrites=true&w=majority')
client.connect();
const db = client.db('mswdsrp');

const col = db.collection('register');

app.post('/insert',async(req,res)=>{
    console.log(req.body);
    req.body.password=await bcrypt.hash(req.body.password,5)
    col.insertOne(req.body);
    res.send("Successfully Recieved")
})

app.get('/showall',async(req,res)=> {
    const result=await col.find().toArray();
    console.log(result);
    res.send(result)
})

app.post('/delete',async(req,res)=> {
    const result1=await col.findOne({'name':req.body.un})
    console.log(result1);
     if (result1.password==req.body.pw)
     col.deleteOne(result1);
    })

app.listen(5000);
console.log("server running");