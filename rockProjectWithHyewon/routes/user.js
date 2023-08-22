const express = require('express');

var app = express();

const router = express.Router();
app.use(express.json());

const UserModel = require('../models/user');

router.post('/', async function(req, res){
    console.log(req.body);
    console.log(req.body.user_ID);

    const userID = req.body.user_ID;
    const conn = await UserModel.userGroup(userID);
});

router.post('/signup', async function(req, res){
    const userID = req.body.user_ID;
    const password = req.body.user_PW;
    const phoneNum = req.body.user_PHONENUMBER;
    const birthDay = req.body.user_BIRTHDAY;

    const conn = await UserModel.signUp(userID, password, phoneNum, birthDay);

    if(conn.error){
        console.log(conn.error);
        res.send('이미 존재하는 아이디입니다.');
    }
    else
        res.send('회원가입 되었습니다.');
});

router.post('/login', async function(req, res){
    const userID = req.body.user_ID;
    const password = req.body.user_PW;

    const conn = await UserModel.login(userID, password);

    if(conn.error == 'User not found')
        res.send('존재하지 않는 아이디 입니다.');
    else if(conn.error == 'Invalid password')
        res.send('비밀번호가 일치하지 않습니다.');
    else
        res.send('로그인 성공.')
});

module.exports = router;