import crypto from 'crypto';
import mysqlManager from '../mysql-manager';
import userSQL from './user-sql';
import serverConfig from '../../config/server.json';
import express from 'express';
import formidable from 'formidable';
import utility from '../utility';
import dataConfig from '../../config/data.json';

/*
Result Code
101 : OK
201 : Wrong email or password
*/
const checkLogin = (email: string, pw: string): Promise<number> => {
    return new Promise(async (resolve, reject) => {

        try {

            const loginQuery = await mysqlManager.execute(userSQL.select(email, pw));

            if(loginQuery.length === 1) resolve(101);
            else resolve(201);

        } catch(error) {

            reject(error);

        }

    });
};

const createToken = (email: string, pw: string): string => {

    const credential = {
        email: email,
        pw: pw
    };

    return encryptAES(JSON.stringify(credential));

};

const checkToken = (token: string): Promise<{auth: boolean, id?: number, email?: string, name?: string}> => {
    return new Promise(async (resolve, reject) => {

        try {

            // get credential from token
            let credential = JSON.parse(decryptAES(token));

            // type check
            const email = credential?.email;
            const pw = credential?.pw;

            if(typeof email !== 'string' || typeof pw !== 'string') {
                resolve({ auth: false });
                return;
            }

            // check login
            const loginResult: number = await checkLogin(email, pw);
            if(loginResult === 101) {

                const loginQuery = (await mysqlManager.execute(userSQL.select(email, pw)))[0];
                resolve({
                    auth: true,
                    id: loginQuery?.id,
                    email: loginQuery?.email,
                    name: loginQuery?.name
                });

            } else resolve({ auth: false });

        } catch(error) {

            reject(error);

        }

    });
};

/*
Result Code
101 : OK
201 : Email exists
*/
const createUser = (email: string, pw: string, name: string): Promise<number> => {
    return new Promise(async (resolve, reject) => {

        try {

            // check if same email exists
            const emailCheckQuery = await mysqlManager.execute(userSQL.checkEmail(email));

            if(emailCheckQuery?.length === 0) {

                const userAddQuery = await mysqlManager.execute(userSQL.add(email, pw, name));

                if(userAddQuery?.affectedRows === 1) resolve(101);
                else reject('User Add Failed')

            } else resolve(201);

        } catch(error) {

            reject(error);

        }

    });
};

const parseProfileForm = (request: express.Request): Promise<{image: object}> => {
    return new Promise(async (resolve, reject) => {

        try {

            const formParser = new formidable.IncomingForm();
            formParser.parse(request, function (error, fields, files) {

                if(error) {
                    reject(error);
                    return
                }

                resolve({
                    image: Object.values(files)[0]
                });

            });

        } catch(error) {

            reject(error);

        }

    });
};

const addProfileImage = (user: number, image: any): Promise<void> => {
    return new Promise(async (resolve, reject) => {

        try {

            const originalPath = image.path;
            const imageName = `user_${user}.png`;

            // save image to png file
            await utility.saveImage(originalPath, dataConfig.imagePath + imageName);

            // add image to db
            await mysqlManager.execute(userSQL.addProfileImage(user, imageName));

            resolve();

        } catch(error) {

            reject(error);

        }

    });
};

const getUserData = (id: number): Promise<{result: boolean, name?: string}> => {
    return new Promise(async (resolve, reject) => {

        try {

            const getUserQuery = (await mysqlManager.execute(userSQL.selectByID(id)));

            if(getUserQuery?.length === 0) { // if id does not exist

                resolve({ result: false });

            } else {

                const userData = getUserQuery[0];

                resolve({
                    result: true,
                    name: userData?.name
                });

            }

        } catch(error) {

            reject(error);

        }

    });
};

const encryptAES = (plainText: string): string => {

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', serverConfig.aes, iv);
    let encryptedText = cipher.update(plainText);
    encryptedText = Buffer.concat([encryptedText, cipher.final()]);

    return iv.toString('hex') + encryptedText.toString('hex');

};

const decryptAES = (cipherText: string): string => {

    const iv = Buffer.from(cipherText.substring(0, 32), 'hex');
    const encryptedText = Buffer.from(cipherText.substring(32), 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', serverConfig.aes, iv);
    let decryptedText = decipher.update(encryptedText);
    decryptedText = Buffer.concat([decryptedText, decipher.final()]);

    return decryptedText.toString();

};

export default {
    checkLogin,
    createToken,
    checkToken,
    createUser,
    parseProfileForm,
    addProfileImage,
    getUserData
};
