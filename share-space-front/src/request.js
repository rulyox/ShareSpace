import axios from 'axios';
import config from './config.json';

const getToken = (email, pw) => {
    return new Promise((resolve, reject) => {

        axios.post(config.server + '/user/token',
            {
                email: email,
                pw: pw
            })
            .then((response) => {

                resolve({
                    result: response.data.result,
                    token: response.data.token
                });

            })
            .catch((error) => reject(error));

    });
};

const login = (token) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user',
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve({
                    id: response.data.id,
                    email: response.data.email,
                    name: response.data.name
                });

            })
            .catch((error) => { reject(error); });

    });
};

const getProfile = (profileId) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user/data/' + profileId)
            .then((response) => {

                resolve({
                    name: response.data.name
                });

            })
            .catch((error) => { reject(error); });

    });
};

const writePost = (token, text, imageList) => {
    return new Promise((resolve, reject) => {

        const formData = new FormData();
        formData.append('text', text);
        formData.append('file1', imageList[0]);
        formData.append('file2', imageList[0]);

        axios.post(config.server + '/post', formData,
            {
                headers: {
                    token: token,
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                resolve();
            })
            .catch((error) => { reject(error); });

    });
};

const getPostByUser = (token, user, start) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/user/' + user + '?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve({
                    result: response.data.result,
                    total: response.data.total,
                    list: response.data.list
                });

            })
            .catch((error) => { reject(error); });

    });
};

const getPostData = (token, id) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/data/' + id,
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve({
                    result: response.data.result,
                    data: response.data.data
                });

            })
            .catch((error) => { reject(error); });

    });
};

const getImageFile = (token, post, image) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/image/' + post + '/' + image,
            {
                responseType: 'arraybuffer',
                headers: {token: token}
            })
            .then((response) => { resolve(response.data); })
            .catch((error) => { reject(error); });

    });
};

const getFeed = (token, start) => {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/post/feed?start=' + start + '&count=10',
            {
                headers: {token: token}
            })
            .then((response) => {

                resolve(response.data);

            })
            .catch((error) => { reject(error); });

    });
};

export default {
    getToken,
    login,
    getProfile,
    writePost,
    getPostByUser,
    getPostData,
    getImageFile,
    getFeed
};
