import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Nota from '/src/views/Kasir/NotaVue.vue'

Vue.config.productionTip = false;

Vue.component('cafe-bill', Nota);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
