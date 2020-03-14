import express from 'express';
import formidable from 'formidable';
import sharp from 'sharp';
import mysqlManager from '../mysql-manager';
import postSQL from './post-sql';
import utility from '../utility';
import dataConfig from '../../config/data.json';

const parseFormData = (request: express.Request): Promise<{text: string, images: object[]}> => {
    return new Promise(async (resolve, reject) => {

        const formParser = new formidable.IncomingForm();
        formParser.parse(request, function (err, fields, files) {

            if(err) reject(err);

            if(typeof fields.text !== 'string') return;

            resolve({
               text: fields.text,
               images: Object.values(files)
            });

        });

    });
};

const writePost = (user: number, text: string, imageList: any[]): Promise<boolean> => {
    return new Promise(async (resolve) => {

        try {

            // add post to db
            const postAddQuery = await mysqlManager.executeDB(postSQL.addPost(user, text));
            const postId: number = postAddQuery.insertId;

            for(const [index, image] of Object.entries(imageList)) {

                const originalPath = image.path;
                const imageName = `${postId}_${index}.png`;

                // save image to png file
                await saveImage(originalPath, dataConfig.imagePath + imageName);

                // add image to db
                await mysqlManager.executeDB(postSQL.addPostImage(postId, imageName));

            }

            utility.print(`Post : ${postId}, Images : ${imageList.length}`);

            resolve(true);

        } catch(error) {

            utility.print(error);
            resolve(false);

        }

    });
};

const saveImage = (sourceImg: string, targetImg: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {

        await sharp(sourceImg)
            .resize(512, 512)
            .toFile(targetImg, (error, info) => {
                if(error) reject(error);
                resolve(info);
            });

    });
};

export default {
    parseFormData,
    writePost
};
