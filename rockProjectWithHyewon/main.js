const express = require('express');
const app =  express();

const questionRouter = require('./routes/question');
const groupRouter = require('./routes/group');

app.use('/question', questionRouter);
app.use('/group', groupRouter);

// app.listen(4000, function(){
//   console.log('Connected Server, 4000 Port');
// })

app.listen(8080, function(){
    console.log('Connected Server, 8080 Port');
  })