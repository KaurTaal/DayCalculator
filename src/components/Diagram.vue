<template>
  <div class="diagram-container">

    <div class="header-container">

      <div class="range-container">

        <div class="start-date">
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
                  label="Start date"
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

        <div class="end-date">
          <v-menu
              ref="menu2"
              v-model="menu2"
              :close-on-content-click="false"
              :return-value.sync="date2"
              transition="scale-transition"
              offset-y
              min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="date2"
                  label="End date"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                  color="green"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="date2"
                no-title
                scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="error"
                  @click="menu2 = false"
              >
                Cancel
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.menu2.save(date2)"
              >
                OK
              </v-btn>
            </v-date-picker>
          </v-menu>
        </div>

      </div>


      <div>
        Excel export?
      </div>
    </div>

      <button @click="dummyData" style="background-color: lightblue">Results</button>

    <v-chart
        autoresize
        :option="option"
    ></v-chart>
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts";

export default {
  name: "diagram",

  components: {"v-chart": ECharts},

  data() {
    return {
      date: null,
      menu: false,
      modal: false,
      date2: null,
      menu2: false,
      modal2: false,


      option: {
        grid: {
          top: 10,
          right: 10,
          left: 50,
          bottom: 100
        },
        tooltip: {
          trigger: 'axis',
          formatter: 'Tere {b0} TODO lisa sunrise ja sunset ja day length'
        },
        dataZoom: {
          type: 'slider',
          filterMode: "weakFilter",
        },
        xAxis: {
          data: [],
        },
        yAxis: {},
        series: [{
          name: "Length of day",
          type: "line",
          data: [],
          smooth: true,
        }],
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
    dummyData() {
      let dates = [];
      const vals = [];

      for (let i = 0; i < 30; i++) {
        dates = this.getDatePeriod(this.date, this.date2);
        vals.push(Math.floor(Math.random() * 100) + 5)
      }

      console.log(dates)
      this.option.series[0].data = vals;
      this.option.xAxis.data = dates;
      this.option = JSON.parse(JSON.stringify(this.option))
    },


    getDatePeriod(startDate, endDate){
      let dates = [];
      let start = this.convertDate(startDate);
      const end = this.convertDate(endDate);
      while (start <= end){
        const date = new Date(start);
        dates.push(`${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`);
        start.setDate(start.getDate()+1)
      }
      return dates;
    },


    convertDate(date){
      if (date !== null) {
        const help = date.split("-");
        const year = help[0];
        const month = help[1];
        const day = help[2];
        return new Date(year, month - 1, day);
      }
    }

  },




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
}

</style>