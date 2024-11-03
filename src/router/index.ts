import {createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw} from 'vue-router'
import Setting from "../components/Setting.vue";
import Products from "../components/Products.vue";
import Users from "../components/Users.vue";
import Admin from "../components/Admin.vue";
import Settings from "../components/Settings.vue";

declare module 'vue-router' {
    interface RouteMeta {
        savedPosition?: number;
        requiresAuth?: boolean;
    }
}
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../components/HomePage.vue')
    },
    {
        path: '/home',
        redirect: '/'
    },
    {
        path: '/about',
        name: 'about',
        // Using lazy loading with custom chunk name
        component: () => import(/* webpackChunkName: "about" */ '../components/AboutPage.vue')
    },
    {
        path: '/contact',
        name: 'contact',
        // Using lazy loading with custom chunk name
        component: () => import(/* webpackChunkName: "contact" */ '../components/ContactPage.vue'),
        alias: ['/get-in-touch']
    },
    {
        path: '/search',
        name: 'search',
        component: () => import('../components/Search.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import('../components/NotFound.vue')
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('../components/Login.vue')
    },
    {
        path: '/dashboard',
        name: 'dashboard',
        component: () => import('../components/Dashboard.vue'),
        meta: { requiresAuth: true }
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '',
                name: 'Dashboard2',
                component: () => import('../components/Dashboard2.vue')
            },
            {
                path: 'manager-user',
                name: 'Users',
                component: Users
            },
            {
                path: 'manager-product',
                name: 'Products',
                component: Products
            },
            {
                path: 'setting',
                name: 'Setting',
                component: Setting
            }
            ]
    },
    {
        path: '/settings',
        name: 'settings',
        component: Settings
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Global After Hook
router.afterEach((to: RouteLocationNormalized) => {
    // Log the current URL
    console.log('Current URL:', to.fullPath)

    // Save the URL to localStorage
    localStorage.setItem('lastVisitedUrl', to.fullPath)
})

// Navigation guard
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true'

    if (requiresAuth && !isAuthenticated) {
        next('/login')
    } else {
        next()
    }
})

// Function to check localStorage and redirect after login
export function redirectToLastVisitedUrl(router: any) {
    const lastVisitedUrl = localStorage.getItem('lastVisitedUrl')
    if (lastVisitedUrl && lastVisitedUrl !== '/login') {
        router.push(lastVisitedUrl)
    } else {
        router.push('/dashboard')
    }
}
export default router

// bài tập 7
// import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router';
// import ListPost from '../components/ListPost.vue';
// import PostDetail from '../components/PostDetail.vue';
// import PostNotFound from '../components/PostNotFound.vue';
// import { posts } from '../data/posts';
//
// declare module 'vue-router' {
//     interface RouteMeta {
//         savedPosition?: number;
//     }
// }
//
// const router = createRouter({
//     history: createWebHistory(),
//     routes: [
//         {
//             path: '/posts',
//             name: 'posts',
//             component: ListPost,
//         },
//         {
//             path: '/posts/:id',
//             name: 'post-detail',
//             component: PostDetail,
//             beforeEnter: (to, from, next) => {
//                 const postExists = posts.some(post => post.id === Number(to.params.id));
//                 if (!postExists) {
//                     next({ name: 'post-not-found' });
//                 } else {
//                     next();
//                 }
//             }
//         },
//         {
//             path: '/posts/not-found',
//             name: 'post-not-found',
//             component: PostNotFound
//         }
//     ],
//     scrollBehavior(to: RouteLocationNormalized, from: RouteLocationNormalized, savedPosition) {
//         if (savedPosition) {
//             return savedPosition;
//         }
//
//         if (to.name === 'post-detail') {
//             return new Promise((resolve) => {
//                 setTimeout(() => {
//                     const element = document.querySelector('.post-detail');
//                     if (element) {
//                         const middlePosition = element.getBoundingClientRect().height / 2;
//                         resolve({ top: middlePosition, behavior: 'smooth' });
//                     }
//                 }, 100); // Small delay to ensure component is mounted
//             });
//         }
//
//         if (to.name === 'post-not-found') {
//             return { top: 0, behavior: 'smooth' };
//         }
//
//         return false;
//     }
// });
//
// export default router;