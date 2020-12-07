<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">融资超市 / 智能推荐 / 详情</div>
    </div>
    <div class="content">
      <div class="contentTitle">
        <span style="font-size: 30px">北京XXXXXXXX有限公司</span>
        <div>
          <el-button type="primary" style="margin-right: 50px">标记</el-button>
          <!-- <el-button>停用</el-button> -->
        </div>
        <span />
      </div>
      <div class="loanInfoContent">
        <div>
          <div class="info-item">
            <span class="item-name">注册资本</span>
            <span>12313131</span>
          </div>
          <div class="info-item">
            <span class="item-name">所属地区</span>
            <span>待认领</span>
          </div>
        </div>
        <div>
          <div class="info-item">
            <span class="item-name">注册资本</span>
            <span>12313131</span>
          </div>
          <div class="info-item">
            <span class="item-name">订单状态</span>
            <span>待认领</span>
          </div>
        </div>
        <div>
          <div class="info-item">
            <span class="item-name">注册资本</span>
            <span>12313131</span>
          </div>
          <div class="info-item">
            <span class="item-name">订单状态</span>
            <span>待认领</span>
          </div>
        </div>
      </div>
      <div class="productDescription">
        <div class="descriptionTitle">企业信用评价报告</div>
        <div class="info">
          <div class="report-info">
            <div class="info-item">
              <span class="report-name">《企业信用报告》</span>
              <span style="margin-right: 50px">预览</span>
              <span>下载</span>
            </div>
          </div>
        </div>
      </div>
      <el-button type="primary" size="medium" @click="$router.go(-1)"
        >返回</el-button
      >
    </div>
  </div>
</template>
<script>
import { electricityDetail } from "@/api/bank/index.js";
export default {
  name: "Detail",
  mounted() {
    this.getElectricityDetail();
  },
  methods: {
    async getElectricityDetail() {
      await electricityDetail(this.$route.query.id);
    },
  },
};
</script>
<style lang="scss" scoped>
.modelContainer {
  height: 100%;
  margin: 10px;
  padding: 30px;
  background: #fff;
}
.title {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  .box {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    background: #057af3;
  }
  .text {
    display: inline-block;
  }
}
.contentTitle {
  display: flex;
  justify-content: space-between;
}
.loanInfoContent {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  font-size: 16px;
  border-bottom: 1px solid rgba($color: #000, $alpha: 0.2);
}
.productDescription {
  margin-bottom: 30px;
}
.info {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: #eee;
}
.info-item {
  margin: 15px 0;
  // color: #057af3;
}
.item-name {
  display: inline-block;
  width: 150px;
  margin-right: 30px;
  color: rgba(0, 0, 0, 0.5);
}
.report-name {
  display: inline-block;
  width: 150px;
  margin-right: 30px;
}
.report-info {
  .info-item {
    color: #057af3;
  }
}
.descriptionTitle {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 22px;
}
.el-button {
  margin: 30px 0;
  font-size: 18px;
}
</style>
