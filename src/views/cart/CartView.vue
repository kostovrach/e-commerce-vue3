<template>
  <div>
    <Title>Корзина</Title>
    <Loader v-if="pending"/>

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
import Product from '@/components/product/Product.vue'
import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'
export default {
  components: { Product, Title, Loader },

  setup() {
    const pending = ref(true)
    const products = ref([])

    onMounted(() => {
      setTimeout(() => {
        const data = localStorage.getItem('cart')

        products.value.push(JSON.parse(data))
        pending.value = false
      }, 1000)
    })
    return {
      products,
      pending,
    }
  },
}
</script>

<style lang="scss" scoped></style>
