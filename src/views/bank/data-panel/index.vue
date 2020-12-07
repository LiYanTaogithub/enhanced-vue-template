<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">数据面板</div>
    </div>
    <el-row :gutter="20">
      <el-col :span="14">
        <div class="leftContainer">
          <div class="title">
            <div class="box" />
            <div class="text">统计数据</div>
          </div>
          <div class="statisticDataList">
            <div
              v-for="(item, index) in statisticData"
              :key="index"
              class="list-item"
              :style="{ background: colorList[index] }"
            >
              <div
                style="
                  margin-bottom: 5px;
                  color: #fff;
                  font-weight: bold;
                  font-size: 20px;
                "
              >
                {{ item.count }}
              </div>
              <div style="width: 70px; font-weight: bold; font-size: 15px">
                {{ item.type }}
              </div>
            </div>
          </div>
          <div>
            <el-table
              :data="tableData"
              border
              class="table"
              show-summary
              style="width: 100%; height: 410px; margin-top: 20px"
            >
              <el-table-column prop="id" label="风险预警大类" width="180" />
              <el-table-column prop="amount1" label="总体预警数量" />
              <el-table-column prop="amount2" label="当前预警信息数量" />
            </el-table>
          </div>
        </div>
      </el-col>
      <el-col :span="10">
        <div class="rightContainer">
          <div class="title">
            <div class="box" />
            <div class="text">贷款产品趋势图</div>
          </div>
          <div>
            <line-echarts
              v-if="browseTrendChart.length > 0"
              :echarts-data="browseTrendChart"
              :style-set="lineStyle1"
              :title="echartsTitle1"
              :AxisData="browseTrendAxis"
              :legendData="browseTrendLegend"
            />
            <line-echarts
              v-if="applyTrendChart.length > 0"
              :echarts-data="applyTrendChart"
              :style-set="lineStyle2"
              :title="echartsTitle2"
              :AxisData="applyTrendAxis"
              :legendData="applyTrendLegend"
            />
          </div>
          <div class="title">
            <div class="box" />
            <div class="text">平台信用排行榜</div>
          </div>
          <div>
            <el-table
              :data="creditRankList"
              border
              style="width: 100%; margin-top: 20px"
            >
              <el-table-column prop="name" label="行业" />
              <el-table-column prop="score" label="行业信用指数" />
            </el-table>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="10">
        <div class="leftContainer">
          <div class="title">
            <div class="box" />
            <div class="text">贷款变化趋势统计图</div>
          </div>
          <el-tabs v-model="activeName" @tab-click="onTabClick">
            <el-tab-pane label="企业数量" name="1">
              <bar-echarts
                ref="bar1"
                v-if="cumulativeLoanA.length > 0"
                :echarts-data="cumulativeLoanA"
                :style-set="barStyle"
                :title="barTitle1"
                :legendData="cumulativeLoanALegend"
                :AxisData="cumulativeLoanAxis"
              />
              <bar-echarts
                ref="bar2"
                v-if="currentLoanA.length > 0"
                :echarts-data="currentLoanA"
                :style-set="barStyle"
                :title="barTitle2"
                :legendData="currentLoanLegend"
                :AxisData="currentLoanAxis"
              />
            </el-tab-pane>
            <el-tab-pane label="授信金额" name="2">
              <bar-echarts
                ref="bar3"
                v-if="cumulativeLoanB.length > 0"
                :echarts-data="cumulativeLoanB"
                :style-set="barStyle"
                :title="barTitle1"
                :legendData="cumulativeLoanBLegend"
                :AxisData="cumulativeLoanAxisB"
              />
              <bar-echarts
                ref="bar4"
                v-if="currentLoanB.length > 0"
                :echarts-data="currentLoanB"
                :style-set="barStyle"
                :title="barTitle2"
                :legendData="currentLoanLegendB"
                :AxisData="currentLoanAxisB"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="rightContainer">
          <div class="title">
            <div class="box" />
            <div class="text">贷款分布统计图</div>
          </div>
          <el-tabs v-model="active2Name" @tab-click="onTab2Click">
            <el-tab-pane label="企业数量" name="1">
              <pie-echarts
                ref="pie1"
                v-if="loanDistributionIndustryA.length > 0"
                :echarts-data="loanDistributionIndustryA"
                :style-set="pieStyle"
                :title="pieTitle1"
                :legendData="pieIndustryLegend"
              />
              <pie-echarts
                ref="pie2"
                v-if="loanDistributionRegionalA.length > 0"
                :echarts-data="loanDistributionRegionalA"
                :style-set="pieStyle"
                :title="pieTitle2"
                :legendData="pieRegionLegend"
              />
            </el-tab-pane>
            <el-tab-pane label="授信金额" name="2">
              <pie-echarts
                ref="pie3"
                v-if="loanDistributionIndustryB.length > 0"
                :echarts-data="loanDistributionIndustryB"
                :style-set="pieStyle"
                :title="pieTitle1"
                :legendData="pieIndustryLegendB"
              />
              <pie-echarts
                ref="pie4"
                v-if="loanDistributionRegionalB.length > 0"
                :echarts-data="loanDistributionRegionalB"
                :style-set="pieStyle"
                :title="pieTitle2"
                :legendData="pieRegionLegendB"
              />
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import lineEcharts from "@/components/Bank/data-panel/line";
import barEcharts from "@/components/Bank/data-panel/bar";
import pieEcharts from "@/components/Bank/data-panel/pie";

import { getdataPanal } from "@/api/bank/index.js";
export default {
  components: {
    lineEcharts,
    barEcharts,
    pieEcharts,
  },
  data() {
    return {
      activeName: "1",
      active2Name: "1",
      colorList: [
        "#c7eb71",
        "#6eee99",
        "#65d4cd",
        "#77b1fa",
        "#bd7bff",
        "#ff7bc6",
        "#ff977c",
        "#f89956",
      ],
      statisticData: [],

      tableData: [],
      lineStyle1: {
        width: "100%",
        height: "200px",
        marginBottom: "20px",
      },
      lineStyle2: {
        width: "100%",
        height: "200px",
      },
      // 贷款产品申请趋势图
      applyTrendChart: [],
      applyTrendAxis: [],
      applyTrendLegend: [],
      // 贷款产品浏览趋势图
      browseTrendChart: [],
      browseTrendAxis: [],
      browseTrendLegend: [],
      // 排行榜
      creditRankList: [],
      echartsTitle1: "产品浏览趋势",
      echartsTitle2: "产品申请趋势",
      // 累计贷款企业数量
      cumulativeLoanA: [],
      // 累计贷款金额
      cumulativeLoanB: [],
      cumulativeLoanAxis: [],
      cumulativeLoanAxisB: [],
      cumulativeLoanALegend: [],
      cumulativeLoanBLegend: [],
      // 当前贷款变化趋势（企业数量）
      currentLoanA: [],
      currentLoanB: [],
      currentLoanLegend: [],
      currentLoanLegendB: [],
      currentLoanAxis: [],
      currentLoanAxisB: [],
      barTitle1: "累计贷款变化趋势",
      barTitle2: "当前贷款变化趋势",
      barStyle: {
        width: "100%",
        height: "250px",
        marginBottom: "20px",
      },
      pieTitle1: "贷款行业分布",
      pieTitle2: "贷款地域分布",
      // 贷款行业分布统计图(企业数量)
      loanDistributionIndustryA: [],
      loanDistributionIndustryB: [],
      pieIndustryLegend: [],
      pieIndustryLegendB: [],
      // 贷款地域分布统计图(企业数量)
      loanDistributionRegionalA: [],
      loanDistributionRegionalB: [],
      pieRegionLegend: [],
      pieRegionLegendB: [],
      pieStyle: {
        width: "100%",
        height: "250px",
        marginBottom: "20px",
      },
    };
  },
  created() {
    this.getPanalData();
  },
  methods: {
    // index() {
    //   this.$router.paras
    // }
    async onTabClick() {
      if (this.activeName === "1") {
        await this.$nextTick();
        this.$refs.bar1.mychart.resize();
        this.$refs.bar2.mychart.resize();
      } else {
        await this.$nextTick();
        this.$refs.bar3.mychart.resize();
        this.$refs.bar4.mychart.resize();
      }
    },
    async onTab2Click() {
      if (this.active2Name === "1") {
        await this.$nextTick();
        this.$refs.pie1.mychart.resize();
        this.$refs.pie2.mychart.resize();
      } else {
        await this.$nextTick();
        this.$refs.pie3.mychart.resize();
        this.$refs.pie4.mychart.resize();
      }
    },
    async getPanalData() {
      const res = await getdataPanal();
      const {
        applyTrendChart,
        browseTrendChart,
        cumulativeLoanA,
        cumulativeLoanB,
        currentLoanA,
        currentLoanB,
        loanDistributionIndustryA,
        loanDistributionIndustryB,
        loanDistributionRegionalA,
        loanDistributionRegionalB,
        creditRankList,
        indexStatisticsData,
      } = res.data;
      this.applyTrendChart = applyTrendChart.productTrendChart.charts;
      this.applyTrendAxis = applyTrendChart.productTrendChart.horizontalAxis;
      this.applyTrendChart.map((item) => {
        return this.applyTrendLegend.push(item.name);
      });
      this.browseTrendChart = browseTrendChart.productTrendChart.charts;
      this.browseTrendAxis = browseTrendChart.productTrendChart.horizontalAxis;
      this.browseTrendChart.map((item) => {
        return this.browseTrendLegend.push(item.name);
      });
      this.cumulativeLoanA = cumulativeLoanA.charts;
      this.cumulativeLoanB = cumulativeLoanB.charts;
      this.cumulativeLoanAxis = cumulativeLoanA.horizontalAxis;
      this.cumulativeLoanAxisB = cumulativeLoanB.horizontalAxis;
      this.cumulativeLoanA.map((item) => {
        return this.cumulativeLoanALegend.push(item.name);
      });
      this.cumulativeLoanB.map((item) => {
        return this.cumulativeLoanBLegend.push(item.name);
      });
      this.currentLoanA = currentLoanA.charts;
      this.currentLoanB = currentLoanB.charts;
      this.currentLoanAxis = currentLoanA.horizontalAxis;
      this.currentLoanAxisB = currentLoanB.horizontalAxis;
      this.currentLoanA.map((item) => {
        this.currentLoanLegend.push(item.name);
      });
      this.currentLoanB.map((item) => {
        this.currentLoanLegendB.push(item.name);
      });
      this.loanDistributionIndustryA = loanDistributionIndustryA.list;
      this.loanDistributionIndustryB = loanDistributionIndustryB.list;
      this.loanDistributionIndustryA.map((item) =>
        this.pieIndustryLegend.push(item.name)
      );
      this.loanDistributionIndustryB.map((item) =>
        this.pieIndustryLegendB.push(item.name)
      );
      this.loanDistributionRegionalA = loanDistributionRegionalA.list;
      this.loanDistributionRegionalB = loanDistributionRegionalB.list;
      this.loanDistributionRegionalA.map((item) => {
        return this.pieRegionLegend.push(item.name);
      });
      this.loanDistributionRegionalB.map((item) => {
        return this.pieRegionLegendB.push(item.name);
      });
      this.creditRankList = creditRankList.rankList;
      this.statisticData = indexStatisticsData.indexStatisticsDataOne;
      this.tableData = indexStatisticsData.indexStatisticsDataTwo;
      // console.log("产品浏览趋势图：", this.browseTrendChart);
      // console.log(this.browseTrendLegend);
      // console.log(this.browseTrendAxis);
      // console.log("产品申请趋势图：", this.applyTrendChart);
      // console.log(this.applyTrendLegend);
      // console.log(this.applyTrendAxis);
      // console.log("当前贷款变化趋势图：", this.currentLoanA);
      // console.log(this.currentLoanLegend);
      // console.log(this.currentLoanAxis);
      // console.log("累计贷款变化趋势图：", this.cumulativeLoanA);
      // console.log(this.cumulativeLoanALegend);
      // console.log(this.cumulativeLoanAxis);
      // console.log("贷款行业分布", this.loanDistributionIndustryA);
      // console.log("贷款地域分布", this.loanDistributionRegionalA);
    },
  },
};
</script>
<style lang="scss" scoped>
.modelContainer {
  //   width: 100%;
  height: 100%;
  margin: 10px;
  padding: 30px;
  background: #fff;
}

.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .box {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: #057af3;
  }
  .text {
    display: inline-block;
  }
}
.leftContainer {
  margin-left: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 20px;
  // border: 1px #898787 solid;
  box-shadow: 0 0 20px 0 hsla(0, 0%, 51%, 0.2);
  .title {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .box {
      display: inline-block;
      width: 5px;
      height: 20px;
      margin-right: 10px;
      background: #057af3;
    }
    .text {
      display: inline-block;
      font-weight: bold;
      font-size: 18px;
    }
  }
  .statisticDataList {
    display: flex;
    justify-content: space-around;
    width: 100%;
    height: 100px;
    margin-top: 50px;
    margin-bottom: 120px;
    .list-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 12%;
      height: 0;
      padding: 6%;
      text-align: center;
      background: #057af3;
      border: #eee solid 10px;
      border-radius: 50%;
      box-shadow: #898787;
    }
  }

  /* 分辨率低于1280，采用下面的样式 */

  // @media screen and (min-device-width: 1700px) {
  //   .statisticDataList {
  //     display: flex;
  //     justify-content: space-around;
  //     width: 100%;
  //     height: 100px;
  //     margin-top: 50px;
  //     margin-bottom: 100px;
  //     .list-item {
  //       display: flex;
  //       flex-direction: column;
  //       align-items: center;
  //       justify-content: center;
  //       width: 120px;
  //       height: 120px;
  //       text-align: center;
  //       background: #057af3;
  //       border: #eee solid 10px;
  //       border-radius: 50%;
  //       box-shadow: #898787;
  //     }
  //   }
  // }
}

/* 分辨率高于1440，采用下面的样式 */
// @media screen and (min-device-width: 1500px) {
//   .statisticDataList {
//     display: flex;
//     justify-content: space-around;
//     width: 100%;
//     height: 100px;
//     margin-top: 50px;
//     margin-bottom: 100px;
//     .list-item {
//       display: flex;
//       flex-direction: column;
//       align-items: center;
//       justify-content: center;
//       width: 100px;
//       height: 100px;
//       text-align: center;
//       background: #057af3;
//       border: #eee solid 10px;
//       border-radius: 50%;
//       box-shadow: #898787;
//     }
//   }
// }
.rightContainer {
  margin-bottom: 20px;
  padding-top: 20px;
  padding-right: 20px;
  padding-bottom: 30px;
  padding-left: 20px;
  // border: 1px #898787 solid;
  box-shadow: 0 0 20px 0 hsla(0, 0%, 51%, 0.2);
  .title {
    display: flex;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
    .box {
      display: inline-block;
      width: 5px;
      height: 20px;
      margin-right: 10px;
      background: #057af3;
    }
    .text {
      display: inline-block;
      font-weight: bold;
      font-size: 18px;
    }
  }
}
.table ::v-deep .el-table__row {
  height: 70px;
}
.tabbar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tabbarItem {
  width: 40px;
  height: 10px;
  margin: 5px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
