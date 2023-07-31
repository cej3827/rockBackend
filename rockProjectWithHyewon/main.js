const express = require('express');
const app = express();

// app.get('/', function(req, res) {
//     res.send("m감자입니까.");
// });

// app.get('/test', function(req, res) {
//     res.send("안녕 ㅋㅋ");
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

//라우트 객체 생성
const mainRouter = require('./routes/index');
//라우트 설정
app.use('/', mainRouter);

const PORT = 8080;
app.listen(PORT, function() {
    console.log("Listening on port: ", PORT);
});