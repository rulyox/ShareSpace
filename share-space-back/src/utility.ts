import express from 'express';
import sharp from 'sharp';

const getTime = (): string => {

    const time = new Date();

    const date = ("0" + time.getDate()).slice(-2);
    const month = ("0" + (time.getMonth() + 1)).slice(-2);
    const year = time.getFullYear();
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    const result = year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds;

    return result.padEnd(20);

};

const print = (log: string): void => {

    console.log(`${getTime()}| ${log}`);

};

const errorHandler = (error: Error, request: express.Request, response: express.Response, next: express.NextFunction) => {

    print(`Error\n${error}`);

    response.status(500).end();

};

const saveImage = (sourceImg: string, targetImg: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {

        try {

            await sharp(sourceImg)
                .resize(512, 512)
                .toFile(targetImg, (error, info) => {
                    if(error) reject(error);
                    resolve(info);
                });

        } catch(error) {

            reject(error);

        }

    });
};

export default {
    getTime,
    print,
    errorHandler,
    saveImage
};
