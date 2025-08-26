<template>
  <header class="sticky top-0 z-10 flex items-center justify-center bg-[#252525]">
    <div class="flex items-center justify-between w-full container py-3 px-4">
      <router-link to="/">
        <img class="w-10" src="@/assets/logo.svg" alt="" />
      </router-link>

      <div class="flex justify-center items-center gap-4">
        <router-link to="/favorites" class="relative">
          <div
            v-if="favoritesCounter"
            class="absolute top-0 right-0 translate-[50%] flex justify-center items-center text-[12px] bg-[#00C37A] w-5 h-5 rounded-full aspect-square"
          >
            {{ favoritesCounter }}
          </div>
          <vue-feather type="heart" class="w-6 h-fit cursor-pointer" />
        </router-link>
        <router-link to="/cart" class="relative">
          <div
            v-if="cartCounter"
            class="absolute top-0 right-0 translate-[50%] flex justify-center items-center text-[12px] bg-[#00C37A] w-5 h-5 rounded-full aspect-square"
          >
            {{ cartCounter }}
          </div>
          <vue-feather type="shopping-cart" class="w-6 h-fit cursor-pointer" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useFavorites } from '@/stores/favoritesProducts'
import { useCart } from '@/stores/cartProducts'

export default {
  setup() {
    // data
    const favoritesStore = useFavorites()
    const cartStore = useCart()

    // computed
    const favoritesCounter = computed(() => {
      return favoritesStore.counter
    })

    const cartCounter = computed(() => {
      return cartStore.counter
    })

    return { favoritesCounter, cartCounter }
  },
}
</script>

<style lang="scss" scoped></style>
