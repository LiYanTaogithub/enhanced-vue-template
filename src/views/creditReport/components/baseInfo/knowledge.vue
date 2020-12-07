<template>
  <div class="page1">
    <h3>2.6 知识产权</h3>
    <div>
      <h3>专利信息</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>公开公告日</th>
          <th>名称</th>
          <th>申请号/专利号</th>
          <th>申请公布号</th>
          <th>专利类型</th>
          <th>发明人</th>
        </tr>
        <tr v-for="(item, index) in szZlxxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.pubDate }}</td>
          <td>{{ item.title }}</td>
          <td>{{ item.appNumber }}</td>
          <td>{{ item.pubNumber }}</td>
          <td>{{ item.patType }}</td>
          <td>{{ item.inventorName }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>软件著作权</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>首次发表时间</th>
          <th>登记时间</th>
          <th>全称</th>
          <th>简称</th>
          <th>分类号</th>
          <th>版本号</th>
          <th>登记号</th>
          <th>著作权人</th>
        </tr>
        <tr v-for="(item, index) in szRjzzqList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.publishTime }}</td>
          <td>{{ item.regTime }}</td>
          <td>{{ item.fullName }}</td>
          <td>{{ item.simpleName }}</td>
          <td>{{ item.catNum }}</td>
          <td>{{ item.version }}</td>
          <td>{{ item.regNum }}</td>
          <td>{{ item.authorNationality }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>商标信息</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>专用权期限开始日期</th>
          <th>商品/服务</th>
          <th>商标名称</th>
          <th>商标类型</th>
          <th>国际分类</th>
          <th>商标状态</th>
          <th>专用权期限结束日期</th>
        </tr>
        <tr v-for="(item, index) in szSbxxList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.privateDateStart }}</td>
          <td></td>
          <td>{{ item.tmName }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.intCls }}</td>
          <td>{{ item.status ? sbtype[item.status] : "" }}</td>
          <td>{{ item.privateDateEnd }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>作品著作权</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>作品名称</th>
          <th>登记号</th>
          <th>作品类别</th>
          <th>创作完成日期</th>
          <th>登记日期</th>
          <th>著作权人</th>
        </tr>
        <tr v-for="(item, index) in szZpzzqList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.regNum }}</td>
          <td>{{ item.type }}</td>
          <td>{{ item.finishTime }}</td>
          <td>{{ item.regTime }}</td>
          <td>{{ item.author }}</td>
        </tr>
      </table>
    </div>

    <div>
      <h3>网站备案</h3>
      <table>
        <tr>
          <th>序号</th>
          <th>检查时间</th>
          <th>公司类型</th>
          <th>网站名称</th>
          <th>域名</th>
          <th>许可证</th>
        </tr>
        <tr v-for="(item, index) in szWzymbaList" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.examineDate }}</td>
          <td>{{ item.companyType }}</td>
          <td>{{ item.webName }}</td>
          <td>{{ item.domain }}</td>
          <td>{{ item.webBaxh }}</td>
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
      sbtype: ["", "有效", "无效", "待审", "不定", "未知状态"],
      szZlxxList: [],
      szRjzzqList: [],
      szSbxxList: [],
      szZpzzqList: [],
      szWzymbaList: [],
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
      this.makeData("szZlxxList");
      this.makeData("szRjzzqList");
      this.makeData("szSbxxList");
      this.makeData("szZpzzqList");
      this.makeData("szWzymbaList");
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
