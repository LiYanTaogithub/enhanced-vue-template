<template>
  <div ref="line" class="line-echarts" :style="styleSet" />
</template>
<script>
export default {
  name: 'LineEcharts',
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
    AxisData:{
      type: Array,
      default: () => []
    },
    legendData:{
      type: Array,
      default: () => []
    },
  },
  data() {
    return {
      mychart: null,
    }
  },
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      this.mychart = this.echarts.init(this.$refs.line)
      console.log("🚀 ~ file: line.vue ~ line 42 ~ initEcharts ~ this.mychart", this.mychart)
      // 监听屏幕变化自动缩放图表
      window.addEventListener('resize', () => {
        this.mychart.resize()
      })
      const option = {
        title: {
          left: 'center',
          text: this.title
        },
        legend: {
          type: 'scroll',
          show: true,
          data: this.legendData,
          x: "center",
          y: "bottom"
        },
        xAxis: {
          type: 'category',
          data: this.AxisData,
        },
        yAxis: {
          type: 'value'
        },
        grid:{
          left:'8%',
          right:'0',
          bottom:'20%',
          containLabel:true
        },
        tooltip: {
          trigger: 'axis'
        },
        series: this.echartsData
      }
      this.mychart.setOption(option, true)
    },
    
  }
}
</script>
