<template>
  <div>
    <div class="page1">
      <div>
        <h2>6.产业定位</h2>
        <h3>6.1企业主要财务经营指标</h3>
        <h3>资产收入规模（最近1年）</h3>
        <table>
          <tr>
            <th>项目</th>
            <th>企业数据</th>
            <th>产业均值</th>
            <th>产业定位</th>
          </tr>
          <tr v-for="(item, index) in zcsrgmData" :key="item.name + index">
            <td>{{ item.name }}</td>
            <td>{{ item.value }}</td>
            <td>{{ item.industryAvg }}</td>
            <td>{{ item.rownum + "-" + item.count }}</td>
          </tr>
        </table>
      </div>
      <div>
        <h3>主要财务指标（最近1年）</h3>
        <table>
          <tr>
            <th>维度</th>
            <th>指标名称</th>
            <th>行业优秀值</th>
            <th>企业指标值</th>
            <th>行业极差值</th>
          </tr>
          <tr>
            <td rowspan="2">盈利能力</td>
            <td>净资产收益率</td>
            <td>
              {{ zycwzbData[0] ? zycwzbData[0]["industryGoodValue"] : "" }}
            </td>
            <td>{{ zycwzbData[0] ? zycwzbData[0]["entValue"] : "" }}</td>
            <td>
              {{ zycwzbData[0] ? zycwzbData[0]["industryBadName"] : "" }}
            </td>
          </tr>
          <tr>
            <td>主营业务利润率</td>
            <td>
              {{ zycwzbData[1] ? zycwzbData[1]["industryGoodValue"] : "" }}
            </td>
            <td>{{ zycwzbData[1] ? zycwzbData[1]["entValue"] : "" }}</td>
            <td>
              {{ zycwzbData[1] ? zycwzbData[1]["industryBadName"] : "" }}
            </td>
          </tr>
          <tr>
            <td>运营能力</td>
            <td>应收帐款周转率</td>
            <td>
              {{ zycwzbData[2] ? zycwzbData[2]["industryGoodValue"] : "" }}
            </td>
            <td>{{ zycwzbData[2] ? zycwzbData[2]["entValue"] : "" }}</td>
            <td>
              {{ zycwzbData[2] ? zycwzbData[2]["industryBadName"] : "" }}
            </td>
          </tr>
          <tr>
            <td rowspan="2">成长情况</td>
            <td>营业收入增长率</td>
            <td>
              {{ zycwzbData[3] ? zycwzbData[3]["industryGoodValue"] : "" }}
            </td>
            <td>{{ zycwzbData[3] ? zycwzbData[3]["entValue"] : "" }}</td>
            <td>
              {{ zycwzbData[3] ? zycwzbData[3]["industryBadName"] : "" }}
            </td>
          </tr>
          <tr>
            <td>净利润增长率</td>
            <td>
              {{ zycwzbData[4] ? zycwzbData[4]["industryGoodValue"] : "" }}
            </td>
            <td>{{ zycwzbData[4] ? zycwzbData[4]["entValue"] : "" }}</td>
            <td>
              {{ zycwzbData[4] ? zycwzbData[4]["industryBadName"] : "" }}
            </td>
          </tr>
          <tr>
            <td rowspan="2">债务风险</td>
            <td>资产负债率</td>
            <td>
              {{ zycwzbData[5] ? zycwzbData[5]["industryGoodValue"] : "" }}
            </td>
            <td>{{ zycwzbData[5] ? zycwzbData[5]["entValue"] : "" }}</td>
            <td>
              {{ zycwzbData[5] ? zycwzbData[5]["industryBadName"] : "" }}
            </td>
          </tr>
          <tr>
            <td>速动比率</td>
            <td>
              {{ zycwzbData[6] ? zycwzbData[6]["industryGoodValue"] : "" }}
            </td>
            <td>{{ zycwzbData[6] ? zycwzbData[6]["entValue"] : "" }}</td>
            <td>
              {{ zycwzbData[6] ? zycwzbData[6]["industryBadName"] : "" }}
            </td>
          </tr>
        </table>
      </div>
    </div>

    <div class="page1">
      <div>
        <h3>6.2企业风险信息定位</h3>
        <h3>重大变更事项</h3>
        <table>
          <tr>
            <th>变更事项</th>
            <th>企业信息加权数量</th>
            <th>行业信息加权数量（平均值）</th>
          </tr>
          <tr v-for="(item, i) in bianGengInfo" :key="item.id + i">
            <td>{{ item.bgmc }}</td>
            <td>{{ item.entValue }}</td>
            <td>{{ item.industryAvg }}</td>
          </tr>
        </table>
      </div>
      <div>
        <h3>司法风险</h3>
        <table>
          <tr>
            <th>变更事项</th>
            <th>企业信息加权数量/金额</th>
            <th>行业信息加权数量/金额（平均值）</th>
          </tr>
          <tr v-for="item in sifaInfo" :key="item.id">
            <td>{{ item.bgmc }}</td>
            <td>{{ item.entValue }}</td>
            <td>{{ item.industryAvg }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["reportData"],
  data() {
    return {
      zycwzbData: [],
      zycwzbMap: [
        "盈利能力-净资产收益率",
        "盈利能力-主营业务利润率",
        "运营能力-应收账款周转率",
        "成长情况-营业收入增长率",
        "成长情况-净利润增长率",
        "债务风险-资产负债率",
        "债务风险-速动比率",
      ],
      bianGengInfo: [],
      sifaInfo: [],
      zcsrgmData: [],
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
      // 企业主要财务指标

      // if (!this.reportData.zycwzb) return;
      let zycwzbData = [];
      if (this.reportData.zycwzb) {
        this.zycwzbMap.forEach((item) => {
          zycwzbData.push(
            this.reportData.zycwzb.find((d) => d.targetName === item)
          );
        });
      }
      this.zycwzbData = zycwzbData;

      // 变更、司法信息
      let bg = [],
        sf = [];
      if (this.reportData.bgxxList) {
        this.reportData.bgxxList.forEach((item) => {
          if (item.type === "1") {
            bg.push(item);
          } else {
            sf.push(item);
          }
        });
      }
      // console.log(bg, sf, "------------------------");
      this.bianGengInfo = bg;
      this.sifaInfo = sf;

      // 资产收入规模
      this.zcsrgmData = this.reportData.zcsrgmList;
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
