<template>
  <div class="header">
    <v-app-bar class="header-container" color="rgb(255, 255, 230)">

      <v-toolbar-title>Length Of Day Calculator</v-toolbar-title>

      <v-spacer></v-spacer>

      <div class="icons">
        <v-btn color="rgb(240,230,140)"><i class="fas fa-globe-europe"></i></v-btn>

        <v-btn color="rgb(240,230,140)" @click="handleTheme"><i :class="lightTheme ? 'fas fa-sun' : 'fas fa-moon'"></i></v-btn>

        <v-btn color="rgb(240,230,140)"><i class="fab fa-github"></i></v-btn>

        <v-btn color="rgb(240,230,140)"><i class="fas fa-info"></i></v-btn>
      </div>

    </v-app-bar>

  </div>


</template>

<script>

export default {
  name: "Header",

  data() {
    return{
      lightTheme: true
    }
  },

  methods: {
    handleTheme() {
      this.lightTheme = !this.lightTheme;
      document.querySelector('html').setAttribute(
          'theme',
          this.lightTheme ? 'light' : 'dark'
      )
    }
  }

}
</script>

<style scoped>
.header {
  display: grid;
  grid-template-columns: 1fr auto;
  justify-content: space-between;
  align-items: center;
}

.icons{
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
  justify-content: center;
}

.header-container {
  width: 100%;
  height: 100%;
}

i{
  color: black;
}
</style>