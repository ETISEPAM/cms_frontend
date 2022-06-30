const routes = [
    {
        path: '/',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/CommonPages/LoginPage.vue') },
        ],
    },
    {
        path: '/panel',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/AdminPages/AdminHomePage.vue') },
        ],
    },
    {
        path: '/panel/content',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/CommonPages/ContentPage.vue') },
        ],
    },
    {
        path: '/panel/type',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/CommonPages/ContentTypePage.vue') },
        ],
    },
    {
        path: '/panel/client',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/AdminPages/ClientPage.vue') },
        ],
    },
    {
        path: '/panel/configurations',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/AdminPages/ConfigurationPage.vue') },
        ],
    },
    {
        path: '/panel/newpassword',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/UserPages/NewPassword.vue') },
        ],
    },
    {
        path: '/home',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('src/pages/UserPages/UserHomePage.vue') },
        ],
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('src/pages/CommonPages/ErrorNotFound.vue'),
    },
];

export default routes;
