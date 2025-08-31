<template>
    <TheHeader />
    <main class="container mx-auto grow px-4 py-8">
        <RouterView />
        <Toast position="bottom-right" :dt="{ contrast: { background: 'var(--p-zinc-950)' } }">
            <template #message="slotProps">
                <div class="flex w-full items-center gap-4">
                    <vue-feather
                        :type="slotProps.message.icon"
                        :fill="slotProps.message.iconFill"
                        :stroke="slotProps.message.iconStroke"
                        class="h-5"
                    ></vue-feather>
                    <h3 class="text-sm">{{ slotProps.message.summary }}</h3>
                </div>
            </template>
        </Toast>
    </main>
    <TheFooter />
</template>

<script>
import { onMounted } from 'vue';
import { useFavorites } from '@/stores/favoritesProducts';
import { useCart } from './stores/cartProducts';
import { useProducts } from './stores/products';
import { useCategories } from '@/stores/categories';

import Toast from 'primevue/toast';
import TheHeader from '@/components/TheHeader.vue';
import TheFooter from '@/components/TheFooter.vue';

export default {
    components: { TheHeader, TheFooter, Toast },
    setup() {
        // data
        const favoritesStore = useFavorites();
        const cartStore = useCart();
        const productsStore = useProducts();
        const categoriesStore = useCategories();

        // methods
        const { getData } = productsStore;
        const { getDataFavorites } = favoritesStore;
        const { getDataCart } = cartStore;
        const { getDataCategories } = categoriesStore;

        onMounted(() => {
            getData();
            getDataFavorites();
            getDataCart();
            getDataCategories();
        });
    },
};
</script>
