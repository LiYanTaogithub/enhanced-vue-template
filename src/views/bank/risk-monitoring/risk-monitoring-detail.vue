<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">风险监控 / 详情</div>
    </div>
    <div class="content">
      <div class="contentTitle">
        <span style="font-size: 30px">{{ entName }}</span>
      </div>
      <div class="loanInfoContent" v-if="$route.query.type === '融资'">
        <div class="info-item1">
          <div>
            <span class="item-name">贷款状态</span>
            <span>12313131</span>
          </div>
          <div style="margin-top: 10px">
            <span class="item-name">贷款订单</span>
            <span>{{ orderCode }}</span>
          </div>
        </div>
      </div>
      <div class="loanInfoContent" v-if="$route.query.type === '添加'">
        <div class="info-item">
          <div>
            <span class="item-name">添加时间</span>
            <span>{{ addTime }}</span>
          </div>
        </div>
      </div>
      <div class="tab">
        <el-button :class="{ active: index === 0 }" @click="index = 0"
          >突发性风险</el-button
        >
        <el-button :class="{ active: index === 1 }" @click="index = 1"
          >财务&经营风险</el-button
        >
        <el-button :class="{ active: index === 2 }" @click="index = 2"
          >用电数据风险</el-button
        >
        <el-button :class="{ active: index === 3 }" @click="handleBadInfo"
          >不良信息</el-button
        >
      </div>
      <div v-show="index === 0">
        <div
          class="productDescription"
          v-for="item in riskItem"
          :key="item.name"
        >
          <div class="descriptionTitle">{{ item.name }}</div>
          <div class="info">
            <div class="info-item" v-for="risk in item.risks" :key="risk.id">
              <el-checkbox-group v-model="ids">
                <el-checkbox
                  class="item-name"
                  :label="risk.id"
                  :disabled="
                    risk.value === null || risk.value === '' ? true : false
                  "
                  >{{ risk.name }}</el-checkbox
                >
              </el-checkbox-group>
              <div style="margin-left: 50px; color: red">{{ risk.value }}</div>
            </div>
          </div>
        </div>
        <!-- <div class="productDescription">
          <div class="descriptionTitle">司法风险</div>
          <div class="info">
            <div class="info-item" v-for="item in materialMatter" :key="item">
              <el-checkbox-group v-model="checkboxGroup1">
                <el-checkbox class="item-name" :label="item">{{
                  item
                }}</el-checkbox>
              </el-checkbox-group>
              <div style="margin-left: 50px">变更</div>
            </div>
          </div>
        </div>
        <div class="productDescription">
          <div class="descriptionTitle">经营风险</div>
          <div class="info">
            <div class="info-item" v-for="item in materialMatter" :key="item">
              <el-checkbox-group v-model="checkboxGroup1">
                <el-checkbox class="item-name" :label="item">{{
                  item
                }}</el-checkbox>
              </el-checkbox-group>
              <div style="margin-left: 50px">变更</div>
            </div>
          </div>
        </div> -->
        <el-button type="primary" size="medium" @click="$router.go(-1)"
          >返回</el-button
        >
        <el-button
          type="primary"
          size="medium"
          style="margin-left: 30px"
          @click="removeRisks"
          >解除风险</el-button
        >
      </div>
      <div v-show="index === 1">
        <operation-risk
          v-if="financialRisk.length !== 0"
          :financialRiskData="financialRisk"
        ></operation-risk>
      </div>
      <div v-show="index === 2">
        <data-risk
          v-if="electricityRisk.length !== 0"
          :electricityRiskData="electricityRisk"
        ></data-risk>
      </div>
      <div v-show="index === 3">
        <el-table :data="productList" @selection-change="handleSelectionChange">
          <!-- <el-table-column type="selection" width="55" align="center" /> -->
          <el-table-column label="企业编号" align="center" prop="entCode">
            <template slot-scope="scope">
              <span
                style="margin-left: 10px; color: #1890ff; cursor: pointer"
                @click="handlebtn(scope.row)"
                >{{ scope.row.entCode }}</span
              >
            </template>
          </el-table-column>
          <el-table-column label="企业名称" align="center" prop="entName" />
          <el-table-column
            label="重大事项变更"
            align="center"
            prop="majorChange"
          />
          <el-table-column label="司法风险" align="legalRisk" />
          <el-table-column
            label="经营风险"
            align="center"
            prop="managementRisk"
          >
          </el-table-column>
          <el-table-column
            label="财务&经营风险"
            align="center"
            prop="financialOperationRisk"
          />
          <el-table-column
            label="用电数据风险"
            align="center"
            prop="electricityDataRisk"
          />
        </el-table>

        <el-pagination
          :current-page.sync="pageNum"
          :page-size="pageSize"
          layout="total, prev, pager, next"
          :total="total"
          @size-change="onSizeChange"
          @current-change="onCurrentChange"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { riskDetail, removeRisk, badInfo } from "@/api/bank/index.js";
import operationRisk from "./operation-risk";
import dataRisk from "./data-risk";
export default {
  name: "Detail",
  components: {
    operationRisk,
    dataRisk,
  },
  data() {
    return {
      index: 0,
      checkboxGroup1: [],
      riskItem: [],
      financialRisk: [],
      electricityRisk: [],
      materialMatter: [
        "法定代表人变更",
        "注册资本变更",
        "注册地址变更",
        "股东变更",
      ],
      ids: [],
      entName: "------",
      addTime: "------",
      orderCode: "------",
      total: 0,
      pageNum: 1,
      pageSize: 10,
    };
  },
  created() {
    this.getriskDetail();
  },
  methods: {
    // 分页功能
    onCurrentChange(val) {
      this.pageNum = val;
      this.getBadInfo();
    },
    onSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getBadInfo();
    },
    async getriskDetail() {
      let res = await riskDetail(this.$route.query.name);
      console.log(res);
      this.entName = res.data.entName;
      this.addTime = res.data.addTime;
      this.riskItem = res.data.suddenRisk;
      this.orderCode = res.data.orderCode;
      this.financialRisk = res.data.financialRisk;
      this.electricityRisk = res.data.electricityRisk;
    },
    async removeRisks() {
      if (this.ids.length === 0) {
        this.$message.warning("请选择要解除的风险项");
        return false;
      }
      console.log(this.ids);
      console.log(this.ids.join(","));
      let res = await removeRisk(this.ids.join(","));
      console.log(res);
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.ids = [];
        this.getriskDetail();
      }
    },
    handleBadInfo() {
      this.index = 3;
      this.getBadInfo;
    },
    async getBadInfo() {
      await badInfo({
        company: this.$route.query.name,
        pageIndex: this.pageNum,
        pageSize: this.pageSize,
      });
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
  margin-bottom: 10px;
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
  width: 100%;
  padding: 10px;
  background: #eee;
}
.loan-info {
  display: flex;
  flex-direction: row;
  // justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
}
.info-item {
  display: flex;
  // flex-direction: column;
  // width: 33%;

  margin: 15px 0;
  // color: #057af3;
}
.info-item1 {
  display: flex;
  flex-direction: column;
  margin: 15px 0;
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
.tab {
  margin-bottom: 30px;
  border-bottom: #ccc 1px solid;
}
.active {
  color: #057af3;
}
</style>
