import express from 'express';
import userController from './user-controller';
import utility from '../utility';

const router = express.Router();

/*
Check login and create token.
POST /user/token

request body json
{email: string, pw: string}

response json
{token: string}
 */
router.post('/token', async (request, response) => {

    const email = request.body?.email;
    const pw = request.body?.pw;

    // type check
    if(typeof email !== 'string' || typeof pw !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    let result: {token: string};
    utility.print(`POST /user/token ${email}`);

    const loginResult: boolean = await userController.checkLogin(email, pw);

    // auth check
    if(!loginResult) {
        response.writeHead(401);
        response.end();
        return;
    }

    const token: string = userController.createToken(email, pw);

    result = {
        token: token
    };

    response.json(result);

});

/*
Login.
GET /user

request header
token : string

response json
{id: number, email: string, name: string}
 */
router.get('/', async (request, response) => {

    const token = request.headers?.token;

    // type check
    if(typeof token !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    let result: {id: number, email: string, name: string};
    utility.print(`GET /user ${token}`);

    const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

    // auth check
    if(!tokenResult.auth) {
        response.writeHead(401);
        response.end();
        return;
    }

    result = {
        id: tokenResult.id!,
        email: tokenResult.email!,
        name: tokenResult.name!
    };

    response.json(result);

});

/*
Sign up.
POST /user

request body json
{email: string, pw: string, name: string}

response json
{result: boolean}
 */
router.post('/', async (request, response) => {

    const email = request.body?.email;
    const pw = request.body?.pw;
    const name = request.body?.name;

    // type check
    if(typeof email !== 'string' || typeof pw !== 'string' || typeof name !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    let result: {result: boolean};
    utility.print(`POST /user ${email}`);

    const addUserResult: boolean = await userController.createUser(email, pw, name);

    result = {
        result: addUserResult
    };

    response.json(result);

});

/*
Get user data.
GET /user/data

request param
id : number

response json
{name: string}
 */
router.get('/data/:id', async (request, response) => {

    const id = Number(request.params?.id);

    // type check
    if(isNaN(id)) {
        response.writeHead(400);
        response.end();
        return;
    }

    let result: {name: string};
    utility.print(`GET /user/data ${id}`);

    const userDataResult: {result: boolean, name?: string} = await userController.getUserData(id);

    // user exist check
    if(!userDataResult.result) {
        response.writeHead(404);
        response.end();
        return;
    }

    result = {
        name: userDataResult.name!
    };

    response.json(result);

});

export default router;
