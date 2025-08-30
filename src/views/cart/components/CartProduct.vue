<template>
    <div class="flex w-full items-center gap-6 border-b border-stone-800 py-4">
        <router-link :to="`product/${item.id}`" class="max-w-[180px] min-w-[96px] select-none">
            <img class="h-full w-full object-contain" :src="item.image" :alt="item.title" />
        </router-link>
        <div class="w-full">
            <h3 class="text-lg font-semibold md:text-2xl">{{ item.title }}</h3>
            <p class="mt-4 hidden opacity-50 md:line-clamp-3">{{ item.description }}</p>
            <div class="mt-4 flex justify-start gap-2">
                <div class="flex items-center gap-1">
                    <vue-feather
                        type="star"
                        fill="yellow"
                        stroke="yellow"
                        class="aspect-square h-[16px] cursor-pointer"
                    />
                    <span class="text-xs">{{ item.rating.rate }}</span>
                </div>
                <div class="flex items-center gap-1">
                    <vue-feather
                        type="message-circle"
                        fill="grey"
                        stroke="grey"
                        class="aspect-square h-[16px] cursor-pointer"
                    />
                    <span class="text-xs">{{ item.rating.count }}</span>
                </div>
            </div>
            <div class="mt-6 flex items-start gap-1">
                <span class="text-xl font-semibold">
                    {{ '$' + (item.price * item.quantity).toFixed(2) }}
                </span>
                <span class="text-xs font-semibold text-red-400 line-through">
                    {{ '$' + ((item.price + 10) * item.quantity).toFixed(2) }}
                </span>
            </div>
            <div class="mt-4 flex items-center justify-between gap-6">
                <div
                    class="flex w-48 items-center justify-between rounded-lg bg-[var(--p-zinc-950)] px-4 py-1 text-[var(--p-zinc-50)] select-none text-shadow-lg"
                >
                    <button
                        class="flex appearance-none items-center justify-center"
                        :class="item?.quantity == 1 ? 'pointer-events-none opacity-50' : ''"
                    >
                        <vue-feather @click="removeQty(index)" type="minus" class="cursor-pointer"></vue-feather>
                    </button>
                    <span class="text-lg">{{ item.quantity }}</span>
                    <button
                        class="flex appearance-none items-center justify-center"
                        :class="item?.quantity >= 100 ? 'pointer-events-none opacity-50' : ''"
                    >
                        <vue-feather @click="addQty(index)" type="plus" class="cursor-pointer"></vue-feather>
                    </button>
                </div>
                <vue-feather @click="removeProduct(item)" type="trash-2" class="cursor-pointer"></vue-feather>
            </div>
        </div>
    </div>
</template>

<script>
import { useCart } from '@/stores/cartProducts';

export default {
    props: {
        item: {
            type: Object,
            default: null,
        },
        index: {
            type: Number,
            required: true,
        },
    },

    setup() {
        // data
        const cartStore = useCart();

        // methods
        const { addQty, removeQty, removeProduct } = cartStore;

        return { addQty, removeQty, removeProduct };
    },
};
</script>
