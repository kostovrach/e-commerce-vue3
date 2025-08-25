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
import { onMounted, ref } from 'vue'
import { getProducts, getProduct } from '@/api/products'
import Product from '@/components/product/Product.vue'
import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'
export default {
  components: { Product, Title, Loader },

  setup() {
    const pending = ref(true)
    const products = ref([])

    const getData = async () => {
      try {
        products.value = await getProducts()
      } catch (err) {
        console.error(err)
      } finally {
        pending.value = false
      }
    }
    onMounted(async () => {
      await getData()
    })
    return {
      products,
      pending,
    }
  },
}
</script>

<style lang="scss" scoped></style>
