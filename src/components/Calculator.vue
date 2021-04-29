<template>

  <div class="calc-container">

    <div class="calc-item-container" style="justify-content: flex-end">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="inputLong"
            label="Longitude"
            rounded
            outlined
            dense
            hide-details
            color="light-green accent-3"
            :rules="[rules.required, rules.floatNumber]"
        ></v-text-field>
      </div>
    </div>

    <div class="calc-item-container" style="justify-content: flex-start">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="sunrise"
            label="Sunrise"
            rounded
            outlined
            dense
            hide-details
            color="black"
            readonly
        ></v-text-field>
      </div>
    </div>

    <div class="calc-item-container" style="justify-content: flex-end">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="inputLang"
            label="Latitude"
            rounded
            outlined
            dense
            hide-details
            color="light-green accent-3"
            :rules="[rules.required, rules.floatNumber]"
            hint="Example: 50.49094"
        ></v-text-field>
      </div>

    </div>

    <div class="calc-item-container" style="justify-content: flex-start">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="sunset"
            label="Sunset"
            rounded
            outlined
            dense
            hide-details
            readonly
            color="black"
        ></v-text-field>
      </div>
    </div>

    <div class="calc-item-container" style="justify-content: flex-end">
      <div class="calc-item-size-container" style="padding-top: 0.5em">
        <v-menu
            v-model="menu"
            :close-on-content-click="false"
            :nudge-right="40"
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
                :rules="[rules.required]"
                color="light-green accent-3"
            ></v-text-field>
          </template>
          <v-date-picker
              v-model="date"
              @input="menu = false"
          ></v-date-picker>
        </v-menu>
      </div>

    </div>

    <div class="calc-item-container" style="justify-content: flex-start">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="lenOfDay"
            label="Length Of Day"
            rounded
            outlined
            dense
            hide-details
            readonly
            color="black"
        ></v-text-field>
      </div>
    </div>
  </div>

</template>


<script>
import moment from 'moment-timezone';

const validateInput = (input) => {

  const rule1 = /^-?[1-9][0-9]*\.[0-9]+$/
  const rule2 = /^-?[1-9][0-9]*$/
  const rule3 = /^-?0\.[0-9]+/
  const rule4 = /^0$/

  return rule1.test(input) || rule2.test(input) || rule3.test(input) || rule4.test(input);
}


export default {

  name: "calculator",
  props: ["long", "lang"],

  data() {
    return {
      date: null,
      menu: false,
      modal: false,
      inputLong: this.long,
      inputLang: this.lang,
      sunrise: null,
      sunset: null,
      lenOfDay: null,

      rules: {
        required: value => !!value || value !== "0" || 'Required',
        floatNumber: value => validateInput(value.toString()) || 'Wrong input',
      }
    }
  },

  methods: {
    handleMarkerMove(coords) {
      this.inputLong = coords[0];
      this.inputLang = coords[1];
    },


    showData() {
      if (this.date) {
        const SunCalc = require('suncalc');
        const date = this.convertDate(this.date);
        let sunrise = SunCalc.getTimes(date, this.inputLang, this.inputLong).sunrise;
        let sunset = SunCalc.getTimes(date, this.inputLang, this.inputLong).sunset;

        this.sunrise = moment(sunrise).tz('Europe/Helsinki').format("HH:mm");
        this.sunset = moment(sunset).tz('Europe/Helsinki').format("HH:mm");

        sunrise = moment(sunrise).unix();
        sunset = moment(sunset).unix();

        let difference = Math.round((sunset - sunrise) / 60 / 60 * 100) / 100;
        this.lenOfDay = `${difference} H`;
      }
    },

    convertDate(date) {
      if (date) {
        const help = date.split("-");
        const year = help[0];
        const month = help[1];
        const day = help[2];
        return new Date(year, month - 1, day);
      }
    },
  },

  watch: {
    long() {
      this.inputLong = Math.round(this.long * 10000) / 10000;
    },
    lang() {
      this.inputLang = Math.round(this.lang * 10000) / 10000;
    },
    inputLang() {
      if (validateInput(this.inputLang.toString()) && validateInput(this.inputLong.toString())) {
        this.showData();
      }
      this.$emit("lonAndLanChange", [this.inputLong, this.inputLang]);

    },

    inputLong() {
      if (validateInput(this.inputLang.toString()) && validateInput(this.inputLong.toString())) {
        this.showData();
      }
      this.$emit("lonAndLanChange", [this.inputLong, this.inputLang]);
    },

    date() {
      if (validateInput(this.inputLang.toString()) && validateInput(this.inputLong.toString())) {
        this.$emit("lonAndLanChange", [this.inputLong, this.inputLang]);
        this.showData();
      }
    },
  },

}


</script>

<style scoped>

.calc-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row-gap: 2em;
  gap: 3em;
}

.calc-item-container {
  display: flex;
  align-content: center;
  align-items: center;

}

.calc-item-size-container {
  width: 10em;
  height: 3em;
}



</style>