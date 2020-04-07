import express from 'express';
import postController from './post-controller';
import userController from '../user/user-controller';
import utility from "../utility";

const router = express.Router();

/*
POST /post

Write new post.

Request Header
token : string

Request Form
text : string
files

Response JSON
{result: boolean}
*/
router.post('/', async (request, response, next) => {

    const token = request.headers?.token;
    const formData: {text: string, images: object[]} = await postController.parseFormData(request);

    // type check
    if(typeof token !== 'string') {
        response.writeHead(400);
        response.end();
        return;
    }

    utility.print(`POST /post ${token}`);

    try {

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

        response.json({ 'result': true });

    } catch(error) {

        // error handler
        next(new Error(`POST /post\n${error}`));

    }

});

export default router;
