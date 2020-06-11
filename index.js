const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');

 const app = express();

//Middleware
app.use(cors());
app.use(morgan("dev"));

 //Body-Parse
 app.use(express.json());

//Router
const infoRouter = require('./Router');
app.use('/info',infoRouter);



 //listen port
  app.listen(2500,() => {
      console.log('Server Started on 2500');
  })
  
  mongoose.connect("mongodb://localhost:27017/mern", {useNewUrlParser: true, useUnifiedTopology : true},(err) => {
      if(!err) 
      {
          console.log('Db Connected');
      }
    })