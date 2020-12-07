<template>
  <div>
    <div class="page1">
      <div>
        <h3>5.5企业前十大采购商品分析</h3>
        <!-- <p>采集时间区间：2018.10 - 2020.10</p> -->
        <table>
          <tr>
            <th>采购商品排名</th>
            <th>采购金额</th>
            <th>所属商品大类</th>
            <th>所属商品中类</th>
            <th>所属商品小类</th>
            <th>占比</th>
          </tr>
          <tr v-for="(item, index) in qsdcgData" :key="item.ssspzl">
            <td>{{ index + 1 }}</td>
            <td>{{ item.cgje }}</td>
            <td>{{ item.ssspdl }}</td>
            <td>{{ item.ssspzl }}</td>
            <td>{{ item.ssspxl }}</td>
            <td>{{ item.jezb + "%" }}</td>
          </tr>
          <!-- <tr>
            <td>合计</td>
            <td>333333</td>
            <td>34</td>
            <td>0.78</td>
            <td></td>
            <td></td>
          </tr> -->
        </table>
      </div>

      <div>
        <h3>5.6企业前十大销售商品分析</h3>
        <!-- <p>采集时间区间：2018.10 - 2020.10</p> -->
        <table>
          <tr>
            <th>采购商品排名</th>
            <th>采购金额</th>
            <th>所属商品大类</th>
            <th>所属商品中类</th>
            <th>所属商品小类</th>
            <th>占比</th>
          </tr>
          <tr v-for="(item, index) in qsdxsData" :key="item.ssspzl">
            <td>{{ index + 1 }}</td>
            <td>{{ item.xsje }}</td>
            <td>{{ item.ssspdl }}</td>
            <td>{{ item.ssspzl }}</td>
            <td>{{ item.ssspxl }}</td>
            <td>{{ item.jezb + "%" }}</td>
          </tr>
          <!-- <tr>
            <td>合计</td>
            <td>333333</td>
            <td>34</td>
            <td>0.78</td>
            <td></td>
            <td></td>
          </tr> -->
        </table>
      </div>
    </div>
    <div class="page1">
      <div>
        <h3>5.7企业生产销售费用分析</h3>
        <Echarts
          ref="entSellAnasynis"
          elem="entSellAnasynis"
          :styleSet="boxStyle"
          :tableData="entSellAnasynisData"
        ></Echarts>
      </div>
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
      qsdcgData: [],
      qsdxsData: [],
      boxStyle: {
        width: "100%",
        height: "350px",
        margin: "50px auto",
      },
      entSellAnasynisData: {},
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
      // 前十大采购
      let qsdcgData = this.reportData.qsdcgList;
      if (qsdcgData) {
        this.qsdcgData = qsdcgData;
      }

      // 前十大销售
      let qsdxsData = this.reportData.qsdxsList;
      if (qsdxsData) {
        this.qsdxsData = qsdxsData;
      }

      // 5.7
      let scxsfyList = this.reportData.scxsfyList;
      if (scxsfyList) {
        this.scxsfyList = scxsfyList;
        this.entSellAnasynisData = this.makeEchartLineData(scxsfyList);
      }
    },
    makeEchartLineData(scxsfyList) {
      let xaisData = [];
      if (scxsfyList.cc) {
        scxsfyList.cc.forEach((item) => {
          xaisData.push(item.ssny.slice(0, 7));
        });
      }
      let option = {
        title: {
          text: "企业生产销售费用月度变化趋势（近12个月）",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          bottom: 0,
          data: ["电费", "水费", "天然气费", "房屋租赁费", "运输仓储费"],
        },
        color: ["#5B9BD5", "#FCBE00", "#A5A5A5", "#EC7D31", "#4472C4"],
        grid: {
          left: "3%",
          right: "4%",
          bottom: 40,
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: xaisData,
            axisLabel: {
              interval: 0,
              rotate: 40,
            },
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "电费",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: scxsfyList.df.map((item) => {
              if (item.myjyje) {
                return item.myjyje;
              } else {
                return 0;
              }
            }),
          },
          {
            name: "水费",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: scxsfyList.sf.map((item) => {
              if (item.myjyje) {
                return item.myjyje;
              } else {
                return 0;
              }
            }),
          },
          {
            name: "天然气费",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: scxsfyList.trq.map((item) => {
              if (item.myjyje) {
                return item.myjyje;
              } else {
                return 0;
              }
            }),
          },
          {
            name: "房屋租赁费",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: scxsfyList.fwzl.map((item) => {
              if (item.myjyje) {
                return item.myjyje;
              } else {
                return 0;
              }
            }),
          },
          {
            name: "运输仓储费",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top",
              },
            },
            areaStyle: {},
            data: scxsfyList.cc.map((item) => {
              if (item.myjyje) {
                return item.myjyje;
              } else {
                return 0;
              }
            }),
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
