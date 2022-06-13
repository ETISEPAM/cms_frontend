const routes = [
    {
        path: '/',
        component: () => import('layouts/BlankLayout.vue'),
        children: [
            { path: '', component: () => import('pages/LoginPage.vue') },
        ],
    },
    {
        path: '/panel',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/IndexPage.vue') },
        ],
    },
    {
        path: '/panel/create',
        component: () => import('layouts/MainLayout.vue'),
        children: [
            { path: '', component: () => import('pages/CreatePage.vue') },
        ],
    },
    {
        path: '/:catchAll(.*)*',
        component: () => import('pages/ErrorNotFound.vue'),
    },
];

export default routes;
