<template>
  <div class="diagram-container">

    <div class="header-container">

      <div class="range-container">

        <div class="start-date">
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
                  v-model="startDate"
                  label="Start date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  color="green"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="startDate"
                no-title
                @input="menu = false"
                scrollable
            ></v-date-picker>
          </v-menu>
        </div>
        <div>~</div>
        <div class="end-date">
          <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :nudge-right="40"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="endDate"
                  label="End date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  color="green"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="endDate"
                no-title
                @input="menu2 = false"
                scrollable
            ></v-date-picker>
          </v-menu>
        </div>

      </div>

      <div>
        Excel export?
      </div>
    </div>

    <v-chart
        autoresize
        :option="option"
    ></v-chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts";
import moment from 'moment-timezone';

export default {
  name: "diagram",

  components: {"v-chart": ECharts},
  props: ["long", "lang"],

  data() {
    return {
      startDate: null,
      endDate: null,
      menu: false,
      modal: false,
      menu2: false,
      modal2: false,
      sunrise: null,
      sunset: null,
      lenOfDay: null,
      dayData: {},

      option: {
        grid: {
          top: 10,
          right: 10,
          left: 50,
          bottom: 100
        },
        tooltip: {
          trigger: 'axis',
          formatter: (data) => {
            console.log(data);
            return Math.round(data[0].data / 60 / 60 * 100) / 100 + ' H' + "<br> Sunrise: " +
                this.dayData[data[0].axisValue].sunrise + "<br> Sunset: " +
                this.dayData[data[0].axisValue].sunset;
          },
        },
        dataZoom: {
          type: 'slider',
          filterMode: "weakFilter",
        },
        xAxis: {
          data: [],
        },
        yAxis: {
          axisLabel: {
            formatter: function (time) {
              return Math.round(time / 60 / 60 * 100) / 100 + ' H';
            },
          }
        },
        series: [
          {
            name: "Length of day",
            type: "line",
            data: [],
            customData: "terekest",
            smooth: true,
          }
        ],
        lineStyle: {
          color: 'black'
        },
        stateAnimation: {
          duration: 300,
          easing: 'cubicOut'
        },
      }
    }
  },

  methods: {
    showData() {
      let dates = [];
      let values = [];

      dates = this.getDatePeriod(this.startDate, this.endDate);
      values = this.getPeriodData(dates);

      this.option.series[0].data = values;
      this.option.xAxis.data = dates;
      this.option = JSON.parse(JSON.stringify(this.option))
    },

    getPeriodData(dates) {
      const SunCalc = require('suncalc');
      let values = [];

      for (let i = 0; i < dates.length; i++) {
        let date = this.reverseDate(dates[i]);
        date = this.convertDate(date);

        let sunrise = SunCalc.getTimes(date, this.lang, this.long).sunrise;
        let sunset = SunCalc.getTimes(date, this.lang, this.long).sunset;

        this.sunrise = moment(sunrise).tz('Europe/Helsinki').format("HH:mm")
        this.sunset = moment(sunset).tz('Europe/Helsinki').format("HH:mm")

        sunrise = moment(sunrise).unix();
        sunset = moment(sunset).unix();

        let difference = sunset - sunrise;
        this.dayData[dates[i]] = {sunrise: this.sunrise, sunset: this.sunset};
        values.push(difference);
      }
      return values;
    },


    getDatePeriod(startDate, endDate) {
      let dates = [];
      let start = this.convertDate(startDate);
      const end = this.convertDate(endDate);
      while (start <= end) {
        const date = new Date(start);
        if (date.getDate() < 10)
          dates.push("0" + `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);
        else
          dates.push(`${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`);
        start.setDate(start.getDate() + 1)
      }
      return dates;
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

    reverseDate(date) {
      const dateHelp = date.split(".");
      const year = dateHelp[2];
      const month = dateHelp[1];
      const day = dateHelp[0];
      return year + "-" + month + "-" + day;
    },

  },

  watch: {
    startDate() {
      if (this.startDate && this.endDate) {
        const help = this.startDate;
        this.startDate = this.endDate;
        this.endDate = help;
        this.showData();
      }
    }
    ,
    endDate() {
      if (this.startDate && this.endDate) {
        const help = this.endDate;
        this.endDate = this.startDate;
        this.endDate = help;
        this.showData();
      }
    }
    ,

  }


}
;
</script>

<style scoped>


.diagram-container {
  display: flex;
  flex-direction: column;
  gap: 1em;
  height: 100%;
  width: 100%;
}

.range-container {
  display: flex;
  flex-direction: row;
  gap: 1em;
}

.end-date .start-date {
  width: 100%;
  height: 3em;
}


.header-container {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

</style>