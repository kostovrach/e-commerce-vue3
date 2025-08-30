<template>
    <div
        class="button-stroke flex cursor-pointer items-center justify-center rounded-lg border p-3 select-none text-shadow-lg"
        tabindex="0"
    >
        <vue-feather
            type="heart"
            fill="white"
            stroke="white"
            class="aspect-square h-[18px] cursor-pointer duration-300"
        />
        <vue-feather type="heart" class="aspect-square h-[18px] cursor-pointer duration-300" />
        <span class="font-semibold"><slot></slot></span>
    </div>
</template>

<style lang="scss" scoped>
.button-stroke {
    .vue-feather:has(svg:not([fill='none'])) {
        display: none;
    }

    @media (pointer: fine) {
        &:hover {
            .vue-feather:has(svg[fill='none']) {
                scale: 1.1;
            }
        }
    }

    &.selected {
        $c-selected: #d41818;

        background-color: $c-selected;
        border-color: $c-selected;
        color: var(--p-zinc-50);

        .vue-feather:has(svg:not([fill='none'])) {
            display: block;
        }

        .vue-feather:has(svg[fill='none']) {
            display: none;
        }
    }
}
</style>
