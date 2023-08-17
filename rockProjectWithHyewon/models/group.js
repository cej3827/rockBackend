const db = require('./database');

module.exports = {
    //그룹 아이디 받아서 멤버의 닉네임, 색상, 답변 여부 select
    ListM: async function(groupId) {
        try {
            const query = "SELECT user_NAME, color, answer_Status FROM Member WHERE group_ID = ?";
            const result = await new Promise((resolve, reject) => {
                db.query(query, [groupId], function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                    console.log(rows); 
                });
            });

            if (result.length === 0) {
                throw new Error("No data found for the given group_ID");
            }

            return { result: result, error: null };
        } catch (error) {
            return { result: null, error: error };
        }
    },
    //모두 답변했는지 check
    CheckAllAnswered: async function(groupId) {
        try {
            const query = "SELECT COUNT(*) AS TotalMembers, SUM(answer_Status) AS AnsweredMembers FROM Member WHERE group_ID = ?";
            const result = await new Promise((resolve, reject) => {
                db.query(query, [groupId], function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            if (result.length === 0) {
                throw new Error("No data found for the given group_ID");
            }

            const totalMembers = result[0].TotalMembers;
            const answeredMembers = result[0].AnsweredMembers;

            const allAnswered = totalMembers > 0 && totalMembers === answeredMembers;

            return { allAnswered: allAnswered, error: null };
        } catch (error) {
            return { allAnswered: false, error: error };
        }
    },
}