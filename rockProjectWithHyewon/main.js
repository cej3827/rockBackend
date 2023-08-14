const express = require('express');
const bodyParser = require("body-parser");
const app =  express();

app.use(bodyParser.urlencoded({extended : false}));

// body 사용시 필수
const questionRouter = require('./routes/question');
const userRouter = require('./routes/user');
const calenderRouter = require('./routes/calender');

app.use('/question', questionRouter);
app.use('/user', userRouter);
app.use('/calender', calenderRouter);

// app.listen(4000, function(){
//   console.log('Connected Server, 4000 Port');
// })

app.listen(8080, function(){
    console.log('Connected Server, 8080 Port');
  })