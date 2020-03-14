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

request form
text : string
files

response json
{result: boolean}
*/
router.post('/', async (request, response) => {

    const token = request.headers?.token;
    const formData: {text: string, images: object[]} = await postController.parseFormData(request);

    // type check
    if(typeof token !== 'string') {
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

    const user = tokenResult.id!;
    const writeResult: boolean = await postController.writePost(user, formData.text, formData.images);

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
