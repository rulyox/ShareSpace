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
{postId: number}
*/
router.post('/', async (request, response, next) => {

    const token = request.headers?.token;
    const formData: {text: string, images: object[]} = await postController.parsePostForm(request);

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

        utility.print(`POST /post user: ${tokenResult.id} file: ${formData.images.length}`);

        const user = tokenResult.id!;

        const postId: number = await postController.writePost(user, formData.text, formData.images);

        response.json({
            postId: postId
        });

    } catch(error) { next(error); }

});

/*
GET /post/user

Get post list by user.

Request Header
token : string

Request Param
user : number

Request Query
start : number (starts from 0)
count : number

Response JSON
{result: number, message: string, total: number, list: number[]}

Result Code
101 : OK
201 : Wrong range
*/
router.get('/user/:user', async (request, response, next) => {

    const token = request.headers?.token;
    const user = Number(request.params?.user);
    const start = Number(request.query?.start);
    const count = Number(request.query?.count);

    // type check
    if(typeof token !== 'string' || isNaN(user) || isNaN(start) || isNaN(count)) {
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

        utility.print(`GET /post/user user: ${tokenResult.id} start: ${start} count: ${count}`);

        // get number of posts by user
        const postCount = await postController.getNumberOfPostByUser(user);

        // start should be 0 from postCount-1
        if(start >= 0 && start < postCount) {

            // get post list by user
            const postList: number[] = await postController.getPostByUser(user, start, count);

            response.json({
                result: 101,
                message: 'OK',
                total: postCount,
                list: postList
            });

        } else {

            response.json({
                result: 201,
                message: 'Wrong range',
                total: postCount
            });

        }

    } catch(error) { next(error); }

});

/*
GET /post

Get post data.

Request Header
token : string

Request Param
id : number

Response JSON
{result: number, message: string, data: {text: string, image: string[]}}

Result Code
101 : OK
201 : Post does not exist
*/
router.get('/:id', async (request, response, next) => {

    const token = request.headers?.token;
    const id = Number(request.params?.id);

    // type check
    if(typeof token !== 'string' || isNaN(id)) {
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

        utility.print(`GET /post user: ${tokenResult.id} id: ${id}`);

        const postData: {result: number, text?: string, image?: string[]} = await postController.getPostData(id);

        switch(postData.result) {

            case 101:
                response.json({
                    result: 101,
                    message: 'OK',
                    data: {
                        text: postData.text,
                        image: postData.image
                    }
                });

                break;

            case 201:
                response.json({
                    result: 201,
                    message: 'Post does not exist'
                });

                break;

        }

    } catch(error) { next(error); }

});

export default router;
