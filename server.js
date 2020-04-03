const express=require('express');
const app=express();
const connectDB=require('./config/db');

const PORT=process.env.PORT || 5000;
//connect DB
connectDB();

//Listening Port
app.listen(PORT,()=>console.log(`Port: ${PORT}`));
app.get('/',(req,res)=>res.send('API Running'));
