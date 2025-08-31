<template>
    <div>
        <PageTitle>Каталог товаров</PageTitle>
        <Loader v-if="pending" />

        <div v-else class="flex flex-wrap gap-4">
            <Product
                v-for="product in products"
                :key="product.id"
                :item="product"
                class="max-w-[420px] min-w-[180px] shrink grow basis-1/5 rounded-sm p-4"
            />
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useProducts } from '@/stores/products';

import Product from '@/components/product/Product.vue';
import PageTitle from '@/components/pageTitle/PageTitle.vue';
import Loader from '@/components/loader/Loader.vue';

export default {
    components: { Product, PageTitle, Loader },

    setup() {
        // data
        const productsStore = useProducts();

        // computed
        const pending = computed(() => {
            return productsStore.pending;
        });
        const products = computed(() => {
            return productsStore.products;
        });

        // methods
        const { getData } = productsStore;

        // hooks
        onMounted(async () => {
            await getData();

            if (localStorage.getItem('favorites')) {
                const items = JSON.parse(localStorage.getItem('favorites'));

                products.value.forEach((element) => {
                    if (items.find((el) => el.id === element.id)) {
                        element.isFavorite = true;
                    }
                });
            }

            if (localStorage.getItem('cart')) {
                const items = JSON.parse(localStorage.getItem('cart'));

                products.value.forEach((element) => {
                    if (items.find((el) => el.id === element.id)) {
                        element.inCart = true;
                    }
                });
            }
        });
        return { products, pending };
    },
};
</script>
