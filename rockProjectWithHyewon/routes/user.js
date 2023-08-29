const express = require('express');

var app = express();

const router = express.Router();
app.use(express.json());

const UserModel = require('../models/user');

router.post('/', async function(req, res){
    try {
        const userID = req.body.user_ID;

        if (!userID) {
            throw new Error("Missing required fields");
        }

        const conn = await UserModel.userGroup(userID);

        if(conn.error)
            res.send('그룹 불러오기 실패');
        else
            res.send('그룹 불러오기 성공');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/signup', async function(req, res){
    try {
        const userID = req.body.user_ID;
        const password = req.body.user_PW;
        const phoneNum = req.body.user_PHONENUMBER;
        const birthDay = req.body.user_BIRTHDAY;

        if (!userID || !password || !phoneNum || !birthDay) {
            throw new Error("Missing required fields");
        }

        const conn = await UserModel.signUp(userID, password, phoneNum, birthDay);

        if(conn.error){
            console.log(conn.error);
            res.send('이미 존재하는 아이디입니다.');
        }
        else
            res.send('회원가입 되었습니다.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', async function(req, res){
    try {
        const userID = req.body.user_ID;
        const password = req.body.user_PW;

        if (!userID || !password) {
            throw new Error("Missing required fields");
        }

        const conn = await UserModel.login(userID, password);

        if(conn.error == 'User not found')
            res.send('존재하지 않는 아이디 입니다.');
        else if(conn.error == 'Invalid password')
            res.send('비밀번호가 일치하지 않습니다.');
        else
            res.send('로그인 성공.');
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;