<template>
  <div class="flex justify-center items-center gap-2 bg-[#00C37A] p-2 rounded-lg cursor-pointer select-none text-shadow-lg" tabindex="0">
    <vue-feather type="shopping-cart" class="h-[20px] cursor-pointer" />
    <span class="font-semibold"><slot></slot></span>
  </div>
</template>

<script>
export default {
  setup() {
    return {}
  },
}
</script>

<style lang="scss" scoped></style>
