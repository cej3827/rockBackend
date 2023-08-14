const db = require('./database');

module.exports = {
    // async 응답이 오면 함수가 실행
    // 그룹 ID로 답변된 List 불러오기
    calenderInfo: async function (groupID) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query("SELECT Q.Q_DETAIL FROM Question Q JOIN userGroup UG ON Q.Q_NUM < UG.cnt WHERE UG.group_ID = ?", [groupID], function (err, rows, fields) {
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