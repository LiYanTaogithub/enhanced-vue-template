<template>
  <div class="page1">
    <h3>2.3 经营信息</h3>
    <div>
      <h3>动产抵押</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>登记日期</th>
          <th>登记编号</th>
          <th>公示日期</th>
          <th>被担保债权数额</th>
          <th>登记机关</th>
          <th>状态</th>
          <th>债务人履行债务的期限</th>
          <th>被担保债权种类</th>
        </tr>
        <tr v-for="(item, index) in dcdyList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.regDate }}</td>
          <td>{{ item.regNum }}</td>
          <td>{{ item.publishDate }}</td>
          <td>{{ item.amount }}</td>
          <td>{{ item.regDepartment }}</td>
          <td>{{ item.status }}</td>
          <td>{{ item.term }}</td>
          <td>{{ item.type }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>股权质押</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>出质人</th>
          <th>质权人</th>
          <th>出质股权数额</th>
          <th>公示日期</th>
          <th>股权出质登记日期</th>
          <th>状态</th>
        </tr>
        <tr v-for="(item, index) in gqzyList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.pledgor }}</td>
          <td>{{ item.pledgee }}</td>
          <td>{{ item.equityAmount }}</td>
          <td>{{ item.pubDate }}</td>
          <td>{{ item.regDate }}</td>
          <td>{{ item.state }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>经营异常</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>列入异常名录日期</th>
          <th>列入异常名录原因</th>
          <th>决定列入异常名录部门(作出决定机关)</th>
          <th>移除异常名录原因</th>
          <th>决定移除异常名录部门</th>
          <th>移除异常名录日期</th>
        </tr>
        <tr v-for="(item, index) in jyycList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.putDate }}</td>
          <td>{{ item.putReason }}</td>
          <td>{{ item.putDepartment }}</td>
          <td>{{ item.removeReason }}</td>
          <td>{{ item.removeDepartment }}</td>
          <td>{{ item.removeDate }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>税务评级</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>评价单位</th>
          <th>纳税人信用级别</th>
          <th>地域</th>
          <th>纳税人识别号</th>
        </tr>
        <tr v-for="(item, index) in swpjList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.evalDepartment }}</td>
          <td>{{ item.grade }}</td>
          <td>{{ item.base }}</td>
          <td>{{ item.idNumber }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>上市信息</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>是否上市公司</th>
          <th>公司简称</th>
          <th>证券简称</th>
          <th>股票代码</th>
          <th>证券市场</th>
        </tr>
        <tr v-for="(item, index) in ssxxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td></td>
          <td>{{ item.cid }}</td>
          <td></td>
          <td>{{ item.code }}</td>
          <td></td>
        </tr>
      </table>
    </div>

    <div>
      <h3>简易注销信息</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>企业名称</th>
          <th>登记机关</th>
          <th>公告期</th>
          <th>简易注销结果</th>
          <th>公告期</th>
        </tr>
        <tr v-for="(item, index) in jyzxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.companyName }}</td>
          <td>{{ item.regAuthority }}</td>
          <td>{{ item.announcementTerm }}</td>
          <td></td>
          <td>{{ item.announcementTerm }}</td>
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
      dcdyList: [],
      gqzyList: [],
      jyycList: [],
      swpjList: [],
      ssxxList: [],
      jyzxList: [],
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
      let dcdyList = this.reportData.dcdyList;
      if (dcdyList) {
        this.dcdyList = dcdyList;
      }

      //
      let gqzyList = this.reportData.gqzyList;
      if (gqzyList) {
        this.gqzyList = gqzyList;
      }

      //
      let jyycList = this.reportData.jyycList;
      if (jyycList) {
        this.jyycList = jyycList;
      }

      //
      let swpjList = this.reportData.swpjList;
      if (swpjList) {
        this.swpjList = swpjList;
      }

      //
      let ssxxList = this.reportData.ssxxList;
      if (ssxxList) {
        this.ssxxList = ssxxList;
      }

      //
      let jyzxList = this.reportData.jyzxList;
      if (jyzxList) {
        this.jyzxList = jyzxList;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
