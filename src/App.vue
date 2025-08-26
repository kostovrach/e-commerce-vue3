<template>
  <TheHeader />
  <main class="grow container py-8 px-4 mx-auto">
    <RouterView />
  </main>
  <TheFooter />
</template>

<script>
import { onMounted } from 'vue'
import { useFavorites } from '@/stores/favoritesProducts'
import { useCart } from './stores/cartProducts'

import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: { TheHeader, TheFooter },
  setup() {
    // data
    const favoritesStore = useFavorites()
    const cartStore = useCart()

    // methods
    const { getData } = favoritesStore
    const { getDataCart } = cartStore

    onMounted(() => {
      getData()
      getDataCart()
    })
  },
}
</script>
