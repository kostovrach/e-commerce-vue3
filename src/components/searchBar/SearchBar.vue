<template>
    <div class="flex cursor-pointer items-center border-b border-b-[var(--p-zinc-300)]">
        <vue-feather type="search" stroke="var(--p-zinc-50)" class="w-6"></vue-feather>
        <AutoComplete
            ref="ac"
            v-model="query"
            :suggestions="filteredProducts"
            @complete="search"
            @item-select="onSelect"
            multiple
            placeholder="Поиск"
            :dt="{
                root: {
                    background: 'transparent',
                    borderColor: 'transparent',
                    hoverBorderColor: 'transparent',
                    focusBorderColor: 'transparent',
                    focusRingColor: 'transparent',
                    color: 'var(--p-zinc-50)',
                },
                inputMultiply: { focusBorderColor: 'transparent' },
                placeholder: { color: 'var(--p-zinc-50)' },
                option: { padding: '0' },
            }"
        >
            <template #option="slotProps">
                <router-link :to="`/product/${slotProps.option.id}`" class="h-full min-h-20 w-[512px] p-2">
                    <div class="flex gap-4">
                        <img :src="slotProps.option.image" :alt="slotProps.option.title" class="w-10" />
                        <div class="w-full">
                            <p class="max-w-100 overflow-hidden">{{ slotProps.option.title }}</p>
                            <div class="flex justify-between">
                                <span class="font-bold">${{ slotProps.option.price }}</span>
                                <div class="flex items-center gap-1">
                                    <vue-feather
                                        type="star"
                                        fill="yellow"
                                        stroke="yellow"
                                        class="aspect-square h-[16px] cursor-pointer"
                                    />
                                    <span class="font-bold">{{ slotProps.option.rating.rate }}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </router-link>
            </template>
        </AutoComplete>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useProducts } from '@/stores/products';

import AutoComplete from 'primevue/autocomplete';

export default {
    components: { AutoComplete },

    setup() {
        const query = ref([]);
        const ac = ref(null);
        const filteredProducts = ref([]);

        // data
        const productsStore = useProducts();

        // computed
        const products = computed(() => {
            return productsStore.products;
        });

        // methods
        const search = (event) => {
            const query = event.query.toLowerCase();

            filteredProducts.value = products.value.filter(
                (item) =>
                    item.title?.toLowerCase().includes(query) ||
                    item.description?.toLowerCase().includes(query) ||
                    item.category?.toLowerCase().includes(query),
            );
        };

        const onSelect = () => {
            query.value = [];
            ac.value.hide();
        };

        return { products, query, filteredProducts, ac, search, onSelect };
    },
};
</script>
