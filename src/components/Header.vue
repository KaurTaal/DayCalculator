<template>
  <div class="header">
    <div>Day calculator</div>

    <div style="display: flex; gap: 1em;">
      <div>language</div>
      <div>theme</div>
      <div>info</div>
    </div>

  </div>
  
</template>

<script>
export default {
  name: "Header"
}
</script>

<style scoped>
.header {
  height: 5em;
  background-color: lightseagreen;
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
}
</style>