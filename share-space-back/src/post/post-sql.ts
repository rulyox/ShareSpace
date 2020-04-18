const add = (user: number, text: string): string =>
    `INSERT INTO post VALUES (NULL, ${user}, "${text}");`;

const addImage = (post: number, image: string): string =>
    `INSERT INTO post_image VALUES (NULL, ${post}, "${image}");`;

const selectNumberOfPostByUser = (user: number): string =>
    `SELECT COUNT(*) as count
    FROM post
    WHERE user = ${user};`;

const selectPostByUserInRange = (user: number, start: number): string =>
    `SELECT id, text
    FROM post
    WHERE user = ${user}
    ORDER BY id DESC
    LIMIT ${start}, 10;`;

export default {
    add,
    addImage,
    selectNumberOfPostByUser,
    selectPostByUserInRange
};
