import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/home/HomeView.vue'),
        },
        {
            path: '/catalog',
            name: 'catalog',
            component: () => import('../views/catalog/СatalogView.vue'),
        },
        {
            path: '/cart',
            name: 'cart',
            component: () => import('../views/cart/CartView.vue'),
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: () => import('../views/favorites/FavoritesView.vue'),
        },
        {
            path: '/product/:id',
            name: 'product-item',
            component: () => import('../views/product/ProductView.vue'),
        },
        {
            path: '/:catchAll(.*)',
            name: 'not-found',
            component: () => import('../views/notFound/NotFoundView.vue'),
        },
    ],
});

export default router;
