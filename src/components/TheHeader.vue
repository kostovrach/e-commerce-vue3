<template>
    <header class="sticky top-0 z-10 flex items-center justify-center bg-[var(--p-zinc-950)]">
        <div class="container flex w-full items-center justify-between px-4 py-3">
            <router-link to="/" class="flex items-center gap-2">
                <img class="w-14" src="/logo.svg" alt="" />
                <span class="text-2xl font-semibold text-[var(--p-zinc-200)]">E-commerce</span>
            </router-link>

            <div class="flex items-center justify-center gap-4">
                <SearchBar />
                <router-link to="/favorites" class="relative">
                    <div
                        v-if="favoritesCounter"
                        class="absolute top-0 right-0 flex aspect-square h-5 w-5 translate-[50%] items-center justify-center rounded-full bg-[var(--p-zinc-200)] text-[12px] font-semibold"
                    >
                        {{ favoritesCounter }}
                    </div>
                    <vue-feather type="heart" stroke="white" class="h-fit w-6 cursor-pointer" />
                </router-link>
                <router-link to="/cart" class="relative">
                    <div
                        v-if="cartCounter"
                        class="absolute top-0 right-0 flex aspect-square h-5 w-5 translate-[50%] items-center justify-center rounded-full bg-[var(--p-zinc-200)] text-[12px] font-semibold"
                    >
                        {{ cartCounter }}
                    </div>
                    <vue-feather type="shopping-cart" stroke="white" class="h-fit w-6 cursor-pointer" />
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
import { computed } from 'vue';
import { useFavorites } from '@/stores/favoritesProducts';
import { useCart } from '@/stores/cartProducts';

import SearchBar from './searchBar/SearchBar.vue';

export default {
    components: { SearchBar },

    setup() {
        // data
        const favoritesStore = useFavorites();
        const cartStore = useCart();

        // computed
        const favoritesCounter = computed(() => {
            return favoritesStore.counter;
        });

        const cartCounter = computed(() => {
            return cartStore.counter;
        });

        return { favoritesCounter, cartCounter };
    },
};
</script>
