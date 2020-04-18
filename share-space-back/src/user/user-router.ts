import express from 'express';
import userController from './user-controller';
import utility from '../utility';

const router = express.Router();

/*
POST /user/token

Check login and create token.

Request Body JSON
{email: string, pw: string}

Response JSON
{result: number, message: string, token: string}

Result Code
101 : OK
201 : Wrong email or password
*/
router.post('/token', async (request, response, next) => {

    const email = request.body?.email;
    const pw = request.body?.pw;

    // type check
    if(typeof email !== 'string' || typeof pw !== 'string') {
        response.status(400).end();
        return;
    }

    utility.print(`POST /user/token ${email}`);

    try {

        const loginResultCode: number = await userController.checkLogin(email, pw);

        switch(loginResultCode) {

            case 101:
                const token: string = userController.createToken(email, pw);

                response.json({
                    result: 101,
                    message: 'OK',
                    token: token
                });

                break;

            case 201:
                response.json({
                    result: 201,
                    message: 'Wrong email or password'
                });

                break;

            default:
                next(new Error('Wrong Result Code'));

        }

    } catch(error) { next(error); }

});

/*
GET /user

Login.

Request Header
token : string

Response JSON
{id: number, email: string, name: string}
*/
router.get('/', async (request, response, next) => {

    const token = request.headers?.token;

    // type check
    if(typeof token !== 'string') {
        response.status(400).end();
        return;
    }

    try {

        const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

        // auth check
        if(!tokenResult.auth) {
            response.status(401).end();
            return;
        }

        utility.print(`GET /user user: ${tokenResult.id}`);

        response.json({
            id: tokenResult.id!,
            email: tokenResult.email!,
            name: tokenResult.name!
        });

    } catch(error) { next(error); }

});

/*
POST /user

Sign up.

Request Body JSON
{email: string, pw: string, name: string}

Response JSON
{result: number, message: string}

Result Code
101 : OK
201 : Email exists
*/
router.post('/', async (request, response, next) => {

    const email = request.body?.email;
    const pw = request.body?.pw;
    const name = request.body?.name;

    // type check
    if(typeof email !== 'string' || typeof pw !== 'string' || typeof name !== 'string') {
        response.status(400).end();
        return;
    }

    utility.print(`POST /user ${email}`);

    try {

        const addUserResult: number = await userController.createUser(email, pw, name);

        let resultMessage: string = '';
        if(addUserResult === 101) resultMessage = 'OK';
        else if(addUserResult === 201) resultMessage = 'Email exists';

        response.json({
            result: addUserResult,
            message: resultMessage
        });

    } catch(error) { next(error); }

});

/*
POST /user/image

Add profile image.

Request Header
token : string

Request Form
files

Response JSON
{result: boolean}
*/
router.post('/image', async (request, response, next) => {

    const token = request.headers?.token;
    const formData: {image: object} = await userController.parseProfileForm(request);

    // type check
    if(typeof token !== 'string') {
        response.status(400).end();
        return;
    }

    try {

        const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

        // auth check
        if(!tokenResult.auth) {
            response.status(401).end();
            return;
        }

        utility.print(`POST /user/image user: ${tokenResult.id}`);

        const user = tokenResult.id!;
        await userController.addProfileImage(user, formData.image);

        response.json({ 'result': true });

    } catch(error) { next(error); }

});

/*
GET /user/data

Get user data.

Request Param
id : number

Response JSON
{name: string}
*/
router.get('/data/:id', async (request, response, next) => {

    const id = Number(request.params?.id);

    // type check
    if(isNaN(id)) {
        response.status(400).end();
        return;
    }

    utility.print(`GET /user/data ${id}`);

    try {

        const userDataResult: {result: boolean, name?: string} = await userController.getUserData(id);

        // user exist check
        if(!userDataResult.result) {
            response.status(404).end();
            return;
        }

        response.json({ name: userDataResult.name! });

    } catch(error) { next(error); }

});

export default router;
