const express=require('express');
const app=express();
const connectDB=require('./config/db');

const PORT=process.env.PORT || 5000;
//connect DB
connectDB();
//Init MiddleWare
app.use(express.json({extended:false}));
//defines Routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/profile/experience',require('./routes/api/experience'));
app.use('/api/profile/education',require('./routes/api/education'));
app.use('/api/profile/achievements',require('./routes/api/achievements'));
app.use('/api/posts',require('./routes/api/posts'));
//Listening Port
app.listen(PORT,()=>console.log(`Port: ${PORT}`));
app.get('/',(req,res)=>res.send('API Running'));
