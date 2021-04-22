<template>
  <div class="diagram-container">

    <el-date-picker
        v-model="dateRangeValue"
        type="daterange"
        range-separator="~"
        start-placeholder="Start date"
        end-placeholder="End date">
    </el-date-picker>

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
      dateRangeValue: null,

      option: {
        grid: {
          top:10,
          right:10,
          left:50,
          bottom:100
        },
        tooltip: {
            trigger: 'axis',
            formatter: 'Tere {b0} TODO lisa sunrise ja sunset ja day length'
        },
        dataZoom:{
          type:'slider',
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
        dates.push(`${date.getDay()}.${date.getMonth()+1}.${date.getFullYear()}`)
        date.setDate(new Date(date).getDate() + 1);
        vals.push(Math.floor(Math.random() * 100) + 5)
      }

      console.log(dates)
      this.option.series[0].data = vals;
      this.option.xAxis.data = dates;
      this.option = JSON.parse(JSON.stringify(this.option))
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

</style>