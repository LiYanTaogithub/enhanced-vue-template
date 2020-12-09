<template>
  <div ref="bar" class="bar-echarts" :style="styleSet" />
</template>
<script>
export default {
  name: 'BarEcharts',
  props: {
    styleSet: {
      type: Object,
      default: () => {}
    },
    title: {
      type: String,
      default: '标题'
    },
    echartsData: {
      type: Array,
      default: () => []
    },
    legendData: {
      type: Array,
      default: () => []
    },
    AxisData:{
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      mychart: null
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      this.mychart = this.echarts.init(this.$refs.bar)
      // 监听屏幕变化自动缩放图表
      window.addEventListener('resize', () => {
        this.mychart.resize()
      })
      const option = {
        title: {
          left: 'center',
          text: this.title
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: this.AxisData,
        },
        yAxis: {
          type: 'value'
        },
        legend: {
           x: "center",
           y: "bottom",
          show: true,
          data: this.legendData
        },
        // grid: [
        //     {bottom: '80%'},
        //     {top: '80%'},
        //     {left: "1%"}
        // ],
        series: this.echartsData
      }
      this.mychart.setOption(option, true)
    }
  }
}
</script>
