<template>
  <div class="content">
    <div class="calc-and-map">
      <Calculator></Calculator>
      <Map
      ></Map>
    </div>

    <div class="diagram">
      <Diagram></Diagram>
    </div>
  </div>

</template>

<script>
import Calculator from "@/components/Calculator";
import Map from "@/components/MapComponent";
import Diagram from "@/components/Diagram";
export default {
  name: "Containers",
  components: {Diagram, Map, Calculator},


}
</script>

<style scoped>
.content{
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightsalmon;
  gap: 3em;
  width: 100%;
  height: 100%;
}

.calc-and-map{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 50%;
}

.diagram{
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
}
</style>