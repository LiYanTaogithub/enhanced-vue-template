<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div v-if="type === '添加'" class="text">金融产品列表 / 新增产品</div>
      <div v-else class="text">金融产品列表 / 修改产品</div>
    </div>
    <div class="content">
      <div class="descriptionTitle">产品基本信息</div>
      <div class="baseInfoContent">
        <el-form
          ref="formData"
          :rules="rules"
          size="medium"
          label-width="120px"
          :model="formData"
        >
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="产品名称" prop="name">
                <el-input
                  v-model="formData.name"
                  placeholder="请输入产品名称"
                  clearable
                />
              </el-form-item>
              <el-form-item label="贷款期限" prop="limitStart">
                <el-input
                  v-model="formData.limitStart"
                  placeholder="请输入贷款期限"
                  clearable
                  :style="{ width: '45%' }"
                  @blur="number($event, '贷款期限')"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.limitEnd"
                  clearable
                  :style="{ width: '45%' }"
                  @blur="number($event, '贷款期限')"
                />
                <div style="display: inline-block; width: 5%">月</div>
              </el-form-item>
              <el-form-item label="适用范围" prop="applyScope">
                <chain-area
                  @changeValue="changeValue"
                  :value="formData.applyScope"
                  :multiple="true"
                ></chain-area>
                <!-- <el-select
                  v-model="formData.applyScope"
                  multiple
                  placeholder="适用范围"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in applyScopeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select> -->
              </el-form-item>
              <el-form-item label="产品logo">
                <el-upload
                  action=""
                  :http-request="ImgUploadSectionFile"
                  list-type="picture-card"
                  :auto-upload="true"
                  :limit="1"
                  :on-exceed="handleExceed"
                  accept=".png, .jpeg,.jpg"
                  :file-list="imgfilelist"
                  :before-remove="beforelogoRemove"
                  :on-remove="handleLogoRemove"
                >
                  <!-- <img
                    :src="imgUrl"
                    alt=""
                    v-if="imgUrl"
                    style="width: 120px; height: 120px"
                  /> -->
                  <i slot="default" class="el-icon-plus"></i>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="贷款额度" prop="amountStart">
                <el-input
                  v-model="formData.amountStart"
                  placeholder="请输入贷款额度"
                  clearable
                  :style="{ width: '45%' }"
                  @blur="number($event, '贷款额度')"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.amountEnd"
                  clearable
                  :style="{ width: '45%' }"
                  @blur="number($event, '贷款额度')"
                />
                <div style="display: inline-block; width: 5%">万</div>
              </el-form-item>
              <el-form-item label="担保方式" prop="guaranteeType">
                <el-select
                  v-model="formData.guaranteeType"
                  multiple
                  placeholder="请选择担保方式"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in guaranteeTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="所属行业">
                <el-cascader
                  ref="cascaderAddr"
                  v-model="formData.applyIndustry"
                  :options="industrydata"
                  :props="props"
                  multiple
                  @change="handleCheckChange"
                  :style="{ width: '100%' }"
                ></el-cascader>
              </el-form-item>
              <el-form-item
                label="个人意向书"
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                "
              >
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="PersonalIntention"
                  :limit="1"
                  accept=".doc, .docx, .pdf"
                  :file-list="PersonalIntentionfileList"
                  :on-exceed="handleExceed"
                  :on-remove="handleIntentionFileRemove"
                  :before-remove="beforeIntentionfileRemove"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传一个文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="利率范围" prop="rateStart">
                <el-input
                  v-model="formData.rateStart"
                  placeholder="请输入利率范围"
                  clearable
                  :style="{ width: '45%' }"
                  @blur="str($event)"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.rateEnd"
                  clearable
                  placeholder="请输入利率范围"
                  :style="{ width: '45%' }"
                  @blur="str($event)"
                />
                <div style="display: inline-block; width: 5%">%</div>
              </el-form-item>
              <el-form-item label="还款方式" prop="repaymentType">
                <el-select
                  v-model="formData.repaymentType"
                  multiple
                  placeholder="请选择还款方式"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in repaymentTypeOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="活体验证人员">
                <el-select
                  v-model="formData.livingObj"
                  multiple
                  placeholder="法人是默认验证人员"
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in livingObjOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>

              <el-form-item
                label="风险告知书"
                style="
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                "
              >
                <el-upload
                  class="upload-demo"
                  action=""
                  :http-request="riskNotification"
                  :limit="1"
                  accept=".doc, .docx, .pdf"
                  :file-list="riskUploadfileList"
                  :on-exceed="handleExceed"
                  :on-remove="handleRiskfileRemove"
                  :before-remove="beforeRiskfileRemove"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip">只能上传一个文件</div>
                </el-upload>
              </el-form-item>
            </el-col>
          </el-row>
          <template v-if="typeName === '非快贷产品'">
            <div
              v-for="(item, index) in formData.bankProductMaterials"
              :key="index"
              class="required-item"
            >
              <el-form-item
                :label="index === 0 ? '所需材料' : ''"
                style="width: 32%"
              >
                <el-input
                  v-model="item.name"
                  placeholder="所需材料"
                  clearable
                  :style="{ width: '100%' }"
                />
              </el-form-item>
              <!-- <a
              style="margin: 0 10px; color: #057af3; cursor: pointer"
              v-if="type === '修改'"
              :href="hrefValue"
            >
              {{ item.fileName }}
            </a> -->
              <a
                :href="item.urlAddress"
                style="margin: 0 10px; color: #057af3; cursor: pointer"
                v-if="type === '修改'"
              >
                {{ item.fileName }}
              </a>
              <i
                v-if="index === formData.bankProductMaterials.length - 1"
                class="el-icon-circle-plus-outline"
                style="margin: 0 10px; color: #057af3; font-size: 22px"
                @click="addRequire(index)"
              />
              <i
                class="el-icon-circle-close"
                style="margin: 0 10px; color: #057af3; font-size: 22px"
                @click="handleRemove(index)"
              />
              <el-upload
                class="upload-demo"
                action=""
                accept=".doc, .docx, .xls, .xlsx, .pdf"
                :http-request="uploadFile"
                @change="handleChange(index)"
                :show-file-list="false"
              >
                <span v-if="!item.id"> 若需企业按照模板上传文件，请先上传</span>
                <span
                  style="color: #057af3; cursor: pointer"
                  @click="upload(index)"
                  v-if="!item.id"
                  >文件模板</span
                >
                <span v-if="type !== '修改'">{{ item.fileName }}</span>
              </el-upload>
            </div>
          </template>
        </el-form>
      </div>
      <div class="descriptionTitle">本产品适用企业</div>

      <div class="baseInfoContent">
        <el-form
          ref="formData"
          :rules="rules"
          size="medium"
          label-width="120px"
          :model="formData"
        >
          <el-row :gutter="30">
            <el-col :span="8">
              <el-form-item label="前十大客户集中度">
                <el-input
                  v-model="formData.customerConcentrationTopTenStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.customerConcentrationTopTenEnd"
                  clearable
                  :style="{ width: '45%' }"
                />%
              </el-form-item>
              <el-form-item label="营业收入">
                <el-input
                  v-model="formData.operatingIncomeStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.operatingIncomeEnd"
                  clearable
                  :style="{ width: '45%' }"
                />万
              </el-form-item>
              <el-form-item label="资金用途">
                <el-select
                  v-model="formData.capitalUses"
                  multiple
                  clearable
                  :style="{ width: '100%' }"
                >
                  <el-option
                    v-for="(item, index) in capitalUsesOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="纳税时长">
                <el-input
                  v-model="formData.cxTaxPaymentStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.cxTaxPaymentEnd"
                  clearable
                  :style="{ width: '45%' }"
                />年
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="供应商关联交易占比">
                <el-input
                  v-model="formData.supplierTransactionProportionStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.supplierTransactionProportionEnd"
                  clearable
                  :style="{ width: '45%' }"
                />%
              </el-form-item>
              <el-form-item label="供应商集中度">
                <el-input
                  v-model="formData.supplierConcentrationStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.supplierConcentrationEnd"
                  clearable
                  :style="{ width: '45%' }"
                />%
              </el-form-item>
              <el-form-item label="净利润">
                <el-input
                  v-model="formData.netProfitStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.netProfitEnd"
                  clearable
                  :style="{ width: '45%' }"
                />万
              </el-form-item>
              <el-form-item label="资产负债率">
                <el-input
                  v-model="formData.assetLiabilityRatioStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.assetLiabilityRatioEnd"
                  clearable
                  :style="{ width: '45%' }"
                />%
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="客户关联交易占比">
                <el-input
                  v-model="formData.customerTransactionProportionStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.customerTransactionProportionEnd"
                  clearable
                  :style="{ width: '45%' }"
                />%
              </el-form-item>
              <el-form-item label="成立年限">
                <el-input
                  v-model="formData.setUpYearStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.setUpYearEnd"
                  clearable
                  :style="{ width: '45%' }"
                />年
              </el-form-item>
              <el-form-item label="年纳税额" prop="annualTaxScaleStart">
                <el-input
                  v-model="formData.taxPayableStart"
                  clearable
                  :style="{ width: '45%' }"
                />
                <div
                  style="display: inline-block; width: 4%; text-align: center"
                >
                  ~
                </div>
                <el-input
                  v-model="formData.taxPayableEnd"
                  clearable
                  :style="{ width: '45%' }"
                />万
              </el-form-item>
              <el-form-item label="纳税信用等级">
                <el-select
                  v-model="formData.creditRating"
                  clearable
                  :style="{ width: '100%' }"
                  multiple
                >
                  <el-option
                    v-for="(item, index) in creditRatingOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.value"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>

      <div class="productDescription">
        <div class="descriptionTitle">产品描述</div>
        <div class="info">
          <el-form
            ref="formData"
            :rules="rules"
            size="medium"
            label-width="100px"
            :model="formData"
          >
            <el-form-item label="产品特点" prop="trait">
              <el-input
                v-model="formData.trait"
                type="textarea"
                placeholder="请输入产品特点，不超过50字"
                :maxlength="50"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="产品介绍" prop="introduce">
              <el-input
                v-model="formData.introduce"
                type="textarea"
                placeholder="请输入产品介绍，不超过50字"
                :maxlength="50"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="适用客户" prop="applyCustomer">
              <el-input
                v-model="formData.applyCustomer"
                type="textarea"
                placeholder="请输入适用客户，不超过50字"
                :maxlength="50"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="准入条件" prop="access">
              <el-input
                v-model="formData.access"
                type="textarea"
                placeholder="请输入准入条件，不超过50字"
                :maxlength="50"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="提交材料" prop="submitMaterial">
              <el-input
                v-model="formData.submitMaterial"
                type="textarea"
                placeholder="请输入提交材料，不超过50字"
                :maxlength="50"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="特别声明" prop="remark">
              <el-input
                v-model="formData.remark"
                type="textarea"
                placeholder="请输入特别声明，不超过50字"
                :maxlength="50"
                :autosize="{ minRows: 4, maxRows: 4 }"
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <!-- <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item> -->
          </el-form>
        </div>
      </div>
      <el-button
        v-if="type === '添加'"
        type="primary"
        size="medium"
        style="margin-right: 20px"
        @click="handleAdd('formData')"
        >添加</el-button
      >
      <el-button
        v-else
        type="primary"
        size="medium"
        style="margin-right: 20px"
        @click="handleUpdata('formData')"
        >修改</el-button
      >
      <el-button size="medium" @click="$router.push('no-quick-products')"
        >取消</el-button
      >
    </div>
  </div>
</template>
<script>
import ChainArea from "@/components/Bank/chain-area";
import {
  getProductDetail,
  saveProducts,
  updataProducts,
  materialUpload,
  templateDownload,
  IconUpload,
  deleteFiles,
  deletematerial,
  getIndustryData,
} from "@/api/bank";
export default {
  name: "AddProducts",
  components: {
    ChainArea,
  },
  data() {
    return {
      type: "",
      typeName: "",
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,

      formData: {
        trait: "",
        introduce: "",
        applyCustomer: "",
        access: "",
        submitMaterial: "",
        remark: "",
        name: "",
        limitStart: "",
        limitEnd: "",
        applyScope: [],
        amountStart: "",
        amountEnd: "",
        guaranteeType: [],
        rateStart: "",
        rateEnd: "",
        repaymentType: [],
        logo: "",
        type: "",
        bankProductMaterials: [
          {
            id: "",
            name: "",
            fileName: "",
          },
        ],
        riskUrl: "",
        intentionUrl: "",
        livingObj: [],
        applyIndustry: [],
        setUpYearEnd: "",
        setUpYearStart: "",
        creditRating: [],
        capitalUses: [],
        taxPayableStart: "",
        taxPayableEnd: "",
        supplierTransactionProportionStart: "",
        supplierTransactionProportionEnd: "",
        supplierConcentrationStart: "",
        supplierConcentrationEnd: "",
        operatingIncomeStart: "",
        operatingIncomeEnd: "",
        netProfitStart: "",
        netProfitEnd: "",
        assetLiabilityRatioStart: "",
        assetLiabilityRatioEnd: "",
        cxTaxPaymentStart: "",
        cxTaxPaymentEnd: "",
        customerTransactionProportionStart: "",
        customerTransactionProportionEnd: "",
        customerConcentrationTopTenStart: "",
        customerConcentrationTopTenEnd: "",
      },
      rules: {
        name: [
          {
            required: true,
            message: "请输入产品名称",
            trigger: "blur",
          },
        ],
        limitStart: [
          {
            required: true,
            message: "请输入贷款期限上限",
            trigger: "blur",
          },
        ],
        limitEnd: [
          {
            required: true,
            message: "请输入贷款期限下限",
            trigger: "blur",
          },
        ],
        applyScope: [
          {
            required: true,
            message: "适用范围",
            trigger: "change",
          },
        ],
        amountStart: [
          {
            required: true,
            message: "贷款额度（起始范围）（万)",
            trigger: "change",
          },
        ],
        amountEnd: [
          {
            required: true,
            message: "贷款额度（结束范围）",
            trigger: "change",
          },
        ],
        guaranteeType: [
          {
            required: true,
            message: "担保方式",
            trigger: "change",
          },
        ],
        rateStart: [
          {
            required: true,
            message: "利率（起始范围）",
            trigger: "change",
          },
        ],
        rateEnd: [
          {
            required: true,
            message: "利率（结束范围）",
            trigger: "change",
          },
        ],
        repaymentType: [
          {
            required: true,
            message: "还款方式 ",
            trigger: "change",
          },
        ],
        livingObj: [
          {
            required: true,
            message: "请选择活体验证人员",
            trigger: "change",
          },
        ],
      },

      guaranteeTypeOptions: [
        {
          label: "不限",
          value: "0",
        },
        {
          label: "抵押",
          value: "1",
        },
        {
          label: "质押",
          value: "2",
        },
        {
          label: "第三方保证/担保",
          value: "3",
        },
        {
          label: "信用",
          value: "4",
        },
      ],
      repaymentTypeOptions: [
        {
          label: "等额本金",
          value: "1",
        },
        {
          label: "等额本息",
          value: "2",
        },
        {
          label: "等本等息",
          value: "3",
        },
        {
          label: "先息后本",
          value: "4",
        },
        {
          label: "一次性还本付息",
          value: "5",
        },
        {
          label: "随借随还",
          value: "6",
        },
        {
          label: "其他",
          value: "7",
        },
      ],
      livingObjOptions: [
        {
          label: "配偶",
          value: "配偶",
        },
        {
          label: "父亲",
          value: "父亲",
        },
        {
          label: "母亲",
          value: "母亲",
        },
        {
          label: "股东成员",
          value: "股东成员",
        },
        {
          label: "其他",
          value: "其他",
        },
      ],
      creditRatingOptions: [
        {
          label: "不限",
          value: "不限",
        },
        {
          label: "A",
          value: "A",
        },
        {
          label: "B",
          value: "B",
        },
        {
          label: "C",
          value: "C",
        },
        {
          label: "D",
          value: "D",
        },
        {
          label: "M",
          value: "M",
        },
      ],
      capitalUsesOptions: [
        {
          label: "不限",
          value: "0",
        },
        {
          label: "流动资金贷款",
          value: "1",
        },
        {
          label: "固定资产贷款",
          value: "2",
        },
        {
          label: "项目融资",
          value: "3",
        },
      ],
      fileName: "",
      name: "",
      filelist: [],
      modifyIndex: null,
      imgfilelist: [],
      imgUrl: "",
      PersonalIntentionfileList: [],
      riskUploadfileList: [],
      // 所属行业
      industrydata: [],
      props: { multiple: true, expandTrigger: "hover" },
      creditProps: { multiple: true },
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },

  beforeMount() {
    this.type = this.$route.query.type;
    this.typeName = this.$route.query.name;
    this.formData.type = this.$route.query.name === "快贷产品" ? "1" : "2";
    console.log(this.$route.query.type);
    if (this.type === "修改") {
      this.getDetailInfo();
    } else {
      // 新增 保证有一条数据
      //   this.filelist.push({
      //     id: "",
      //     name: "",
      //     fileName: "",
      //   });
    }
    // console.log("初始化filelist", this.filelist);
    this.getIndustryDatafn();
  },
  methods: {
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
      // alert(num);
      //限制只能输入一个小数点
      if (num.indexOf(".") !== -1) {
        var num_ = num.substr(num.indexOf(".") + 1);
        // alert(num_);
        if (num_.length > 1) {
          this.$message({
            showClose: true,
            message: name + "利率只能保留一位小数",
            type: "warning",
          });
        }
        // if (num_.indexOf(".") !== -1) {
        //   num = num.substr(0, num.indexOf(".") + num_.indexOf(".") + 1);
        // }
      }
    },
    async getDetailInfo() {
      let res = await getProductDetail(this.$route.query.id);
      this.formData = res.data;
      if (this.formData.bankProductMaterials.length === 0) {
        this.formData.bankProductMaterials.push({
          id: "",
          name: "",
          fileName: "",
        });
      }
      // this.filelist = this.formData.bankProductMaterials;
      // console.log("修改数据filelist", this.filelist);
      if (this.formData.logo !== null) {
        let urlObj = {
          url: this.formData.logo,
        };
        // this.imgfilelist[0].url = this.formData.logo;
        this.imgfilelist.push(urlObj);
        this.imgUrl = this.formData.logo;
      }
      if (this.formData.riskUrl) {
        this.riskUploadfileList = [
          {
            url: this.formData.riskUrl,
            name: "风险告知书",
          },
        ];
      }
      if (this.formData.intentionUrl) {
        this.PersonalIntentionfileList = [
          {
            url: this.formData.intentionUrl,
            name: "个人意向书",
          },
        ];
      }
      if (this.formData.repaymentType !== null) {
        this.formData.repaymentType = this.formData.repaymentType.split(",");
      }
      if (this.formData.guaranteeType) {
        this.formData.guaranteeType = this.formData.guaranteeType.split(",");
      }
      if (this.formData.livingObj) {
        this.formData.livingObj = this.formData.livingObj.split(",");
      }
      if (this.formData.applyScope) {
        this.formData.applyScope = this.formData.applyScope.split(";");
      }
      if (this.formData.applyIndustry) {
        this.formData.applyIndustry = this.formData.applyIndustry.split(";");
      }
      if (this.formData.capitalUses) {
        this.formData.capitalUses = this.formData.capitalUses.split(",");
      }
      if (this.formData.creditRating) {
        this.formData.creditRating = this.formData.creditRating.split(",");
      }
    },
    async getIndustryDatafn() {
      let res = await getIndustryData();
      if (res.code === 200) {
        this.industrydata = res.data;
      }
    },
    // 自动保存方法
    // autoSave: deboundce((val) => {
    //   window.localStorage.setItem("formData", JSON.stringify(val));
    // }, 3000),

    addRequire() {
      const obj = {
        id: "",
        name: "",
        fileName: "",
      };
      // 上传
      // this.filelist.push(obj);
      this.formData.bankProductMaterials.push(obj);
      console.log(
        "添加bankProductMaterials",
        this.formData.bankProductMaterials
      );
      // 显示
      // this.filelist.push(obj);
      // this.filelist = this.formData.bankProductMaterials;
      // console.log("添加filelist:", this.filelist);
    },
    //
    changeValue(val) {
      this.formData.applyScope = val;
    },
    // 删除所需材料
    async handleRemove(index) {
      alert(index);
      if (this.formData.bankProductMaterials[index].id) {
        alert("id存在");
        let res = await deletematerial(
          this.formData.bankProductMaterials[index].id
        );
        if (res.code === 200) {
          this.formData.bankProductMaterials.splice(index, 1);
          // this.filelist = this.formData.bankProductMaterials;
          // this.filelist.splice(index, 1);
        }
      } else {
        alert("id不存在");
        this.formData.bankProductMaterials.splice(index, 1);
        // this.filelist.splice(index, 1);
        // this.filelist = this.formData.bankProductMaterials;

        // this.formData.bankProductMaterials = this.filelist;
      }
      console.log(
        "删除bankProductMaterials",
        this.formData.bankProductMaterials
      );
      // console.log("删除filelist", this.filelist);
    },
    upload(index) {
      console.log(index);
      this.modifyIndex = index;
    },
    // handleChange(index) {
    //   console.log("upload框");
    // },
    // inputChange() {
    //   console.log("input框");
    //   console.log(this.formData.bankProductMaterials);
    // },
    // 产品所需材料上传接口
    async uploadFile(item) {
      let formdata = new FormData();
      formdata.append("file", item.file);
      this.formData.bankProductMaterials[this.modifyIndex].fileName =
        item.file.name;
      let res = await materialUpload(formdata);
      console.log(res);
      if (res.code === 200) {
        this.$message.success("上传成功！");
        this.formData.bankProductMaterials[this.modifyIndex].id = res.data;
        // this.filelist = this.formData.bankProductMaterials;
      } else {
        this.$message.error("");
      }
    },
    // 添加
    async save() {
      const {
        applyScope,
        applyIndustry,
        capitalUses,
        creditRating,
        guaranteeType,
        livingObj,
        repaymentType,
        ...other
      } = {
        ...this.formData,
      };
      this.formData.bankProductMaterials.map((item) => {
        if (item.id !== "" && item.name === "") {
          this.$message.error("请填写所需材料名称");
          return false;
        }
      });
      let res = await saveProducts({
        applyScope: applyScope.join(";"),
        applyIndustry:
          applyIndustry && applyIndustry.length > 0
            ? applyIndustry.join(";")
            : "",
        capitalUses:
          capitalUses && capitalUses.length > 0 ? capitalUses.join(",") : "",
        creditRating:
          creditRating && creditRating.length > 0 ? creditRating.join(",") : "",
        guaranteeType: guaranteeType.join(","),
        livingObj: livingObj.join(","),
        repaymentType: repaymentType.join(","),
        ...other,
      });
      // 如果添加成功就
      if (res.code === 200) {
        this.$message({
          type: "success",
          message: "添加成功!",
        });
        this.$router.go(-1);
        // window.localStorage.removeItem("formData");
      } else {
        return false;
      }
    },
    addconfirmFn(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$confirm(
            "添加产品，平台审核后通过后，该产品可以展示和办理",
            "添加产品",
            {
              confirmButtonText: "继续",
              cancelButtonText: "取消",
              type: "warning",
            }
          )
            .then(() => {
              this.save();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消添加",
              });
            });
        } else {
          this.$message.error("请填写必填项");
          return false;
        }
      });
    },
    handleAdd(formName) {
      let reg = new RegExp("^[1-9]([0-9])*$");
      if (!reg.test(this.formData.limitStart)) {
        this.$message.error("贷款期限请输入正整数");
        return false;
      }
      if (!this.formData.intentionUrl) {
        this.$message.error("请上传个人意向书");
        return false;
      }
      if (!this.formData.riskUrl) {
        this.$message.error("请上传风险告知书");
        return false;
      }
      this.formData.bankProductMaterials.map((item) => {
        if (item.id !== "" && item.name === "") {
          this.$message.error("请填写所需材料名称");
          return false;
        } else {
          this.addconfirmFn(formName);
        }
      });
      console.log(this.$refs[formName]);
    },
    // 修改
    async updataProducts() {
      const {
        applyScope,
        guaranteeType,
        livingObj,
        applyIndustry,
        capitalUses,
        creditRating,
        repaymentType,
        ...other
      } = {
        ...this.formData,
      };
      let res = await updataProducts({
        applyScope: applyScope.join(";"),
        applyIndustry:
          applyIndustry && applyIndustry.length > 0
            ? applyIndustry.join(";")
            : "",
        capitalUses:
          capitalUses && capitalUses.length > 0 ? capitalUses.join(",") : "",
        creditRating:
          creditRating && creditRating.length > 0 ? creditRating.join(",") : "",
        guaranteeType:
          guaranteeType && guaranteeType.length > 0
            ? guaranteeType.join(",")
            : "",
        livingObj: livingObj && livingObj.length > 0 ? livingObj.join(",") : "",
        repaymentType:
          repaymentType && repaymentType.length > 0
            ? repaymentType.join(",")
            : "",
        ...other,
      });
      if (res.code !== 200) {
        this.$message({
          type: "error",
          message: res.msg,
        });
        return false;
      } else {
        this.$message({
          type: "success",
          message: "产品已修改，平台审核中!",
        });
        if (this.typeName === "非快贷产品") {
          this.$router.push("no-quick-products");
        } else {
          this.$router.push("quick-loan-products");
        }
      }
    },
    updataConfirmfn() {
      this.$confirm(
        "修改产品，平台审核后通过后，才可以展示和办理",
        "修改产品",
        {
          confirmButtonText: "继续",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.updataProducts();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleUpdata() {
      let reg = new RegExp("^[1-9]([0-9])*$");
      if (
        !reg.test(this.formData.limitStart) ||
        !reg.test(this.formData.limitEnd)
      ) {
        this.$message.error("贷款期限请输入正整数");
        return false;
      }
      if (
        !reg.test(this.formData.amountStart) ||
        !reg.test(this.formData.amountEnd)
      ) {
        this.$message.error("贷款额度请输入正整数");
        return false;
      }
      if (!this.formData.intentionUrl) {
        this.$message.error("请上传个人意向书");
        return false;
      }
      if (!this.formData.riskUrl) {
        this.$message.error("请上传风险告知书");
        return false;
      }
      this.formData.bankProductMaterials.map((item) => {
        if (item.id !== "" && item.name === "") {
          this.$message.error("请填写所需材料名称");
          return false;
        } else {
          this.updataConfirmfn();
        }
      });
    },
    //下载材料
    async downLoad(id) {
      const res = await templateDownload(id);
      console.log(res);
      const blob = new Blob([res.data], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
      });
      if ("download" in document.createElement("a")) {
        console.log("1111");
        const elink = document.createElement("a");
        // elink.download = "材料名称";
        elink.style.display = "none";
        elink.href = URL.createObjectURL(blob);
        document.body.appendChild(elink);
        elink.click();
        URL.revokeObjectURL(elink.href);
        document.body.removeChild(elink);
      } else {
        console.log("22222");
        navigator.msSaveBlob(blob, "材料名称");
      }
    },
    downLoadFile(id) {
      // this.downLoad(id);
      let a = document.createElement("a");
      a.href = "dev-api/bank/bank/product/templateDownload/" + id;
      a.click();
    },
    // 上传头像logo
    async IconUpload(file) {
      const res = await IconUpload(file);
      console.log(res);
      this.formData.logo = res.data;
      console.log("this.formData.id:", this.formData.id);
    },
    // logo上传
    // beforeAvatarUpload(file) {
    //   // alert("111");
    //   const isJPG =
    //     file.type === "image/jpeg" ||
    //     file.type === "image/png" ||
    //     file.type === "image/jpg";
    //   // alert(isJPG);
    //   if (!isJPG) {
    //     this.$message.error("上传头像图片只能是 JPG 格式!");
    //     // return false;
    //   }
    //   return isJPG;
    // },
    ImgUploadSectionFile(param) {
      // const isJPG =
      //   param.file.type === "image/jpeg" ||
      //   param.file.type === "image/png" ||
      //   param.file.type === "image/jpg";
      // // alert(isJPG);
      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 jpeg、png、jpg 格式!");
      //   return false;
      // }
      let formdata = new FormData(); //formdata格式
      formdata.append("file", param.file);
      formdata.append("type", "1");
      // 修改的时候传入id
      if (this.type === "修改") {
        formdata.append("id", this.iconId);
      }
      this.IconUpload(formdata);
    },
    handleExceed() {
      this.$message.warning("当前限制只能上传 1 个文件或图片");
    },
    beforeRemove(file) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    // 个人意向书上传
    async IntentionUpload(file) {
      const res = await IconUpload(file);
      console.log(res);
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.formData.intentionUrl = res.data;
      }
      // console.log("this.formData.id:", this.formData.id);
    },
    PersonalIntention(param) {
      console.log("个人意向书", param);
      let filetype = param.file.name.substring(
        param.file.name.lastIndexOf(".") + 1
      );
      const type1 = filetype === "doc" || "docx";
      const type2 = filetype === "pdf";
      if (!type1 && !type2) {
        this.$message.error("上传文件只能是word文件或pdf文件");
        return false;
      }
      let formdata = new FormData(); //formdata格式
      formdata.append("file", param.file);
      formdata.append("type", "2");
      // 修改的时候传入id
      if (this.type === "修改") {
        formdata.append("id", this.iconId);
      }
      this.IntentionUpload(formdata);
    },
    // 风险告知上传
    async riskUpload(file) {
      const res = await IconUpload(file);
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.formData.riskUrl = res.data;
      }

      console.log("this.formData.id:", this.formData.id);
    },
    riskNotification(param) {
      let formdata = new FormData(); //formdata格式
      formdata.append("file", param.file);
      formdata.append("type", "3");
      // 修改的时候传入id
      if (this.type === "修改") {
        formdata.append("id", this.iconId);
      }
      this.riskUpload(formdata);
    },
    // 删除风险告知
    beforeRiskfileRemove() {
      return this.$confirm(`确定删除该文件吗`);
    },
    async handleRiskfileRemove(file, fileList) {
      console.log(file, fileList);
      let res = await deleteFiles({
        url: this.formData.riskUrl,
        pid: this.formData.id ? this.formData.id : "",
        type: "3",
      });
      if (res.code === 200) {
        this.$message.success("已删除");
      } else {
        this.$message.error(res.msg);
      }
    },
    // 删除个人意向书
    beforeIntentionfileRemove() {
      return this.$confirm(`确定删除该文件吗`);
    },
    async handleIntentionFileRemove(file, fileList) {
      console.log(file, fileList);
      let res = await deleteFiles({
        url: this.formData.intentionUrl, // url
        pid: this.formData.id ? this.formData.id : "",
        type: "2",
      });
      if (res.code === 200) {
        this.$message.success("已删除");
      } else {
        this.$message.error(res.msg);
      }
    },
    // handleLogoRemove beforelogoRemove
    // 删除logo
    beforelogoRemove() {
      return this.$confirm(`确定删除该logo吗`);
    },
    async handleLogoRemove(file, fileList) {
      console.log(file, fileList);
      let res = await deleteFiles({
        url: this.formData.logo,
        pid: this.formData.id ? this.formData.id : "",
        type: "1",
      });
      if (res.code === 200) {
        this.$message.success("已删除");
      } else {
        this.$message.error(res.msg);
      }
    },

    // 所属行业
    handleCheckChange() {
      // console.log(this.$refs["cascaderAddr"]);
      console.log(this.$refs.cascaderAddr.getCheckedNodes()[0].pathLabels);
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
.content {
  margin-top: 50px;
  margin-left: 30px;
}
.contentTitle {
  display: flex;
  justify-content: space-between;
}
.baseInfoContent {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 30px;
  padding: 10px;
  padding-bottom: 10px;
  font-size: 16px;
  background: #eee;
}
.info {
  padding: 10px;
  background: #eee;
}
.info-item {
  margin: 15px 0;
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
.el-form,
.el-row {
  width: 100%;
}
.required-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  line-height: 100%;
  .el-form-item {
    margin-top: 22px;
  }
}
::v-deep .el-form-item__label {
  font-size: 15px;
}
</style>
