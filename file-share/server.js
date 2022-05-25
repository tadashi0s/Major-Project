const express= require('express');
const ejs = require('ejs');
const app= express();
const path= require('path')
const cors = require('cors');
const conncetDB=require('./config/db');
conncetDB();

// 
const static_path = path.join(__dirname, "../frontend");
app.use(express.json());
app.use(cors());
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'/views'))
app.use(express.static('public'));
app.use(express.static(static_path));
//routes
app.get("/", (req, res) => {
    res.render("index")
})
// uploading files and creating link
app.use('/api/files',require('./routes/files'))
// creating downloadable link
app.use('/files',require('./routes/show'));
//download file link
app.use('/files/download',require('./routes/download'))

const PORT = process.env.PORT||3000;
app.listen(PORT,(err)=>{
    if(err) throw err;
    console.log(`server is running on ${PORT}`)
})