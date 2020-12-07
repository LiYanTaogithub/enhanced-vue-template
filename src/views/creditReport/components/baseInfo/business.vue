<template>
  <div>
    <div class="page1">
      <h2>2. 企业基本信息</h2>
      <h3>2.1 工商信息</h3>
      <h3>注册信息</h3>
      <table class="zcxx">
        <tr>
          <th width="180">公司名称</th>
          <td>{{ zcxx.name }}</td>
          <th>登记机关</th>
          <td>{{ zcxx.regInstitute }}</td>
        </tr>
        <tr>
          <th>法定代表人</th>
          <td>{{ zcxx.legalEntityId }}</td>
          <th>组织机构代码</th>
          <td></td>
        </tr>
        <tr>
          <th>注册号</th>
          <td>{{ zcxx.regNumber }}</td>
          <th width="160">统一社会信用代码</th>
          <td>{{ zcxx.creditCode }}</td>
        </tr>
        <tr>
          <th>组织机构批准单位</th>
          <td>{{ zcxx.orgApprovedInstitute }}</td>
          <th>公司历史名称</th>
          <td>{{ zcxx.historyNames }}</td>
        </tr>
        <tr>
          <th>企业类型</th>
          <td>{{ zcxx.companyType }}</td>
          <th>行业分类</th>
          <td>{{ zcxx.categoryCode }}</td>
        </tr>
        <tr>
          <th>注册资本金额</th>
          <td>{{ zcxx.regCapitalAmount }}</td>
          <th>注册资本币种</th>
          <td>{{ zcxx.regCapitalCurrency }}</td>
        </tr>
        <tr>
          <th>成立日期</th>
          <td>{{ zcxx.estiblishTime }}</td>
          <th>核准日期</th>
          <td>{{ zcxx.approvedTime }}</td>
        </tr>
        <tr>
          <th>经营期限开始日期</th>
          <td>{{ zcxx.fromTime }}</td>
          <th>经营期限终止日期</th>
          <td>{{ zcxx.toTime }}</td>
        </tr>
        <tr>
          <th>企业状态</th>
          <td>{{ zcxx.regStatus }}</td>
          <th>省份</th>
          <td>{{ zcxx.base }}</td>
        </tr>
        <tr>
          <th>注册地址</th>
          <td colspan="3">{{ zcxx.regLocation }}</td>
        </tr>
        <tr>
          <th>经营范围</th>
          <td colspan="3">{{ zcxx.businessScope }}</td>
        </tr>
      </table>

      <h3>股东信息</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>股东名称</th>
          <th>股东类型</th>
          <th>认缴出资额</th>
          <th>认缴出资方式</th>
          <th>出资比例</th>
          <th>实缴出资额</th>
          <th>实缴出资方式</th>
        </tr>
        <tr v-for="(item, index) in gdxxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td></td>
          <td>{{ item.holderType }}</td>
          <td>{{ item.amount }}</td>
          <td></td>
          <td>{{ item.percent }}</td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <h3>主要人员</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>姓名</th>
          <th>职位</th>
        </tr>
        <tr v-for="(item, index) in zyry" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.hid }}</td>
          <td>{{ item.staffType }}</td>
        </tr>
      </table>

      <h3>对外投资</h3>
      <table v-for="(item, index) in dwtzList" :key="item.id">
        <tr>
          <th>序号</th>
          <th>公司名称</th>
          <th>法定代表人姓名</th>
          <th>成立日期</th>
          <th>注册资金</th>
          <th>投资金额</th>
          <th>出资比例</th>
          <th>企业状态</th>
        </tr>
        <tr>
          <td>{{ index + 1 }}</td>
          <td>{{ item.cid }}</td>
          <td></td>
          <td>{{ item.createTime }}</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </table>

      <!-- <h3>分支机构</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>公司名称</th>
          <th>登记机关</th>
          <th>成立日期</th>
          <th>企业状态</th>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
      </table> -->
    </div>

    <div class="page1">
      <div>
        <h3>变更记录</h3>
        <table>
          <tr>
            <th>变更项目</th>
            <th>变更日期</th>
            <th>变更前内容</th>
            <th>变更后内容</th>
          </tr>
          <tr v-for="item in bgjlList" :key="item.id">
            <td>{{ item.changeItem }}</td>
            <td>{{ item.changeTime }}</td>
            <td>{{ item.contentBefore }}</td>
            <td>{{ item.contentAfter }}</td>
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
      zcxx: {},
      gdxxList: [],
      zyry: [],
      dwtzList: [],
      bgjlList: [],
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
  methods: {
    initData() {
      let zcxx = this.reportData.zcxx;
      if (zcxx) {
        this.zcxx = zcxx;
      }

      //
      let gdxxList = this.reportData.gdxxList;
      if (gdxxList) {
        this.gdxxList = gdxxList;
      }

      //
      let zyry = this.reportData.zyry;
      if (zyry) {
        this.zyry = zyry;
      }
      //
      let dwtzList = this.reportData.dwtzList;
      if (dwtzList) {
        this.dwtzList = dwtzList;
      }

      //
      let bgjlList = this.reportData.bgjlList;
      if (bgjlList) {
        this.bgjlList = bgjlList;
      }
    },
  },
  created() {},
  mounted() {
    this.initData();
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
.zcxx {
  th {
    min-width: 140px;
  }
}
</style>
