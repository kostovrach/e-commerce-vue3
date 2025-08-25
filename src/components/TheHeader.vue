<template>
  <header class="sticky top-0 z-10 flex items-center justify-center bg-[#252525]">
    <div class="flex items-center justify-between w-full container py-3 px-4">
      <router-link to="/">
        <img class="w-10" src="@/assets/logo.svg" alt="" />
      </router-link>

      <div class="flex justify-center items-center gap-4">
        <router-link to="/favorites" class="relative">
          <div v-if="favoritesCounter" class="absolute top-0 right-0 translate-[50%] flex justify-center items-center text-[12px] bg-[#00C37A] w-5 rounded-[50%] aspect-square">{{ favoritesCounter }}</div>
          <vue-feather type="heart" class="w-6 h-fit cursor-pointer" />
        </router-link>
        <router-link to="/cart">
          <vue-feather type="shopping-cart" class="w-6 h-fit cursor-pointer" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from 'vue'
import { useFavorites } from '@/stores/favoritesProducts'

export default {
  setup() {
    // data
    const favoritesStore = useFavorites()

    // computed
    const favoritesCounter = computed(() => {
      return favoritesStore.counter
    })

    return { favoritesCounter }
  },
}
</script>

<style lang="scss" scoped></style>
