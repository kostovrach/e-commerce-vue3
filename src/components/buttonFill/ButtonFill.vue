<template>
  <div class="button-fill relative overflow-hidden box-border p-2" tabindex="0">
    <div
      data-type="default"
      class="flex justify-center items-center gap-2 bg-[var(--p-zinc-950)] text-[var(--p-zinc-50)] p-3 rounded-lg cursor-pointer select-none text-shadow-lg duration-300 w-full absolute left-0 top-0 box-border"
    >
      <vue-feather type="shopping-cart" class="h-[20px] cursor-pointer" />
      <span class="font-semibold text-sm"><slot></slot></span>
    </div>
    <div
      data-type="checked"
      class="flex justify-center items-center gap-2 bg-[#1C005D] p-2.5 rounded-lg cursor-pointer select-none text-shadow-lg duration-300 w-full absolute left-0 top-0 box-border translate-x-[-100%]"
    >
      <vue-feather type="check" class="h-[20px] cursor-pointer" />
      <span class="font-semibold text-sm">В корзине</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-fill {
  &.selected {
    pointer-events: none;
    [data-type='default'] {
      translate: 100%;
    }
  [data-type='checked'] {
    translate: 0;
  }
  }
}
</style>
