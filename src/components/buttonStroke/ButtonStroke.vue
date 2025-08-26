<template>
  <div class="button-stroke flex justify-center items-center p-2 rounded-lg border cursor-pointer select-none text-shadow-lg" tabindex="0">
    <vue-feather type="heart" fill="white" class="h-[20px] cursor-pointer aspect-square" />
    <vue-feather type="heart" class="h-[20px] cursor-pointer aspect-square" />
    <span class="font-semibold"><slot></slot></span>
  </div>
</template>

<style lang="scss" scoped>
.button-stroke {

  .vue-feather:has(svg:not([fill='none'])) {
    display: none;
  }

  @media (pointer: fine) {
    &:not(.selected):hover {
      .vue-feather:has(svg:not([fill='none'])) {
        display: block;
      }

      .vue-feather:has(svg[fill='none']) {
        display: none;
      }
    }
  }

  &.selected {
    $c-selected: #d41818;

    background-color: $c-selected;
    border-color: $c-selected;

    .vue-feather:has(svg:not([fill='none'])) {
      display: block;
    }

    .vue-feather:has(svg[fill='none']) {
      display: none;
    }
  }
}
</style>
