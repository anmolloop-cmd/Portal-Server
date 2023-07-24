const express=require('express');
const bodyParser=require('body-parser');
const dotenv=require('dotenv').config();
const asyncHandler = require('express-async-handler');
const mongoose=require('mongoose');
const user=require('./userSchema');
const DB=process.env.DB;

const app=express();
const port=process.env.PORT||5000;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mongo DB Connection
function connectDB(){
    try{
        mongoose.connect(DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connection Successfully Established with Database')
    }
    catch(err)
    {
    console.log(err);
    process.exit(1);
    }
}

connectDB();

app.get('/register',asyncHandler(async(req,res)=>{
    const value=await user.count();
    res.status(200).json({value:`Total count is ${value}`});
}))


app.post("/register",asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password)
    {
    res.status(400).json({message:"All fields are mandatory"});
    }
    const contact=new user({email,password});
    const status=await contact.save();
    if(status){
    res.status(201).json(contact);
    }}))

app.listen(port,()=>{
    try{
    console.log(`Server running on ${port}`)
    }
    catch{
    console.log(`Server failed`)
    }
}
)