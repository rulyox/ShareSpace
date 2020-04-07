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
{token: string}
 */
router.post('/token', async (request, response, next) => {

    const email = request.body?.email;
    const pw = request.body?.pw;

    // type check
    if(typeof email !== 'string' || typeof pw !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    utility.print(`POST /user/token ${email}`);

    try {

        const loginResult: boolean = await userController.checkLogin(email, pw);

        // auth check
        if(!loginResult) {
            response.writeHead(401);
            response.end();
            return;
        }

        const token: string = userController.createToken(email, pw);

        response.json({ token: token });

    } catch(error) {

        // error handler
        next(new Error(`POST /user/token\n${error}`));

    }

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
        response.writeHead(400);
        response.end();
        return;
    }

    utility.print(`GET /user ${token}`);

    try {

        const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

        // auth check
        if(!tokenResult.auth) {
            response.writeHead(401);
            response.end();
            return;
        }

        response.json({
            id: tokenResult.id!,
            email: tokenResult.email!,
            name: tokenResult.name!
        });

    } catch(error) {

        // error handler
        next(new Error(`GET /user\n${error}`));

    }

});

/*
POST /user

Sign up.

Request Body JSON
{email: string, pw: string, name: string}

Response JSON
{result: boolean}
 */
router.post('/', async (request, response, next) => {

    const email = request.body?.email;
    const pw = request.body?.pw;
    const name = request.body?.name;

    // type check
    if(typeof email !== 'string' || typeof pw !== 'string' || typeof name !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    utility.print(`POST /user ${email}`);

    try {

        const addUserResult: boolean = await userController.createUser(email, pw, name);

        response.json({ result: addUserResult });

    } catch(error) {

        // error handler
        next(new Error(`POST /user\n${error}`));

    }

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
        response.writeHead(400);
        response.end();
        return;
    }

    utility.print(`GET /user/data ${id}`);

    try {

        const userDataResult: {result: boolean, name?: string} = await userController.getUserData(id);

        // user exist check
        if(!userDataResult.result) {
            response.writeHead(404);
            response.end();
            return;
        }

        response.json({ name: userDataResult.name! });

    } catch(error) {

        // error handler
        next(new Error(`GET /user/data\n${error}`));

    }

});

export default router;
