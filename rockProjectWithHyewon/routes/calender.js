const express = require('express');

var app = express();

const router = express.Router();

app.use(express.urlencoded({
    extended: true
}));

app.use(express.json());

const CalenderModel = require('../models/calender');

router.post('/add-plan', async function(req, res){
    const group_ID = req.body.group_ID;
    const sche_ID = req.body.sche_ID;
    const sche_DETAIL = req.body.sche_DETAIL;
    const sche_START = req.body.sche_START;
    const sche_FINISH = req.body.sche_FINISH;
    const sche_TYPE = req.body.sche_TYPE;
    const member_ID = req.body.member_ID;

    var plan = {
        sche_ID : sche_ID,
        sche_DETAIL : sche_DETAIL,
        sche_START : sche_START,
        sche_FINISH : sche_FINISH,
        group_ID : group_ID,
        sche_TYPE : sche_TYPE,
        member_ID : member_ID,
    }

    const conn = await CalenderModel.calenderInsert(plan);
    
    if(conn.error)
        console.log(conn.error);
    else
        console.log('일정추가 성공');
});

router.post('/:month', async function(req, res){
    var params = req.params;
    console.log(params);
    console.log(req.body.group_ID);

    const groupID = req.body.group_ID;

    const conn = await CalenderModel.calenderInfo(groupID, params.month);
    res.send("month : " + params.month);
    console.log(conn.error);
});

module.exports = router;