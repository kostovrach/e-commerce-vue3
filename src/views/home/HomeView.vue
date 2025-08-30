<template>
    <PageTitle>Главная страница</PageTitle>
    <Loader v-if="pending" />

    <div v-else class="mt-18 flex flex-col gap-4">
        <div v-for="category in categories" :key="category">
            <router-link to="/catalog" class="mb-6 flex w-fit items-center gap-0.5">
                <h2 class="text-lg font-bold">{{ category.toUpperCase() }}</h2>
                <vue-feather type="chevron-right"></vue-feather>
            </router-link>
            <Carousel :value="productsByCategory[category]" :numVisible="3" :numScroll="1">
                <template #item="slotProps">
                    <div
                        class="mr-4 box-border flex flex-col justify-between gap-4 rounded-lg border border-[var(--p-zinc-950)] p-6"
                    >
                        <router-link :to="`/product/${slotProps.data.id}`" class="flex flex-col justify-between gap-4">
                            <img
                                class="mx-auto h-32 object-contain"
                                :src="slotProps.data.image"
                                :alt="slotProps.data.title"
                            />
                            <h3 class="line-clamp-2 min-h-[2.5em] text-xl font-semibold">
                                {{ slotProps.data.title }}
                            </h3>
                            <div class="flex w-full justify-between">
                                <div class="flex items-start gap-1">
                                    <span class="text-xl font-semibold">
                                        {{ '$' + slotProps.data.price.toFixed(2) }}
                                    </span>
                                    <span class="text-xs font-semibold text-red-400 line-through">
                                        {{ '$' + (slotProps.data.price + 10).toFixed(2) }}
                                    </span>
                                </div>
                                <div class="flex justify-end gap-2">
                                    <div class="flex items-center gap-1">
                                        <vue-feather
                                            type="star"
                                            fill="yellow"
                                            stroke="yellow"
                                            class="aspect-square h-[16px] cursor-pointer"
                                        />
                                        <span class="text-xs">{{ slotProps.data.rating.rate }}</span>
                                    </div>
                                    <div class="flex items-center gap-1">
                                        <vue-feather
                                            type="message-circle"
                                            fill="grey"
                                            stroke="grey"
                                            class="aspect-square h-[16px] cursor-pointer"
                                        />
                                        <span class="text-xs">{{ slotProps.data.rating.count }}</span>
                                    </div>
                                </div>
                            </div>
                        </router-link>
                        <div class="flex gap-2">
                            <ButtonFill
                                @click="changeCartData(slotProps.data)"
                                class="w-full"
                                :class="slotProps.data?.inCart ? 'selected' : ''"
                            >
                                {{ slotProps.data?.inCart ? 'В корзине' : 'В корзину' }}
                            </ButtonFill>
                            <ButtonStroke
                                @click="changeValue(slotProps.data)"
                                :class="slotProps.data?.isFavorite ? 'selected' : ''"
                            />
                        </div>
                    </div>
                </template>
            </Carousel>
        </div>
    </div>
    <div></div>
</template>

<script>
import { onMounted, computed } from 'vue';
import { useCategories } from '@/stores/categories';
import { useFavorites } from '@/stores/favoritesProducts';
import { useCart } from '@/stores/cartProducts';
import { useToast } from 'primevue/usetoast';

import Carousel from 'primevue/carousel';
import PageTitle from '@/components/pageTitle/PageTitle.vue';
import Loader from '@/components/loader/Loader.vue';
import ButtonFill from '@/components/buttonFill/ButtonFill.vue';
import ButtonStroke from '@/components/buttonStroke/ButtonStroke.vue';

export default {
    components: { PageTitle, Carousel, Loader, ButtonFill, ButtonStroke },

    setup() {
        // data
        const categoriesStore = useCategories();
        const favoritesStore = useFavorites();
        const cartStore = useCart();
        const toast = useToast();

        // computed
        const pending = computed(() => {
            return categoriesStore.pending;
        });

        const products = computed(() => {
            return categoriesStore.products;
        });

        const categories = computed(() => {
            return categoriesStore.categories;
        });

        const productsByCategory = computed(() => {
            return categories.value.reduce((acc, category) => {
                acc[category] = products.value.filter((product) => product.category === category);
                return acc;
            }, {});
        });

        // methods
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

        // hooks
        onMounted(() => {
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

        return { products, pending, categories, productsByCategory, changeValue, changeCartData };
    },
};
</script>
