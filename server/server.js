const express = require('express');
const app = express();
const connectDB = require('./config/db');
const path = require('path');


//connect data base
connectDB();

//init middleware
app.use(express.json({extended: false}));



app.use(express.static('../client/build'));
app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'../','client/build/index.html'))
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`server start on ${PORT}`);
});