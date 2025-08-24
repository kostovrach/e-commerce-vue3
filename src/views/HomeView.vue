<template>
  <div>
    Домашняя страница
    <div class="flex items-center gap-3">
      <router-link to="/favorites"> Избранное </router-link>

      <router-link to="/cart"> Корзина </router-link>

      <router-link to="/product/1"> Товар 1 </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue'
import { getProducts, getProduct } from '@/api/products'
export default {
  setup() {
    onMounted(async () => {
      try {
        const data = await getProducts()
        const product = await getProduct(1)

        console.log(data)
        console.log(product)
      } catch (err) {
        console.error(err)
      } finally {
      }
    })
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
