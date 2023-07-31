const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    // res.send('라우트를 사용한 메인 페이지입니다.');
    res.render('index', {name : '최은진', age : "22", job : "ceo"});
});

module.exports = router;