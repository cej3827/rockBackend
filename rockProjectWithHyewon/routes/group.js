const express = require("express");

var app = express();
const router = express.Router();

app.use(express.json())

const groupModel = require('../models/group');

router.post('/', async function(req, res) {  
    try {
        console.log(req.body);
        console.log(req.body.group_ID);

        const groupID = req.body.group_ID;
        const conn = await groupModel.ListM(groupID);

        if (!conn.result) {
            throw new Error("group_ID is missing");
        }
      
        res.send('success!!');
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

module.exports = router;
