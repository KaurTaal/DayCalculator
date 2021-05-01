<template>

  <div>
    <div class="calc-container">

      <div class="calc-item-container" style="justify-content: flex-end">
        <div class="calc-item-size-container">
          <v-text-field
              v-model="inputLong"
              :label="$t('longitude')"
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
              :label="$t('sunrise')"
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
              v-model="inputlati"
              :label="$t('latitude')"
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
              :label="$t('sunset')"
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
              ref="menu"
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
                  :label="$t('date')"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  color="light-green accent-3"
                  style="width: 80%"
                  :rules="[rules.required]"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date"
                no-title
                @input="menu = false"
                scrollable
            ></v-date-picker>
          </v-menu>
        </div>

      </div>

      <div class="calc-item-container" style="justify-content: flex-start">
        <div class="calc-item-size-container">
          <v-text-field
              v-model="lenOfDay"
              :label="$t('len-of-day')"
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

    <div class="time-zone-container">

      <div style="height: 3em; width: 15em">
        <v-autocomplete
            v-model="activeTimeZone"
            :items="timeZones"
            outlined
            :label="$t('time-zone')"
            single-line
            rounded
            hide-details
            clearable
            append-icon="far fa-clock"
        ></v-autocomplete>
      </div>

    </div>

  </div>

</template>


<script>
import moment from 'moment-timezone';
import getTimeZones from "@/timeZones/timeZoneOptions";

const validateInput = (input) => {

  const rule1 = /^-?[1-9][0-9]*\.[0-9]+$/
  const rule2 = /^-?[1-9][0-9]*$/
  const rule3 = /^-?0\.[0-9]+/
  const rule4 = /^0$/

  return rule1.test(input) || rule2.test(input) || rule3.test(input) || rule4.test(input);
}


export default {
  name: "calculator",
  props: ["long", "lati"],

  data() {
    return {
      date: null,
      menu: false,
      modal: false,
      inputLong: this.long,
      inputlati: this.lati,
      sunrise: null,
      sunset: null,
      lenOfDay: null,
      timeZones: getTimeZones(),
      activeTimeZone: null,

      rules: {
        required: value => !!value || value !== "0" || 'Required',
        floatNumber: value => validateInput(value.toString()) || 'Wrong input',
      }
    }
  },

  methods: {
    handleMarkerMove(coords) {
      this.inputLong = coords[0];
      this.inputlati = coords[1];
    },


    showData() {
      if (this.date) {
        const SunCalc = require('suncalc');
        const date = this.convertDate(this.date);

        let sunrise = SunCalc.getTimes(date, this.inputlati, this.inputLong).sunrise;
        let sunset = SunCalc.getTimes(date, this.inputlati, this.inputLong).sunset;

        if (isNaN(sunset) || isNaN(sunset)) {
          this.sunrise = "-";
          this.sunset = "-";
          this.lenOfDay = "24 H / 0 H";
          return;
        }

        if (this.activeTimeZone) {
          this.sunrise = moment(sunrise).tz(this.activeTimeZone).format("HH:mm")
          this.sunset = moment(sunset).tz(this.activeTimeZone).format("HH:mm")
        }else {
          this.sunrise = moment(sunrise).format("HH:mm")
          this.sunset = moment(sunset).format("HH:mm")
        }
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
    lati() {
      this.inputlati = Math.round(this.lati * 10000) / 10000;
    },
    inputlati() {
      if (validateInput(this.inputlati.toString()) && validateInput(this.inputLong.toString())) {
        this.showData();
      }
      this.$emit("lonAndLanChange", [this.inputLong, this.inputlati]);

    },

    inputLong() {
      if (validateInput(this.inputlati.toString()) && validateInput(this.inputLong.toString())) {
        this.showData();
      }
      this.$emit("lonAndLanChange", [this.inputLong, this.inputlati]);
    },

    date() {
      if (validateInput(this.inputlati.toString()) && validateInput(this.inputLong.toString())) {
        this.$emit("lonAndLanChange", [this.inputLong, this.inputlati]);
        this.showData();
      }
    },

    activeTimeZone(){
      this.$emit("timeZoneChange", this.activeTimeZone);
      this.showData();
    }
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

.time-zone-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-top: 3em;
}

::v-deep .v-autocomplete.v-select--is-menu-active .v-input__icon--append .v-icon {
  transform: none;
}


</style>