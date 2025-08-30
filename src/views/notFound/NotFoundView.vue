<template>
    <div class="flex h-screen flex-col items-center justify-center gap-2">
        <div class="flex translate-y-[-25%] flex-col items-center">
            <span class="text-[320px] leading-none font-bold">404</span>
            <ul class="flex flex-col items-center gap-4">
                <li class="text-2xl font-semibold">Страница не найдена</li>
                <li>
                    <router-link
                        to="/"
                        class="flex items-center gap-1 rounded-lg border border-[var(--p-zinc-950)] px-4 py-2"
                    >
                        <p class="font-semibold">На главную</p>
                        <vue-feather type="corner-down-left" class="w-4" />
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped></style>
