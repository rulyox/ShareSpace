const selectUser = (email: string, pw: string): string =>
    `SELECT * FROM user WHERE email = "${email}" AND pw = "${pw}";`;

const selectUserID = (id: number): string =>
    `SELECT * FROM user WHERE id = "${id}";`;

const checkEmail = (email: string): string =>
    `SELECT * FROM user WHERE email = "${email}";`;

const addUser = (email: string, pw: string, name: string): string =>
    `INSERT INTO user VALUES (NULL, "${email}", "${pw}", "${name}");`;

export default {
    selectUser,
    selectUserID,
    checkEmail,
    addUser
};
