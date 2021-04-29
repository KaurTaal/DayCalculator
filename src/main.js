import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import echarts from "echarts";
import i18n from './i18n'

Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false

new Vue({
  vuetify,
  i18n,
  render: h => h(App)
}).$mount('#app')
