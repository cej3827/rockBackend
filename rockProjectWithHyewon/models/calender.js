const db = require('./database');

module.exports = {
    // async 응답이 오면 함수가 실행
    // 달마다 calender 불러오기
    calenderInfo: async function (groupID, month) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query(" SELECT C.sche_DETAIL, M.user_NAME, C.sche_START, C.sche_FINISH, C.sche_TYPE, " +
                "CASE WHEN C.sche_TYPE = TRUE THEN M.color ELSE G.color_Key END AS color " +
                "FROM `Calender` C " +
                "JOIN `Member` M ON C.member_ID = M.member_ID AND ? = M.group_ID " +
                "JOIN `userGroup` G ON ? = G.group_ID " +
                "WHERE MONTH(C.sche_START) = ?;",
                [groupID,groupID,month], function (err, rows, fields) {
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

    calenderInsert: async function (plan) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query("INSERT INTO Calender Set ?", [plan], function (err, rows, fields) {
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
}