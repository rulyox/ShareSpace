<template>
    <div class="login-container">

        <div class="login-dialog">

            <a class="dialog-title">ShareSpace</a>

            <el-input class="dialog-input" placeholder="Enter email" v-model="email" />
            <el-input class="dialog-input" placeholder="Enter password" v-model="password" show-password />

            <div class="dialog-button">
                <el-button v-on:click.prevent="clickLogin" type="primary">Login</el-button>
                <el-button v-on:click.prevent="clickLogin" type="primary">Sign Up</el-button>
            </div>

        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import config from "../config";

    function getToken(email, pw) {
        return new Promise((resolve) => {

            axios.post(config.server + '/user/token', {
                email: email,
                pw: pw
            }).then((response) => {

                if(response.status === 200) {
                    console.log('Login Get Token Success');
                    localStorage.setItem('token', response.data.token);
                    resolve(true);
                } else { // error
                    console.log('Login Get Token Error');
                    resolve(false);
                }

            }).catch(() => resolve(false)); // wrong credential

        });
    }

    async function clickLogin() {

        if(this.email === '' || this.password === '') {
            alert('Empty email or password!');
            return;
        }

        const resultToken = await this.getToken(this.email, this.password);

        if(resultToken) await this.$router.push('/');
        else {
            alert('Login failed. Check email or password!');

            this.email = "";
            this.password = "";
        }

    }

    export default {
        data() {
            return {
                email: "",
                password: ""
            };
        },

        methods: {
            getToken,
            clickLogin
        }
    }
</script>

<style scoped>
    .login-container {
        height: 100%;
        width: 100%;
        background-color: #253B80;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login-dialog {
        width: 500px;
        height: 350px;
        background-color: #FAFAFA;
        border-radius: 10px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .dialog-title {
        font-size: 30px;
        font-weight: bolder;
        color: #253B80;
        margin-bottom: 30px;
    }

    .dialog-input {
        width: 400px;
        margin-bottom: 30px;
    }

    .dialog-button {
        display: flex;
        flex-direction: row;
    }
</style>
