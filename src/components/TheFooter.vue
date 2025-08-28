<template>
  <footer
    class="flex items-center justify-center pt-12 text-[var(--p-zinc-50)] bg-[var(--p-zinc-950)]"
  >
    <div class="w-full container py-2 px-4">
      <div class="flex items-center justify-between">
        <router-link to="/" class="flex items-center gap-4">
          <img class="w-14" src="/logo.svg" alt="" />
          <span class="text-[var(--p-zinc-200)] text-2xl font-semibold">E-commerce</span>
        </router-link>
        <div class="col-span-2 flex justify-end gap-4">
          <a href="https://example.com" target="_blank"><vue-feather type="twitter"></vue-feather></a>
          <a href="https://example.com" target="_blank"><vue-feather type="twitch"></vue-feather></a>
          <a href="https://example.com" target="_blank"><vue-feather type="instagram"></vue-feather></a>
          <a href="https://example.com" target="_blank"><vue-feather type="linkedin"></vue-feather></a>
        </div>
      </div>
        <ul class="mt-12">
          <li class="text-xl font-semibold mb-3">Страницы</li>
          <li class="opacity-60 mt-1"><router-link to="/">Главная</router-link></li>
          <li class="opacity-60 mt-1"><router-link to="/catalog">Каталог товаров</router-link></li>
          <li class="opacity-60 mt-1"><router-link to="/cart">Корзина</router-link></li>
          <li class="opacity-60 mt-1"><router-link to="/favorites">Избранное</router-link></li>
          <li class="opacity-60 mt-1"><router-link to="/dasgasdg">404</router-link></li>
        </ul>
      <p class="opacity-50 py-3 border-t mt-12">&copy; E-commerce Все права защищены</p>
    </div>
  </footer>
</template>
