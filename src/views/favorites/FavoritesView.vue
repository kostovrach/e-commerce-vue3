<template>
    <div class="flex min-h-100 grow flex-col">
        <PageTitle>Избранные товары</PageTitle>
        <Loader v-if="pending" />

        <div v-else-if="products.length" class="flex flex-wrap gap-2">
            <Product
                v-for="product in products"
                :key="product.id"
                :item="product"
                class="max-w-[375px] min-w-[180px] shrink grow basis-1/5 rounded-xl p-4"
            />
        </div>

        <div v-else class="flex h-full w-full grow items-center justify-center">
            <div class="flex flex-col items-center gap-4">
                <span class="text-3xl font-semibold opacity-60">Нет избранных товаров</span>
                <router-link
                    to="/"
                    class="flex items-center gap-1 rounded-lg border border-[var(--p-zinc-950)] px-4 py-2"
                >
                    <p class="font-semibold">Перейти в каталог</p>
                    <vue-feather type="corner-down-left" class="w-4" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { computed } from 'vue';
import { useFavorites } from '@/stores/favoritesProducts';

import Product from '@/components/product/Product.vue';
import PageTitle from '@/components/pageTitle/PageTitle.vue';
import Loader from '@/components/loader/Loader.vue';

export default {
    components: { Product, PageTitle, Loader },

    setup() {
        // data
        const favoritesStore = useFavorites();

        // computed
        const pending = computed(() => {
            return favoritesStore.pending;
        });
        const products = computed(() => {
            return favoritesStore.products;
        });

        return { products, pending };
    },
};
</script>
