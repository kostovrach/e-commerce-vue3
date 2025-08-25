import { ref } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

import { getProduct } from '@/api/products'

export const useProduct = defineStore('product', () => {
  const pending = ref(true)
  const product = ref([])

  const getData = async (id) => {
    try {
      product.value = await getProduct(id)
    } catch (err) {
      console.error(err)
    } finally {
      pending.value = false
    }
  }

  return { pending, product, getData }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useProduct, import.meta.hot))
}