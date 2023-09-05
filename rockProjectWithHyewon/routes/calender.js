const express = require('express');

var app = express();

const router = express.Router();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const CalenderModel = require('../models/calender');

router.post('/add-plan', async function (req, res) {
    const sche_DETAIL = req.body.sche_DETAIL;
    const sche_START = req.body.sche_START;
    const sche_FINISH = req.body.sche_FINISH;
    const group_ID = req.body.group_ID;
    const sche_TYPE = req.body.sche_TYPE;
    const member_ID = req.body.member_ID;

    if (!group_ID | !sche_DETAIL | !member_ID | !sche_FINISH | !sche_START) {
        throw new Error("Missing required fields");
    }

    var plan = {
        sche_DETAIL: sche_DETAIL,
        sche_START: sche_START,
        sche_FINISH: sche_FINISH,
        group_ID: group_ID,
        sche_TYPE: sche_TYPE,
        member_ID: member_ID,
    }

    try {
        const addcalender = await CalenderModel.calenderInsert(plan);

        if (addcalender.error)
            res.json({ message: '일정추가 실패' });
        else
            res.json({ message: '일정추가 성공', data: addcalender.result });
    } catch (error) {
        res.send('오류 발생: ' + error.message);
    }
});

router.post('/:month', async function (req, res) {
    var params = req.params;
    const groupID = req.body.group_ID;

    if (!groupID | !params) {
        throw new Error("Missing required fields");
    }

    try {
        const sche = await CalenderModel.calenderInfo(groupID, params.month);

        if (sche.error) {
            throw sche.error;
        }
        else
            res.send({ message: '일정 불러오기 성공', data: sche.result })
    } catch (error) {
        res.send('오류 발생: ' + error.message);
    }
});

module.exports = router;