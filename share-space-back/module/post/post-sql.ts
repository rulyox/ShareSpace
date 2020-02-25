const addPost = (user: number, text: string): string =>
    `INSERT INTO post VALUES (NULL, ${user}, "${text}")`;

export default {
    addPost
};
