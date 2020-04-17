const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs')
const PORT = process.env.PORT || 5000;
//connect DB
connectDB();
//Init MiddleWare
app.use(express.json({ extended: false }));
//defines Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/profile/experience', require('./routes/api/experience'));
app.use('/api/profile/education', require('./routes/api/education'));
app.use('/api/profile/achievements', require('./routes/api/achievements'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/tournaments', require('./routes/api/tournaments'));

app.get('/download/:file(*)', (req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    console.log(file);
    // var fileLocation = path.join(__dirname+'/public/storage/uploads',file);
    // console.log(fileLocation);
    var img = fs.readFileSync(`./public/storage/uploads/${file}`);
    console.log(img)
    // var base64img = new Buffer(img).toString('base64');
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img);
});

// server static assets in production
if (process.env.NODE_ENV === 'production') {
    //set static folder
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

//Listening Port
app.listen(PORT, () => console.log(`Port: ${PORT}`));
