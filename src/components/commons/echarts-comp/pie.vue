<template>
  <div ref="pie" class="pie-echarts" :style="styleSet" />
</template>
<script>
export default {
  name: 'PieEcharts',
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
      this.mychart = this.echarts.init(this.$refs.pie)
      // 监听屏幕变化自动缩放图表
      window.addEventListener('resize', function() {
        this.mychart.resize()
      })
      const option = {
        title: {
          text: this.title,
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: this.legendData
        },
        series: [
          {
            name: this.title,
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: this.echartsData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }
      this.mychart.setOption(option, true)
    }
  }
}
</script>
