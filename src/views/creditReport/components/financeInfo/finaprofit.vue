<template>
  <div>
    <div class="page1">
      <div>
        <h3>盈利能力</h3>
        <table>
          <tr>
            <th colspan="2">项目</th>
            <th v-for="item in zyywlrlData" :key="item.id">{{ item.year }}</th>
          </tr>
          <tr v-for="(item, index) in zyywlrlMap" :key="item.id + 'a1'">
            <td v-if="index === 0" :rowspan="zyywlrlMap.length">
              主营业务利润率
            </td>
            <td>{{ zyywlrlMap[index].value }}</td>
            <td v-for="d in zyywlrlData" :key="d.id + d.year">
              {{
                d[zyywlrlMap[index].key] !== null
                  ? d[zyywlrlMap[index].key] + "%"
                  : "-"
              }}
            </td>
          </tr>
          <tr v-for="(item, index) in zyywlrlMap" :key="item.id + 'b1'">
            <td v-if="index === 0" :rowspan="zyywlrlMap.length">
              净资产收益率
            </td>
            <td>{{ zyywlrlMap[index].value }}</td>
            <td v-for="d in jzcsyData" :key="d.id + d.year">
              {{
                d[zyywlrlMap[index].key] !== null
                  ? d[zyywlrlMap[index].key] + "%"
                  : "-"
              }}
            </td>
          </tr>
        </table>
      </div>
      <!-- 主营业务利润率 -->
      <Echarts
        ref="MainprofitRate"
        :elem="name7"
        :styleSet="boxStyle2"
        :tableData="MainprofitRateData"
      ></Echarts>
    </div>
    <div class="page1">
      <!-- 净资产收益率 -->
      <Echarts
        ref="ReturnOnNetAssets"
        :elem="name8"
        :styleSet="boxStyle2"
        :tableData="ReturnOnNetAssetsData"
      ></Echarts>
    </div>
    <div class="page1">
      <div>
        <h3>运营能力</h3>
        <table>
          <tr>
            <th colspan="2">项目</th>
            <th v-for="item in yszkzzlData" :key="item.id">{{ item.year }}</th>
          </tr>
          <tr v-for="(item, index) in zyywlrlMap" :key="item.id + 'c1'">
            <td v-if="index === 0" :rowspan="zyywlrlMap.length">
              应收帐款周转率
            </td>
            <td>{{ zyywlrlMap[index].value }}</td>
            <td v-for="d in yszkzzlData" :key="d.id + d.year">
              {{
                d[zyywlrlMap[index].key] !== null
                  ? d[zyywlrlMap[index].key] + "%"
                  : "-"
              }}
            </td>
          </tr>
        </table>
      </div>
      <Echarts
        ref="AccountsReceivable"
        :elem="name9"
        :styleSet="boxStyle"
        :tableData="AccountsReceivableData"
      ></Echarts>
    </div>
    <div class="page1">
      <div>
        <h3>债务压力</h3>
        <table>
          <tr>
            <th colspan="2">项目</th>
            <th v-for="item in zcfzlData" :key="item.id">{{ item.year }}</th>
          </tr>
          <tr v-for="(item, index) in zyywlrlMap" :key="item.id + 'd1'">
            <td v-if="index === 0" :rowspan="zyywlrlMap.length">资产负债率</td>
            <td>{{ zyywlrlMap[index].value }}</td>
            <td v-for="d in zcfzlData" :key="d.id + d.year">
              {{
                d[zyywlrlMap[index].key] !== null
                  ? d[zyywlrlMap[index].key] + "%"
                  : "-"
              }}
            </td>
          </tr>
          <tr v-for="(item, index) in zyywlrlMap" :key="item.id + 'e1'">
            <td v-if="index === 0" :rowspan="zyywlrlMap.length">速动比率</td>
            <td>{{ zyywlrlMap[index].value }}</td>
            <td v-for="d in sdblData" :key="d.id + d.year">
              {{
                d[zyywlrlMap[index].key] !== null
                  ? d[zyywlrlMap[index].key] + "%"
                  : "-"
              }}
            </td>
          </tr>
        </table>
      </div>
      <Echarts
        ref="AssetLiabilityRatio"
        :elem="name10"
        :styleSet="boxStyle2"
        :tableData="AssetLiabilityRatioData"
      ></Echarts>
    </div>
    <div class="page1">
      <!-- 速动比率 -->
      <Echarts
        ref="QuickRatio"
        :elem="name11"
        :styleSet="boxStyle2"
        :tableData="QuickRatioData"
      ></Echarts>
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
      zyywlrlData: [],
      jzcsyData: [],
      yszkzzlData: [],
      sdblData: [],
      zcfzlData: [],
      zyywlrlMap: [
        { id: "entValue", key: "entValue", value: "企业值" },
        { id: "yx", key: "yx", value: "行业优秀值" },
        { id: "lh", key: "lh", value: "行业良好值" },
        { id: "avg", key: "avg", value: "行业平均值" },
        { id: "jd", key: "jd", value: "行业较差值" },
        { id: "jc", key: "jc", value: "行业极差值" },
      ],
      boxStyle: {
        width: "100%",
        height: "350px",
        margin: "50px auto",
      },
      boxStyle2: {
        width: "100%",
        height: "300px",
        margin: "30px auto",
      },
      name7: "MainprofitRate",
      name8: "ReturnOnNetAssets",
      name9: "AccountsReceivable",
      name10: "AssetLiabilityRatio",
      name11: "QuickRatio",
      MainprofitRateData: {},
      ReturnOnNetAssetsData: {},
      AccountsReceivableData: {},
      AssetLiabilityRatioData: {},
      QuickRatioData: {},
    };
  },
  watch: {
    reportData: {
      deep: true,
      handler() {
        this.initData();
      },
    },
  },
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      // 盈利能力
      if (
        this.reportData.financeMap &&
        this.reportData.financeMap.zyywlrlList
      ) {
        this.zyywlrlData = this.reportData.financeMap.zyywlrlList;
        this.MainprofitRateData = this.makeLineEchartData(
          this.reportData.financeMap.zyywlrlList,
          "主营业务利润率"
        );
      }

      if (this.reportData.financeMap && this.reportData.financeMap.jzcsylList) {
        this.jzcsyData = this.reportData.financeMap.jzcsylList;
        this.ReturnOnNetAssetsData = this.makeLineEchartData(
          this.reportData.financeMap.jzcsylList,
          "净资产收益率"
        );
      }

      // 运营能力
      if (
        this.reportData.financeMap &&
        this.reportData.financeMap.yszkzzlList
      ) {
        this.yszkzzlData = this.reportData.financeMap.yszkzzlList;
        this.AccountsReceivableData = this.makeLineEchartData(
          this.reportData.financeMap.yszkzzlList,
          "应收帐款周转率"
        );
      }

      // 债务压力

      if (this.reportData.financeMap && this.reportData.financeMap.zcfzlList) {
        this.zcfzlData = this.reportData.financeMap.zcfzlList;
        this.AssetLiabilityRatioData = this.makeLineEchartData(
          this.reportData.financeMap.zcfzlList,
          "资产负债率"
        );
      }
      if (this.reportData.financeMap && this.reportData.financeMap.sdblList) {
        this.sdblData = this.reportData.financeMap.sdblList;
        this.QuickRatioData = this.makeLineEchartData(
          this.reportData.financeMap.sdblList,
          "速动比率"
        );
      }
    },
    makeLineEchartData(originData, paramName) {
      let xAxisData = [];
      let seriesData = [[], [], [], [], [], []];
      let legendData = this.zyywlrlMap.map((item) => {
        return paramName + " " + item.value;
      });

      if (!originData) return {};

      originData.forEach((item) => {
        // x 轴
        xAxisData.push(item.year);
        this.zyywlrlMap.forEach((d, index) => {
          // 数据系列
          seriesData[index].push(item[d.key] !== null ? item[d.key] : 0);
        });
      });

      return {
        title: {
          text: paramName,
          left: "center",
          top: 5,
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            crossStyle: {
              color: "#999",
            },
          },
        },
        legend: {
          bottom: 0,
          itemWidth: 40,
          itemHeight: 6,
          data: legendData,
        },
        grid: {
          y2: 80,
        },
        xAxis: [
          {
            type: "category",
            data: xAxisData,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            axisLabel: {
              formatter: "{value}%",
            },
          },
        ],
        series: [
          {
            name: legendData[0],
            type: "line",
            itemStyle: {
              normal: {
                color: "#166aac",
              },
            },
            symbolSize: 0,
            data: seriesData[0],
          },
          {
            name: legendData[1],
            type: "line",
            lineStyle: {
              width: 2,
              type: "dotted",
            },
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "#ff9800",
              },
            },
            data: seriesData[1],
          },
          {
            name: legendData[2],
            type: "line",
            lineStyle: {
              width: 2,
              type: "dotted",
            },
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "#a6a6a6",
              },
            },
            data: seriesData[2],
          },
          {
            name: legendData[3],
            type: "line",
            lineStyle: {
              width: 2,
              type: "dotted",
            },
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "#ffc107",
              },
            },
            data: seriesData[3],
          },
          {
            name: legendData[4],
            type: "line",
            lineStyle: {
              width: 2,
              type: "dotted",
            },
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "#52b1fc",
              },
            },
            data: seriesData[4],
          },
          {
            name: legendData[5],
            type: "line",
            lineStyle: {
              width: 2,
              type: "dotted",
            },
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "#8bc34a",
              },
            },
            data: seriesData[5],
          },
        ],
      };
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
