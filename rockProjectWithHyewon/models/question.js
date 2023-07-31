const db = require('./database');

module.exports = {
    // async 응답이 오면 함수가 실행
    ListQ: async function() {
        try {
            // DB에 user을 추가하는 쿼리를 보냄
            const result = db.query("SELECT * FROM Question", function(err, rows, fields) {
                console.log(rows); // 결과를 출력합니다!
            });
            return {result: result, error: null};
        } catch (error) {
            return {result: null, error: error};
        }
    },
}