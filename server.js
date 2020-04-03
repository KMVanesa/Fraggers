const express=require('express');
const app=express();
const connectDB=require('./config/db');

const PORT=process.env.PORT || 5000;
//connect DB
connectDB();

//defines Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/posts',require('./routes/api/posts'));
//Listening Port
app.listen(PORT,()=>console.log(`Port: ${PORT}`));
app.get('/',(req,res)=>res.send('API Running'));
