import express from 'express';
import formidable from 'formidable';
import mysqlManager from '../mysql-manager';
import postSQL from './post-sql';
import utility from '../utility';
import dataConfig from '../../config/data.json';

const parsePostForm = (request: express.Request): Promise<{text: string, images: object[]}> => {
    return new Promise(async (resolve, reject) => {

        try {

            const formParser = new formidable.IncomingForm();
            formParser.parse(request, function (error, fields, files) {

                if(error) {
                    reject(error);
                    return
                }

                if(typeof fields.text !== 'string') {
                    reject('FormData text is not string');
                    return;
                }

                resolve({
                    text: fields.text,
                    images: Object.values(files)
                });

            });

        } catch(error) { reject(error); }

    });
};

const writePost = (user: number, text: string, imageList: any[]): Promise<number> => {
    return new Promise(async (resolve, reject) => {

        try {

            // add post to db
            const postAddQuery = await mysqlManager.execute(postSQL.add(user, text));
            const postId: number = postAddQuery.insertId;

            for(const [index, image] of Object.entries(imageList)) {

                const originalPath = image.path;
                const imageName = `${postId}_${index}.png`;

                // save image to png file
                await utility.saveImage(originalPath, dataConfig.imagePath + imageName);

                // add image to db
                await mysqlManager.execute(postSQL.addImage(postId, imageName));

            }

            utility.print(`Post : ${postId}, Images : ${imageList.length}`);

            resolve(postId);

        } catch(error) { reject(error); }

    });
};

const getNumberOfPostByUser = (user: number): Promise<number> => {
    return new Promise(async (resolve, reject) => {

        try {

            // get number of posts by user
            const postCountQuery = (await mysqlManager.execute(postSQL.selectNumberOfPostByUser(user)))[0];
            const postCount = postCountQuery.count;

            resolve(postCount);

        } catch(error) { reject(error); }

    });
};

const getPostByUser = (user: number, start: number, count: number): Promise<{id: number, text: string, image: string[]}[]> => {
    return new Promise(async (resolve, reject) => {

        try {

            // get post list by user
            const postQuery: {id: number, text: string}[] = await mysqlManager.execute(postSQL.selectPostByUserInRange(user, start, count));

            const postList = [];

            for(const post of postQuery) {

                // get images of a post
                const postImageQuery: {image: string}[] = await mysqlManager.execute(postSQL.selectPostImage(post.id));

                // save image file name to list
                const imageList = [];
                for(const image of postImageQuery) imageList.push(image.image);

                // add image list to post
                const newPost = Object.assign(post, {image: imageList});
                postList.push(newPost);

            }

            resolve(postList);

        } catch(error) { reject(error); }

    });
};

export default {
    parsePostForm,
    writePost,
    getNumberOfPostByUser,
    getPostByUser
};
