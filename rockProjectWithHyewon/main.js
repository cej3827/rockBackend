const express = require('express');
const bodyParser = require("body-parser");
const app =  express();

app.use(bodyParser.urlencoded({extended : false}));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// body 사용시 필수

const { swaggerUi, specs } = require('./swagger/swagger');
const questionRouter = require('./routes/question');
const userRouter = require('./routes/user');
const calenderRouter = require('./routes/calender');
const groupRouter = require('./routes/group');
const todayQuestionRouter = require('./routes/todayQuestion');

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
app.use('/question', questionRouter);
app.use('/user', userRouter);
app.use('/calender', calenderRouter);
app.use('/group', groupRouter);
app.use('/todayQuestion', todayQuestionRouter)

// app.listen(4000, function(){
//   console.log('Connected Server, 4000 Port');
// })

app.listen(8080, function(){
    console.log('Connected Server, 8080 Port');
})
