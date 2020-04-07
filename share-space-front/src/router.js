import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginComponent from './components/Login';
import HomeComponent from './components/Home';
import FeedComponent from './components/Feed';
import ProfileComponent from './components/Profile';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            components: {
                'appContent': HomeComponent
            },
            children: [
                {
                    path: '/',
                    components: {
                        'homeContent': FeedComponent
                    },
                },
                {
                    path: '/profile/:propsProfileId',
                    components: {
                        'homeContent': ProfileComponent
                    },
                    props: {
                        'homeContent': true
                    }
                }
            ]
        },
        {
            path: '/login',
            components: {
                'appContent': LoginComponent
            }
        }
    ]
});

export default router;
