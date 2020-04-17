import axios from 'axios';
import config from './config.json';

function getToken(email, pw) {
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
}

function login(token) {
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
}

function getProfile(profileId) {
    return new Promise((resolve, reject) => {

        axios.get(config.server + '/user/data/' + profileId)
            .then((response) => {

                resolve({
                    name: response.data.name
                });

            })
            .catch((error) => { reject(error); });

    });
}

function writePost(token, text, imageList) {
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
}

export default {
    getToken,
    login,
    getProfile,
    writePost
};
