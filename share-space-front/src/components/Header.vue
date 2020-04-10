<template>
    <div class="header-container">

        <nav class="navbar navbar-expand-lg navbar-dark">

            <a class="navbar-brand mr-5" href="/" style="margin-left: 30px;">ShareSpace</a>

            <!-- search -->
            <form class="form-inline my-2 my-lg-0" action="/search">
                <input class="form-control mr-sm-2" type="search" name="query" placeholder="Type here" size="33" aria-label="Search">
                <button class="btn btn-success" type="submit">Search</button>
            </form>

            <!-- if collapse -->
            <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navb">
                <span class="navbar-toggler-icon"></span>
            </button>

            <!-- my profile -->
            <div class="collapse navbar-collapse" id="navb">

                <div class="navbar-nav mr-auto"> </div>

                <img width="50px" height="50px" style="background-color: mediumpurple; border-radius: 25px;"/>

                <ul class="navbar-nav">
                    <li class="nav-item dropdown">

                        <a class="nav-link dropdown-toggle" href="#" id="navbardrop" data-toggle="dropdown" style="color: #FAFAFA;">
                            {{ userName }}
                        </a>

                        <div class="dropdown-menu dropdown-menu-right">
                            <a class="dropdown-item" v-bind:href="'/#/profile/' + userId">My Profile</a>
                            <a class="dropdown-item" href="/#/setting">Settings</a>
                            <a class="dropdown-item" href="/#/logout">Logout</a>
                        </div>

                    </li>
                </ul>

            </div>

        </nav>

    </div>
</template>

<script>
    export default {
        props: ['userId', 'userName']
    };
</script>

<style scoped>
    .navbar {
        background-color: #253B80;
    }

    .navbar-brand {
        color: #FAFAFA;
        font-weight: bold;
    }
</style>
