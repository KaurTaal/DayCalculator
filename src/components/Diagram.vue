<template>
  <v-chart
      autoresize
      :option="option"
  ></v-chart>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts";

export default {
  name: "diagram",

  components: {"v-chart": ECharts},

  data() {
    return {
      option: {
        legend: {
          data: ["Length of day"]
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
        lineStyle:{
          color: 'black'
        },
        stateAnimation:{
          duration: 300,
          easing: 'cubicOut'
        },
      }
    }
  },
  methods: {
    dummy() {
      this.option.series[0].data = [];
      this.option = JSON.parse(JSON.stringify(this.option))
    }

  },

};
</script>

<style scoped>


</style>