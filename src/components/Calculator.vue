<template>

  <div class="calc-container">

    <div class="calc-item-container">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="inputLong"
            label="Longitude"
            rounded
            outlined
            dense
            hide-details
            color="green"
            :rules="[rules.required, rules.floatNumber]"
        ></v-text-field>
      </div>
    </div>

    <div class="calc-item-container">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="sunrise"
            label="Sunrise"
            rounded
            outlined
            dense
            hide-details
            color="green"
            readonly
        ></v-text-field>
      </div>
    </div>

    <div class="calc-item-container">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="inputLang"
            label="Langitude"
            rounded
            outlined
            dense
            hide-details
            color="green"
            :rules="[rules.required, rules.floatNumber]"
            hint="Example: 50.49094"
        ></v-text-field>
      </div>

    </div>

    <div class="calc-item-container">
      <div class="calc-item-size-container">
        <v-text-field
            v-model="sunset"
            label="Sunset"
            rounded
            outlined
            dense
            hide-details
            color="green"
            readonly
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
                :rules="[rules.required]"
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
            v-model="lenOfDay"
            label="Day of length"
            rounded
            outlined
            dense
            hide-details
            color="green"
            readonly
        ></v-text-field>
      </div>
    </div>
  </div>

</template>


<script>

const validateInput = (input) => {
  input = input.trim();
  //Algab 1-9 ja järgneb 0-9 0x või mitu korda
  const rule1 = /^[1-9][0-9]*.[0-9]+$/
  const rule2 = /^[1-9][0-9]*$/
  const rule3 = /^-[1-9][0-9]*.[0-9]+$/
  return rule1.test(input) || rule2.test(input) || rule3.test(input);
}

export default {
  name: "calculator",

  data: () => ({
    date: null,
    menu: false,
    modal: false,
    inputLong: '',
    inputLang: '',
    sunrise: null,
    sunset: null,
    lenOfDay: null,
    info: null,

    rules: {
      required: value => !!value || 'Required',
      floatNumber: value => validateInput(value.toString()) || 'Wrong input'
    }
  }),

  methods: {

    handleMarkerMove(coords) {
      this.inputLong = coords[0];
      this.inputLang = coords[1];
    },


    async showData() {
      const axios = require('axios');

      const response = await axios.get('https://api.sunrise-sunset.org/json', {
        params: {
          lat: this.inputLang,
          lng: this.inputLong,
          date: this.date
        }
      });

      this.sunrise = response.data.results.sunrise;
      this.sunset = response.data.results.sunset;
      this.lenOfDay = response.data.results.day_length;
    }


  },
  //`https://api.sunrise-sunset.org/json?lat=${this.inputLang}&lng=${this.inputLong}&date=${this.date}`

  /*
  mounted() {
    axios
        .get(`https://api.sunrise-sunset.org/json?lat=${this.inputLang}&lng=${this.inputLong}&date=${this.date}`)
        .then(response => (this.info = response));
  },
   */

  watch: {
    inputLang() {
      if (validateInput(this.inputLang.toString()) && validateInput(this.inputLong.toString()) && this.date !== null) {
        this.$emit("lonAndLanChange", [this.inputLong, this.inputLang]);
        this.showData();
      }
    },

    inputLong() {
      if (validateInput(this.inputLang.toString()) && validateInput(this.inputLong.toString()) && this.date !== null) {
        this.$emit("lonAndLanChange", [this.inputLong, this.inputLang]);
        this.showData();
      }
    },

    date() {
      if (validateInput(this.inputLang.toString()) && validateInput(this.inputLong.toString()) && this.date !== null) {
        this.showData();
      }
    }
  },
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

.calc-item-size-container {
  width: 10em;
  height: 3em;
}


</style>