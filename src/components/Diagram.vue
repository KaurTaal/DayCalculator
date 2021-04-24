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

export default {
  name: "diagram",

  components: {"v-chart": ECharts},

  data() {
    return {
      startDate: null,
      endDate: null,
      menu: false,
      modal: false,
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
        series: [
          {
            name: "Length of day",
            type: "line",
            data: [],
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
    dummyData() {
      let dates = [];
      const vals = [];

      dates = this.getDatePeriod(this.startDate, this.endDate);
      for (let i = 0; i < 30; i++) {
        vals.push(Math.floor(Math.random() * 100) + 5)
      }

      this.option.series[0].data = vals;
      this.option.xAxis.data = dates;
      this.option = JSON.parse(JSON.stringify(this.option))
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
    }
  },

  watch: {
    startDate(){
      if (this.startDate && this.endDate){
        if (this.convertDate(this.startDate) <= this.convertDate(this.endDate))
          this.dummyData();
        else {
          const help = this.startDate;
          this.startDate = this.endDate;
          this.endDate = help;
          this.dummyData();
        }
      }
    },
    endDate(){
      if (this.startDate && this.endDate){
        if (this.convertDate(this.startDate) <= this.convertDate(this.endDate))
          this.dummyData();
        else {
          const help = this.endDate;
          this.endDate = this.startDate;
          this.endDate = help;
          this.dummyData();
        }
      }
    },

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
}

</style>