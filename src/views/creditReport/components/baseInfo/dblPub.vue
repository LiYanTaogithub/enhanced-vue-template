<template>
  <div class="page1">
    <h3>2.4 双公示及资质信息</h3>
    <div>
      <h3>行政许可</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>行政许可文书号</th>
          <th>许可内容</th>
          <th>许可证书名称</th>
          <th>许可决定机关</th>
          <th>许可决定日期</th>
          <th>许可截止日期</th>
        </tr>
        <tr v-for="(item, index) in xzxkList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.licenseNumber }}</td>
          <td></td>
          <td></td>
          <td>{{ item.department }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.endDate }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>行政处罚</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>作出行政处罚决定日期</th>
          <th>行政处罚决定书文号</th>
          <th>名称</th>
          <th>违法行为类型</th>
          <th>行政处罚内容</th>
          <th>作出行政处罚决定机关名称</th>
          <th>省份</th>
        </tr>
        <tr v-for="(item, index) in xzcfList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.decisionDate }}</td>
          <td>{{ item.punishNumber }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.content }}</td>
          <td>{{ item.departmentName }}</td>
          <td>{{ item.base }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>资质证书</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>证书类型</th>
          <th>证书编号</th>
          <th>证书生效日期</th>
          <th>证书到期日</th>
        </tr>
        <tr v-for="(item, index) in zizhixxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.licenseNumber }}</td>
          <td>{{ item.startDate }}</td>
          <td>{{ item.endDate }}</td>
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
      xzxkList: [],
      xzcfList: [],
      zizhixxList: [],
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
      let xzxkList = this.reportData.xzxkList;
      if (xzxkList) {
        this.xzxkList = xzxkList;
      }

      //
      let xzcfList = this.reportData.xzcfList;
      if (xzcfList) {
        this.xzcfList = xzcfList;
      }

      //
      let zizhixxList = this.reportData.zizhixxList;
      if (zizhixxList) {
        this.zizhixxList = zizhixxList;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
