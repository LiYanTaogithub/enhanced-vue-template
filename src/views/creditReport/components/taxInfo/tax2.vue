<template>
  <div>
    <div class="page1">
      <h3>5.3.2前十大上游供应商企业</h3>
      <p>采集时间区间：{{ reportData.gyscaijiDate }}</p>
      <table>
        <tr>
          <th>序号</th>
          <th>企业名称</th>
          <th>税号</th>
          <th>地区</th>
          <th>所属行业</th>
          <th>总交易额(元)</th>
          <th>金额占比(%)</th>
        </tr>
        <tr v-for="(item, index) in tengysData" :key="item.gysmc">
          <td>{{ index + 1 }}</td>
          <td>{{ item.gysmc }}</td>
          <td>{{ item.nsrsbh }}</td>
          <td>{{ item.dq }}</td>
          <td>{{ item.shhy }}</td>
          <td>{{ item.jyje }}</td>
          <td>{{ item.jezb + "%" }}</td>
        </tr>
      </table>
      <div>
        <h3>5.3.4上游供应商行业分布</h3>
        <p>采集时间区间：{{ reportData.gyscaijiDate }}</p>
        <Echarts
          ref="gysIndustryFb"
          elem="gysIndustryFb"
          :styleSet="boxStyle"
          :tableData="gysIndustryFbData"
        ></Echarts>
      </div>
      <div>
        <h3>5.3.5按交易金额划分的前三大企业类型</h3>

        <table>
          <tr>
            <th>企业类型</th>
            <th>金额(元)</th>
            <th>金额占比(%)</th>
          </tr>
          <tr v-for="item in threeqyslx" :key="item.gysType">
            <td>{{ item.gysType }}</td>
            <td>{{ item.jyje }}</td>
            <td>{{ item.jezb }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div>
      <div class="page1">
        <h2>5.4 下游客户情况</h2>
        <h3>5.4.1客户数目及金额</h3>
        <table>
          <tr>
            <th>月份</th>
            <th>老客户数量</th>
            <th>新客户数量</th>
            <th>月均交易金额</th>
            <th>新客户占比(%)</th>
          </tr>
          <tr v-for="(item, index) in khjyjeList" :key="index + item.date">
            <td>{{ item.date }}</td>
            <td>{{ item.oldNum }}</td>
            <td>{{ item.newNum }}</td>
            <td>{{ item.je }}</td>
            <td>{{ item.newZb }}</td>
          </tr>
        </table>
      </div>
      <Echarts
        ref="countAndChart1"
        elem="countAndChart1"
        :styleSet="boxStyle"
        :tableData="countAndChartData"
      />
      <div class="page1">
        <h3>5.4.2前十大下游企业</h3>
        <p>采集时间区间：{{ reportData.gyscaijiDate }}</p>
        <table>
          <tr>
            <th>序号</th>
            <th>企业名称</th>
            <th>税号</th>
            <th>地区</th>
            <th>所属行业</th>
            <th>总交易额(元)</th>
            <th>金额占比(%)</th>
          </tr>
          <tr v-for="(item, index) in tenkhList" :key="item.gysmc">
            <td>{{ index + 1 }}</td>
            <td>{{ item.gysmc }}</td>
            <td>{{ item.nsrsbh }}</td>
            <td>{{ item.dq }}</td>
            <td>{{ item.shhy }}</td>
            <td>{{ item.jyje }}</td>
            <td>{{ item.jezb + "%" }}</td>
          </tr>
        </table>
        <div>
          <h3>5.4.4下游客户行业分布</h3>
          <p>采集时间区间：{{ reportData.gyscaijiDate }}</p>
          <Echarts
            ref="gysIndustryFb1"
            elem="gysIndustryFb1"
            :styleSet="boxStyle"
            :tableData="gysIndustryFb1Data"
          ></Echarts>
        </div>
        <div>
          <h3>5.4.5按交易金额划分的前三大企业类型</h3>
          <table>
            <tr>
              <th>企业类型</th>
              <th>金额(元)</th>
              <th>金额占比(%)</th>
            </tr>
            <tr v-for="item in threekhlx" :key="item.gysType">
              <td>{{ item.gysType }}</td>
              <td>{{ item.jyje }}</td>
              <td>{{ item.jezb }}</td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <!-- <div class="page1">
      <div>
        <h3>5.4.3下游客户地域分布</h3>
        <p>采集时间区间：2018.10 - 2020.10</p>
        <Echarts
          ref="downstreamCumer"
          elem="downstreamCumer"
          :styleSet="boxStyle"
          :tableData="downstreamCumerData"
        ></Echarts>
      </div>
      <div>
        <h3>5.4.4下游客户行业分布</h3>
        <p>采集时间区间：2018.10 - 2020.10</p>
        <Echarts
          ref="downstreamIndustry"
          elem="downstreamIndustry"
          :styleSet="boxStyle"
          :tableData="downstreamIndustryData"
        ></Echarts>
      </div>
    </div> -->
  </div>
</template>

<script>
import Echarts from "@/components/commons/echar2";
export default {
  components: { Echarts },
  props: ["reportData"],
  data() {
    return {
      tengysData: [],
      threeqyslx: [],
      countAndChartData: {},
      tenkhList: [],
      khhyfb: [],
      threekhlx: [],
      khjyjeList: [],
      boxStyle: {
        width: "100%",
        height: "350px",
        margin: "50px auto",
      },
      gysIndustryFbData: {},
      gysIndustryFb1Data: {},
      downstreamCumerData: {
        title: {
          text: "客户交易金额（元）及占比的地区分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        // legend: {
        //   bottom: 0,
        //   left: "center",
        //   data: ["增值税", "企业所得税", "其他"],
        // },
        color: ["#4472C4", "#ED7D31", "#dadc53"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            data: [
              { value: 60, name: "浙江省" },
              { value: 30, name: "江苏省" },
              { value: 10, name: "其他省" },
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
      },
      downstreamIndustryData: {
        title: {
          text: "客户交易金额（元）及占比的行业分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        color: ["#4472C4", "#ED7D31", "#dadc53"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "45%",
            center: ["50%", "50%"],
            data: [
              { value: 60, name: "金融业" },
              { value: 30, name: "租赁和商务服务业" },
              { value: 10, name: "其他行业" },
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
      },
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
  mounted() {
    this.initData();
  },
  methods: {
    initData() {
      // 前十大上游供应商企业
      let tengysData = this.reportData.tengysList;
      if (tengysData) {
        this.tengysData = tengysData;
      }

      // 5.3.4 饼图
      if (this.reportData.gyshyfb) {
        this.gysIndustryFbData = this.makeEchartData(this.reportData.gyshyfb);
      }

      // 按交易金额划分的前三大企业类型
      let threeqyslx = this.reportData.threeqyslx;
      if (threeqyslx) {
        this.threeqyslx = threeqyslx;
      }

      // 5.4.1 客户数目及金额
      let khjyjeList = this.reportData.khjyjeList;
      if (khjyjeList) {
        this.khjyjeList = khjyjeList;
        this.gyssmjeEchartData = this.gyssmjeEchartData(khjyjeList);
      }

      // 5.4.2
      let tenkhList = this.reportData.tenkhList;
      if (tenkhList) {
        this.tenkhList = tenkhList;
      }

      // 5.4.4
      let khhyfb = this.reportData.khhyfb;
      if (khhyfb) {
        this.khhyfb = khhyfb;
        this.gysIndustryFb1Data = this.makeEchartData(khhyfb);
      }

      // 5.4.5
      let threekhlx = this.reportData.threekhlx;
      if (threekhlx) {
        this.threekhlx = threekhlx;
      }
    },
    gyssmjeEchartData(gyssmjeList) {
      let bardata = [],
        linedata = [],
        // oldSum = 0,
        // newSum = 0,
        xdate = [];
      gyssmjeList.forEach((item) => {
        let newn = item.newNum ? item.newNum : 0;
        let oldn = item.oldNum ? item.oldNum : 0;
        // oldSum += oldn;
        // newSum += newn;
        bardata.push(newn + oldn);
        linedata.push(item.je ? item.je : 0), xdate.push(item.date);
      });
      this.countAndChartData = {
        title: {
          text: "下游客户数量与交易金额",
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
          data: ["下游客户数量", "交易金额"],
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
            name: "下游客户数量",
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
    },
    makeEchartData(gyshyfbData) {
      let data = gyshyfbData.map((item) => {
        return {
          value: item.jyje,
          name: item.sshy,
        };
      });

      return {
        title: {
          text: "供应商交易金额（元）及占比的行业分布",
          left: "center",
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)",
        },
        color: ["#4472C4", "#ED7D31"],
        series: [
          {
            name: "供应商",
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
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
