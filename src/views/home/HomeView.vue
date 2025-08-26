<template>
  <div>
    <Title>Каталог товаров</Title>
    <Loader v-if="pending" />

    <div v-else class="flex flex-wrap gap-2">
      <Product
        v-for="product in products"
        :key="product.id"
        :item="product"
        class="grow shrink basis-1/5 min-w-[180px] max-w-[375px] p-4 rounded-xl"
      />
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useProducts } from '@/stores/products'

import Product from '@/components/product/Product.vue'
import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'

export default {
  components: { Product, Title, Loader },

  setup() {
    // data
    const productStore = useProducts()

    // computed
    const pending = computed(() => {
      return productStore.pending
    })
    const products = computed(() => {
      return productStore.products
    })

    // methods
    const { getData } = productStore

    // hooks
    onMounted(async () => {
      await getData()

      if (localStorage.getItem('favorites')) {
        const items = JSON.parse(localStorage.getItem('favorites'))

        products.value.forEach((element) => {
          if (items.find((el) => el.id === element.id)) {
            element.isFavorite = true
          }
        })
      }
    })
    return { products, pending }
  },
}
</script>
