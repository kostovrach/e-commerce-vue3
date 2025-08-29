<template>
  <div class="relative flex flex-col grow min-h-100">
    <Title>Корзина</Title>
    <div v-if="cartCounter">
      Товаров<span>: {{ cartCounter }}</span>
    </div>

    <Loader v-if="pending" />

    <div v-else-if="products.length" class="flex flex-col flex-wrap gap-2">
      <CartProduct
        v-for="(product, index) in products"
        :key="product.id"
        :item="product"
        :index="index"
      />
    </div>
    <div v-else class="grow w-full h-full flex justify-center items-center">
      <div class="flex flex-col items-center gap-4">
        <span class="text-3xl font-semibold opacity-60">Нет товаров в корзине</span>
        <router-link
          to="/"
          class="flex items-center gap-1 py-2 px-4 border border-[var(--p-zinc-950)] rounded-lg"
        >
          <p class="font-semibold">Перейти в каталог</p>
          <vue-feather type="corner-down-left" class="w-4" />
        </router-link>
      </div>
    </div>
  </div>
  <button
    v-if="total != 0"
    @click="orderModalVisible = true"
    class="sticky bottom-6 flex justify-center items-center py-3 px-4 w-full mt-8 text-[var(--p-zinc-50)] bg-[var(--p-zinc-950)] rounded-lg cursor-pointer"
  >
    <span class="text-lg font-semibold text-shadow-lg"
      >Оформить заказ: {{ total.toFixed(2) }}$</span
    >
  </button>
  <Dialog
    v-model:visible="orderModalVisible"
    modal
    header="Order confirm"
    :style="{ width: '30rem', border: 'none' }"
  >
    <template #header>
      <p class="text-xl font-semibold">Необходимо указать данные</p>
    </template>
    <img
      src="/cheque.svg"
      class="absolute bottom-[-16px] left-0 w-full pointer-events-none"
      alt="#"
    />
    <div class="flex flex-col gap-4 pt-2 mt-4">
      <InputGroup class="">
        <InputGroupAddon>
          <vue-feather type="user" class="w-5"></vue-feather>
        </InputGroupAddon>
        <FloatLabel variant="on">
          <InputText id="name" autocomplete="off" />
          <label for="name" class="text-sm">Ваше имя</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="">
        <InputGroupAddon>
          <vue-feather type="home" class="w-5"></vue-feather>
        </InputGroupAddon>
        <FloatLabel variant="on">
          <InputText id="address" autocomplete="off" />
          <label for="address" class="text-sm">Адрес доставки</label>
        </FloatLabel>
      </InputGroup>
      <InputGroup class="">
        <InputGroupAddon>
          <vue-feather type="calendar" class="w-5"></vue-feather>
        </InputGroupAddon>
        <FloatLabel variant="on">
          <DatePicker id="address" autocomplete="off" />
          <label for="address" class="text-sm">Дата доставки</label>
        </FloatLabel>
      </InputGroup>
      <div class="flex flex-col gap-2 mt-6">
        <p class="flex items-end justify-between">
          Сумма заказа: <span class="font-semibold">${{ (total).toFixed(2) }}</span>
        </p>
        <p class="flex items-end justify-between">
          Стоимость доставки*: <span class="font-semibold">${{ deliveryTotal }}</span>
        </p>
        <p class="flex items-end justify-between">
          Итого: <span class="font-semibold">${{ (total + deliveryTotal).toFixed(2) }}</span>
        </p>
      </div>
    </div>
    <template #footer>
      <div class="flex flex-col w-full mt-6">
        <button
          @click="orderSuccess()"
          class="self-end w-fit py-2 px-12 box-border bg-[var(--p-zinc-950)] text-[var(--p-zinc-50)] rounded-lg cursor-pointer select-none text-shadow-lg"
        >
          Оформить заказ
        </button>
        <p class="text-sm opacity-50 mt-6">* Чем больше сумма заказа, тем дешевле доставка</p>
      </div>
    </template>
  </Dialog>
  <Dialog
    v-model:visible="orderStatusVisible"
    modal
    header="Order status"
    :style="{ width: '50rem' }"
  >
    <template #header>
      <h2 class="text-2xl font-semibold">Заказ оформлен!</h2>
    </template>
    <Timeline :value="events" layout="horizontal" align="top">
      <template #marker="slotProps">
        <div class="flex items-center justify-center">
          <vue-feather
            :type="slotProps.item.status ? 'check-circle' : 'circle'"
            :stroke="slotProps.item.status ? 'green' : 'grey'"
            class="w-8"
          ></vue-feather>
        </div>
      </template>
      <template #content="slotProps">
        {{ slotProps.item.name }}
      </template>
    </Timeline>
    <template #footer>
      <div class="flex items-center justify-center w-full my-6">
        <router-link
          to="/catalog"
          class="flex items-center gap-2 box-border bg-[var(--p-zinc-950)] text-[var(--p-zinc-50)] rounded-lg cursor-pointer select-none text-shadow-lg py-3 px-6"
        >
          <p>Продолжить покупки</p>
          <vue-feather type="corner-down-left" class="w-4"></vue-feather>
        </router-link>
      </div>
    </template>
  </Dialog>
</template>

<script>
import { ref, computed } from 'vue'
import { useCart } from '@/stores/cartProducts'

import Title from '@/components/title/Title.vue'
import Loader from '@/components/loader/Loader.vue'
import CartProduct from './components/CartProduct.vue'

// form
import Dialog from 'primevue/dialog'
import InputGroup from 'primevue/inputgroup'
import InputGroupAddon from 'primevue/inputgroupaddon'
import InputText from 'primevue/inputtext'
import FloatLabel from 'primevue/floatlabel'
import DatePicker from 'primevue/datepicker'
import Timeline from 'primevue/timeline'

export default {
  components: {
    CartProduct,
    Title,
    Loader,
    Dialog,
    InputGroup,
    InputGroupAddon,
    InputText,
    FloatLabel,
    DatePicker,
    Timeline,
  },

  setup() {
    const orderModalVisible = ref(false)
    const orderStatusVisible = ref(false)
    const events = [
      {
        name: 'Обработка',
        status: true,
      },
      {
        name: 'Передано в доставку',
        status: false,
      },
      {
        name: 'Ожидает получения',
        status: false,
      },
      {
        name: 'Выдан',
        status: false,
      },
    ]

    // data
    const cartStore = useCart()

    // computed
    const total = computed(() => {
      let sum = 0

      products.value.map((item) => {
        sum = sum + item.quantity * item.price
      })

      return sum
    })

    const deliveryTotal = computed(() => {
      let sum = total.value.toFixed(0)

      if (sum <= 100) {
        sum = 12
      } else if (sum >= 100 && sum <= 500) {
        sum = 4
      } else if (sum >= 500) {
        sum = 0
      }
      return sum
    })

    const pending = computed(() => {
      return cartStore.pending
    })
    const products = computed(() => {
      return cartStore.products
    })
    const cartCounter = computed(() => {
      return cartStore.counter
    })

    // methods
    const { clearCart } = cartStore

    const orderSuccess = () => {
      orderStatusVisible.value = true
      orderModalVisible.value = false
      clearCart()
    }

    return {
      products,
      pending,
      cartCounter,
      total,
      clearCart,
      deliveryTotal,
      orderModalVisible,
      orderStatusVisible,
      orderSuccess,
      events,
    }
  },
}
</script>
