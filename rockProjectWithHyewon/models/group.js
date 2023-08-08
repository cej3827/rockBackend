const db = require('./database');

module.exports = {
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
}