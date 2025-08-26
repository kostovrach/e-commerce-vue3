<template>
  <div class="flex items-center gap-6 py-4 border-b border-stone-800 w-full">
    <router-link :to="`product/${item.id}`" class="min-w-[96px] max-w-[180px] select-none">
      <img class="w-full h-full object-contain" :src="item.image" :alt="item.title" />
    </router-link>
    <div class="w-full">
      <h3 class="font-semibold md:text-2xl text-lg">{{ item.title }}</h3>
      <p class="mt-4 opacity-50 hidden md:line-clamp-3">{{ item.description }}</p>
      <div class="flex justify-start gap-2 mt-4">
        <div class="flex items-center gap-1">
          <vue-feather
            type="star"
            fill="yellow"
            stroke="yellow"
            class="h-[16px] cursor-pointer aspect-square"
          />
          <span class="text-xs">{{ item.rating.rate }}</span>
        </div>
        <div class="flex items-center gap-1">
          <vue-feather
            type="message-circle"
            fill="grey"
            stroke="grey"
            class="h-[16px] cursor-pointer aspect-square"
          />
          <span class="text-xs">{{ item.rating.count }}</span>
        </div>
      </div>
      <div class="flex items-start gap-1 mt-6">
        <span class="font-semibold text-xl">
          {{ '$' + (item.price * item.quantity).toFixed(2) }}
        </span>
        <span class="font-semibold text-xs line-through text-red-400">
          {{ '$' + ((item.price + 10) * item.quantity).toFixed(2) }}
        </span>
      </div>
      <div class="flex items-center justify-between gap-6 mt-4">
        <div
          class="flex justify-between items-center w-48 bg-[#00C37A] py-1 px-4 rounded-lg select-none text-shadow-lg"
        >
          <button
            class="appearance-none flex justify-center items-center"
            :class="item?.quantity == 1 ? 'pointer-events-none opacity-50' : ''"
          >
            <vue-feather
              @click="removeQty(index)"
              type="minus"
              class="cursor-pointer"
            ></vue-feather>
          </button>
          <span class="text-lg">{{ item.quantity }}</span>
          <button
            class="appearance-none flex justify-center items-center"
            :class="item?.quantity >= 100 ? 'pointer-events-none opacity-50' : ''"
          >
            <vue-feather @click="addQty(index)" type="plus" class="cursor-pointer"></vue-feather>
          </button>
        </div>
        <vue-feather
          @click="removeProduct(item)"
          type="trash-2"
          class="cursor-pointer"
        ></vue-feather>
      </div>
    </div>
  </div>
</template>

<script>
import { useCart } from '@/stores/cartProducts'

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
    const cartStore = useCart()

    // methods
    const { addQty, removeQty, removeProduct } = cartStore

    return { addQty, removeQty, removeProduct }
  },
}
</script>

<style lang="scss" scoped></style>
