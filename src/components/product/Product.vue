<template>
  <div class="flex flex-col justify-between gap-4 bg-[#252525]">
    <router-link :to="`/product/${item.id}`" class="flex flex-col justify-between gap-4">
      <img class="h-48 mx-auto object-contain" :src="item.image" :alt="item.title" />
      <h3 class="font-semibold text-xl line-clamp-2">
        {{ item.title }}
      </h3>
      <div class="flex justify-between w-full">
        <div class="flex items-start gap-1">
          <span class="font-semibold text-xl">
            {{ '$' + item.price.toFixed(2) }}
          </span>
          <span class="font-semibold text-xs line-through text-red-400">
            {{ '$' + (item.price + 10).toFixed(2) }}
          </span>
        </div>

        <div class="flex justify-end gap-2">
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
      </div>
    </router-link>
    <div class="flex gap-2">
      <ButtonFill @click="addCart(item)" class="w-100">В корзину</ButtonFill>
      <ButtonStroke @click="addFavorites(item)"></ButtonStroke>
    </div>
  </div>
</template>

<script>
import ButtonFill from '@/components/buttonFill/ButtonFill.vue'
import ButtonStroke from '@/components/buttonStroke/ButtonStroke.vue'

export default {
  components: { ButtonFill, ButtonStroke },
  props: {
    item: {
      type: Object,
      default: null,
    },
  },
  setup() {
    const addFavorites = (item) => {
      localStorage.setItem('favorites', JSON.stringify(item))
    }

    const addCart = (item) => {
      localStorage.setItem('cart', JSON.stringify(item))
    }

    return {
      addFavorites,
      addCart,
    }
  },
}
</script>

<style lang="scss" scoped></style>
