import { ref, computed } from 'vue'
import { defineStore, acceptHMRUpdate } from 'pinia'

export const useFavorites = defineStore('favorites', () => {
  const pending = ref(true)
  const products = ref([])
  const counter = computed(() => {
    return products.value.length
  })

  const getData = () => {
    setTimeout(() => {
      if (localStorage.getItem('favorites')) {
        products.value = JSON.parse(localStorage.getItem('favorites'))
      } else {
        products.value = []
      }

      pending.value = false
    }, 1000)
  }

  const toggleFavorite = (item) => {
    if (products.value.find((el) => el.id === item.id)) {
      const index = products.value.findIndex((el) => el.id === item.id)

      products.value.splice(index, 1)
    } else {
      item.isFavorite = true

      products.value.push(item)
    }

    localStorage.setItem('favorites', JSON.stringify(products.value))
  }

  getData();

  return { pending, products, counter, getData, toggleFavorite }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useFavorites, import.meta.hot))
}
