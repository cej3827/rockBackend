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

router.post('/create', async function(req, res){
    // const groupID = req.body.group_ID;
    const groupName = req.body.group_Name;
    const groupIMG = req.body.group_IMG;
    const cnt = req.body.cnt;
    const userID = req.body.user_ID;
    const colorKey = req.body.color_Key;

    var group = {
        // group_ID : groupID,
        group_Name : groupName,
        group_IMG : groupIMG,
        cnt : cnt,
        user_ID : userID,
        color_Key : colorKey,
        invite_Code : null,
    }

    try {
        const conn = await groupModel.makeGroup(group);

        if (conn.error) {
            res.send('그룹 생성 실패.');
        } else {
            const insertedGroupId = conn.result.group_ID; // Get the inserted group_ID
            res.send({insertedGroupId});
        }
    } catch (error) {
        res.send('오류 발생: ' + error.message);
    }
});

router.post('/member', async function(req, res){
    const member_ID = req.body.member_ID;
    const group_ID = req.body.group_ID;
    const user_ID = req.body.user_ID;
    const user_NAME = req.body.user_NAME;
    const answer_Status = req.body.answer_Status;
    const color = req.body.color;
    const member_IMG = req.body.member_IMG;

    var member = {
        member_ID : member_ID,
        group_ID : group_ID,
        user_ID : user_ID,
        user_NAME : user_NAME,
        color : color,
        answer_Status : answer_Status,
        member_IMG : member_IMG,
    }

    const conn = await groupModel.makeMember(member);

    if(conn.error)
        res.send('멤버 생성 실패.');
    else
        res.send('멤버 생성 성공.')
});

router.post('/code', async function(req, res){
    const groupID = req.body.group_ID;

    const conn = await groupModel.groupCode(groupID);

    if(conn.error)
        res.send('DB ERROR');
    else
        res.send('초대 코드 출력')
});

router.post('/invite', async function(req, res) {
    try {
        const invite_Code = req.body.invite_Code;

        if (!invite_Code) {
            throw new Error("invite_Code is missing");
        }

        const result = await groupModel.invite(invite_Code);

        if (result.error) {
            throw result.error;
        }

        if (result.success) {
            res.json(result.group_ID);
        } else {
            res.send("실패..")
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
})

module.exports = router;
