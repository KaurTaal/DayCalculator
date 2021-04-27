<template>
  <div class="header">
    <v-app-bar>

      <v-toolbar-title>Day Calculator</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn><i class="fas fa-globe-europe"></i></v-btn>

      <v-btn><i class="far fa-moon"></i></v-btn>

      <v-btn><i class="fab fa-github"></i></v-btn>

      <v-btn><i class="fas fa-info"></i></v-btn>


      <!--
      <div style="display: flex; gap: 1em;">
        <div>language</div>
        <div>theme</div>
        <div>info</div>
        <div>Git repo</div>
        <div>Settings</div>

      </div>
      -->

    </v-app-bar>

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