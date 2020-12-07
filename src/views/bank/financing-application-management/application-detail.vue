<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">融资申请管理 / 详情</div>
    </div>
    <div class="content">
      <div class="contentTitle">
        <span style="font-size: 30px">{{ detailData.loanOrder.entName }}</span>
        <div>
          <el-button
            type="primary"
            style="margin-right: 50px"
            v-if="statusText !== ''"
            @click="handleClick"
            >{{ statusText }}</el-button
          >
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
      <!-- 融资需求 -->
      <div class="productDescription">
        <div class="descriptionTitle">融资需求</div>
        <div class="info">
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">贷款金额</span>
              <span>{{ detailData.loanOrder.loanAmount }}万</span>
            </div>
            <div class="info-item">
              <span class="item-name">资金用途</span>
              <span v-if="loanUsedText.length !== 0">{{ loanUsedText }}</span>
            </div>
            <div class="info-item">
              <span class="item-name">产品范围</span>
              <span>{{ detailData.loanOrder.scope }}</span>
            </div>
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">利率范围</span>
              <span>{{ detailData.loanOrder.loanRate }}%</span>
            </div>
            <div class="info-item">
              <span class="item-name">还款方式</span>
              <span v-if="repaymentTypeText.length !== 0">{{
                repaymentTypeText
              }}</span>
            </div>
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">贷款期限</span>
              <span>{{ detailData.loanOrder.loanLimit }}月</span>
            </div>
            <div class="info-item">
              <span class="item-name">担保类型</span>
              <span v-if="guaranteeTypeText.length !== 0">{{
                guaranteeTypeText
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 产品信息 -->
      <div class="productDescription">
        <div class="descriptionTitle">产品信息</div>
        <div class="info">
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">产品名称</span>
              <span>{{ detailData.loanOrder.productName }}</span>
            </div>
            <div class="info-item">
              <span class="item-name">贷款金额</span>
              <span>{{ detailData.loanOrder.productAmountStart }}万</span>
            </div>
            <div class="info-item">
              <span class="item-name">产品范围</span>
              <span>{{ detailData.loanOrder.productApplyScopeTxt }}</span>
            </div>
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">利率范围</span>
              <span>{{ detailData.loanOrder.productRate }}%</span>
            </div>
            <div class="info-item">
              <span class="item-name">还款方式</span>
              <span v-if="productRepaymentTypeText !== 0">{{
                productRepaymentTypeText
              }}</span>
            </div>
          </div>
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">贷款期限</span>
              <span>{{ detailData.loanOrder.productLimitStart }}月</span>
            </div>
            <div class="info-item">
              <span class="item-name">担保类型</span>
              <span v-if="productGuaranteeTypeText.length !== 0">{{
                productGuaranteeTypeText
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 企业基本信息 -->
      <div class="productDescription">
        <div class="descriptionTitle">企业基本信息</div>
        <div class="info">
          <div class="loan-info">
            <div class="info-item">
              <span class="item-name">企业名称</span>
              <span>{{ detailData.loanOrder.entName }}</span>
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
        <div class="descriptionTitle">企业已提交的材料</div>
        <div class="MaterialInfo">
          <div
            class="report-info"
            v-for="item in detailData.loanOrderMaterials"
            :key="item.id"
          >
            <div class="info-item">
              <a class="report-name" :href="item.attachment">{{ item.name }}</a>
              <a
                style="margin-right: 50px"
                :href="item.attachment"
                target="_blank"
                >预览</a
              >
              <a :href="item.attachment">下载</a>
            </div>
          </div>
        </div>
      </div>
      <div class="productDescription">
        <div class="descriptionTitle">活体认证结果</div>
        <div class="info">
          <div class="report-info">
            <div
              class="info-item"
              v-for="item in detailData.faceList"
              :key="item.id"
            >
              <span class="report-name">{{ item.type }}</span>
              <span style="margin-right: 50px">已认证成功</span>
            </div>
            <!-- <div class="info-item">
              <span class="report-name">本人活体认证</span>
              <span style="margin-right: 50px">已认证成功</span>
            </div>
            <div class="info-item">
              <span class="report-name">父母活体认证</span>
              <span style="margin-right: 50px">已认证成功</span>
            </div> -->
          </div>
        </div>
      </div>
      <div class="productDescription">
        <div class="descriptionTitle">企业尚未结清贷款</div>
        <el-table
          ref="singleTable"
          :data="detailData.notFinishList"
          highlight-current-row
          style="width: 100%"
        >
          <el-table-column property="entName" label="企业名称">
          </el-table-column>
          <el-table-column property="productName" label="产品名称">
          </el-table-column>
          <el-table-column property="loanRate" label="贷款利率">
          </el-table-column>
          <el-table-column property="loanAmount" label="贷款额度">
          </el-table-column>
          <el-table-column property="loanLimit" label="贷款期限">
          </el-table-column>
          <el-table-column property="scope" label="地区"> </el-table-column>
          <el-table-column property="statusTxt" label="订单状态">
          </el-table-column>
        </el-table>
      </div>
      <!-- <el-button type="primary" size="medium">返回</el-button> -->
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
          </div>
          <div class="info-item">
            <span class="report-name">《信用评价报告》</span>
            <span
              style="margin-right: 50px; cursor: pointer"
              @click="creditReportVisible = true"
              >查看</span
            >
          </div>
        </div>
      </div>
    </div>
    <div class="productDescription">
      <div class="descriptionTitle">还款状态标记历史</div>
      <el-table
        ref="singleTable"
        :data="detailData.paymentHistory"
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column property="orderStatus" label="还款状态">
        </el-table-column>
        <el-table-column property="dateStr" label="还款时间"> </el-table-column>
        <!-- <el-table-column property="date" label="标记时间"> </el-table-column> -->
      </el-table>
    </div>
    <el-button type="primary" size="medium">返回</el-button>

    <el-dialog :visible.sync="riskReportVisible" width="851px">
      <template #title>
        <div class="btn-wrap">
          <el-button size="small" type="primary" @click="download"
            >下载</el-button
          >
        </div>
      </template>
      <risk-report :qymc="detailData.loanOrder.entName" />
    </el-dialog>
    <el-dialog :visible.sync="creditReportVisible" width="851px">
      <template #title>
        <div class="btn-wrap">
          <el-button size="small" type="primary" @click="downloadCredit"
            >下载</el-button
          >
        </div>
      </template>
      <credit-report :qymc="detailData.loanOrder.entName" />
    </el-dialog>
    <el-dialog
      :title="type"
      :visible.sync="isshow"
      width="600px"
      font-size="15px"
    >
      <div v-if="type === '审核'">
        <span>审核结果是：</span>
        <el-radio-group v-model="auditResult">
          <el-radio :label="1">同意贷款</el-radio>
          <el-radio :label="2">拒绝贷款</el-radio>
        </el-radio-group>
        <el-form label-width="120px" v-show="auditResult === 2">
          <el-form-item label="拒绝原因类型:" style="margin-top: 10px">
            <el-select v-model="refuseReasonType" placeholder="请选择">
              <el-option
                v-for="item in ReasonTypeOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="拒绝原因描述">
            <el-input
              type="textarea"
              maxlength="200"
              style="width: "
              v-model="refuseReason"
            ></el-input>
          </el-form-item>
        </el-form>

        <div
          v-show="auditResult === 1"
          style="margin-top: 20px; margin-left: 100px"
        >
          同意贷款后，表示您已完成企业调研等，之后记得给企业放款哦
        </div>
        <div
          v-show="auditResult === 2"
          style="margin-top: 20px; margin-left: 100px"
        >
          确定拒绝贷款后，您将无法在对接该申请，请确定是否拒绝放款。
        </div>
      </div>
      <div v-if="type === '放款完成'">
        <el-form
          ref="loanFinishData"
          label-position="right"
          :rules="rules"
          label-width="100px"
          :model="formData"
        >
          <el-form-item label="放款金额:" prop="amount">
            <el-input
              v-model="loanFinishData.amount"
              placeholder="请输入放款金额"
              clearable
              :style="{ width: '90%' }"
              @blur="number($event, '放款金额')"
              :disabled="loanFinishStatu"
            />
            万
          </el-form-item>
          <el-form-item label="利率:" prop="rate">
            <el-input
              v-model="loanFinishData.rate"
              placeholder="请输入利率"
              clearable
              :style="{ width: '90%' }"
              @blur="str($event)"
              :disabled="loanFinishStatu"
            />
            %
          </el-form-item>
          <el-form-item label="期限:" prop="limit">
            <el-input
              v-model="loanFinishData.limit"
              placeholder="请输入期限"
              clearable
              :style="{ width: '90%' }"
              @blur="number($event, '期限')"
              :disabled="loanFinishStatu"
            />
            月
          </el-form-item>
        </el-form>
      </div>
      <div v-if="type === '还款状态标注'">
        <!-- <div style="margin: 10px 0">
          <span>订单状态：</span>
          <el-radio-group v-model="loanStatusUpdate.orderStatus">
            <el-radio :label="1">还款中</el-radio>
            <el-radio :label="2">已还款</el-radio>
          </el-radio-group>
        </div> -->
        <div style="margin: 10px 0" v-if="loanStatusUpdate.orderStatus !== 2">
          <span>还款状态：</span>
          <el-radio-group v-model="loanStatusUpdate.status">
            <el-radio :label="1">正常还款</el-radio>
            <el-radio :label="2">逾期还款</el-radio>
            <el-radio :label="3">逾期未还</el-radio>
          </el-radio-group>
        </div>
        <!-- <div
          style="
            display: flex;
            flex-direction: row;
            align-items: center;
            margin: 10px;
          "
          v-if="loanStatusUpdate.orderStatus !== 2"
        >
          <label>还款日期：</label>
          <el-date-picker
            v-model="loanStatusUpdate.dateStr"
            type="date"
            placeholder="选择日期"
          >
          </el-date-picker>
        </div>
        <div v-show="loanStatusUpdate.orderStatus === 2" style="color: red">
          确认标记已还款之后，表示该订单款项全部还款完成
        </div> -->
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isshow = false">取 消</el-button>
        <el-button type="primary" @click="submitAudit('formData')"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
  <!-- </div> -->
</template>
<script>
import {
  getfinanceDetail,
  financeloanAuditSubmit,
  financeLoanFinish,
  financeloanStatusUpdate,
} from "@/api/bank/index.js";
import riskReport from "@/views/components/report/reportDetails";
import creditReport from "@/views/creditReport";
import html2pdf from "@/utils/html2pdf";
export default {
  name: "Detail",
  components: { riskReport, creditReport },
  data() {
    return {
      riskReportVisible: false,
      creditReportVisible: false,
      tableData: [],
      detailData: null,
      statusText: "",
      isshow: false,
      auditResult: "",
      optionId: "",
      orderStatus: "",
      repaymentDate: "",
      repaymentStatus: "",
      refuseReasonType: "",
      refuseReason: "",
      ReasonTypeOptions: [
        {
          label: "材料缺失",
          value: "材料缺失",
        },
        {
          label: "信用评分太低",
          value: "信用评分太低",
        },
        {
          label: "风险太高",
          value: "风险太高",
        },
      ],
      type: "",
      loanFinishData: {
        orderId: "",
        amount: null,
        limit: null,
        rate: null,
        type: null,
      },
      loanStatusUpdate: {
        orderId: "",
        // dateStr: "",
        // orderStatus: "",
        status: "",
      },
      orderType: null,
      loanFinishStatu: false,
      productRepaymentTypeText: [],
      productGuaranteeTypeText: [],
      repaymentTypeText: [],

      guaranteeTypeText: [],
      loanUsedText: [],
    };
  },
  created() {
    this.getgetDetail();
    // this.orderType = this.$route.path.query.type; // 快贷或非快贷
  },
  methods: {
    async getgetDetail() {
      let res = await getfinanceDetail(this.$route.query.id);
      this.detailData = res.data;
      this.optionId = res.data.loanOrder.id;
      this.orderType = res.data.loanOrder.type === "1" ? "1" : "2"; // 快贷或非快贷
      if (res.data.loanOrder.status === "10050" && this.orderType !== "1") {
        this.statusText = "审核";
      } else if (res.data.loanOrder.status === "10100") {
        this.statusText = "放款完成";
      } else if (
        res.data.loanOrder.status === "10110" ||
        res.data.loanOrder.status === "10120"
      ) {
        this.statusText = "还款状态标注";
      } else {
        this.statusText = "";
      }
      let productRepaymentTypeArray = []; // 融资需求还款方式
      if (res.data.loanOrder.productRepaymentType) {
        productRepaymentTypeArray = res.data.loanOrder.productRepaymentType.split(
          ","
        );
        productRepaymentTypeArray.map((item) => {
          if (item === "1") {
            this.productRepaymentTypeText.push("等额本金");
          }
          if (item === "2") {
            this.productRepaymentTypeText.push("等额本息");
          }
          if (item === "3") {
            this.productRepaymentTypeText.push("等本等息");
          }
          if (item === "4") {
            this.productRepaymentTypeText.push("先息后本");
          }
          if (item === "5") {
            this.productRepaymentTypeText.push("一次性还本付息");
          }
          if (item === "6") {
            this.productRepaymentTypeText.push("随借随还");
          }
          if (item === "7") {
            this.productRepaymentTypeText.push("其他");
          }
        });
        this.productRepaymentTypeText = this.productRepaymentTypeText.join(",");
      }
      let productGuaranteeTypeArray = []; // 融资需求担保方式
      if (res.data.loanOrder.productGuaranteeType) {
        productGuaranteeTypeArray = res.data.loanOrder.productGuaranteeType.split(
          ","
        );
        productGuaranteeTypeArray.map((item) => {
          if (item === "1") {
            this.productGuaranteeTypeText.push("抵押");
          }
          if (item === "2") {
            this.productGuaranteeTypeText.push("质押");
          }
          if (item === "3") {
            this.productGuaranteeTypeText.push("一般保证");
          }
          if (item === "4") {
            this.productGuaranteeTypeText.push("信用");
          }
          if (item === "5") {
            this.productGuaranteeTypeText.push("连带责任保证");
          }
        });
        this.productGuaranteeTypeText = this.productGuaranteeTypeText.join(",");
      }
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

    // 校验
    number(e, name) {
      let flag = new RegExp("^[1-9]([0-9])*$").test(e.target.value);
      if (!flag) {
        this.$message({
          showClose: true,
          message: name + "请输入正整数",
          type: "warning",
        });
      }
    },
    str(e) {
      console.log(e);
      let num = e.target.value;
      //限制只能输入一个小数点
      if (num.indexOf(".") != -1) {
        var num_ = num.substr(num.indexOf(".") + 1);
        if (num_.indexOf(".") != -1) {
          num = num.substr(0, num.indexOf(".") + num_.indexOf(".") + 1);
        }
      }
    },
    // 审核
    async applyFinace() {
      // alert("....");
      let res = await financeloanAuditSubmit({
        result: this.auditResult,
        refuseReasonType: this.refuseReasonType,
        refuseReason: this.refuseReason,
        orderId: this.optionId,
      });
      if (res.code === 200) {
        this.isshow = false;
        this.$message.success("操作成功");
        this.getgetDetail();
      }
    },
    // 放款完成
    async loanFinish() {
      this.loanFinishData.orderId = this.optionId;
      this.loanFinishData.type = this.orderType;
      let res = await financeLoanFinish(this.loanFinishData);
      if (res.code === 200) {
        this.isshow = false;
        this.$message.success("操作成功");
        this.getgetDetail();
      }
    },
    // 放款状态标注
    async loanStatusUpdates() {
      this.loanStatusUpdate.orderId = this.optionId;
      let res = await financeloanStatusUpdate(this.loanStatusUpdate);
      if (res.code === 200) {
        this.isshow = false;
        this.$message.success("操作成功");
        this.getgetDetail();
      }
    },
    handleClick() {
      this.isshow = true;
      this.type = this.statusText;
      if (this.orderType === "1" && this.type === "放款完成") {
        this.loanFinishData.amount = this.detailData.loanOrder.bankLoanAmount;
        this.loanFinishData.limit = this.detailData.loanOrder.bankLoanLimit;
        this.loanFinishData.rate = this.detailData.loanOrder.bankLoanRate;
        this.loanFinishStatu = true;
      }
    },
    submitAudit() {
      if (this.type === "审核") {
        this.applyFinace();
      } else if (this.type === "放款完成") {
        this.loanFinish();
      } else if (this.type === "还款状态标注") {
        this.loanStatusUpdates();
      }
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
  // flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  background: #eee;
}
.MaterialInfo {
  display: flex;
  flex-direction: column;
  // justify-content: space-between;
  padding: 10px;
  background: #eee;
}
.info-item {
  margin: 15px 0;
  // color: #057af3;
}
.item-name {
  display: inline-block;
  // width: 150px;
  margin-right: 30px;
  color: rgba(0, 0, 0, 0.5);
}
.report-name {
  display: inline-block;
  // width: 150px;
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
.btn-wrap {
  margin-right: 60px;
  text-align: right;
}

/* ::v-deep .el-dialog__body {
  height: 600px;
  overflow-y: scroll;
} */
</style>
