import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { PiniaDebounce } from '@pinia/plugin-debounce'
import debounce from 'lodash.debounce'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

pinia.use(PiniaDebounce(debounce)).use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
