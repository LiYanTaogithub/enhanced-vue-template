<template>
  <div :id="elem" :style="styleSet"></div>
</template>

<script>
export default {
  name: "echarts2",
  props: ["tableData", "elem", "styleSet"],
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.drawLine(this.elem);
  },
  watch: {
    tableData: {
      deep: true,
      handler(val) {
        this.chart.setOption(val);
      },
    },
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    drawLine(el) {
      // 基于准备好的dom，初始化echarts实例
      this.chart = this.echarts.init(document.getElementById(el));
      // 绘制图表
      this.chart.setOption(this.tableData);
    },
  },
};
</script>
<style>
#myChar,
#myBar,
#myBars,
#annular {
  background: #fff;
}
</style>
