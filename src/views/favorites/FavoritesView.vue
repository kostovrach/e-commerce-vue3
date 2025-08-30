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
      <div class="flex flex-col items-center gap-4">
        <span class="text-3xl font-semibold opacity-60">Нет избранных товаров</span>
        <router-link
          to="/"
          class="flex items-center gap-1 py-2 px-4 border border-[var(--p-zinc-950)] rounded-lg"
        >
          <p class="font-semibold">Перейти в каталог</p>
          <vue-feather type="corner-down-left" class="w-4" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useFavorites } from '@/stores/favoritesProducts'

import Product from '@/components/product/Product.vue'
import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'
import Skeleton from 'primevue/skeleton'

export default {
  components: { Product, Title, Loader, Skeleton },

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

    return { products, pending }
  },
}
</script>
