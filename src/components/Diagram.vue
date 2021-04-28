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
                  color="light-green accent-3"
                  style="width: 80%"
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
                  color="light-green accent-3"
                  style="width: 80%"
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
          bottom: 100,
        },
        tooltip: {
          trigger: 'axis',
          formatter: (data) => {
            return Math.round(data[0].data / 60 / 60 * 100) / 100 + ' H' + "<br> Sunrise: " +
                this.dayData[data[0].axisValue].sunrise + "<br> Sunset: " +
                this.dayData[data[0].axisValue].sunset;
          },
        },
        dataZoom: {
          type: 'slider',
          filterMode: "weakFilter",
          backgroundColor: 'white',
          height: 35,
          left:'10%',
          right:'10%',
          borderColor: 'transparent',
          handleColor: 'black',
          handleIcon: 'M512 512m-208 0a6.5 6.5 0 1 0 416 0 6.5 6.5 0 1 0-416 0Z M512 192C335.264 192 192 335.264 192 512c0 176.736 143.264 320 320 320s320-143.264 320-320C832 335.264 688.736 192 512 192zM512 800c-159.072 0-288-128.928-288-288 0-159.072 128.928-288 288-288s288 128.928 288 288C800 671.072 671.072 800 512 800z',
          handleSize: 15,
          textStyle: {
            color: 'black',
          },
          dataBackground: {
            lineStyle: {
              opacity: 0,
            },
            areaStyle:{
              color: 'black',
              opacity: 0.5,
            }
          }
        },
        xAxis: {
          data: [],
          axisLabel: {
            textStyle: {
              color: 'black'
            }
          },
          axisLine: {
            lineStyle:{
              color: 'black'
            }
          }
        },
        yAxis: {
          axisLabel: {
            formatter: function (time) {
              return Math.round(time / 60 / 60 * 100) / 100 + ' H';
            },
            textStyle: {
              color: 'black'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'gray'
            }
          }
        },
        series: [
          {
            type: "line",
            data: [],
            smooth: true,
            color: 'black',
            lineStyle: {
              color: 'black'
            }
          }
        ],
      }
    }
  },

  methods: {
    showData() {
      let dates = [];
      let values = [];

      if (this.convertDate(this.startDate).getTime() > this.convertDate(this.endDate).getTime()){
        const help = this.endDate;
        this.endDate = this.startDate;
        this.startDate = help;
      }

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

        if (isNaN(sunrise)){
          this.dayData[dates[i]] = {sunrise: "-", sunset: "-"};
          if (values[i-1] > 20 * 60 * 60)
            values.push(24 * 60 * 60);
          else
            values.push(0);
          continue;
        }

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

    updateTheme(){
      const theme = document.getElementsByTagName("html")[0].attributes[
          "theme"
          ].value;
      if (theme === 'light'){
        this.option.xAxis.axisLine.lineStyle.color = 'black';
        this.option.xAxis.axisLabel.textStyle.color = 'black';
        this.option.yAxis.axisLabel.textStyle.color = 'black';
        this.option.series[0].color = 'black';
        this.option.series[0].lineStyle.color = 'black';
        this.option.dataZoom.backgroundColor = 'white';
        this.option.dataZoom.handleColor = 'black';
        this.option.dataZoom.textStyle.color = 'black';
        this.option.dataZoom.dataBackground.areaStyle.color = 'black';
        this.option.yAxis.splitLine.lineStyle.color = 'gray';
      }

      if (theme === 'dark'){
        this.option.xAxis.axisLine.lineStyle.color = 'white';
        this.option.xAxis.axisLabel.textStyle.color = 'white';
        this.option.yAxis.axisLabel.textStyle.color = 'white';
        this.option.series[0].color = 'white';
        this.option.series[0].lineStyle.color = 'white';
        this.option.dataZoom.backgroundColor = 'black';
        this.option.dataZoom.handleColor = 'white';
        this.option.dataZoom.textStyle.color = 'white';
        this.option.dataZoom.dataBackground.areaStyle.color = 'white';
        this.option.yAxis.splitLine.lineStyle.color = '#C6EEF2';


      }
      this.option = JSON.parse(JSON.stringify(this.option))
    }

  },

  watch: {
    startDate() {
      if (this.startDate && this.endDate)
        this.showData();
    },

    endDate() {
      if (this.startDate && this.endDate)
        this.showData();
    },

    long(){
      if (this.startDate && this.endDate)
        this.showData();
    },

    lang(){
      if (this.startDate && this.endDate)
        this.showData();
    }
  },

  mounted() {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes") {
          this.updateTheme();
        }
      });
    });
    observer.observe(document.getElementsByTagName("html")[0], {
      attributes: true,
    });
  }


};

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
  padding-left: 3em;
}

</style>