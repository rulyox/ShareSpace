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

    utility.print(`POST /post ${token}`);

    try {

        const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

        // auth check
        if(!tokenResult.auth) {
            response.status(401).end();
            return;
        }

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
{result: number, message: string, total: number, list: {id: number, text: string, image: string[]}[]}
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

    utility.print(`GET /post ${token}`);

    try {

        const tokenResult: {auth: boolean, id?: number, email?: string, name?: string} = await userController.checkToken(token);

        // auth check
        if(!tokenResult.auth) {
            response.status(401).end();
            return;
        }

        // get number of posts by user
        const postCount = await postController.getNumberOfPostByUser(user);

        // start should be 0 from postCount-1
        if(start >= 0 && start < postCount) {

            // get post list by user
            const postList: {id: number, text: string, image: string[]}[] = await postController.getPostByUser(user, start, count);

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

export default router;
