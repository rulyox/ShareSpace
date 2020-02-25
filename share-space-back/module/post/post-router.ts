import express from 'express';
import postController from './post-controller';
import userController from '../user/user-controller';
import utility from "../utility";

const router = express.Router();

/*
Write new post.
POST /post

request header
token : string

request body json
{"text": string, "image": array}

response json
{"auth": boolean, "result": boolean}
*/
router.post('/', async (request, response) => {

    const token = request.headers?.token;
    const text = request.body?.text;
    const image = request.body?.image;

    // type check
    if(typeof token !== 'string' || typeof text !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    utility.print(`POST /post ${token}`);

    const userData: any = await userController.checkToken(token);

    if(userData.auth !== true) {
        response.json({
            'auth': false
        });
        return;
    }

    const userId: number = userData.id;

    let result;
    const resultWrite: boolean = await postController.writePost(userId, text);

    if(resultWrite) {
        result = {
            'auth': true,
            'result': true
        };
    } else {
        result = {
            'auth': true,
            'result': false
        };
    }

    response.json(result);

});

export default router;
