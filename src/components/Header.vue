<template>
  <div class="header">
    <v-app-bar class="header-container heading">

      <v-toolbar-title class="header-text">{{ $t('title') }}</v-toolbar-title>

      <v-spacer></v-spacer>


      <div class="icons">
        <v-btn :title="$t('lati-button')"
               rounded @click="setLocale">
          <i :class="activeIcon"
          ></i>
        </v-btn>

        <v-btn :title="$t('theme-button')" rounded @click="handleTheme"><i :class="lightTheme ? 'fas fa-sun' : 'fas fa-moon'"></i></v-btn>

        <v-btn :title="$t('git-button')" rounded @click="redirectToGit">
          <i class="fab fa-github"></i>
        </v-btn>

        <v-dialog
            v-model="dialog"
            width="500"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-btn
                :title="$t('info')"
                rounded
                   dark
                   v-bind="attrs"
                   v-on="on"
            >
              <i class="fas fa-info"></i>
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              Info
            </v-card-title>

            <v-card-text>
              <br>
              <p class="info-heading">{{$t('calc-heading')}}</p>
              <p>{{$t('calculator')}}</p>

              <p class="info-heading">{{$t('map-heading')}}</p>
              <p>{{$t('map')}}</p>

              <p class="info-heading">{{$t('chart-heading')}}</p>
              <p>{{$t('chart')}}</p>

            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                  color="primary"
                  text
                  @click="dialog = false"
              >
                Close
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>


      </div>

    </v-app-bar>

  </div>


</template>

<script>

export default {
  name: "Header",

  data() {
    return {
      lightTheme: true,
      dialog: false,
      activeLan: 'en',
      activeIcon: 'fas fa-globe-americas'
    }
  },

  methods: {
    handleTheme() {
      this.lightTheme = !this.lightTheme;
      document.querySelector('html').setAttribute(
          'theme',
          this.lightTheme ? 'light' : 'dark'
      )
    },

    redirectToGit() {
      window.open("https://github.com/KaurTaal/DayCalculator", "_blank");
    },

    setLocale() {
      this.setIcon();
      this.activeLan = this.activeLan === 'en' ? 'est' : 'en'
      this.$vuetify.lang.current = this.activeLan === 'est' ? 'et' : 'en'
      this.$i18n.locale = this.activeLan;
      this.$emit("lanChange", this.activeLan);
    },

    setIcon() {
      this.activeIcon = this.activeIcon === 'fas fa-globe-europe' ? 'fas fa-globe-americas' : 'fas fa-globe-europe'
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

.icons {
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


</style>