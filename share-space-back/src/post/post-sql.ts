const add = (user: number, text: string): string =>
    `INSERT INTO post VALUES (NULL, ${user}, "${text}")`;

const addImage = (post: number, image: string): string =>
    `INSERT INTO post_image VALUES (NULL, ${post}, "${image}")`;

export default {
    add,
    addImage
};
