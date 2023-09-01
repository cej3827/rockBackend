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

        const list = await QuestionModel.ListQ(groupID);

        if(list.error)
            res.json({message : '답변된 질문 불러오기 실패'});
        else
            res.json({message : '답변된 질문 불러오기 성공', data : list.result});
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

        const answer = await QuestionModel.ListQ1(params.num, groupID);

        if(answer.error)
            res.json({message : '질문 답변 불러오기 실패'});
        else{
            res.json({message : '질문 답변 불러오기 성공', data : answer.result});
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;