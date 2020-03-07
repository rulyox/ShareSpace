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
{text: string, image: array}

response json
{result: boolean}
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

    let result: {result: boolean};
    utility.print(`POST /post ${token}`);

    const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

    // auth check
    if(!tokenResult.auth) {
        response.writeHead(401);
        response.end();
        return;
    }

    const writeResult: boolean = await postController.writePost(tokenResult.id!, text);

    // write post failed
    if(!writeResult) {
        response.writeHead(500);
        response.end();
        return;
    }

    result = {
        'result': true
    };

    response.json(result);

});

export default router;
