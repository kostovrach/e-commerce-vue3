<template>
  <div class="relative flex flex-col grow min-h-100">
    <Title>Корзина</Title>
    <div v-if="cartCounter">
      Товаров<span>: {{ cartCounter }}</span>
    </div>

    <Loader v-if="pending" />

    <div v-else-if="products.length" class="flex flex-col flex-wrap gap-2">
      <CartProduct
        v-for="(product, index) in products"
        :key="product.id"
        :item="product"
        :index="index"
      />
    </div>
    <div v-else class="grow w-full h-full flex justify-center items-center">
      <div class="flex flex-col items-center gap-4">
        <span class="text-3xl font-semibold opacity-60">Нет товаров в корзине</span>
        <router-link to="/" class="flex items-center gap-1 py-2 px-4 border border-[var(--p-zinc-950)] rounded-lg">
          <p class="font-semibold">Перейти в каталог</p>
          <vue-feather type="corner-down-left" class="w-4" />
        </router-link>
      </div>
    </div>
  </div>
  <button
    v-if="total != 0"
    class="sticky bottom-6 flex justify-center items-center py-3 px-4 w-full mt-8 text-[var(--p-zinc-50)] bg-[var(--p-zinc-950)] rounded-lg cursor-pointer"
  >
    <span class="text-lg font-semibold text-shadow-lg">Оформить заказ: {{ total.toFixed(2) }}$</span>
  </button>
</template>

<script>
import { computed } from 'vue'
import { useCart } from '@/stores/cartProducts'

import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'
import CartProduct from './components/CartProduct.vue'

export default {
  components: { CartProduct, Title, Loader },

  setup() {
    // data
    const cartStore = useCart()

    // computed
    const total = computed(() => {
      let sum = 0

      products.value.map((item) => {
        sum = sum + item.quantity * item.price
      })

      return sum
    })

    const pending = computed(() => {
      return cartStore.pending
    })
    const products = computed(() => {
      return cartStore.products
    })
    const cartCounter = computed(() => {
      return cartStore.counter
    })

    return { products, pending, cartCounter, total }
  },
}
</script>

<style lang="scss" scoped></style>
