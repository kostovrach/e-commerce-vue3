<template>
  <TheHeader />
  <main class="grow container py-8 px-4 mx-auto">
    <RouterView />
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'
export default {
  components: { TheHeader, TheFooter },
}
</script>
