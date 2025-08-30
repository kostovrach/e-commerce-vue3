<template>
    <footer class="flex items-center justify-center bg-[var(--p-zinc-950)] pt-12 text-[var(--p-zinc-50)]">
        <div class="container w-full px-4 py-2">
            <div class="flex items-center justify-between">
                <router-link to="/" class="flex items-center gap-4">
                    <img class="w-14" src="/logo.svg" alt="" />
                    <span class="text-2xl font-semibold text-[var(--p-zinc-200)]">E-commerce</span>
                </router-link>
                <div class="col-span-2 flex justify-end gap-4">
                    <a href="https://example.com" target="_blank"><vue-feather type="twitter"></vue-feather></a>
                    <a href="https://example.com" target="_blank"><vue-feather type="twitch"></vue-feather></a>
                    <a href="https://example.com" target="_blank"><vue-feather type="instagram"></vue-feather></a>
                    <a href="https://example.com" target="_blank"><vue-feather type="linkedin"></vue-feather></a>
                </div>
            </div>
            <ul class="mt-12">
                <li class="mb-3 text-xl font-semibold">Страницы</li>
                <li class="mt-1 opacity-60"><router-link to="/">Главная</router-link></li>
                <li class="mt-1 opacity-60"><router-link to="/catalog">Каталог товаров</router-link></li>
                <li class="mt-1 opacity-60"><router-link to="/cart">Корзина</router-link></li>
                <li class="mt-1 opacity-60"><router-link to="/favorites">Избранное</router-link></li>
                <li class="mt-1 opacity-60"><router-link to="/invalid-path">404</router-link></li>
            </ul>
            <p class="mt-12 border-t py-3 opacity-50">&copy; E-commerce Все права защищены</p>
        </div>
    </footer>
</template>
