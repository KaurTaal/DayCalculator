<template>
  <div class="day-calculator-container">
    <div class="calc-and-map">
      <Calculator
          :long="long"
          :lati="lati"
          ref="calculator" @lonAndLanChange="handleLonAndLanChange"
      ></Calculator>
      <Map ref="map" @markerMove="handleMarkerMove"
           :long="long"
           :lati="lati"
      ></Map>
    </div>

    <div class="diagram">
      <Diagram
          ref="diagram"
          :long="long"
          :lati="lati"
      ></Diagram>
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

  data() {
    return {
      long: 26,
      lati: 60
    }
  },

  methods: {
    handleMarkerMove(coords) {
      this.long = coords[0];
      this.lati = coords[1];
    },

    handleLonAndLanChange(coords) {
      this.long = coords[0];
      this.lati = coords[1];
    },


  }
}


</script>

<style scoped>

.calc-and-map {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
}

.diagram {
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding-bottom: 3em;
  padding-top: 1em;
}


.day-calculator-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
}


</style>