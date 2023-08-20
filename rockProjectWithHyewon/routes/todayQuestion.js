const express = require("express");

var app = express();
const router = express.Router();

app.use(express.json())

const groupModel = require('../models/todayQuestion');
const todayQuestion = require("../models/todayQuestion");

router.post('/update', async function(req, res) {
    try {
        const groupID = req.body.group_ID;

        if (!groupID) {
            throw new Error("group_ID is missing");
        }

        const result = await groupModel.UpdateQuestionAndReset(groupID);

        if (result.error) {
            throw result.error;
        }

        if (result.success) {
            res.json({ message: 'Question updated and answers reset.', newQuestionId: result.newQuestionId });
        } else {
            res.json({ message: 'Failed to update question and reset answers.' });
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/save-answer', async function(req, res) {
    try {
        const questionId = req.body.Q_NUM;
        const answerContent = req.body.A_DETAIL;
        const memberId = req.body.member_ID;
        const groupId = req.body.group_ID;
        const imageUrl = req.body.A_IMG; // 이미지가 없는 경우 null로 전달

        if (!questionId || !answerContent || !memberId || !groupId) {
            throw new Error("Missing required fields");
        }

        const result = await todayQuestion.SaveAnswer(questionId, answerContent, memberId, groupId, imageUrl);

        if (result.success) {
            res.json({ message: 'Answer saved successfully.' });
        } else {
            res.json({ message: 'Failed to save answer.' });
            console.log(result.error);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
