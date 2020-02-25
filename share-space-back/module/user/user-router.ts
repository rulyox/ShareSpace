import express from 'express';
import userController from './user-controller';
import utility from '../utility';

const router = express.Router();

/*
Check login and create token.
POST /user/token

request body json
{"email": string, "pw": string}

response json
{"auth": boolean, "token": string}
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

    utility.print(`POST /user/token ${email}`);

    let result;
    const resultLogin: boolean = await userController.checkLogin(email, pw);

    if(resultLogin) {
        const token: string = userController.createToken(email, pw);
        result = {
            'auth': true,
            'token': token
        };
    } else {
        result = {
            'auth': false
        };
    }

    response.json(result);

});

/*
Login.
GET /user

request header
token : string

response json
{"auth": boolean, "id": number, "email": string, "name": string}
 */
router.get('/', async (request, response) => {

    const token = request.headers?.token;

    // type check
    if(typeof token !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    utility.print(`GET /user ${token}`);

    const result = await userController.checkToken(token);

    response.json(result);

});

/*
Sign up.
POST /user

request body json
{"email": string, "pw": string, "name": string}

response json
{"result": boolean}
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

    utility.print(`POST /user ${email}`);

    const resultAddUser: boolean = await userController.createUser(email, pw, name);

    const result = {
        'result': resultAddUser
    };

    response.json(result);

});

/*
Get user data.
GET /user/data

request param
id : number

response json
{"result": boolean, "name": string}
 */
router.get('/data/:id', async (request, response) => {

    try {

        const id = parseInt(request.params.id);

        utility.print(`GET /user/data ${id}`);

        const result = await userController.getUserData(id);

        response.json(result);

    } catch(error) { // if parseInt fails

        response.writeHead(400);
        response.end();

    }

});

export default router;
