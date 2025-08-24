<template>
  <header class="flex items-center justify-center bg-[#252525] py-3">
    <div class="flex items-center justify-between w-full container">
      <router-link to="/">
        <img class="w-10" src="@/assets/logo.svg" alt="" />
      </router-link>

      <div class="flex justify-center items-center gap-4">
        <router-link to="/favorites">
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
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
