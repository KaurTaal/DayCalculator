<template>
  <div class="calculator">
    <div class="calc-container">

      <div class="calc-item-container">
        <div class="calc-item-size-container">
          <v-text-field
              label="Longitude"
              rounded
              outlined
              dense
              hide-details
              color="green"
          ></v-text-field>
        </div>
      </div>

      <div class="calc-item-container">
        <div class="calc-item-size-container">
          <v-text-field
              label="Sunrise"
              rounded
              outlined
              dense
              hide-details
              color="green"
          ></v-text-field>
        </div>
      </div>

      <div class="calc-item-container">
        <div class="calc-item-size-container">
          <v-text-field
              label="Langitude"
              rounded
              outlined
              dense
              hide-details
              color="green"
          ></v-text-field>
        </div>

      </div>

      <div class="calc-item-container">
        <div class="calc-item-size-container">
          <v-text-field
              label="Sunset"
              rounded
              outlined
              dense
              hide-details
              color="green"
          ></v-text-field>
        </div>
      </div>

      <div class="calc-item-container">
        <div class="calc-item-size-container" style="padding-top: 0.5em">
          <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="date"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="date"
                  label="Date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  color="green"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="error"
                  @click="menu = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.menu.save(date)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>

      </div>

      <div class="calc-item-container">
        <div class="calc-item-size-container">
          <v-text-field
              label="Day of length"
              rounded
              outlined
              dense
              hide-details
              color="green"
          ></v-text-field>
        </div>
      </div>
    </div>

    <div class="period-container">
        <el-date-picker
            v-model="value1"
            type="daterange"
            range-separator="~"
            start-placeholder="Start date"
            end-placeholder="End date">
        </el-date-picker>
    </div>


  </div>
</template>


<script>

export default {
  name: "calculator",

  data: () => ({
    date: null,
    menu: false,
    modal: false,
    value1: null,
  }),
}


</script>

<style scoped>

.calc-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 2em;
}

.calc-item-container {
  display: flex;
  justify-content: center;
  align-content: center;
  align-items: center;
}

.period-container{
  display: grid;
  grid-template-rows: 1fr;
  justify-content: center;
  align-items: center;
  padding-top: 2em;
}


.calc-item-size-container {
  width: 10em;
  height: 3em;
}

</style>