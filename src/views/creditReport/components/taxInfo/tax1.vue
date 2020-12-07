<template>
  <div>
    <div class="page1">
      <h2>5.税务信息</h2>
      <h3>5.1纳税信息分析</h3>
      <h3>近两年纳税详情</h3>
      <table>
        <tr>
          <th></th>
          <th v-for="item in jlnnsxqTime" :key="item">
            {{ item + "(万元)" }}
          </th>
          <th>合计（万元）</th>
        </tr>
        <tr v-for="d in jlnnsxqData" :key="d.name">
          <td>{{ d.name }}</td>
          <td>{{ d.oneYearValue }}</td>
          <td>{{ d.twoYearvalue }}</td>
          <td>{{ d.hj }}</td>
        </tr>
      </table>
      <Echarts
        ref="taxPay2018"
        elem="taxPay2018"
        :styleSet="boxStyle"
        :tableData="taxPayData1"
      />
    </div>
    <div class="page1">
      <Echarts
        ref="taxPay2017"
        elem="taxPay2017"
        :styleSet="boxStyle"
        :tableData="taxPayData2"
      />
      <h3>5.2企业增值税纳税趋势变动分析</h3>
      <Echarts
        ref="monthSell"
        elem="monthSell"
        :styleSet="boxStyle"
        :tableData="monthSellData"
      />
    </div>
    <div class="page1">
      <Echarts
        ref="addValueTax"
        elem="addValueTax"
        :styleSet="boxStyle"
        :tableData="addValueTaxData"
      />
    </div>
    <div class="page1">
      <h3>5.3上游供应商情况</h3>
      <h3>5.3.1供应商数目及金额</h3>
      <table>
        <tr>
          <th>月份</th>
          <th>老供应商数量</th>
          <th>新供应商数量</th>
          <th>月均交易金额</th>
          <th>新供应商占比(%)</th>
        </tr>
        <tr v-for="(item, i) in gyssmjeData" :key="item.date + i">
          <td>{{ item.date }}</td>
          <td>{{ item.oldNum }}</td>
          <td>{{ item.newNum }}</td>
          <td>{{ item.je }}</td>
          <td>{{ item.oldZb }}</td>
        </tr>
      </table>
    </div>
    <div class="page1">
      <Echarts
        ref="countAndChart"
        elem="countAndChart"
        :styleSet="boxStyle"
        :tableData="countAndChartData"
      />
      <Echarts
        ref="newOkdVendor"
        elem="newOkdVendor"
        :styleSet="boxStyle"
        :tableData="newOkdVendorData"
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
      // 纳税信息
      jlnnsxqData: [],
      jlnnsxqTime: [],
      // 供应商数目及金额
      gyssmjeData: [],
      boxStyle: {
        width: "100%",
        height: "350px",
        margin: "50px auto",
      },
      taxPayData1: {},
      taxPayData2: {},
      monthSellData: {
        title: {
          text: "销售额月度对比",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          bottom: 0,
          left: "center",
          data: ["2017年销售额", "2018年销售额"],
        },
        grid: {
          top: 40,
          left: "3%",
          right: "4%",
          bottom: 40,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#999",
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "#999",
            },
          },
        },
        series: [
          {
            name: "2017年销售额",
            type: "line",
            stack: "总量",
            itemStyle: {
              color: "#4472C4",
            },
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
          },
          {
            name: "2018年销售额",
            type: "line",
            stack: "总量",
            itemStyle: {
              color: "#ED7D31",
            },
            data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310],
          },
        ],
      },
      newOkdVendorData: {},
      addValueTaxData: {
        title: {
          text: "增值税应纳税额趋势对比",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          bottom: 0,
          left: "center",
          data: ["2017年销售额", "2018年销售额"],
        },
        grid: {
          top: 40,
          left: "3%",
          right: "4%",
          bottom: 40,
          containLabel: true,
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: [
            "1月",
            "2月",
            "3月",
            "4月",
            "5月",
            "6月",
            "7月",
            "8月",
            "9月",
            "10月",
            "11月",
            "12月",
          ],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#999",
            },
          },
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "#999",
            },
          },
        },
        series: [
          {
            name: "2017年销售额",
            type: "line",
            stack: "总量",
            data: [120, 132, 101, 134, 90, 230, 210, 101, 134, 90, 230, 210],
            itemStyle: {
              color: "#4472C4",
            },
          },
          {
            name: "2018年销售额",
            type: "line",
            stack: "总量",
            data: [220, 182, 191, 234, 290, 330, 310, 191, 234, 290, 330, 310],
            itemStyle: {
              color: "#ED7D31",
            },
          },
        ],
      },
      countAndChartData: {},
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
      // 近两年纳税详情
      let jlnnsxq = this.reportData.jlnnsxqList;
      if (jlnnsxq) {
        let year = [];
        let echartOriginData = [];

        jlnnsxq.forEach((item) => {
          if (item.oneYearName) year.push(item.oneYearName);
          if (item.twoYearName) year.push(item.twoYearName);
          if (item.name !== "合计") {
            echartOriginData.push(item);
          }
        });
        year = year.filter((item, i) => i === year.indexOf(item));
        this.jlnnsxqTime = year;
        this.jlnnsxqData = jlnnsxq;
        this.makePieData(jlnnsxq);
      }

      // 供应商数据及金额
      let gyssmjeList = this.reportData.gyssmjeList;
      if (gyssmjeList) {
        this.gyssmjeData = gyssmjeList;
        this.gyssmjeEchartData(gyssmjeList);
      }
    },
    gyssmjeEchartData(gyssmjeList) {
      let bardata = [],
        linedata = [],
        oldSum = 0,
        newSum = 0,
        xdate = [];
      gyssmjeList.forEach((item) => {
        let newn = item.newNum ? item.newNum : 0;
        let oldn = item.oldNum ? item.oldNum : 0;
        oldSum += oldn;
        newSum += newn;
        bardata.push(newn + oldn);
        linedata.push(item.je ? item.je : 0), xdate.push(item.date);
      });
      this.countAndChartData = {
        title: {
          text: "上游客户数量与交易金额",
          left: "center",
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
          data: ["上游客户数量", "交易金额"],
        },
        xAxis: [
          {
            type: "category",
            data: xdate,
            axisPointer: {
              type: "shadow",
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "上游客户数量",
            min: 0,
            max: 250,
            interval: 50,
            axisLabel: {
              formatter: "{value}",
            },
          },
          {
            type: "value",
            name: "交易金额",
            min: 0,
            max: 25,
            interval: 5,
            axisLabel: {
              formatter: "{value}",
            },
          },
        ],
        series: [
          {
            name: "上游客户数量",
            type: "bar",
            itemStyle: {
              color: "#4472C4",
            },
            data: bardata,
          },
          {
            name: "交易金额",
            type: "line",
            itemStyle: {
              color: "#ED7D31",
            },
            yAxisIndex: 1,
            data: linedata,
          },
        ],
      };
      this.newOkdVendorData = {
        title: {
          text: "新老供应商占比",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 0,
          left: "center",
          data: ["老供应商", "新供应商"],
        },
        color: ["#4472C4", "#ED7D31"],
        series: [
          {
            name: "供应商",
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            data: [
              { value: newSum, name: "老供应商" },
              { value: oldSum, name: "新供应商" },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
          },
        ],
      };
    },
    makePieData(originData) {
      let arr1 = [],
        arr2 = [],
        name1 = "",
        name2 = "",
        legendData1 = [],
        legendData2 = [];
      originData.forEach((item) => {
        if (item.name !== "合计") {
          if (item.oneYearName) {
            name1 = item.oneYearName;
            arr1.push({ value: item.oneYearValue, name: item.name });
            legendData1.push(item.name);
          }
          if (item.twoYearName) {
            name2 = item.twoYearName;
            arr2.push({ value: item.twoYearvalue, name: item.name });
            legendData2.push(item.name);
          }
        }
      });
      if (name1) {
        this.taxPayData1 = this.echartsOption({
          title: name1 + "纳税额度占比",
          legendData: legendData1,
          data: arr1,
        });
      }
      if (name2) {
        this.taxPayData2 = this.echartsOption({
          title: name2 + "纳税额度占比",
          legendData: legendData2,
          data: arr2,
        });
      }
    },
    echartsOption(optionData) {
      const { title, legendData, data } = optionData;
      let option = {
        title: {
          text: title,
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        legend: {
          bottom: 0,
          left: "center",
          data: legendData,
        },
        color: ["#4472C4", "#ED7D31", "#dadc53"],
        series: [
          {
            name: title,
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)",
              },
            },
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
