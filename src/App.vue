<template>
  <v-app>
    <div data-app class="main-container">

      <Header class="content-padding"></Header>
      <DayCalculator class="content-padding"></DayCalculator>
      <Footer class="content-padding"></Footer>

    </div>
  </v-app>
</template>

<script>


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DayCalculator from "@/pages/DayCalculator";
import Vue from 'vue';
import Vuetify from 'vuetify';
import Element from 'element-ui';
import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'vuetify/dist/vuetify.min.css';
import 'element-ui/lib/theme-chalk/index.css'
import VueLayers from 'vuelayers';
import 'vuelayers/lib/style.css';



Vue.use(Vuetify);
Vue.use(VueLayers);
Vue.use(Element);
Vue.use(ElementUI, { locale })

export default {
  name: 'App',
  components: {DayCalculator, Footer, Header},
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
  background-color: grey;
  margin: 0;
}

.v-text-field{
  margin-top: unset !important;
  padding-top: unset !important;
}

.el-date-editor{
  background-color: transparent !important;
  width: 100%;
  border: solid;
  border-radius: 2em;
  padding-left: 1em;
}

.el-date-editor:hover{
  border-color: gray;
}

.el-range-editor.el-input__inner{
  border-width: 1px;
}

.el-date-editor .el-range__icon{
  text-decoration-color: black !important;
  font-size: 1.5em;
  padding-left: 0.5em;
  color: black !important;
}


.el-range-input::placeholder{
  color: black !important;
}




</style>
