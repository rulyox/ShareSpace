import express from 'express';
import path from 'path';
import postController from './post-controller';
import userController from '../user/user-controller';
import utility from '../utility';
import dataConfig from '../../config/data.json';

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
GET /post/data

Get post data.

Request Header
token : string

Request Param
id : number

Response JSON
{result: number, message: string, data: {user: number, name: string, text: string, image: string[]}}

Result Code
101 : OK
201 : Post does not exist
*/
router.get('/data/:id', async (request, response, next) => {

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

        const postData: {result: number, user?: number, name?: string, text?: string, image?: string[]} = await postController.getPostData(id);

        switch(postData.result) {

            case 101:
                response.json({
                    result: 101,
                    message: 'OK',
                    data: {
                        user: postData.user,
                        name: postData.name,
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

/*
GET /post/image

Get image file.

Request Header
token : string

Request Param
post : number
image: string

Response
image file
*/
router.get('/image/:post/:image', async (request, response, next) => {

    const token = request.headers?.token;
    const post = Number(request.params?.post);
    const image = request.params?.image;

    // type check
    if(typeof token !== 'string' || isNaN(post) || typeof image !== 'string') {
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

        utility.print(`GET /post/image user: ${tokenResult.id} id: ${tokenResult.id} post: ${post} image: ${image}`);

        const imageResult: boolean = await postController.checkImage(post, image);

        if(imageResult) response.sendFile(path.join(__dirname, '../../../', dataConfig.imageDir, image));
        else response.status(404).end();

    } catch(error) { next(error); }

});

/*
GET /post/feed

Get feed.

Request Header
token : string

Request Query
start : number (starts from 0)
count : number

Response JSON
{author: number, post: number}[]
*/
router.get('/feed', async (request, response, next) => {

    const token = request.headers?.token;
    const start = Number(request.query?.start);
    const count = Number(request.query?.count);

    // type check
    if(typeof token !== 'string' || isNaN(start) || isNaN(count)) {
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

        utility.print(`GET /post/feed user: ${tokenResult.id}`);

        const feedData = await postController.getFeed(tokenResult.id!, start, count);

        response.json(feedData);

    } catch(error) { next(error); }

});

export default router;
