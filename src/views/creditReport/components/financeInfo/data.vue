<template>
  <div class="">
    <div class="page1">
      <h2>4. 财务信息</h2>
      <div>
        <h3>4.1 财务数据结构分析</h3>
        <h3>资产结构分析</h3>
        <el-container class="uls">
          <el-main>
            <el-row class="lis">
              <el-col :span="4" class="tab_titles">资产项目</el-col>
              <el-col :span="20">
                <el-row>
                  <el-col
                    class="ths"
                    v-for="(date, ind3) in zcjgfxListDate"
                    :key="ind3"
                    :span="24 / zcjgfxListDate.length"
                  >
                    {{ date }}
                  </el-col>
                </el-row>
                <el-row class="lis olis">
                  <el-col :span="3" class="ths">金额</el-col>
                  <el-col :span="3" class="ths">占比</el-col>
                  <el-col :span="3" class="ths">金额</el-col>
                  <el-col :span="3" class="ths">占比</el-col>
                  <el-col :span="3" class="ths">金额</el-col>
                  <el-col :span="3" class="ths">占比</el-col>
                  <el-col :span="3" class="ths">金额</el-col>
                  <el-col :span="3" class="ths">占比</el-col>
                </el-row>
              </el-col>
            </el-row>

            <el-row class="lis" v-for="(item, ind2) in zcjgfxList" :key="ind2">
              <el-col :span="4" class="th_titles" v-if="item.name">{{
                item.name
              }}</el-col>
              <el-col :span="20">
                <el-row>
                  <el-col
                    class="ths"
                    v-for="(t, ind3) in item.dataInfo"
                    :key="ind3"
                    :span="24 / item.dataInfo.length"
                  >
                    <el-row>
                      <el-col :span="12" class="ths_w50" v-if="t.jine">{{
                        t.jine
                      }}</el-col>
                      <el-col :span="12" class="ths_w50" v-else>-</el-col>
                      <el-col :span="12" class="ths_w50" v-if="t.zhanbi">{{
                        t.zhanbi
                      }}</el-col>
                      <el-col :span="12" class="ths_w50" v-else>-</el-col>
                    </el-row>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-main>
        </el-container>
        <Echarts
          ref="EnterpriseAssets"
          :elem="name1"
          :styleSet="boxStyle"
          :tableData="EnterpriseAssetsData"
        />
      </div>
    </div>
    <div class="page1">
      <h3>债务结构分析</h3>
      <el-container class="uls">
        <el-main>
          <el-row class="lis">
            <el-col :span="4" class="tab_titles">资产项目</el-col>
            <el-col :span="20">
              <el-row>
                <el-col
                  class="ths"
                  v-for="(date, ind3) in zwjgfxListDate"
                  :key="ind3"
                  :span="24 / zwjgfxListDate.length"
                >
                  {{ date }}
                </el-col>
              </el-row>
              <el-row class="lis olis">
                <el-col :span="3" class="ths">金额</el-col>
                <el-col :span="3" class="ths">占比</el-col>
                <el-col :span="3" class="ths">金额</el-col>
                <el-col :span="3" class="ths">占比</el-col>
                <el-col :span="3" class="ths">金额</el-col>
                <el-col :span="3" class="ths">占比</el-col>
                <el-col :span="3" class="ths">金额</el-col>
                <el-col :span="3" class="ths">占比</el-col>
              </el-row>
            </el-col>
          </el-row>

          <el-row class="lis" v-for="(item, ind2) in zwjgfxList" :key="ind2">
            <el-col :span="4" class="th_titles" v-if="item.name">{{
              item.name
            }}</el-col>
            <el-col :span="20">
              <el-row>
                <el-col
                  class="ths"
                  v-for="(t, ind3) in item.dataInfo"
                  :key="ind3"
                  :span="24 / item.dataInfo.length"
                >
                  <el-row>
                    <el-col :span="12" class="ths_w50" v-if="t.jine">{{
                      t.jine
                    }}</el-col>
                    <el-col :span="12" class="ths_w50" v-else>-</el-col>
                    <el-col :span="12" class="ths_w50" v-if="t.zhanbi">{{
                      t.zhanbi
                    }}</el-col>
                    <el-col :span="12" class="ths_w50" v-else>-</el-col>
                  </el-row>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
      <Echarts
        ref="Enterpriseliabilities"
        :elem="name2"
        :styleSet="boxStyle"
        :tableData="EnterpriseliabilitiesData"
      />
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
      name1: "EnterpriseAssets",
      name2: "Enterpriseliabilities",
      boxStyle: {
        width: "100%",
        height: "350px",
        margin: "50px auto",
      },
      zcjgfxList: [],
      zwjgfxListDate: [],
      zwjgfxList: [],
      zcjgfxListDate: [],
      EnterpriseAssetsData: {},
      EnterpriseliabilitiesData: {},
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
    // 初始化数据
    initData() {
      // 资产结构分析
      if (this.reportData.financeMap && this.reportData.financeMap.zcjgfxList) {
        this.zcjgfxList = this.structure(
          this.reportData.financeMap.zcjgfxList,
          this.zwjgfxListDate,
          "企业主要资产变化趋势"
        );
      }
      // 负债结构分析
      if (this.reportData.financeMap && this.reportData.financeMap.zwjgfxList) {
        this.zwjgfxList = this.structure(
          this.reportData.financeMap.zwjgfxList,
          this.zcjgfxListDate,
          "企业主要负债变化趋势"
        );
      }
    },

    /**
     *报告数据处理
     *资产结构分析、债务结构分析
     */
    structure(arr, yearData, title) {
      let tempArr = [],
        dataArr = [];
      if (!arr) return dataArr;
      arr.forEach((val, index, arr) => {
        // 资产结构分析展示日期：年月日
        if (yearData.indexOf(arr[index].date) == -1) {
          yearData.push(arr[index].date);
        }
        if (tempArr.indexOf(arr[index].name) == -1) {
          dataArr.push({
            name: arr[index].name,
            dataInfo: [arr[index]],
          });
          tempArr.push(arr[index].name);
        } else {
          for (let j = 0; j < dataArr.length; j++) {
            if (dataArr[j].name == arr[index].name) {
              dataArr[j].dataInfo.push(arr[index]);
            }
          }
        }
      });
      if (title === "企业主要资产变化趋势") {
        this.EnterpriseAssetsData = this.fincalDataEcharts(
          dataArr,
          yearData,
          title
        );
      } else if (title === "企业主要负债变化趋势") {
        this.EnterpriseliabilitiesData = this.fincalDataEcharts(
          dataArr,
          yearData,
          title
        );
      }
      return dataArr;
    },

    fincalDataEcharts(originData, dateData, title) {
      let legendData = originData.map((item) => {
        return item.name;
      });
      legendData.push("线性(" + legendData[legendData.length - 1] + ")");

      return {
        title: {
          text: title,
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
          data: legendData,
        },
        grid: {
          y2: 80,
        },
        xAxis: [
          {
            type: "category",
            data: dateData,
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
            name: legendData[0],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#166aac",
              },
            },
            data: originData[0].dataInfo.map((item) => item.jine),
          },
          {
            name: legendData[1],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#ff9800",
              },
            },
            data: originData[1].dataInfo.map((item) => item.jine),
          },
          {
            name: legendData[2],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#a6a6a6",
              },
            },
            data: originData[2].dataInfo.map((item) => item.jine),
          },
          {
            name: legendData[3],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#ffc107",
              },
            },
            data: originData[3].dataInfo.map((item) => item.jine),
          },
          {
            name: legendData[4],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#52b1fc",
              },
            },
            data: originData[4].dataInfo.map((item) => item.jine),
          },
          {
            name: legendData[5],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#8bc34a",
              },
            },
            data: originData[5].dataInfo.map((item) => item.jine),
          },
          {
            name: legendData[6],
            type: "bar",
            itemStyle: {
              normal: {
                color: "#001276",
              },
            },
            data: originData[6].dataInfo.map((item) => item.jine),
          },
          {
            name: legendData[7],
            type: "line",
            lineStyle: {
              width: 1,
              type: "dotted",
            },
            symbolSize: 0,
            itemStyle: {
              normal: {
                color: "#673ab7",
              },
            },
            data: originData[6].dataInfo.map((item) => item.jine),
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
