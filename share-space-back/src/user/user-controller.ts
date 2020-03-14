import crypto from 'crypto';
import mysqlManager from '../mysql-manager';
import userSQL from './user-sql';
import utility from '../utility';
import aesConfig from '../../config/aes.json';

const checkLogin = (email: string, pw: string): Promise<boolean> => {
    return new Promise(async (resolve) => {

        try {

            const loginQuery = await mysqlManager.executeDB(userSQL.selectUser(email, pw));

            if(loginQuery.length > 0) resolve(true);
            else resolve(false);

        } catch(error) {

            utility.print(error);
            resolve(false);

        }

    });
};

const encryptAES = (plainText: string): string => {

    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', aesConfig.key, iv);
    let encryptedText = cipher.update(plainText);
    encryptedText = Buffer.concat([encryptedText, cipher.final()]);

    return iv.toString('hex') + encryptedText.toString('hex');

};

const decryptAES = (cipherText: string): string => {

    const iv = Buffer.from(cipherText.substring(0, 32), 'hex');
    const encryptedText = Buffer.from(cipherText.substring(32), 'hex');

    const decipher = crypto.createDecipheriv('aes-256-cbc', aesConfig.key, iv);
    let decryptedText = decipher.update(encryptedText);
    decryptedText = Buffer.concat([decryptedText, decipher.final()]);

    return decryptedText.toString();

};

const createToken = (email: string, pw: string): string => {

    const credential = {
        email: email,
        pw: pw
    };

    return encryptAES(JSON.stringify(credential));

};

const checkToken = (token: string): Promise<{auth: boolean, id?: number, email?: string, name?: string}> => {
    return new Promise(async (resolve) => {

        const failResponse = {
            auth: false
        };

        // get credential from token
        let credential;
        try {
            credential = JSON.parse(decryptAES(token));
        } catch(error) {
            resolve(failResponse);
            return;
        }

        // type check
        const email = credential?.email;
        const pw = credential?.pw;

        if(typeof email !== 'string' || typeof pw !== 'string') {
            resolve(failResponse);
            return;
        }

        // check login
        const loginResult = await checkLogin(email, pw);
        if(loginResult) {

            try {

                const loginQuery = (await mysqlManager.executeDB(userSQL.selectUser(email, pw)))[0];
                resolve({
                    auth: true,
                    id: loginQuery?.id,
                    email: loginQuery?.email,
                    name: loginQuery?.name
                });

            } catch(error) {

                utility.print(error);
                resolve(failResponse);

            }

        } else resolve(failResponse);

    });
};

const createUser = (email: string, pw: string, name: string): Promise<boolean> => {
    return new Promise(async (resolve) => {

        let emailExists: boolean;

        try {

            // check if same email exists
            const emailCheckQuery = await mysqlManager.executeDB(userSQL.checkEmail(email));

            if(emailCheckQuery?.length === 0) emailExists = false;
            else emailExists = true;

        } catch(error) {

            utility.print(error);
            resolve(false);
            return;

        }

        if(!emailExists) {

            try {

                const userAddQuery = await mysqlManager.executeDB(userSQL.addUser(email, pw, name));

                if(userAddQuery?.affectedRows === 1) resolve(true);
                else resolve(false);

            } catch(error) {

                utility.print(error);
                resolve(false);

            }

        } else resolve(false);

    });
};

const getUserData = (id: number): Promise<{result: boolean, name?: string}> => {
    return new Promise(async (resolve) => {

        const getUserQuery = (await mysqlManager.executeDB(userSQL.selectUserID(id)));

        if(getUserQuery?.length === 0) { // if id does nto exist

            resolve({
                result: false
            });

        } else {

            const userData = getUserQuery[0];

            resolve({
                result: true,
                name: userData?.name
            });

        }

    });
};

export default {
    checkLogin,
    createToken,
    checkToken,
    createUser,
    getUserData
};
