const express = require("express");

var app = express();
const router = express.Router();

app.use(express.json())

const groupModel = require('../models/group');
const todayQuestionModel = require('../models/todayQuestion');
const todayQuestion = require("../models/todayQuestion");

router.post('/', async function(req, res) {
    try {
        const groupID = req.body.group_ID;

        if (!groupID) {
            throw new Error("group_ID is missing");
        }

        const memberResult = await groupModel.ListM(groupID);
        const checkAllResult = await groupModel.CheckAllAnswered(groupID);
        const todayQuestionResult = await todayQuestionModel.GetTodayQuestion(groupID);

        if (memberResult.error) {
            throw memberResult.error;
        }

        if (checkAllResult.error) {
            throw checkAllResult.error;
        }

        if (todayQuestionResult.error) {
            throw todayQuestionResult.error;
        }
        const responseData = {
            member: memberResult.result,
            checkAll: checkAllResult.allAnswered,
            todayQuestion: todayQuestionResult.todaysQuestion,
        };
        res.json(responseData);
    } 
    catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
