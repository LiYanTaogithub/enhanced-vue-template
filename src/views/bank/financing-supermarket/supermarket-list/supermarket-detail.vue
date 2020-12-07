<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text" v-if="$route.query.type === '智能推荐'">
        融资超市 / 智能推荐 / 详情
      </div>
      <div class="text" v-else>融资超市 / 融资超市详情</div>
    </div>
    <div class="content">
      <div class="contentTitle">
        <span style="font-size: 30px">{{ detailData.loanOrder.entName }}</span>
        <div>
          <el-button
            type="primary"
            style="margin-right: 50px"
            @click="handleClaim"
            :disabled="disabled"
            >{{ title }}</el-button
          >
          <!-- <el-button>停用</el-button> -->
        </div>
        <span />
      </div>
      <div class="loanInfoContent">
        <div class="info-item">
          <span class="item-name">订单编号</span>
          <span>{{ detailData.loanOrder.code }}</span>
        </div>
        <div class="info-item">
          <span class="item-name">订单状态</span>
          <span>{{ detailData.loanOrder.statusTxt }}</span>
        </div>
        <div class="info-item">
          <span class="item-name">实际放款金额</span>
          <span>{{ detailData.loanOrder.bankLoanAmount }}万</span>
        </div>
        <div class="info-item">
          <span class="item-name">实际放款利率</span>
          <span>{{ detailData.loanOrder.bankLoanRate }}%</span>
        </div>
        <div class="info-item">
          <span class="item-name">实际放款期限</span>
          <span>{{ detailData.loanOrder.bankLoanLimit }}月</span>
        </div>
      </div>
      <div class="productDescription">
        <div class="descriptionTitle">贷款金额</div>
        <div class="info">
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">贷款金额</span>
              <span>{{ detailData.loanOrder.loanAmount }}万</span>
            </div>
            <div class="info-item">
              <span class="item-name">资金用途</span>
              <span>{{ detailData.loanOrder.loanUsed }}</span>
            </div>
            <!-- <div class="info-item">
              <span class="item-name">产品范围</span>
              <span>{{ detailData.loanOrder.scope }}</span>
            </div> -->
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">利率范围</span>
              <span>{{ detailData.loanOrder.loanRate }}%</span>
            </div>
            <div class="info-item">
              <span class="item-name">还款方式</span>
              <span>{{ detailData.loanOrder.repaymentType }}</span>
            </div>
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">贷款期限</span>
              <span>{{ detailData.loanOrder.loanLimit }}月</span>
            </div>
            <div class="info-item">
              <span class="item-name">担保类型</span>
              <span>{{ detailData.loanOrder.guaranteeType }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="productDescription">
        <div class="descriptionTitle">企业基本信息</div>
        <span>信用评分：9</span>
        <span>风险指数：80</span>
        <span>授信额度：100w</span>
        <div class="info">
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">企业名称</span>
              <span>{{ detailData.entInfo.entName }}</span>
            </div>
            <div class="info-item">
              <span class="item-name">法人姓名</span>
              <span>{{ detailData.entInfo.legalName }}</span>
            </div>
            <div class="info-item">
              <span class="item-name">地址</span>
              <span>{{ detailData.entInfo.address }}</span>
            </div>
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">统一社会信用代码</span>
              <span>{{ detailData.entInfo.creditCode }}</span>
            </div>
            <div class="info-item">
              <span class="item-name">身份证号</span>
              <span>{{ detailData.entInfo.legalCode }}</span>
            </div>
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">纳税人识别号</span>
              <span>{{ detailData.entInfo.taxpayerCode }}</span>
            </div>
            <div class="info-item">
              <span class="item-name">手机号</span>
              <span>{{ detailData.entInfo.legalPhone }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="productDescription">
        <div class="descriptionTitle">企业信用和风险信息</div>
        <div class="info">
          <div class="report-info">
            <div class="info-item">
              <span class="report-name">《风险量化报告》</span>
              <span
                style="margin-right: 50px; cursor: pointer"
                @click="riskReportVisible = true"
                >查看</span
              >
              <!-- <span>下载</span> -->
            </div>
            <div class="info-item">
              <span class="report-name">《信用评价报告》</span>
              <span
                style="margin-right: 50px; cursor: pointer"
                @click="creditReportVisible = true"
                >查看</span
              >
              <!-- <span>下载</span> -->
            </div>
            <!-- <div class="info-item">
              <span class="report-name">《企业体检报告》</span>
              <span style="margin-right: 50px">预览</span>
              <span>下载</span>
            </div> -->
          </div>
        </div>
      </div>
      <el-button type="primary" size="medium" @click="$router.go(-1)"
        >返回</el-button
      >
    </div>
    <el-dialog :visible.sync="riskReportVisible" width="851px">
      <template #title>
        <div class="btn-wrap">
          <el-button size="small" type="primary" @click="download"
            >下载</el-button
          >
        </div>
      </template>
      <risk-report :qymc="detailData.entInfo.entName" />
    </el-dialog>
    <el-dialog :visible.sync="creditReportVisible" width="851px">
      <template #title>
        <div class="btn-wrap">
          <el-button size="small" type="primary" @click="downloadCredit"
            >下载</el-button
          >
        </div>
      </template>
      <credit-report :qymc="detailData.entInfo.entName" />
    </el-dialog>
  </div>
</template>
<script>
import { getfinanceDetail, applyFinace } from "@/api/bank/index.js";
import riskReport from "@/views/components/report/reportDetails";
import creditReport from "@/views/creditReport";
import html2pdf from "@/utils/html2pdf";
export default {
  name: "Detail",
  components: { riskReport, creditReport },
  data() {
    return {
      creditReportVisible: false,
      riskReportVisible: false,
      detailData: null,
      title: "认领",
      disabled: false,
      repaymentTypeText: [],
      guaranteeTypeText: [],
      loanUsedText: [],
    };
  },
  mounted() {
    this.getMarketDetail();
  },
  methods: {
    async getMarketDetail() {
      const res = await getfinanceDetail(this.$route.query.id);
      this.detailData = res.data;
      // if (this.detailData.loanOrder.status === "10070") {
      //   this.title = "认领";
      // }
      let repaymentTypeArray = []; // 融资需求还款方式
      if (res.data.loanOrder.repaymentType) {
        repaymentTypeArray = res.data.loanOrder.repaymentType.split(",");
        repaymentTypeArray.map((item) => {
          if (item === "1") {
            this.repaymentTypeText.push("等额本金");
          }
          if (item === "2") {
            this.repaymentTypeText.push("等额本息");
          }
          if (item === "3") {
            this.repaymentTypeText.push("等本等息");
          }
          if (item === "4") {
            this.repaymentTypeText.push("先息后本");
          }
          if (item === "5") {
            this.repaymentTypeText.push("一次性还本付息");
          }
          if (item === "6") {
            this.repaymentTypeText.push("随借随还");
          }
          if (item === "7") {
            this.repaymentTypeText.push("其他");
          }
        });
        this.repaymentTypeText = this.repaymentTypeText.join(",");
      }
      let guaranteeTypeArray = []; // 担保方式
      if (res.data.loanOrder.guaranteeType) {
        guaranteeTypeArray = res.data.loanOrder.guaranteeType.split(",");
        guaranteeTypeArray.map((item) => {
          if (item === "1") {
            this.guaranteeTypeText.push("抵押");
          }
          if (item === "2") {
            this.guaranteeTypeText.push("质押");
          }
          if (item === "3") {
            this.guaranteeTypeText.push("一般保证");
          }
          if (item === "4") {
            this.guaranteeTypeText.push("信用");
          }
          if (item === "5") {
            this.guaranteeTypeText.push("连带责任保证");
          }
        });
        this.guaranteeTypeText = this.guaranteeTypeText.join(",");
      }
      let loanUsedTextArray = []; // 资金用途
      if (res.data.loanOrder.loanUsed) {
        loanUsedTextArray = res.data.loanOrder.loanUsed.split(",");
        loanUsedTextArray.map((item) => {
          if (item === "0") {
            this.loanUsedText.push("不限");
          }
          if (item === "1") {
            this.loanUsedText.push("流动资金贷款");
          }
          if (item === "2") {
            this.loanUsedText.push("固定资产贷款");
          }
          if (item === "3") {
            this.loanUsedText.push("项目融资");
          }
        });
        this.loanUsedText = this.loanUsedText.join(",");
      }
    },
    // 认领
    async applyFinace(id) {
      await applyFinace(id);
      this.getList();
    },
    handleClaim() {
      const id = this.$route.query.id;
      this.$confirm("确认认领代表你对该融资需求有意向，愿意贷款", "认领需求", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.applyFinace(id);
        })
        .then(() => {
          this.msgSuccess("认领成功，在我的申领中可查看该申请");
          this.title = "已认领";
        })
        .catch(function () {});
    },
    download() {
      html2pdf(document.querySelector("#report_cont"), "风险量化报告");
    },
    downloadCredit() {
      html2pdf(document.querySelector("#report_credit"), "信用评价报告");
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
  // width: 130px;
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

  /* font-size: 18px; */
}
.btn-wrap {
  margin-right: 60px;
  text-align: right;
}
</style>
