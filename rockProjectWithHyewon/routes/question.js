const express = require('express');

var app = express();

const router = express.Router();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const QuestionModel = require('../models/question');

router.post('/', async function(req, res){
    try {
        const groupID = req.body.group_ID;

        if (!groupID) {
            throw new Error("Missing required fields");
        }

        const conn = await QuestionModel.ListQ(groupID);

        if(conn.error)
            res.send('답변된 질문 불러오기 실패');
        else
            res.send('답변된 질문 불러오기 성공');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.get('/list/:num', async function(req, res){
    var params = req.params;
    
    try {
        const groupID = req.body.group_ID;

        if (!groupID) {
            throw new Error("Missing required fields");
        }

        const conn = await QuestionModel.ListQ1(params.num, groupID);

        if(conn.error)
            res.send('질문 답변 모두 불러오기 실패');
        else{
            res.send('질문 답변 모두 불러오기 성공');
            res.send("list nums : " + params.num + "groupID : "+ groupID);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;