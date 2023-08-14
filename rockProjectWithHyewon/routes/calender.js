const express = require('express');

var app = express();

const router = express.Router();
app.use(express.json());

const CalenderModel = require('../models/calender');

router.post('/', async function(req, res){
    console.log(req.body);
    console.log(req.body.group_ID);

    const groupID = req.body.group_ID;
    const conn = await CalenderModel.calenderInfo(groupID);
});

module.exports = router;