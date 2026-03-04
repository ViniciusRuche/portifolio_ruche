import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from '@/config/i18n'
import Rollbar from '@/config/rollbar'
import App from './App.vue'
import router from './router'
import { vMaska } from 'maska/vue'
const app = createApp(App)

app.use(i18n)
const pinia = createPinia()
app.use(pinia)

app.use(router)
app.directive('maska', vMaska)
app.use(Rollbar)

app.mount('#app')
