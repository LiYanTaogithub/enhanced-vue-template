<template>
  <div class="page1">
    <h3>2.5 司法信息</h3>
    <div>
      <h3>严重违法</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>列入日期</th>
          <th>列入决定机关</th>
          <th>列入严重违法失信企业名单原因</th>
        </tr>
        <tr v-for="(item, index) in yzwfList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.putDate }}</td>
          <td>{{ item.putDepartment }}</td>
          <td>{{ item.putReason }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>法院公告</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>公告类型</th>
          <th>法院名称</th>
          <th>内容</th>
          <th>当事人</th>
          <th>公布日期</th>
        </tr>
        <tr v-for="(item, index) in fyggList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.announcementTypeCode }}</td>
          <td>{{ item.courtName }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.litigant }}</td>
          <td>{{ item.publishDate }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>开庭公告</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>案号</th>
          <th>开庭时间</th>
          <th>案由</th>
          <th>法院</th>
          <th>原告/上诉人</th>
          <th>被告/被上诉人</th>
        </tr>
        <tr v-for="(item, index) in ktggList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.caseNo }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.caseReason }}</td>
          <td>{{ item.courtRoom }}</td>
          <td>{{ item.plaintiff }}</td>
          <td>{{ item.defendant }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>裁判文书</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>案件名称</th>
          <th>判决结果</th>
          <th>省份地区</th>
          <th>案号</th>
          <th>案件身份</th>
          <th>执行法院</th>
        </tr>
        <tr v-for="(item, index) in cpwsList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.caseNo }}</td>
          <td>{{ item.result }}</td>
          <td>{{ item.base }}</td>
          <td>{{ item.caseNo }}</td>
          <td></td>
          <td>{{ item.court }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>被执行人信息</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>案号</th>
          <th>执行法院</th>
          <th>执行标的（元）</th>
          <th>立案日期</th>
        </tr>
        <tr v-for="(item, index) in bzxrxxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.caseNo }}</td>
          <td>{{ item.court }}</td>
          <td>{{ item.execMoney }}</td>
          <td>{{ item.caseCreateTime }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>失信被执行人</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>案号</th>
          <th>发布时间</th>
          <th>执行法院</th>
          <th>立案日期</th>
          <th>做出执行依据单位</th>
          <th>法律生效文书确定的义务</th>
          <th>被执行人的履行情况</th>
          <th>已履行部分</th>
          <th>未履行部分</th>
        </tr>
        <tr v-for="(item, index) in sxbzxrxxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.caseNo }}</td>
          <td>{{ item.pubDate }}</td>
          <td>{{ item.court }}</td>
          <td>{{ item.regTime }}</td>
          <td>{{ item.gistUnit }}</td>
          <td>{{ item.duty }}</td>
          <td>{{ item.performance }}</td>
          <td>{{ item.performedPart }}</td>
          <td>{{ item.unperformPart }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>重大税收违法案件记录</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>案件上报时间</th>
          <th>统一社会信用代码</th>
          <th>案件性质</th>
          <th>主要违法事实</th>
          <th>所属税务机关</th>
        </tr>
        <tr v-for="(item, index) in zdsswfajjlList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.publishTime }}</td>
          <td>{{ item.taxpayerNumber }}</td>
          <td>{{ item.caseType }}</td>
          <td>{{ item.caseInfo }}</td>
          <td>{{ item.department }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>抽查检查</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>日期</th>
          <th>结果</th>
          <th>检查实施机关</th>
        </tr>
        <tr v-for="(item, index) in ccjcList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.checkDate }}</td>
          <td>{{ item.checkResult }}</td>
          <td>{{ item.checkOrg }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: ["reportData"],
  data() {
    return {
      yzwfList: [],
      fyggList: [],
      ktggList: [],
      cpwsList: [],
      bzxrxxList: [],
      sxbzxrxxList: [],
      zdsswfajjlList: [],
      ccjcList: [],
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
      //
      let yzwfList = this.reportData.yzwfList;
      if (yzwfList) {
        this.yzwfList = yzwfList;
      }

      //
      let fyggList = this.reportData.fyggList;
      if (fyggList) {
        this.fyggList = fyggList;
      }

      //
      let ktggList = this.reportData.ktggList;
      if (ktggList) {
        this.ktggList = ktggList;
      }

      //
      let cpwsList = this.reportData.cpwsList;
      if (cpwsList) {
        this.cpwsList = cpwsList;
      }

      this.makeData("bzxrxxList");
      this.makeData("sxbzxrxxList");
      this.makeData("zdsswfajjlList");
      this.makeData("ccjcList");
    },
    makeData(key) {
      if (this.reportData[key]) {
        this[key] = this.reportData[key];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
