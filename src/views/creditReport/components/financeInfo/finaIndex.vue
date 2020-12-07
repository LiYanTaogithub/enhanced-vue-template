<template>
  <div>
    <div class="page1">
      <div>
        <h3>4.2 财务指标分析</h3>
        <h3>营业规模</h3>
        <table>
          <tr>
            <th colspan="2">项目</th>
            <th v-for="(date, ind3) in yygmData.thdate" :key="ind3">
              {{ date }}
            </th>
          </tr>
          <tr>
            <td rowspan="2">营业收入</td>
            <td>企业</td>
            <td v-for="(t, ind3) in yygmData.thdate" :key="ind3">
              {{ yygmData.data["营业收入"][t]["value"] }}
            </td>
          </tr>
          <tr>
            <td>行业平均</td>
            <td v-for="(t, ind3) in yygmData.thdate" :key="ind3">
              {{ yygmData.data["营业收入"][t]["industryAvg"] }}
            </td>
          </tr>
          <tr>
            <td rowspan="2">净利润</td>
            <td>企业</td>
            <td v-for="(t, ind3) in yygmData.thdate" :key="ind3">
              {{ yygmData.data["净利润"][t]["value"] }}
            </td>
          </tr>
          <tr>
            <td>行业平均</td>
            <td v-for="(t, ind3) in yygmData.thdate" :key="ind3">
              {{ yygmData.data["净利润"][t]["industryAvg"] }}
            </td>
          </tr>
        </table>
        <!-- <el-container class="uls">
          <el-main>
            <el-row class="lis">
              <el-col :span="4" class="th_titles">项目</el-col>
              <el-col :span="20">
                <el-row>
                  <el-col
                    class="ths"
                    v-for="(date, ind3) in yygmData.thdate"
                    :key="ind3"
                    :span="24 / yygmData.thdate.length"
                  >
                    {{ date }}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row
              class="lis"
              v-for="(item, ind2) in Object.keys(yygmData.data)"
              :key="ind2"
            >
              <el-col :span="4" class="th_titles" v-if="item">
                <el-row>
                  <el-col :span="12" class="ths">
                    {{ item }}
                  </el-col>
                  <el-col :span="12" class="ths">
                    <el-row class="lis">企业</el-row>
                    <el-row class="lis">行业平均</el-row>
                  </el-col>
                </el-row>
              </el-col>

              <el-col :span="20">
                <el-row class="lis">
                  <el-col
                    class="ths"
                    v-for="(t, ind3) in yygmData.thdate"
                    :key="ind3"
                    :span="24 / yygmData.thdate.length"
                  >
                    <el-row>
                      <el-col
                        :span="12"
                        class="ths_w50"
                        v-if="yygmData.data[item][t]['value'] !== null"
                        >{{ yygmData.data[item][t]["value"] }}</el-col
                      >
                      <el-col :span="12" class="ths_w50" v-else>-</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="lis">
                  <el-col
                    class="ths"
                    v-for="(t, ind3) in yygmData.thdate"
                    :key="ind3"
                    :span="24 / yygmData.thdate.length"
                  >
                    <el-row>
                      <el-col
                        :span="12"
                        class="ths_w50"
                        v-if="yygmData.data[item][t]['industryAvg'] !== null"
                        >{{ yygmData.data[item][t]["industryAvg"] }}</el-col
                      >
                      <el-col :span="12" class="ths_w50" v-else>-</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
        </el-container> -->
      </div>
      <div>
        <Echarts
          ref="businessIncome"
          :elem="name3"
          :styleSet="boxStyle"
          :tableData="businessIncomeData"
        />
      </div>
      <div>
        <Echarts
          ref="NetProfit"
          :elem="name4"
          :styleSet="boxStyle"
          :tableData="NetProfitData"
        />
      </div>
    </div>
    <div class="page1">
      <div>
        <h3>成长性</h3>
        <table>
          <tr>
            <th colspan="2">项目</th>
            <th v-for="(date, ind3) in czqkData.thdate" :key="ind3">
              {{ date }}
            </th>
          </tr>
          <tr>
            <td rowspan="2">营业收入增长率</td>
            <td>企业</td>
            <td v-for="(t, ind3) in czqkData.thdate" :key="ind3">
              {{ czqkData.data["营业收入增长率"][t]["value"] }}
            </td>
          </tr>
          <tr>
            <td>行业平均</td>
            <td v-for="(t, ind3) in czqkData.thdate" :key="ind3">
              {{ czqkData.data["营业收入增长率"][t]["industryAvg"] }}
            </td>
          </tr>
          <tr>
            <td rowspan="2">净利润增长率</td>
            <td>企业</td>
            <td v-for="(t, ind3) in czqkData.thdate" :key="ind3">
              {{ czqkData.data["净利润增长率"][t]["value"] }}
            </td>
          </tr>
          <tr>
            <td>行业平均</td>
            <td v-for="(t, ind3) in czqkData.thdate" :key="ind3">
              {{ czqkData.data["净利润增长率"][t]["industryAvg"] }}
            </td>
          </tr>
        </table>
        <!-- <el-container class="uls">
          <el-main>
            <el-row class="lis">
              <el-col :span="4" class="th_titles">项目</el-col>
              <el-col :span="20">
                <el-row>
                  <el-col
                    class="ths"
                    v-for="(date, ind3) in czqkData.thdate"
                    :key="ind3"
                    :span="24 / czqkData.thdate.length"
                  >
                    {{ date }}
                  </el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row
              class="lis"
              v-for="(item, ind2) in Object.keys(czqkData.data)"
              :key="ind2"
            >
              <el-col :span="4" class="th_titles" v-if="item">
                <el-row>
                  <el-col :span="12" class="ths">
                    {{ item }}
                  </el-col>
                  <el-col :span="12" class="ths">
                    <el-row class="lis">企业</el-row>
                    <el-row class="lis">行业平均</el-row>
                  </el-col>
                </el-row>
              </el-col>

              <el-col :span="20">
                <el-row class="lis">
                  <el-col
                    class="ths"
                    v-for="(t, ind3) in czqkData.thdate"
                    :key="ind3"
                    :span="24 / czqkData.thdate.length"
                  >
                    <el-row>
                      <el-col
                        :span="12"
                        class="ths_w50"
                        v-if="czqkData.data[item][t]['value'] !== null"
                        >{{ czqkData.data[item][t]["value"] }}</el-col
                      >
                      <el-col :span="12" class="ths_w50" v-else>-</el-col>
                    </el-row>
                  </el-col>
                </el-row>
                <el-row class="lis">
                  <el-col
                    class="ths"
                    v-for="(t, ind3) in czqkData.thdate"
                    :key="ind3"
                    :span="24 / czqkData.thdate.length"
                  >
                    <el-row>
                      <el-col
                        :span="12"
                        class="ths_w50"
                        v-if="czqkData.data[item][t]['industryAvg'] !== null"
                        >{{ czqkData.data[item][t]["industryAvg"] }}</el-col
                      >
                      <el-col :span="12" class="ths_w50" v-else>-</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
        </el-container> -->
      </div>
      <!-- 营业收入规模对比 -->
      <Echarts
        ref="businessIncomeRate"
        :elem="name5"
        :styleSet="boxStyle"
        :tableData="businessIncomeRateData"
      ></Echarts>
      <!-- 净利润规模对比 -->
      <Echarts
        ref="NetProfitRate"
        :elem="name6"
        :styleSet="boxStyle"
        :tableData="NetProfitRateData"
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
      // 营业收入
      yygmData: {
        data: {},
        thdate: [],
      },
      // 成长情况
      czqkData: {
        data: {},
        thdate: [],
      },
      boxStyle: {
        width: "100%",
        height: "350px",
        margin: "50px auto",
      },
      name3: "businessIncome",
      name4: "NetProfit",
      name5: "businessIncomeRate",
      name6: "NetProfitRate",
      businessIncomeData: {},
      NetProfitData: {},
      businessIncomeRateData: {},
      NetProfitRateData: {},
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
  mounted() {},
  methods: {
    initData() {
      if (this.reportData.financeMap && this.reportData.financeMap.yygmList) {
        this.yygmData = this.testData(this.reportData.financeMap.yygmList, [
          "营业收入",
          "净利润",
        ]);
      }
      if (this.reportData.financeMap && this.reportData.financeMap.yygmList) {
        this.czqkData = this.testData(this.reportData.financeMap.yygmList, [
          "营业收入增长率",
          "净利润增长率",
        ]);
      }
    },
    testData(listdata, ledeg) {
      let thdate = [];
      let obj = {};
      listdata.forEach((item) => {
        if (ledeg.includes(item.name)) {
          thdate.push(item.date);
          if (!obj[item.name]) {
            obj[item.name] = {};
          }
          obj[item.name][item.date] = item;
        }
      });
      thdate = thdate.filter((item, i, arr) => i === arr.indexOf(item)).sort();
      let keys = Object.keys(obj);
      thdate.forEach((date) => {
        keys.forEach((key) => {
          if (!obj[key][date]) {
            obj[key][date] = {};
          }
        });
      });
      const data = {
        thdate,
        data: obj,
      };
      this.makeEchartData(data, ledeg);
      return data;
    },
    makeEchartData(orignData, ledeg) {
      if (ledeg[0] === "营业收入") {
        this.businessIncomeData = {
          title: {
            text: "营业收入规模对比",
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
            left: "100px",
            width: 500,
            itemWidth: 40,
            itemHeight: 6,
            data: ["营业收入 企业", "营业收入 行业平均"],
          },
          grid: {
            y2: 80,
          },
          xAxis: [
            {
              type: "category",
              data: orignData.thdate,
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              min: 0,
              axisLabel: {
                formatter: "{value}",
              },
            },
            {
              type: "value",
              min: 0,
              axisLabel: {
                formatter: "{value}",
              },
            },
          ],
          series: [
            {
              name: "营业收入 企业",
              type: "bar",
              itemStyle: {
                normal: {
                  color: "#166aac",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[0]][item].value
                  ? orignData.data[ledeg[0]][item].value
                  : 0;
              }),
            },
            {
              name: "营业收入 行业平均",
              type: "bar",
              itemStyle: {
                normal: {
                  color: "#ff9800",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[0]][item].industryAvg
                  ? orignData.data[ledeg[0]][item].industryAvg
                  : 0;
              }),
            },
          ],
        };
        this.NetProfitData = {
          title: {
            text: "净利润规模对比",
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
            left: "100px",
            width: 500,
            itemWidth: 40,
            itemHeight: 6,
            data: ["营业收入 企业", "营业收入 行业平均"],
          },
          grid: {
            y2: 80,
          },
          xAxis: [
            {
              type: "category",
              data: orignData.thdate,
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              min: 0,
              axisLabel: {
                formatter: "{value}",
              },
            },
            {
              type: "value",
              min: 0,
              axisLabel: {
                formatter: "{value}",
              },
            },
          ],
          series: [
            {
              name: "营业收入 企业",
              type: "bar",
              itemStyle: {
                normal: {
                  color: "#166aac",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[1]][item].value
                  ? orignData.data[ledeg[1]][item].value
                  : 0;
              }),
            },
            {
              name: "营业收入 行业平均",
              type: "bar",
              itemStyle: {
                normal: {
                  color: "#ff9800",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[1]][item].industryAvg
                  ? orignData.data[ledeg[1]][item].industryAvg
                  : 0;
              }),
            },
          ],
        };
      } else if (ledeg[0] === "营业收入增长率") {
        this.businessIncomeRateData = {
          title: {
            text: "营业收入增长率对比",
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
            left: "100px",
            width: 500,
            itemWidth: 40,
            itemHeight: 6,
            data: ["营业收入增长率 企业", "营业收入增长率 行业平均"],
          },
          grid: {
            y2: 80,
          },
          xAxis: [
            {
              type: "category",
              data: orignData.thdate,
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              min: 0,
              axisLabel: {
                formatter: "{value}%",
              },
            },
          ],
          series: [
            {
              name: "营业收入增长率 企业",
              type: "line",
              itemStyle: {
                normal: {
                  color: "#166aac",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[0]][item].value
                  ? orignData.data[ledeg[0]][item].value
                  : 0;
              }),
            },
            {
              name: "营业收入增长率 行业平均",
              type: "line",
              itemStyle: {
                normal: {
                  color: "#ff9800",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[0]][item].industryAvg
                  ? orignData.data[ledeg[0]][item].industryAvg
                  : 0;
              }),
            },
          ],
        };
        this.NetProfitRateData = {
          title: {
            text: "净利润增长率对比",
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
            left: "100px",
            width: 500,
            itemWidth: 40,
            itemHeight: 6,
            data: ["净利润增长率 企业", "净利润增长率 行业平均"],
          },
          grid: {
            y2: 80,
          },
          xAxis: [
            {
              type: "category",
              data: orignData.thdate,
              axisPointer: {
                type: "shadow",
              },
            },
          ],
          yAxis: [
            {
              type: "value",
              min: 0,
              axisLabel: {
                formatter: "{value}%",
              },
            },
          ],
          series: [
            {
              name: "净利润增长率 企业",
              type: "line",
              itemStyle: {
                normal: {
                  color: "#166aac",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[1]][item].value
                  ? orignData.data[ledeg[1]][item].value
                  : 0;
              }),
            },
            {
              name: "净利润增长率 行业平均",
              type: "line",
              itemStyle: {
                normal: {
                  color: "#ff9800",
                },
              },
              data: orignData.thdate.map((item) => {
                return orignData.data[ledeg[1]][item].industryAvg
                  ? orignData.data[ledeg[1]][item].industryAvg
                  : 0;
              }),
            },
          ],
        };
      }
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
