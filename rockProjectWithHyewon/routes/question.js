const express = require('express');
const router =  express.Router();

const QuestionModel = require('../models/question');

router.get('/', async function(req, res){
    const conn = QuestionModel.ListQ();
});

module.exports = router;