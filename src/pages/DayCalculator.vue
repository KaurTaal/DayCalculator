<template>
    <div class="day-calculator-container">
      <div class="calc-and-map">
        <Calculator></Calculator>
        <Map></Map>
      </div>

      <div class="diagram">
        <Diagram></Diagram>
      </div>

    </div>
</template>

<script>


import Calculator from "@/components/Calculator";
import Diagram from "@/components/Diagram";
import Map from "@/components/MapComponent";
export default {
  name: "day-calculator",
  components: {Map, Diagram, Calculator},

  methods: {}
}


</script>

<style scoped>

.calc-and-map{
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.diagram{
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}


.day-calculator-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  background-color: lightpink;
}


</style>