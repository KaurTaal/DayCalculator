<template>
  <v-app>
    <div data-app class="main-container">

      <Header></Header>
      <DayCalculator class="content-padding"></DayCalculator>

    </div>
  </v-app>
</template>

<script>


import Header from "@/components/Header";
import DayCalculator from "@/pages/DayCalculator";
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import 'element-ui/lib/theme-chalk/index.css'
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css';
import '@fortawesome/fontawesome-free/css/all.css'
import '@/assets/light.scss'
import '@/assets/dark.scss'
import VueRouter from 'vue-router';



Vue.use(Vuetify);
Vue.use(VueLayers);
Vue.use(VueRouter);


export default {
  name: 'App',
  components: {DayCalculator, Header},
  icons: {
    iconFont: 'fa'
  },

}
</script>

<style scoped>
.main-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 5em; /* height of your footer */
}

</style>


<style>

.content-padding {
  padding-left: 1em;
  padding-right: 1em;
}

* {
  box-sizing: border-box;
}

*:before,
*:after {
  box-sizing: border-box;
}

html,
body {
  width: 100%;
  height: 100%;
  position: relative;
  margin: 0;
  -ms-overflow-style: none;
}

::-webkit-scrollbar{
  display: none;
}

.v-text-field{
  margin-top: unset !important;
  padding-top: unset !important;
}

.v-text-field--outlined fieldset{
  border-color: black;
}







</style>
