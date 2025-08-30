<template>
  <div>
    <Title>{{ product.title }}</Title>
    <div v-if="pending" class="grid grid-cols-2 opacity-50">
      <Skeleton size="40rem" borderRadius="16px"></Skeleton>
      <div class="flex flex-col gap-8">
        <div class="flex flex-col gap-4">
          <Skeleton borderRadius="16px"></Skeleton>
          <Skeleton borderRadius="16px"></Skeleton>
          <Skeleton borderRadius="16px"></Skeleton>
          <Skeleton borderRadius="16px"></Skeleton>
        </div>
        <div class="flex flex-col gap-4">
          <Skeleton width="15rem" borderRadius="16px"></Skeleton>
          <Skeleton width="10rem" borderRadius="16px"></Skeleton>
        </div>
        <Skeleton height="3rem" borderRadius="16px"></Skeleton>
      </div>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-16 h-full mt-16">
      <div class="flex items-center justify-center">
        <img class="max-h-[256px] md:max-h-[500px]" :src="product.image" :alt="product.title" />
      </div>
      <div class="flex flex-col gap-8">
        <div class="">
          <span class="uppercase font-semibold opacity-50 text-xs">Описание</span>
          <p class="text-lg">{{ product.description }}</p>
        </div>
        <div class="flex justify-end gap-4">
          <div class="flex items-center gap-1">
            <vue-feather
              type="star"
              fill="yellow"
              stroke="yellow"
              class="h-[20px] cursor-pointer aspect-square"
            />
            <span>{{ product.rating.rate }}</span>
          </div>
          <div class="flex items-center gap-1">
            <vue-feather
              type="message-circle"
              fill="grey"
              stroke="grey"
              class="h-[20px] cursor-pointer aspect-square"
            />
            <span>{{ product.rating.count }}</span>
          </div>
        </div>
        <div class="flex items-start gap-1">
          <span class="font-semibold text-4xl">
            {{ '$' + product.price.toFixed(2) }}
          </span>
          <span class="font-semibold text-sm line-through text-red-400">
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
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useProduct } from '@/stores/product'
import { useFavorites } from '@/stores/favoritesProducts'
import { useCart } from '@/stores/cartProducts'
import { useToast } from 'primevue/usetoast'

import Product from '@/components/product/Product.vue'
import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'
import ButtonFill from '@/components/buttonFill/ButtonFill.vue'
import ButtonStroke from '@/components/buttonStroke/ButtonStroke.vue'

export default {
  components: { Product, Title, Loader, ButtonFill, ButtonStroke },

  setup() {
    // data
    const productStore = useProduct()
    const favoritesStore = useFavorites()
    const cartStore = useCart()
    const toast = useToast()
    const route = useRoute()

    // computed
    const pending = computed(() => {
      return productStore.pending
    })
    const product = computed(() => {
      return productStore.product
    })

    // methods
    const { getData } = productStore
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

    onMounted( () => {
      getData(route.params.id)

      if (localStorage.getItem('favorites')) {
        const items = JSON.parse(localStorage.getItem('favorites'))

        if (items.find((el) => el.id === product.value.id)) {
          product.value.isFavorite = true
        }
      }

      if (localStorage.getItem('cart')) {
        const items = JSON.parse(localStorage.getItem('cart'))

        if (items.find((el) => el.id === product.value.id)) {
          product.value.inCart = true
        }
      }
    })
    return { product, pending, changeValue, addProduct, changeCartData }
  },
}
</script>
