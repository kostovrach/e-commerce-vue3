<template>
  <header class="sticky top-0 z-10 flex items-center justify-center bg-[var(--p-zinc-950)]">
    <div class="flex items-center justify-between w-full container py-3 px-4">
      <router-link to="/" class="flex items-center gap-4">
        <img class="w-14" src="/logo.svg" alt="" />
        <span class="text-[var(--p-zinc-200)] text-2xl font-semibold">E-commerce</span>
      </router-link>

      <div class="flex justify-center items-center gap-4">
        <div class="flex items-center border-b border-b-[var(--p-zinc-300)] cursor-pointer">
          <vue-feather type="search" stroke="var(--p-zinc-50)" class="w-6"></vue-feather>
          <AutoComplete
            ref="ac"
            v-model="query"
            :suggestions="filteredProducts"
            @complete="search"
            @item-select="onSelect"
            multiple
            placeholder="Поиск"
            :dt="{
              root: {
                background: 'transparent',
                borderColor: 'transparent',
                hoverBorderColor: 'transparent',
                focusBorderColor: 'transparent',
                focusRingColor: 'transparent',
                color: 'var(--p-zinc-50)',
              },
              inputMultiply: { focusBorderColor: 'transparent' },
              placeholder: { color: 'var(--p-zinc-50)' },
              option: { padding: '0' },
            }"
          >
            <template #option="slotProps">
              <router-link
                :to="`/product/${slotProps.option.id}`"
                class="w-[512px] min-h-20 h-full p-2"
              >
                <div class="flex gap-4">
                  <img :src="slotProps.option.image" :alt="slotProps.option.title" class="w-10" />
                  <div class="w-full">
                    <p class="max-w-100 overflow-hidden">{{ slotProps.option.title }}</p>
                    <div class="flex justify-between">
                      <span class="font-bold">${{ slotProps.option.price }}</span>
                      <div class="flex items-center gap-1">
                        <vue-feather
                          type="star"
                          fill="yellow"
                          stroke="yellow"
                          class="h-[16px] cursor-pointer aspect-square"
                        />
                        <span class="font-bold">{{ slotProps.option.rating.rate }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </router-link>
            </template>
          </AutoComplete>
        </div>
        <router-link to="/favorites" class="relative">
          <div
            v-if="favoritesCounter"
            class="absolute top-0 right-0 translate-[50%] flex justify-center items-center text-[12px] font-semibold bg-[var(--p-zinc-200)] w-5 h-5 rounded-full aspect-square"
          >
            {{ favoritesCounter }}
          </div>
          <vue-feather type="heart" stroke="white" class="w-6 h-fit cursor-pointer" />
        </router-link>
        <router-link to="/cart" class="relative">
          <div
            v-if="cartCounter"
            class="absolute top-0 right-0 translate-[50%] flex justify-center items-center text-[12px] font-semibold bg-[var(--p-zinc-200)] w-5 h-5 rounded-full aspect-square"
          >
            {{ cartCounter }}
          </div>
          <vue-feather type="shopping-cart" stroke="white" class="w-6 h-fit cursor-pointer" />
        </router-link>
      </div>
    </div>
  </header>
</template>

<script>
import { ref, computed } from 'vue'
import { useFavorites } from '@/stores/favoritesProducts'
import { useCart } from '@/stores/cartProducts'
import { useProducts } from '@/stores/products'
import { useRouter } from 'vue-router'

import AutoComplete from 'primevue/autocomplete'

export default {
  components: { AutoComplete },

  setup() {
    const query = ref([])
    const ac = ref(null)
    const filteredProducts = ref([])

    // data
    const router = useRouter()
    const favoritesStore = useFavorites()
    const cartStore = useCart()
    const productsStore = useProducts()

    // computed
    const favoritesCounter = computed(() => {
      return favoritesStore.counter
    })

    const cartCounter = computed(() => {
      return cartStore.counter
    })

    const products = computed(() => {
      return productsStore.products
    })

    // methods
    const search = (event) => {
      const query = event.query.toLowerCase()

      filteredProducts.value = products.value.filter(
        (item) =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query) ||
          item.category?.toLowerCase().includes(query),
      )
    }

    const onSelect = () => {
      query.value = []
      ac.value.hide()
    }

    return {
      favoritesCounter,
      cartCounter,
      products,
      query,
      filteredProducts,
      ac,
      search,
      onSelect,
    }
  },
}
</script>
