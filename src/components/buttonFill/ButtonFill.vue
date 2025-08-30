<template>
    <div
        class="button-fill relative box-border cursor-pointer rounded-lg bg-[var(--p-zinc-950)] text-[var(--p-zinc-50)] duration-300 select-none text-shadow-lg hover:bg-[var(--p-zinc-800)]"
        tabindex="0"
    >
        <div class="absolute top-0 left-0 box-border flex h-full w-full items-center justify-center gap-2 p-3">
            <vue-feather data-type="default" type="shopping-cart" class="h-[20px] cursor-pointer duration-300" />
            <vue-feather data-type="alternate" type="check" class="h-[20px] cursor-pointer" />
            <span class="text-sm font-semibold">
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
                translate: 0 -0.1rem;
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
