<template>
  <div>
    <Title>{{ product.title }}</Title>
    <Loader v-if="pending" />

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-16 h-full mt-16">
      <div class="flex items-center justify-center">
        <img class="max-h-[256px] md:max-h-[500px]" :src="product.image" :alt="product.title" />
      </div>
      <div class="flex flex-col gap-8">
        <div class="">
          <span class="uppercase font-semibold opacity-50 text-xs">Описание</span>
          <p class="text-lg">{{ product.description }}</p>
        </div>
        <div class="flex justify-end gap-4">
          <div class="flex items-center gap-1">
            <vue-feather
              type="star"
              fill="yellow"
              stroke="yellow"
              class="h-[20px] cursor-pointer aspect-square"
            />
            <span>{{ product.rating.rate }}</span>
          </div>
          <div class="flex items-center gap-1">
            <vue-feather
              type="message-circle"
              fill="grey"
              stroke="grey"
              class="h-[20px] cursor-pointer aspect-square"
            />
            <span>{{ product.rating.count }}</span>
          </div>
        </div>
        <div class="flex items-start gap-1">
          <span class="font-semibold text-4xl">
            {{ '$' + product.price.toFixed(2) }}
          </span>
          <span class="font-semibold text-sm line-through text-red-400">
            {{ '$' + (product.price + 10).toFixed(2) }}
          </span>
        </div>
        <div class="flex gap-2">
          <ButtonFill @click="addCart(product)" class="w-100">В корзину</ButtonFill>
          <ButtonStroke @click="addFavorites(product)" class="w-100 gap-2">В избранное</ButtonStroke>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getProduct } from '@/api/products'
import Product from '@/components/product/Product.vue'
import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'
import ButtonFill from '@/components/buttonFill/ButtonFill.vue'
import ButtonStroke from '@/components/buttonStroke/ButtonStroke.vue'
export default {
  components: { Product, Title, Loader, ButtonFill, ButtonStroke },

  setup() {
    const route = useRoute()
    const pending = ref(true)
    const product = ref([])

    const getData = async () => {
      try {
        product.value = await getProduct(route.params.id)
      } catch (err) {
        console.error(err)
      } finally {
        pending.value = false
      }
    }

    const addFavorites = (product) => {
      localStorage.setItem('favorites', JSON.stringify(product))
    }

    const addCart = (product) => {
      localStorage.setItem('cart', JSON.stringify(product))
    }

    onMounted(async () => {
      await getData()
    })
    return {
      product,
      pending,
      addFavorites,
      addCart,
    }
  },
}
</script>

<style lang="scss" scoped></style>
