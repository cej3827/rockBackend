const express = require("express");

var app = express();
const router = express.Router();

app.use(express.json())

const groupModel = require('../models/todayQuestion');

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


module.exports = router;
