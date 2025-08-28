import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import VueFeather from 'vue-feather'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import { definePreset } from '@primeuix/themes'
import Nora from '@primeuix/themes/nora'

const app = createApp(App)
const preset = definePreset(Nora, {
  semantic: {
    primary: {
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}',
    },
  },
})

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
  theme: {
    preset: preset,
    options: {
      darkModeSelector: false,
      cssLayer: false,
    },
  },
})

app.component(VueFeather.name, VueFeather)

app.mount('#app')
