import Vue from 'vue'
import { Input } from 'buefy'
import App from './App.vue'

Vue.use(Input)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
