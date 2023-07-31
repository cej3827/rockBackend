const express = require('express');
const app =  express();

const questionRouter = require('./routes/question');

app.use('/question', questionRouter);

// app.listen(4000, function(){
//   console.log('Connected Server, 4000 Port');
// })

app.listen(8080, function(){
    console.log('Connected Server, 8080 Port');
  })