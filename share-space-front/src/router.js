import VueRouter from 'vue-router';
import LoginComponent from './components/Login';
import HomeComponent from './components/Home';
import FeedComponent from './components/Feed';
import ProfileComponent from './components/Profile';

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
                    path: '/profile/:profileId',
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
