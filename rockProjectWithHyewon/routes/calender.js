const express = require('express');

var app = express();

const router = express.Router();
app.use(express.json());

const CalenderModel = require('../models/calender');

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