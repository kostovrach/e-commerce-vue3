import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

import { getProducts } from '@/api/products'

export const useCategories = defineStore('categories', () => {
  const pending = ref(true)
  const products = ref([])
  const categories = ref([])

  const getDataCategories = async () => {
    try {
      products.value = await getProducts()

      products.value.forEach((item) => {
        if (item.category && !categories.value.includes(item.category)) {
          categories.value.push(item.category)
        }
      })
    } catch (err) {
      console.error(err)
    } finally {
      pending.value = false
    }
  }

  return { pending, products, categories, getDataCategories }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCategories, import.meta.hot))
}
