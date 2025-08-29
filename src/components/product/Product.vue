<template>
  <div class="flex flex-col justify-between gap-4 box-border border border-[var(--p-zinc-950)]">
    <router-link :to="`/product/${item.id}`" class="flex flex-col justify-between gap-8">
      <img class="h-48 mx-auto object-contain" :src="item.image" :alt="item.title" />
      <h3 class="font-semibold text-xl line-clamp-2 min-h-[2.5em]">
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
      <ButtonFill
        @click="changeCartData(item)"
        class="w-full"
        :class="item?.inCart ? 'selected' : ''"
      >
        {{ item?.inCart ? 'В корзине' : 'В корзину' }}
      </ButtonFill>
      <ButtonStroke @click="changeValue(item)" :class="item?.isFavorite ? 'selected' : ''">
      </ButtonStroke>
    </div>
  </div>
</template>

<script>
import { useFavorites } from '@/stores/favoritesProducts'
import { useCart } from '@/stores/cartProducts'
import { useToast } from 'primevue/usetoast'

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
    // data
    const favoritesStore = useFavorites()
    const cartStore = useCart()
    const toast = useToast()

    // methods
    const { toggleFavorite } = favoritesStore
    const { addProduct } = cartStore

    const changeValue = (item) => {
      if (item?.isFavorite) {
        item.isFavorite = false

        toast.add({
          severity: 'contrast',
          icon: 'frown',
          summary: 'Товар удален из избранного',
          life: 3000,
        })
      } else if (!item?.isFavorite) {
        toast.add({
          severity: 'contrast',
          icon: 'heart',
          summary: 'Товар добавлен в избранное',
          life: 3000,
        })
      }

      toggleFavorite(item)
    }

    const changeCartData = (item) => {
      if (item?.inCart) {
        return
      } else {
        item.inCart = true

        toast.add({
          severity: 'contrast',
          icon: 'shopping-bag',
          summary: 'Товар добавлен в корзину',
          life: 3000,
        })
      }
      addProduct(item)
    }

    return { changeValue, toggleFavorite, addProduct, changeCartData }
  },
}
</script>
