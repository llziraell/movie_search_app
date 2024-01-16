import { createApp } from 'vue'
import { createPinia } from 'pinia'
import {BootstrapVueNext} from 'bootstrap-vue-next'

import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(BootstrapVueNext)
app.use(createPinia())
app.use(router)

app.mount('#app')
