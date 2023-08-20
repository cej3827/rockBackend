const { response } = require('express');
const db = require('./database');

module.exports = {
    // async 응답이 오면 함수가 실행
    // userID로 사용자 접속 그룹 불러오기
    userGroup: async function (userID) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query("SELECT group_Name, group_IMG FROM userGroup WHERE user_ID = ?", [userID], function (err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                        console.log(rows);
                    }
                });
            });

            return { result: result, error: null };
        } catch (error) {
            return { result: null, error: error };
        }
    },

    // 회원가입 함수
    // userID가 key값으로 설정되어 있어 동일한 userID가 존재하면 error를 반환한다.
    signUp: async function (userID, password, phoneNum, birthDay) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query('INSERT INTO User (user_ID, user_PW, user_PHONE, user_BIRTHDAY) VALUES(?,?,?,?)', [userID, password,phoneNum,birthDay], function (err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                        console.log(rows);
                    }
                });
            });
            return { result: result, error: null};
        } catch (error) {
            return { result: null, error: error };
        }
    },

    // 로그인 시 동작하는 함수
    login: async function (userID, password) {
        const PW = 0;
        try {
            const result = await new Promise((resolve, reject) => {
                db.query('select user_PW from User where user_ID = ?', [userID], function (err, rows, fields) {
                    if (err) {
                        reject(err); 
                    } else {
                        if (rows.length == 0) {
                            reject('User not found'); // User가 존재하지 않는 경우 에러 처리
                        } else if (rows[0].user_PW == password) {
                            resolve(rows);
                            console.log(rows);
                        } else {
                            reject('Invalid password'); // 비밀번호가 일치하지 않는 경우 에러 처리
                        }
                    }
                });
            });
            return { result: result, error: null};
        } catch (error) {
            return { result: null, error: error };
        }
    },
}