<template>
  <div>
    <div class="page1">
      <h2>1. 整体情况</h2>
      <Echarts
        ref="overall"
        elem="overall"
        :styleSet="boxStyle"
        :tableData="overallData"
      />
      <p>企业信用指数: {{ leidatu.XYFZ ? leidatu.XYFZ : "" }}</p>
      <p>企业风险指数: {{ fxzs }}</p>
      <p>企业情况概述:</p>
    </div>
  </div>
</template>

<script>
import Echarts from "@/components/commons/echar2";
export default {
  components: { Echarts },
  props: ["reportData"],
  data() {
    return {
      leidatu: {},
      fxzs: "",
      boxStyle: {
        width: "100%",
        height: "500px",
        margin: "50px auto",
      },
      overallData: {},
    };
  },
  computed: {},
  watch: {
    reportData: {
      deep: true,
      handler() {
        this.initData();
      },
    },
  },
  created() {},
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      let leidatu = this.reportData.leidatu;
      if (leidatu && leidatu[0]) {
        this.leidatu = leidatu[0];
        this.overallData = this.makeLerdatu(leidatu[0]);
      }

      let fxzs = this.reportData.fxzs;
      if (fxzs && fxzs[0]) {
        this.fxzs = fxzs[0].dhjcpf;
      }
    },
    makeLerdatu(letdatu) {
      let option = {
        title: {
          text: "企业信用画像",
          left: "center",
        },
        tooltip: {},
        grid: {
          top: 30,
          bottom: 30,
        },
        radar: {
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "授信价值描述", max: 100 },
            { name: "行业发展与企业定位评分", max: 100 },
            { name: "财务信息评分", max: 100 },
            { name: "纳税综合评分", max: 100 },
            { name: "管理运营评分", max: 100 },
            { name: "实际控制人评分", max: 100 },
          ],
        },
        series: [
          {
            name: "企业画像",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [
                  letdatu.SXJZMS ? letdatu.SXJZMS : 0,
                  letdatu.HYPF ? letdatu.HYPF : 0,
                  letdatu.CWPF ? letdatu.CWPF : 0,
                  letdatu.NSZHPF ? letdatu.NSZHPF : 0,
                  letdatu.GLYYPF ? letdatu.GLYYPF : 0,
                  letdatu.SJKZRPF ? letdatu.SJKZRPF : 0,
                ],
                name: "企业信用画像",
              },
            ],
          },
        ],
      };
      return option;
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
