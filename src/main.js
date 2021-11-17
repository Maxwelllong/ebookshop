import {
  createApp
} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'vant/es/button/style'
import 'vant/lib/index.css'
import {
  Button,
  NavBar
} from 'vant'

createApp(App).use(store).use(router).use(Button).use(NavBar).mount('#app')
