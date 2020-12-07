<template>
  <div>
    <div class="page1">
      <h2>3. 电力数据</h2>
      <div>
        <h3>3.1 电费水平微标签</h3>
        <table>
          <tr>
            <th>序号</th>
            <th>指标名称</th>
            <th>企业数据</th>
            <th>输出结果</th>
          </tr>
          <tr v-for="(item, index) in levelData" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.res }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="page1">
      <div>
        <h3>3.2 交费行为微标签</h3>
        <table>
          <tr>
            <th>序号</th>
            <th>指标名称</th>
            <th>企业数据</th>
            <th>输出结果</th>
          </tr>
          <tr v-for="(item, index) in payData" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.res }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="page1">
      <div>
        <h3>3.3 用电规范微标签</h3>
        <table>
          <tr>
            <th>序号</th>
            <th>指标名称</th>
            <th>企业数据</th>
            <th>输出结果</th>
          </tr>
          <tr v-for="(item, index) in specificationData" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.res }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="page1">
      <div>
        <h3>3.4 用电行为微标签</h3>
        <table>
          <tr>
            <th>序号</th>
            <th>指标名称</th>
            <th>字段名称</th>
            <th>输出结果</th>
          </tr>
          <tr v-for="(item, index) in behaviorData" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.res }}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="page1">
      <div>
        <h3>3.5 用电容量微标签</h3>
        <table>
          <tr>
            <th>序号</th>
            <th>指标名称</th>
            <th>字段名称</th>
            <th>输出结果</th>
          </tr>
          <tr v-for="(item, index) in capacityData" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.res }}</td>
          </tr>
        </table>
      </div>

      <div>
        <h3>3.6 互动行为+企业基本信息微标签</h3>
        <table>
          <tr>
            <th>序号</th>
            <th>指标名称</th>
            <th>字段名称</th>
            <th>输出结果</th>
          </tr>
          <tr v-for="(item, index) in baseData" :key="item.name">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td>{{ item.data }}</td>
            <td>{{ item.res }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Business",
  props: ["reportData"],
  components: {},
  data() {
    return {
      levelData: [],
      payData: [],
      specificationData: [],
      behaviorData: [],
      capacityData: [],
      baseData: [],
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
      let dlwbqList = this.reportData.dlwbqList;
      if (dlwbqList && dlwbqList.length) {
        this.levelData = this.levelData1(dlwbqList);
        this.payData = this.payData1(dlwbqList);
        this.specificationData = this.specificationData1(dlwbqList);
        this.behaviorData = this.behaviorData1(dlwbqList);
        this.capacityData = this.capacityData1(dlwbqList);
        this.baseData = this.baseData1(dlwbqList);
      }
    },
    levelData1(reportData) {
      if (!reportData.length) return [];

      let dlwbqList = reportData[0];

      return [
        {
          name: "企业近3个月应收电费平均得分",
          data: dlwbqList.avg_3_rcvblamt,
          res: "",
        },
        {
          name: "企业近6个月应收电费平均得分",
          data: dlwbqList.avg_6_rcvblamt,
          res: "",
        },
        {
          name: "企业近12个月应收电费平均得分",
          data: dlwbqList.avg_12_rcvblamt,
          res: "",
        },
        {
          name: "企业最近3个月应收电费行业水平",
          data: dlwbqList.rcvblamt_3_to_trade,
          res: "",
        },
        {
          name: "企业最近6个月应收电费行业水平",
          data: dlwbqList.rcvblamt_6_to_trade,
          res: "",
        },
        {
          name: "企业最近12个月应收电费行业水平",
          data: dlwbqList.rcvblamt_12_to_trade,
          res: "",
        },
        {
          name: "企业近3个月实收电费平均得分",
          data: dlwbqList.avg_3_rcvedamt,
          res: "",
        },
        {
          name: "企业近6个月实收电费平均得分",
          data: dlwbqList.avg_6_rcvedamt,
          res: "",
        },
        {
          name: "企业近12个月实收电费平均得分",
          data: dlwbqList.avg_12_rcvedamt,
          res: "",
        },
        {
          name: "企业最近3个月实收电费行业水平",
          data: dlwbqList.rcvedamt_3_to_trade,
          res: "",
        },
        {
          name: "企业最近6个月实收电费行业水平",
          data: dlwbqList.rcvedamt_6_to_trade,
          res: "",
        },
        {
          name: "企业最近12个月实收电费行业水平",
          data: dlwbqList.rcvedamt_12_to_trade,
          res: "",
        },
        {
          name: "近3个月应收电费波动情况",
          data: dlwbqList.seq_3_rcvblamt,
          res: "",
        },
        {
          name: "近6个月应收电费波动情况",
          data: dlwbqList.seq_6_rcvblamt,
          res: "",
        },
        {
          name: "近12个月应收电费波动情况",
          data: dlwbqList.seq_12_rcvblamt,
          res: "",
        },
        {
          name: "近3个月实收电费波动情况",
          data: dlwbqList.seq_3_rcvedamt,
          res: "",
        },
        {
          name: "近6个月实收电费波动情况",
          data: dlwbqList.seq_6_rcvedamt,
          res: "",
        },
        {
          name: "近12个月实收电费波动情况",
          data: dlwbqList.seq_12_rcvedamt,
          res: "",
        },
        {
          name: "近3个月应收电费增长趋势",
          data: dlwbqList.rcvbl_3_avg_up_ratio,
          res: "",
        },
        {
          name: "近6个月应收电费增长趋势",
          data: dlwbqList.rcvbl_6_avg_up_ratio,
          res: "",
        },
        {
          name: "近12个月应收电费增长趋势",
          data: dlwbqList.rcvbl_12_avg_up_ratio,
          res: "",
        },
        {
          name: "近3个月实收电费增长趋势",
          data: dlwbqList.rcved_3_avg_up_ratio,
          res: "",
        },
        {
          name: "近6个月实收电费增长趋势",
          data: dlwbqList.rcved_6_avg_up_ratio,
          res: "",
        },
        {
          name: "近12个月实收电费增长趋势",
          data: dlwbqList.rcved_12_avg_up_ratio,
          res: "",
        },
      ];
    },
    payData1(reportData) {
      if (!reportData.length) return [];
      let dlwbqList = this.reportData[0];
      return [
        { name: "电费结算类型", data: dlwbqList.pay_freq_type, res: "" },
        { name: "交费渠道", data: dlwbqList.pay_channel_type, res: "" },
        { name: "消费趋势特征", data: dlwbqList.consume_trend, res: "" },
        {
          name: "近6个月累计逾期得分",
          data: dlwbqList.overdue_6_count,
          res: "",
        },
        {
          name: "近12个月累计逾期得分",
          data: dlwbqList.overdue_12_count,
          res: "",
        },
        {
          name: "近24个月累计逾期得分",
          data: dlwbqList.overdue_24_count,
          res: "",
        },
        {
          name: "近6个月欠费违约金得分",
          data: dlwbqList.rcvbl_penalty_6_amt,
          res: "",
        },
        {
          name: "近12个月欠费违约金得分",
          data: dlwbqList.rcvbl_penalty_12_amt,
          res: "",
        },
        {
          name: "近24个月欠费违约金得分",
          data: dlwbqList.rcvbl_penalty_24_amt,
          res: "",
        },
        {
          name: "最近一次欠费时长",
          data: dlwbqList.violate_time_lasttime,
          res: "",
        },
        { name: "企业近6个月是否欠费", data: dlwbqList.owe_6_act, res: "" },
        { name: "企业近12个月是否欠费", data: dlwbqList.owe_12_act, res: "" },
        { name: "企业近24个月是否欠费", data: dlwbqList.owe_24_act, res: "" },
        {
          name: "近6个月企业欠费程度等级",
          data: dlwbqList.sum_6_owe_amt,
          res: "",
        },
        {
          name: "近12个月企业欠费程度等级",
          data: dlwbqList.sum_12_owe_amt,
          res: "",
        },
        {
          name: "近24个月企业欠费程度等级",
          data: dlwbqList.sum_24_owe_amt,
          res: "",
        },
        { name: "企业预付电费情况", data: dlwbqList.pre_paid_status, res: "" },
        {
          name: "企业电费余额水平",
          data: dlwbqList.balance_amt_status,
          res: "",
        },
        {
          name: "企业电费余额行业水平",
          data: dlwbqList.balance_amt_to_trade,
          res: "",
        },
        {
          name: "近3个月月应收电费回收水平得分",
          data: dlwbqList.rcved_3_rcvbl_ratio,
          res: "",
        },
        {
          name: "近6个月月应收电费回收水平得分",
          data: dlwbqList.rcved_6_rcvbl_ratio,
          res: "",
        },
        {
          name: "近12个月月应收电费回收水平得分",
          data: dlwbqList.rcved_12_rcvbl_ratio,
          res: "",
        },
        { name: "交费方式", data: dlwbqList.pay_mode, res: "" },
        { name: "交费频率稳定性", data: dlwbqList.pay_freq_ratio, res: "" },
        {
          name: "用户近12个月平均回款情况",
          data: dlwbqList.pay_12_reply_time,
          res: "",
        },
        {
          name: "最近3个月电费拖欠情况",
          data: dlwbqList.owe_amt_3_sum,
          res: "",
        },
        {
          name: "最近6个月电费拖欠情况",
          data: dlwbqList.owe_amt_6_sum,
          res: "",
        },
        {
          name: "最近12个月电费拖欠情况",
          data: dlwbqList.owe_amt_12_sum,
          res: "",
        },
        {
          name: "企业电费缴纳行业水平",
          data: dlwbqList.rcved_avg_12_to_trade,
          res: "",
        },
      ];
    },
    specificationData1(reportData) {
      if (!reportData.length) return [];
      let dlwbqList = this.reportData[0];
      return [
        {
          name: "企业近12个月发生电网故障情况",
          data: dlwbqList.fault_outage_count,
          res: "",
        },
        { name: "年检查通过比率", data: dlwbqList.exam_pass_ratio, res: "" },
        { name: "近2年内窃电水平", data: dlwbqList.qd_24_count, res: "" },
        { name: "近2年内窃电等级", data: dlwbqList.qd_24_amt, res: "" },
        { name: "近6个月窃电水平", data: dlwbqList.qd_6_count, res: "" },
        { name: "近6个月窃电等级", data: dlwbqList.qd_6_amt, res: "" },
        { name: "近6个月违约用电水平", data: dlwbqList.wy_6_amt, res: "" },
        { name: "企业近3个月内窃电水平", data: dlwbqList.qd_3_count, res: "" },
        { name: "企业近3个月内窃电等级", data: dlwbqList.qd_3_amt, res: "" },
        { name: "近12月内窃电水平", data: dlwbqList.qd_12_count, res: "" },
        { name: "近12月内窃电等级", data: dlwbqList.qd_12_amt, res: "" },
        { name: "近2年内违约用电水平", data: dlwbqList.wy_24_count, res: "" },
        { name: "近2年内违约用电等级", data: dlwbqList.wy_24_amt, res: "" },
        { name: "近6个月违约用电等级", data: dlwbqList.wy_6_amt, res: "" },
        { name: "近12月内违约用电水平", data: dlwbqList.wy_12_count, res: "" },
        { name: "近12月内违约用电等级", data: dlwbqList.wy_12_amt, res: "" },
        {
          name: "企业近3个月内违约用电水平",
          data: dlwbqList.wy_3_count,
          res: "",
        },
        {
          name: "企业近3个月内违约用电等级",
          data: dlwbqList.wy_3_amt,
          res: "",
        },
      ];
    },
    behaviorData1(reportData) {
      if (!reportData.length) return [];
      let dlwbqList = this.reportData[0];
      return [
        {
          name: "企业最近3个月的停电水平",
          data: dlwbqList.count_3_soutage,
          res: "",
        },
        {
          name: "企业最近6个月的停电水平",
          data: dlwbqList.count_6_soutage,
          res: "",
        },
        {
          name: "企业最近12个月的停电水平",
          data: dlwbqList.count_12_soutage,
          res: "",
        },
        { name: "企业用电故障状态", data: dlwbqList.ps_status, res: "" },
        {
          name: "企业用电量在行业中的水平",
          data: dlwbqList.tpq_last_to_trade,
          res: "",
        },
        {
          name: "近3个月企业用电量在行业中的水平",
          data: dlwbqList.tpq_3_to_trade,
          res: "",
        },
        {
          name: "近6个月企业用电量在行业中的水平",
          data: dlwbqList.tpq_6_to_trade,
          res: "",
        },
        {
          name: "近12个月企业用电量在行业中的水平",
          data: dlwbqList.tpq_12_to_trade,
          res: "",
        },
        {
          name: "企业月度电量指数",
          data: dlwbqList.tpq_last_to_12_avg,
          res: "",
        },
        { name: "企业当月用电量情况", data: dlwbqList.t_pq, res: "" },
        {
          name: "用电量同业排位",
          data: dlwbqList.tpq_12sum_trade_rank,
          res: "",
        },
        {
          name: "用电量季节性特征",
          data: dlwbqList.tpq_seasonal_trait,
          res: "",
        },
        { name: "累计用电时长", data: dlwbqList.use_time, res: "" },
        { name: "电力账户", data: dlwbqList.ele_account, res: "" },
        { name: "用电客户销户状态", data: dlwbqList.cancel_status, res: "" },
        { name: "用电客户送电状态", data: dlwbqList.ps_status, res: "" },
        { name: "开工验证", data: dlwbqList.work_status, res: "" },
        { name: "重要性等级", data: dlwbqList.risk_level_code, res: "" },
        {
          name: "企业用电量规模指数",
          data: dlwbqList.tpq_last_trade_rank,
          res: "",
        },
        {
          name: "企业最近12个月平均电量增长趋势",
          data: dlwbqList.tpq_12_avg_up_ratio,
          res: "",
        },
        {
          name: "企业最近12个月的月度用电量同比指数",
          data: dlwbqList.tpq_12_avg_seq_ratio,
          res: "",
        },
        {
          name: "企业月度同比变化是否合格",
          data: dlwbqList.tpq_up_ratio_lv,
          res: "",
        },
        {
          name: "企业近1个月用电量平均增长水平",
          data: dlwbqList.tpq_last_avg_up_ratio,
          res: "",
        },
        {
          name: "企业近3个月用电量平均增长水平",
          data: dlwbqList.tpq_3_avg_up_ratio,
          res: "",
        },
        {
          name: "企业近6个月用电量平均增长水平",
          data: dlwbqList.tpq_6_avg_up_ratio,
          res: "",
        },
        {
          name: "企业近12个月用电量平均增长水平",
          data: dlwbqList.tpq_12_avg_up_ratio,
          res: "",
        },
        {
          name: "企业近24个月用电量平均增长水平",
          data: dlwbqList.tpq_24_avg_up_ratio,
          res: "",
        },
        {
          name: "企业近6个月在行业用电波动情况",
          data: dlwbqList.ele_6_surge_to_trade,
          res: "",
        },
        {
          name: "近3个月月用电量波动情况",
          data: dlwbqList.ele_3_wave_to_trade,
          res: "",
        },
        {
          name: "近6个月月用电量波动情况",
          data: dlwbqList.ele_6_wave_to_trade,
          res: "",
        },
        {
          name: "近12个月用电量波动情况",
          data: dlwbqList.ele_12_wave_to_trade,
          res: "",
        },
        {
          name: "企业近12个月在行业的用电波动情况",
          data: dlwbqList.ele_12_surge_to_trade,
          res: "",
        },
        { name: "企业用电量差异度", data: dlwbqList.use_12_ele_diff, res: "" },
        {
          name: "企业近3个月在行业用电波动情况",
          data: dlwbqList.ele_3_surge_to_trade,
          res: "",
        },
      ];
    },
    capacityData1(reportData) {
      if (!reportData.length) return [];
      let dlwbqList = this.reportData[0];
      return [
        { name: "容量申请情况", data: dlwbqList.contract_cap, res: "" },
        { name: "实际运行容量情况", data: dlwbqList.run_cap, res: "" },
        {
          name: "近一个月内核定需量（与合同容量指标重复）",
          data: dlwbqList.last_check_cap,
          res: "",
        },
        {
          name: "近一个月内企业平均负载率",
          data: dlwbqList.cap_load_rate,
          res: "",
        },
        { name: "增容水平", data: dlwbqList.cap_up_36_count, res: "" },
        { name: "增容等级", data: dlwbqList.cap_up_36_amt, res: "" },
        { name: "减容水平", data: dlwbqList.cap_low_36_count, res: "" },
        { name: "减容等级", data: dlwbqList.cap_low_36_amt, res: "" },
        {
          name: "近12个月申请容量稳定性",
          data: dlwbqList.app_cap_12_count,
          res: "",
        },
        {
          name: "合计合同容量变化幅度",
          data: dlwbqList.contract_cap_12_range,
          res: "",
        },
        {
          name: "合计运行容量变化幅度",
          data: dlwbqList.run_cap_12_range,
          res: "",
        },
        {
          name: "合计合同容量波动性",
          data: dlwbqList.contract_cap_12_surge,
          res: "",
        },
        {
          name: "合计运行容量波动性",
          data: dlwbqList.run_cap_12_surge,
          res: "",
        },
      ];
    },
    baseData1(reportData) {
      if (!reportData.length) return [];
      let dlwbqList = this.reportData[0];
      return [
        {
          name: "近12个月内举报水平",
          data: dlwbqList.report_12_count,
          res: "",
        },
        {
          name: "近12个月内恶意投诉水平",
          data: dlwbqList.complain_12_count,
          res: "",
        },
        {
          name: "近12个月95598总水平",
          data: dlwbqList.complain_95598_12_status,
          res: "",
        },
        {
          name: "近24个月内投诉频次",
          data: dlwbqList.complain_95598_24_status,
          res: "",
        },
        {
          name: "近12月用户后台点击率",
          data: dlwbqList.click_rate_12,
          res: "",
        },
        {
          name: "电子渠道交费等级",
          data: dlwbqList.echannel_pay_12_avg,
          res: "",
        },
        {
          name: "电子渠道交费水平",
          data: dlwbqList.echannel_pay_12_count,
          res: "",
        },
        { name: "信息质量情况", data: dlwbqList.info_quality, res: "" },
        { name: "资金总额", data: dlwbqList.t_captal, res: "" },
      ];
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
