const express = require('express');

var app = express();

const router = express.Router();
app.use(express.json());

const QuestionModel = require('../models/question');

router.post('/', async function(req, res){
    console.log(req.body);
    console.log(req.body.group_ID);

    const groupID = req.body.group_ID;
    const conn = await QuestionModel.ListQ(groupID);
});

router.get('/list/:num', async function(req, res){
    var params = req.params;
    console.log(params);
    console.log(req.body.group_ID);

    const groupID = req.body.group_ID;

    const conn = await QuestionModel.ListQ1(params.num, groupID);
    res.send("list nums : " + params.num + "groupID : "+ groupID);
    // error 처리
});

module.exports = router;