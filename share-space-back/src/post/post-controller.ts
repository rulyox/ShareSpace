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

        } catch(error) {

            reject(error);

        }

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

        } catch(error) {

            reject(error);

        }

    });
};

export default {
    parsePostForm,
    writePost
};
