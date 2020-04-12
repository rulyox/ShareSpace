import express from 'express';
import postController from './post-controller';
import userController from '../user/user-controller';
import utility from '../utility';

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
    const formData: {text: string, images: object[]} = await postController.parsePostForm(request);

    // type check
    if(typeof token !== 'string') {
        response.status(400).end();
        return;
    }

    utility.print(`POST /post ${token}`);

    try {

        const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

        // auth check
        if(!tokenResult.auth) {
            response.status(401).end();
            return;
        }

        const user = tokenResult.id!;
        await postController.writePost(user, formData.text, formData.images);

        response.json({ 'result': true });

    } catch(error) {

        // error handler
        next(new Error(`POST /post\n${error}`));

    }

});

export default router;
