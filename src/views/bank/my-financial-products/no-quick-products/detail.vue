<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">金融产品列表按 / 产品详情</div>
    </div>
    <div class="content">
      <div class="contentTitle">
        <span style="font-size: 30px">{{ formData.name }}</span>
        <div>
          <el-button
            v-if="formData.status !== '1'"
            type="primary"
            style="margin-right: 50px"
            @click="handleUpdate"
            >修改</el-button
          >
          <el-button
            v-if="formData.status === '2' && noUsing"
            @click="handleStop"
            >停用</el-button
          >
        </div>
        <span />
      </div>
      <div class="loanInfoContent">
        <div class="loan-info">
          <div class="info-item">
            <span class="item-name">产品编号</span>
            <span>{{ formData.code }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">贷款期限</span>
            <span>{{ formData.limitStart }}-{{ formData.limitEnd }}月</span>
          </div>
          <div class="info-item">
            <span class="item-name">产品状态</span>
            <span v-if="formData.status === '1'" style="margin-left: 10px"
              >审核中</span
            >
            <span v-if="formData.status === '2'" style="margin-left: 10px"
              >启用</span
            >
            <span v-if="formData.status === '3'" style="margin-left: 10px"
              >停用</span
            >
            <span v-if="formData.status === '4'" style="margin-left: 10px"
              >审核未通过</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">所属行业</span>
            <span>{{ formData.applyIndustryTxt }}</span>
          </div>
          <div class="info-item" v-if="formData.status === '4'">
            <span class="item-name">审核未通过原因</span>
            <span>{{ formData.reasonType }}</span>
          </div>

          <div class="info-item" v-if="formData.type !== '1'">
            <span class="item-name">所需材料</span>
            <a
              :href="item.urlAddress"
              v-for="(item, index) in formData.bankProductMaterials"
              :key="index"
              style="margin-right: 10px; color: #2595f5"
              >{{ item.fileName }}</a
            >
          </div>
          <div style="display: flex; color: rgba(0, 0, 0, 0.5)">
            产品logo
            <img
              :src="formData.logo"
              alt="产品logo"
              style="width: 150px; height: 150px; margin-left: 20px"
            />
          </div>
        </div>
        <div class="loan-info">
          <div class="info-item">
            <span class="item-name">利率范围</span>
            <span>{{ formData.rateStart }}-{{ formData.rateEnd }} %</span>
          </div>
          <div class="info-item">
            <span class="item-name">担保方式</span>
            <span>{{ guaranteeTypeText }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">适用范围</span>
            <span>{{ formData.applyScopeTxt }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">个人意向书</span>
            <a
              v-if="formData.intentionUrl"
              :href="formData.intentionUrl"
              style="color: #2595f5"
              >《个人意向书》</a
            >
          </div>
        </div>
        <div class="loan-info">
          <div class="info-item">
            <span class="item-name">贷款额度</span>
            <span>{{ formData.amountStart }}-{{ formData.amountEnd }}万</span>
          </div>
          <div class="info-item">
            <span class="item-name">还款方式</span>
            <span>{{ repaymentTypeText }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">活体验证人员</span>
            <span>{{ formData.livingObj }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">风险告知书</span>
            <a
              v-if="formData.riskUrl"
              :href="formData.riskUrl"
              style="color: #2595f5"
              >《风险告知书》</a
            >
          </div>
        </div>
      </div>
      <div style="margin-bottom: 50px; font-weight: bold; font-size: 22px">
        本产品适用企业
      </div>
      <div class="loanInfoContent">
        <div class="loan-info">
          <div class="info-item">
            <span class="item-name">前十大客户集中度</span>
            <span
              v-if="
                formData.customerConcentrationTopTenStart ||
                formData.customerTransactionProportionEnd
              "
              >{{ formData.customerConcentrationTopTenStart }}-{{
                formData.customerTransactionProportionEnd
              }}%</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">营业收入</span>
            <span v-if="formData.limitStart || formData.limitEnd"
              >{{ formData.limitStart }}-{{ formData.limitEnd }}万</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">资金用途</span>
            <span v-if="capitalUsesText.length > 0">{{ capitalUsesText }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">纳税时长</span>
            <span v-if="formData.cxTaxPaymentStart || formData.cxTaxPaymentEnd"
              >{{ formData.cxTaxPaymentStart }}-{{
                formData.cxTaxPaymentEnd
              }}年</span
            >
          </div>
        </div>
        <div class="loan-info">
          <div class="info-item">
            <span class="item-name">供应商关联交易占比</span>
            <span
              v-if="
                formData.supplierTransactionProportionStart ||
                formData.supplierTransactionProportionEnd
              "
              >{{ formData.supplierTransactionProportionStart }}-{{
                formData.supplierTransactionProportionEnd
              }}
              %</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">供应商集中度</span>
            <span
              v-if="
                formData.supplierConcentrationStart ||
                formData.supplierConcentrationEnd
              "
              >{{ formData.supplierConcentrationStart }}-{{
                formData.supplierConcentrationEnd
              }}%</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">净利润</span>
            <span v-if="formData.netProfitStart || formData.netProfitEnd"
              >{{ formData.netProfitStart }}-{{ formData.netProfitEnd }}万</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">资产负债率</span>
            <span
              v-if="
                formData.assetLiabilityRatioStart ||
                formData.assetLiabilityRatioEnd
              "
              >{{ formData.assetLiabilityRatioStart }}-{{
                formData.assetLiabilityRatioEnd
              }}%</span
            >
          </div>
        </div>
        <div class="loan-info">
          <div class="info-item">
            <span class="item-name">客户关联交易占比</span>
            <span
              v-if="
                formData.customerTransactionProportionStart ||
                formData.customerTransactionProportionEnd
              "
              >{{ formData.customerTransactionProportionStart }}-{{
                formData.customerTransactionProportionEnd
              }}%</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">成立年限</span>
            <span v-if="formData.setUpYearStart || formData.setUpYearEnd"
              >{{ formData.setUpYearStart }}-{{ formData.setUpYearEnd }}年</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">年纳税额</span>
            <span v-if="formData.taxPayableStart || formData.taxPayableEnd"
              >{{ formData.taxPayableStart }}-{{
                formData.taxPayableEnd
              }}万</span
            >
          </div>
          <div class="info-item">
            <span class="item-name">纳税信用等级</span>
            <span>{{ formData.creditRating }}</span>
          </div>
        </div>
      </div>
      <div class="productDescription">
        <div class="descriptionTitle">产品描述</div>
        <div class="info">
          <div class="info-item">
            <span class="item-name">产品特点</span>
            <span>{{ formData.trait }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">产品介绍</span>
            <span>{{ formData.introduce }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">适用客户</span>
            <span>{{ formData.applyCustomer }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">准入条件</span>
            <span>{{ formData.access }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">提交材料</span>
            <span>{{ formData.submitMaterial }}</span>
          </div>
          <div class="info-item">
            <span class="item-name">特别声明</span>
            <span>{{ formData.remark }}</span>
          </div>
        </div>
      </div>
      <el-button type="primary" size="medium" @click="back()">返回</el-button>
    </div>
  </div>
</template>
<script>
import { disableProducts, getProductDetail } from "@/api/bank/index.js";
export default {
  name: "Detail",
  data() {
    return {
      formData: {},
      guaranteeTypeText: [],
      repaymentTypeText: [],
      noUsing: false,
      capitalUsesText: [],
    };
  },
  // 获取store 数据
  computed: {
    orderStatus() {
      return this.$store.getters.orderStatus;
    },
  },
  watch: {
    orderStatus(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.getDetailInfo();
      }
    },
  },
  beforeMount() {
    this.getDetailInfo();
  },
  methods: {
    // 获取详情
    async getDetailInfo() {
      let res = await getProductDetail(this.$route.query.id);
      this.formData = res.data;
      if (this.formData.guaranteeType !== null) {
        if (this.formData.guaranteeType.length === 1) {
          // alert(",,,");
          if (this.formData.guaranteeType === "1") {
            this.guaranteeTypeText.push("抵押");
          }
          if (this.formData.guaranteeType === "2") {
            this.guaranteeTypeText.push("质押");
          }
          if (this.formData.guaranteeType === "3") {
            this.guaranteeTypeText.push("一般担保");
          }
          if (this.formData.guaranteeType === "4") {
            this.guaranteeTypeText.push("信用");
          }
          if (this.formData.guaranteeType === "5") {
            this.guaranteeTypeText.push("连带责任保证");
          }
          // this.guaranteeTypeText = this.guaranteeTypeText.join(",");
        } else {
          // alert("guaranteeType");
          let arr = this.formData.guaranteeType.split(",");
          console.log("arr", arr);
          for (let item of arr) {
            // alert(item);
            if (item === "1") {
              this.guaranteeTypeText.push("抵押");
            }
            if (item === "2") {
              this.guaranteeTypeText.push("质押");
            }
            if (item === "3") {
              this.guaranteeTypeText.push("一般担保");
            }
            if (item === "4") {
              this.guaranteeTypeText.push("信用");
            }
            if (item === "5") {
              this.guaranteeTypeText.push("连带责任保证");
            }
          }
          // this.guaranteeTypeText = this.guaranteeTypeText.join(",");
        }
        this.guaranteeTypeText = this.guaranteeTypeText.join(",");
        console.log(this.guaranteeTypeText);
      }
      if (this.formData.repaymentType !== null) {
        let repayArr = this.formData.repaymentType.split(",");
        for (const reitem of repayArr) {
          if (reitem === "1") {
            this.repaymentTypeText.push("等额本金");
          }
          if (reitem === "2") {
            this.repaymentTypeText.push("等额本息");
          }
          if (reitem === "3") {
            this.repaymentTypeText.push("等本等息");
          }
          if (reitem === "4") {
            this.repaymentTypeText.push("先息后本");
          }
          if (reitem === "5") {
            this.repaymentTypeText.push("一次性还本付息");
          }
          if (reitem === "6") {
            this.repaymentTypeText.push("随借随还");
          }
          if (reitem === "7") {
            this.repaymentTypeText.push("其他");
          }
        }
        this.repaymentTypeText = this.repaymentTypeText.join(",");
      }
      let capitalUsesTextArray = []; // 资金用途
      if (this.formData.capitalUses) {
        capitalUsesTextArray = this.formData.capitalUses.split(",");
        capitalUsesTextArray.map((item) => {
          if (item === "0") {
            this.capitalUsesText.push("不限");
          }
          if (item === "1") {
            this.capitalUsesText.push("流动资金贷款");
          }
          if (item === "2") {
            this.capitalUsesText.push("固定资产贷款");
          }
          if (item === "3") {
            this.capitalUsesText.push("项目融资");
          }
        });
        this.capitalUsesText = this.capitalUsesText.join(",");
      }
      // this.formData.creditRating = this.formData.creditRating.join();
    },
    // 停用
    async disable(id) {
      let res = await disableProducts(id);
      if (res.code === 200) {
        this.noUsing = true;
      }
    },
    handleStop() {
      // const ids = row.id || this.ids
      this.$confirm("停用后该产品无法展示和办理，确认停用？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.disable(this.formData.id);
          this.msgSuccess("产品已停用");
        })
        .then(() => {
          this.getList();
        })
        .catch(function () {});
    },
    handleUpdate() {
      if (this.formData.status === "2") {
        this.$confirm(
          "该产品正在启用中，点击确定修改按钮，该产品将自动停用",
          "修改产品",
          {
            confirmButtonText: "确定修改",
            cancelButtonText: "取消",
            type: "warning",
          }
        )
          .then(() => {
            this.disable(this.formData.id);
          })
          .then(() => {
            this.$router.push({
              path: "/my-financial-products/products-info",
              query: {
                type: "修改",
                name: this.formData.type === "1" ? "快贷产品" : "非快贷产品",
                id: this.formData.id,
              },
            });
          })
          .catch(() => {
            return false;
          });
      } else {
        this.$router.push({
          path: "/my-financial-products/products-info",
          query: {
            type: "修改",
            id: this.formData.id,
            name: this.formData.type === "1" ? "快贷产品" : "非快贷产品",
          },
        });
      }
    },
    back() {
      this.$router.go(-1);
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
  // margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  font-size: 16px;
  border-bottom: 1px solid rgba($color: #000, $alpha: 0.2);
}
.info {
  padding: 10px;
  background: #eee;
}
.info-item {
  margin: 30px 0;
}
.item-name {
  margin-right: 50px;
  color: rgba(0, 0, 0, 0.5);
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
.product-application-ent {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}
.product-application-entInfo {
  width: 33%;
}
.loan-info {
  flex: 1;
}
</style>
