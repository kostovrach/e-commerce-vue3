<template>
  <div class="flex flex-col grow min-h-100">
    <Title>Избранные товары</Title>
    <Loader v-if="pending" />

    <div v-else-if="products.length" class="flex flex-wrap gap-2">
      <Product
        v-for="product in products"
        :key="product.id"
        :item="product"
        class="grow shrink basis-1/5 min-w-[180px] max-w-[375px] p-4 rounded-xl"
      />
    </div>

    <div v-else class="grow w-full h-full flex justify-center items-center">
      <div class="flex flex-col items-center gap-8">
        <span class="text-4xl opacity-50">Нет избранных товаров</span>
        <router-link to="/" class="flex items-center gap-1 p-3 border border-[#00C37A] rounded-lg">
          <p class="text-lg">Перейти в каталог</p>
          <vue-feather type="corner-down-left"/>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useFavorites } from '@/stores/favoritesProducts'

import Product from '@/components/product/Product.vue'
import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'

export default {
  components: { Product, Title, Loader },

  setup() {
    // data
    const favoritesStore = useFavorites()

    // computed
    const pending = computed(() => {
      return favoritesStore.pending
    })
    const products = computed(() => {
      return favoritesStore.products
    })

    // methods
    const { getData } = favoritesStore
    onMounted(() => {
      getData()
    })
    return {
      products,
      pending,
    }
  },
}
</script>

<style lang="scss" scoped></style>
