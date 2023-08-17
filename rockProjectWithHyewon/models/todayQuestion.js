const db = require('./database');

module.exports = {
    GetTodayQuestion: async function(groupId) {
        try {
            // 그룹 테이블에서 최근 질문 번호 가져오기
            const getQuestionIdQuery = "SELECT cnt FROM userGroup WHERE group_ID = ?";
            const questionIdResult = await new Promise((resolve, reject) => {
                db.query(getQuestionIdQuery, [groupId], function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            if (questionIdResult.length === 0) {
                throw new Error("No data found for the given group_ID");
            }

            const questionId = questionIdResult[0].cnt;

            // 최근 질문 번호와 일치하는 질문 가져오기
            const getTodaysQuestionQuery = "SELECT * FROM Question WHERE Q_NUM = ?";
            const questionResult = await new Promise((resolve, reject) => {
                db.query(getTodaysQuestionQuery, [questionId], function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            if (questionResult.length === 0) {
                throw new Error("No question found for today in the given group");
            }

            const todaysQuestion = questionResult[0];

            return { todaysQuestion: todaysQuestion, error: null };
        } catch (error) {
            return { todaysQuestion: null, error: error };
        }
    },

    UpdateQuestionAndReset: async function(groupId) {
        try {
            // 현재 최근 질문 번호 가져오기
            const getCurrentQuestionQuery = "SELECT cnt FROM userGroup WHERE group_ID = ?";
            const currentQuestionResult = await new Promise((resolve, reject) => {
                db.query(getCurrentQuestionQuery, [groupId], function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            if (currentQuestionResult.length === 0) {
                throw new Error("No data found for the given group_ID");
            }

            const currentQuestionId = currentQuestionResult[0].cnt;
            const newQuestionId = currentQuestionId + 1;

            // 그룹 테이블의 최근 질문 번호 업데이트
            const updateGroupQuery = "UPDATE userGroup SET cnt = ? WHERE group_ID = ?";
            await new Promise((resolve, reject) => {
                db.query(updateGroupQuery, [newQuestionId, groupId], function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            // 멤버 테이블의 답변 여부 모두 false로 업데이트
            const resetAnswersQuery = "UPDATE Member SET answer_Status = 0 WHERE group_ID = ?";
            await new Promise((resolve, reject) => {
                db.query(resetAnswersQuery, [groupId], function(err, result) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(result);
                    }
                });
            });

            return { newQuestionId: newQuestionId, success: true, error: null };
        } catch (error) {
            return { newQuestionId: null, success: false, error: error };
        }
    },
};