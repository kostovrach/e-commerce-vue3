<template>
  <TheHeader />
  <main class="grow container py-8 px-4 mx-auto">
    <RouterView />
    <Toast position="bottom-right">
      <template #message="slotProps">
        <div class="flex items-center gap-4 w-full">
          <vue-feather
            :type="slotProps.message.icon"
            :fill="slotProps.message.iconFill"
            :stroke="slotProps.message.iconStroke"
            class="h-5"
          ></vue-feather>
          <h3 class="text-sm">{{ slotProps.message.summary }}</h3>
        </div>
      </template>
    </Toast>
  </main>
  <TheFooter />
</template>

<script>
import { onMounted } from 'vue'
import { useFavorites } from '@/stores/favoritesProducts'
import { useCart } from './stores/cartProducts'

import Toast from 'primevue/toast'
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
