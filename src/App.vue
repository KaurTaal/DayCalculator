<template>
  <div class="main-container">

    <Header class="content-padding"></Header>
    <DayCalculator class="content-padding"></DayCalculator>
    <Footer class="content-padding"></Footer>

  </div>
</template>

<script>


import Header from "@/components/Header";
import Footer from "@/components/Footer";
import DayCalculator from "@/pages/DayCalculator";
export default {
  name: 'App',
  components: {DayCalculator, Footer, Header},
}
</script>

<style>

.content-padding{
  padding-left: 1em;
  padding-right: 1em;
}

.main-container {
  min-height: 100vh; /* will cover the 100% of viewport */
  overflow: hidden;
  display: block;
  position: relative;
  padding-bottom: 5em; /* height of your footer */
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

</style>
