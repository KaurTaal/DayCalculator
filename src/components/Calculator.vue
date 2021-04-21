<template>
  <div class="calc-container">

    <div class="calc-input-data">
      <div class="calc-input-data-content">
        <div class="placeholders-info">longitude</div>
        <div class="placeholders-input">tõus</div>
      </div>

      <div class="calc-input-data-content">
        <div class="placeholders-info">langitude</div>
        <div class="placeholders-input">loojang</div>
      </div>

      <div class="calc-input-data-content">
        <div class="placeholders-info">date</div>
        <div class="placeholders-input">päeva pikkus</div>
      </div>
    </div>

    <div class="calc-input-result">
      <div class="calc-input-result-content">
        <div class="placeholders-info">tõus:</div>
        <div class="placeholders-input">12:12</div>
      </div>

      <div class="calc-input-result-content">
        <div class="placeholders-info">loojang</div>
        <div class="placeholders-input">19.58</div>
      </div>

      <div class="calc-input-result-content">
        <div class="placeholders-info">date</div>
        <div class="placeholders-input">päeva pikkus</div>
      </div>
    </div>

  </div>

</template>


<script>
export default {
  name: "calculator"
}


</script>

<style scoped>


.calc-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
}


.calc-input-data, .calc-input-result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: lightblue;
  width: 100%;
  height: 100%;
  gap: 9em;
}

.placeholders-info{
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

.placeholders-input{
  width: 50%;
  display: flex;
  justify-content: flex-start
}

.calc-input-data-content, .calc-input-result-content{
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1em;
  width: 100%;
}


</style>