<template>
  <div class="button-fill relative box-border bg-[var(--p-zinc-950)] text-[var(--p-zinc-50)] rounded-lg cursor-pointer select-none text-shadow-lg duration-300" tabindex="0">
    <div
      class="flex justify-center items-center gap-2 p-3 h-full w-full absolute left-0 top-0 box-border"
    >
      <vue-feather data-type="default" type="shopping-cart" class="h-[20px] duration-300 cursor-pointer" />
      <vue-feather data-type="alternate" type="check" class="h-[20px] cursor-pointer" />
      <span class="font-semibold text-sm">
        <slot></slot>
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.button-fill {
  [data-type='alternate'] {
    display: none;
  }
  @media (pointer: fine) {
    &:hover {
      [data-type='default'] {
        translate: 0 -0.25rem;
      }
    }
  }
  &.selected {
    pointer-events: none;
    [data-type='default'] {
      display: none;
    }
    [data-type='alternate'] {
      display: initial;
    }
  }
}
</style>
