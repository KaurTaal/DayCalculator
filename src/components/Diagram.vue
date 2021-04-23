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

    <button @click="dummyData" style="background-color: lime">Test</button>

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
          data: ["Date1", "Date2", "Date3", "Date4", "Date5", "Date6"]
        },
        yAxis: {},
        series: [{
          name: "Length of day",
          type: "line",
          data: [1, 2, 3, 4, 6, 7, 8, 9, 10, 11, 12],
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
      const dates = [];
      const vals = [];

      const date = new Date();
      for (let i = 0; i < 30; i++) {
        dates.push(`${date.getDay()}.${date.getMonth() + 1}.${date.getFullYear()}`)
        date.setDate(new Date(date).getDate() + 1);
        vals.push(Math.floor(Math.random() * 100) + 5)
      }

      console.log(dates)
      this.option.series[0].data = vals;
      this.option.xAxis.data = dates;
      this.option = JSON.parse(JSON.stringify(this.option))
    },


    getPeriod(startDate, endDate) {
      const start = startDate < endDate ? startDate : endDate;
      console.log(start);
    }

  },

  watch: {
    date(){
      if (this.date2 !== null)
        this.getPeriod(this.date, this.date2)
    },
    date2(){
      if (this.date !== null)
        this.getPeriod(this.date, this.date2)
    }
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

.range-container{
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