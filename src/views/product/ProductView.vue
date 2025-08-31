<template>
    <div>
        <PageTitle>{{ product.title }}</PageTitle>
        <div v-if="pending" class="grid grid-cols-2 gap-4 opacity-50">
            <Skeleton width="100%" height="30rem" borderRadius="16px"></Skeleton>
            <div class="flex flex-col gap-8">
                <div class="flex flex-col gap-4">
                    <Skeleton borderRadius="16px"></Skeleton>
                    <Skeleton borderRadius="16px"></Skeleton>
                    <Skeleton borderRadius="16px"></Skeleton>
                    <Skeleton borderRadius="16px"></Skeleton>
                </div>
                <div class="flex flex-col gap-4">
                    <Skeleton width="70%" borderRadius="16px"></Skeleton>
                    <Skeleton width="50%" borderRadius="16px"></Skeleton>
                </div>
                <Skeleton height="3rem" borderRadius="16px"></Skeleton>
            </div>
        </div>

        <div v-else class="mt-16 grid h-full grid-cols-1 gap-16 md:grid-cols-2">
            <div class="flex items-center justify-center">
                <img class="max-h-[256px] md:max-h-[500px]" :src="product.image" :alt="product.title" />
            </div>
            <div class="flex flex-col gap-8">
                <div class="">
                    <span class="text-xs font-semibold uppercase opacity-50">Описание</span>
                    <p class="text-lg">{{ product.description }}</p>
                </div>
                <div class="flex justify-end gap-4">
                    <div class="flex items-center gap-1">
                        <vue-feather
                            type="star"
                            fill="yellow"
                            stroke="yellow"
                            class="aspect-square h-[20px] cursor-pointer"
                        />
                        <span>{{ product.rating.rate }}</span>
                    </div>
                    <div class="flex items-center gap-1">
                        <vue-feather
                            type="message-circle"
                            fill="grey"
                            stroke="grey"
                            class="aspect-square h-[20px] cursor-pointer"
                        />
                        <span>{{ product.rating.count }}</span>
                    </div>
                </div>
                <div class="flex items-start gap-1">
                    <span class="text-4xl font-semibold">
                        {{ '$' + product.price.toFixed(2) }}
                    </span>
                    <span class="text-sm font-semibold text-red-400 line-through">
                        {{ '$' + (product.price + 10).toFixed(2) }}
                    </span>
                </div>
                <div class="flex gap-2">
                    <ButtonFill
                        @click="changeCartData(product)"
                        :class="product?.inCart ? 'selected' : ''"
                        class="w-100"
                    >
                        {{ product?.inCart ? 'В корзине' : 'В корзину' }}
                    </ButtonFill>
                    <ButtonStroke
                        @click="changeValue(product)"
                        :class="product?.isFavorite ? 'selected' : ''"
                        class="w-100 gap-2"
                    >
                        В избранное
                    </ButtonStroke>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useProducts } from '@/stores/products';
import { useProduct } from '@/stores/product';
import { useFavorites } from '@/stores/favoritesProducts';
import { useCart } from '@/stores/cartProducts';
import { useToast } from 'primevue/usetoast';

import PageTitle from '@/components/pageTitle/PageTitle.vue';
import Skeleton from 'primevue/skeleton';
import ButtonFill from '@/components/buttonFill/ButtonFill.vue';
import ButtonStroke from '@/components/buttonStroke/ButtonStroke.vue';

export default {
    components: { PageTitle, ButtonFill, ButtonStroke, Skeleton },

    setup() {
        // data
        const productsStore = useProducts();
        const productStore = useProduct();
        const favoritesStore = useFavorites();
        const cartStore = useCart();
        const toast = useToast();
        const route = useRoute();

        // computed
        const pending = computed(() => {
            return productStore.pending;
        });
        const product = computed(() => {
            return productStore.product;
        });

        // methods
        const { getData } = productsStore;
        const { getDataProduct } = productStore;
        const { toggleFavorite } = favoritesStore;
        const { addProduct } = cartStore;

        const changeValue = (item) => {
            if (item?.isFavorite) {
                item.isFavorite = false;

                toast.add({
                    severity: 'contrast',
                    icon: 'frown',
                    summary: 'Товар удален из избранного',
                    life: 3000,
                });
            } else if (!item?.isFavorite) {
                toast.add({
                    severity: 'contrast',
                    icon: 'heart',
                    summary: 'Товар добавлен в избранное',
                    life: 3000,
                });
            }

            toggleFavorite(item);
        };

        const changeCartData = (item) => {
            if (item?.inCart) {
                return;
            } else {
                item.inCart = true;

                toast.add({
                    severity: 'contrast',
                    icon: 'shopping-bag',
                    summary: 'Товар добавлен в корзину',
                    life: 3000,
                });
            }
            addProduct(item);
        };

        onMounted(async () => {
            getDataProduct(route.params.id);

            await getData();

            if (localStorage.getItem('favorites')) {
                const items = JSON.parse(localStorage.getItem('favorites'));

                if (items.find((el) => el.id === product.value.id)) {
                    product.value.isFavorite = true;
                }
            }

            if (localStorage.getItem('cart')) {
                const items = JSON.parse(localStorage.getItem('cart'));

                if (items.find((el) => el.id === product.value.id)) {
                    product.value.inCart = true;
                }
            }
        });
        return { product, pending, changeValue, addProduct, changeCartData };
    },
};
</script>
