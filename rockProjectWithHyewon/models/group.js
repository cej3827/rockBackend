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

    makeGroup: async function (group) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query('INSERT INTO userGroup SET ?', [group], function (err, rows, fields) {
                    if (err) {
                        reject(err);
                        console.log(err);
                    } else {
                        const insertedGroupId = rows.insertId; // Get the inserted group_ID
                        resolve({ group_ID: insertedGroupId }); // Return the inserted group_ID
                        console.log('Inserted group_ID:', insertedGroupId);
                    }
                });
            });
            return { result: result, error: null};
        } catch (error) {
            return { result: null, error: error };
        }
    },

    makeMember: async function (member) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query('INSERT INTO Member SET ?', [member], function (err, rows, fields) {
                    if (err) {
                        reject(err);
                        console.log(err);
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

    groupCode: async function (groupID) {
        try {
            const result = await new Promise((resolve, reject) => {
                db.query('SELECT invite_Code FROM userGroup WHERE group_ID = ?', [groupID], async function (err, rows, fields) {
                    if (err) {
                        reject(err);
                        console.log(err);
                    } else {
                        if (rows.length > 0 && rows[0].invite_Code === null) {
                            // If invite_Code is null, generate a random code
                            const randomCode = Math.random().toString(36).substring(2, 10); // Generate an 8-character random code
                            await db.query('UPDATE userGroup SET invite_Code = ? WHERE group_ID = ?', [randomCode, groupID]);
                            resolve({ Code: randomCode });
                            console.log('Generated invite code:', randomCode);
                        } else {
                            resolve({ Code: rows[0].invite_Code });
                            console.log('Existing invite code:', rows[0].invite_Code);
                        }
                    }
                });
            });
            return { result: result, error: null};
        } catch (error) {
            return { result: null, error: error };
        }
    },

    //초대코드 일치하는가?
    invite: async function (invite_Code) {
        try {
            const query = "SELECT group_ID FROM userGroup WHERE invite_Code = ?";
            const result = await new Promise((resolve, reject) => {
                db.query(query, [invite_Code], function(err, rows, fields) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(rows);
                    }
                });
            });

            if (result.length === 0) {
                throw new Error("no data");
            }

            const group_ID = result[0];

            return { group_ID: group_ID, success: true, error: null };
        } catch (error) {
            return { newQuestionId: null, success: false, error: error };
        }
    }
}