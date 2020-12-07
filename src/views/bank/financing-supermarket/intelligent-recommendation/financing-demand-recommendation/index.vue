<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">融资超市 / 智能推荐</div>
    </div>
    <div class="tab">
      <el-button :class="{ active: index === 0 }" @click="handleClick1"
        >融资需求推荐</el-button
      >
      <el-button :class="{ active: index === 1 }" @click="handleClick2"
        >用电企业推荐</el-button
      >
    </div>
    <!-- 融资需求推荐 -->
    <div v-show="index === 0">
      <div class="contentTitle">
        <span style="font-size: 18px">开启智能推荐</span>
        <el-switch
          style="display: block"
          v-model="finaceSwitchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeSwitchFinace"
        >
        </el-switch>
      </div>
      <div style="color: rgb(141, 141, 141)" v-show="!finaceSwitchValue">
        开启智能推荐后，我们将会从全平台数据中，向您推荐符合要求的优质客户
      </div>
      <!-- 融资需求推荐 -->
      <div class="content">
        <div
          class="productDescription"
          v-show="(!isRecommendFinace && finaceSwitchValue) || resetFinace"
        >
          <div class="descriptionTitle">推荐规则设置</div>
          <el-form
            ref="demandData"
            :model="demandData"
            size="medium"
            label-width="140px"
          >
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="贷款金额">
                  <el-input
                    v-model="demandData.amountStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.amountEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />万
                </el-form-item>
                <el-form-item label="成立年限">
                  <el-input
                    v-model="demandData.setUpYearStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.setUpYearEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />年
                </el-form-item>
                <el-form-item label="年纳税额" prop="annualTaxScaleStart">
                  <el-input
                    v-model="demandData.taxPayableStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.taxPayableEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />万
                </el-form-item>
                <el-form-item label="营业收入">
                  <el-input
                    v-model="demandData.operatingIncomeStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.operatingIncomeEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />万
                </el-form-item>
                <el-form-item label="前十大客户集中度">
                  <el-input
                    v-model="demandData.customerConcentrationTopTenStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.customerConcentrationTopTenEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />%
                </el-form-item>
                <el-form-item label="供应商关联交易占比">
                  <el-input
                    v-model="demandData.supplierTransactionProportionStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.supplierTransactionProportionEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />%
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="利率">
                  <el-input
                    v-model="demandData.rateStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.rateEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />%
                </el-form-item>
                <el-form-item label="所属地区">
                  <!-- <el-select
                    v-model="demandData.applyScope"
                    multiple
                    placeholder="所属地区"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in applyAdressOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    />
                  </el-select> -->
                  <chain-area
                    @changeValue="changeValue"
                    :value="demandData.applyScope"
                    :multiple="true"
                  ></chain-area>
                </el-form-item>

                <el-form-item label="纳税信用等级">
                  <el-select
                    v-model="demandData.creditRating"
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
                <el-form-item label="净利润">
                  <el-input
                    v-model="demandData.netProfitStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.netProfitEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />万
                </el-form-item>
                <el-form-item label="客户关联交易占比">
                  <el-input
                    v-model="demandData.customerTransactionProportionStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.customerTransactionProportionEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />%
                </el-form-item>
                <el-form-item label="担保方式">
                  <el-select
                    v-model="demandData.guaranteeType"
                    multiple
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
              </el-col>
              <el-col :span="8">
                <el-form-item label="贷款期限">
                  <el-input
                    v-model="demandData.limitStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.limitEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />月
                </el-form-item>
                <el-form-item label="所属行业">
                  <el-cascader
                    v-model="demandData.applyIndustry"
                    :options="industrydata"
                    collapse-tags
                    :props="props"
                    @change="handleChangeFinanceIndustry"
                    ref="financeIndustryref"
                    :style="{ width: '100%' }"
                  ></el-cascader>
                </el-form-item>

                <el-form-item label="纳税时长">
                  <el-input
                    v-model="demandData.cxTaxPaymentStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.cxTaxPaymentEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />年
                </el-form-item>
                <el-form-item label="资产负债率">
                  <el-input
                    v-model="demandData.assetLiabilityRatioStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.assetLiabilityRatioEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />%
                </el-form-item>
                <el-form-item label="供应商集中度">
                  <el-input
                    v-model="demandData.supplierConcentrationStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="demandData.supplierConcentrationEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />%
                </el-form-item>
                <el-form-item label="资金用途">
                  <el-select
                    v-model="demandData.capitalUses"
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
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div
          class="productDescription"
          v-show="isRecommendFinace && finaceSwitchValue"
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div class="descriptionTitle">推荐规则设置</div>
            <el-button type="primary" @click="handleResetFinace"
              >修改规则</el-button
            >
          </div>

          <div style="color: rgb(141, 141, 141)" class="configureRule">
            <span class="configureRulespan"
              >贷款金额：{{ demandData.amountStart }}-{{
                demandData.amountEnd
              }}W</span
            >
            <span class="configureRulespan"
              >利率：{{ demandData.rateStart }}%-{{ demandData.rateEnd }}%</span
            >
            <span class="configureRulespan"
              >贷款期限：{{ demandData.limitStart }}-{{
                demandData.limitEnd
              }}月</span
            >
            <!-- <span class="configureRulespan">注册资本：{{demand.}}</span> -->
            <span class="configureRulespan"
              >所属行业：{{ demandData.financeIndustryLabel }}</span
            >
            <span class="configureRulespan"
              >所属地区：{{ demandData.financeRegionData }}</span
            >
          </div>
          <div class="info" v-show="!noHasInfo">
            <div
              class="info-item-list"
              v-for="item in commendResult"
              :key="item.id"
            >
              <div class="loan-info">
                <div class="info-title">{{ item.entName }}</div>
                <div class="info-item">
                  <span class="item-name"
                    >贷款金额：{{ item.loanAmount }}W</span
                  >
                  <span>贷款利率：{{ item.loanRate }}%</span>
                </div>
                <div class="info-item">
                  <span class="item-name"
                    >贷款期限：{{ item.loanLimit }}月</span
                  >
                  <span>信用评分：{{ item.score }}</span>
                </div>
                <div class="info-item">
                  <el-button
                    type="primary"
                    style="margin: 30px 0; margin-right: 20px"
                    @click="viewdetail(item.id)"
                    >查看详情</el-button
                  >
                  <el-button
                    type="primary"
                    :disabled="item.disabled"
                    style="margin: 30px 0; margin-left: 20px"
                    @click="immediatelyClaimItem(item)"
                    ref="immediatelyClaimBtn"
                    >立即认领</el-button
                  >
                </div>
              </div>
            </div>
          </div>
          <div
            class="info"
            v-show="noHasInfo"
            style="color: red; font-size: 20px"
          >
            没有匹配到合适的企业！
          </div>
        </div>
        <el-button
          v-show="!isRecommendFinace && finaceSwitchValue"
          type="primary"
          size="medium"
          @click="startRecommendFinace"
          >开始推荐</el-button
        >
      </div>
    </div>
    <!-- 用电企业推荐 -->
    <div v-show="index === 1">
      <div class="contentTitle">
        <span style="font-size: 18px">开启智能推荐</span>
        <el-switch
          style="display: block"
          v-model="enterpriseSwitchValue"
          active-color="#13ce66"
          inactive-color="#ff4949"
          @change="changeSwitchEnerprise"
        >
        </el-switch>
      </div>
      <div style="color: rgb(141, 141, 141)" v-show="!enterpriseSwitchValue">
        开支智能推荐后，我们将会从全平台数据中，向您推荐符合要求的优质客户
      </div>
      <!-- 用电企业推荐 -->
      <div class="content">
        <div
          class="productDescription"
          v-show="
            (!isRecommendEnterprise && enterpriseSwitchValue) || resetEnterprise
          "
        >
          <div class="descriptionTitle">推荐规则设置</div>
          <el-form
            ref="powerData"
            :model="powerData"
            size="medium"
            label-width="100px"
          >
            <el-row :gutter="30">
              <el-col :span="8">
                <el-form-item label="注册资本">
                  <el-input
                    v-model="powerData.registeredCapitalStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="powerData.registeredCapitalEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />万
                </el-form-item>
                <el-form-item label="所属地区">
                  <!-- <el-select
                    v-model="powerData.applyScope"
                    multiple
                    placeholder="所属地区"
                    clearable
                    :style="{ width: '100%' }"
                  >
                    <el-option
                      v-for="(item, index) in applyAdressOptions"
                      :key="index"
                      :label="item.label"
                      :value="item.value"
                      :disabled="item.disabled"
                    />
                  </el-select> -->
                  <chain-area
                    @changeValue="changeValue1"
                    :value="powerData.applyScope"
                    :multiple="true"
                  ></chain-area>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="经营年限">
                  <el-input
                    v-model="powerData.operationsDurationStart"
                    clearable
                    :style="{ width: '45%' }"
                  />
                  <div
                    style="display: inline-block; width: 4%; text-align: center"
                  >
                    ~
                  </div>
                  <el-input
                    v-model="powerData.operationsDurationEnd"
                    clearable
                    :style="{ width: '45%' }"
                  />年
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="所属行业">
                  <el-cascader
                    v-model="powerData.applyIndustry"
                    :options="industrydata"
                    :props="props"
                    collapse-tags
                    @change="handleChangeElectricityIndustry"
                    ref="electricityIndustryref"
                    :style="{ width: '100%' }"
                  ></el-cascader>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
        <div
          class="productDescription"
          v-show="isRecommendEnterprise && enterpriseSwitchValue"
        >
          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              justify-content: space-between;
            "
          >
            <div class="descriptionTitle">推荐规则设置</div>
            <el-button type="primary" @click="handleResetEnterprise"
              >修改规则</el-button
            >
          </div>

          <div style="color: rgb(141, 141, 141)" class="configureRule">
            <span class="configureRulespan"
              >注册资本：{{ powerData.registeredCapitalStart }}-{{
                powerData.registeredCapitalEnd
              }}万</span
            >
            <span class="configureRulespan"
              >经营年限：{{ powerData.operationsDurationStart }}-{{
                powerData.operationsDurationEnd
              }}年</span
            >
            <span class="configureRulespan"
              >所属行业：{{ powerData.electricityIndustryLabel }}</span
            >
            <span class="configureRulespan"
              >所属地区：{{ powerData.electricityRegionData }}</span
            >
          </div>
          <el-table
            v-show="!noHasInfo"
            :data="tableData"
            border
            style="width: 100%; margin-top: 30px"
          >
            <el-table-column prop="name" label="企业名称"> </el-table-column>
            <el-table-column prop="capital" label="注册资本"> </el-table-column>
            <el-table-column prop="operationsDuration" label="经营年限">
            </el-table-column>
            <el-table-column prop="industry" label="所属行业">
            </el-table-column>
            <el-table-column prop="scope" label="所属地区"> </el-table-column>
            <el-table-column prop="score" label="企业信用评分">
            </el-table-column>
            <el-table-column fixed="right" label="操作">
              <template slot-scope="scope">
                <el-button
                  @click="enterpriseDetail(scope.row)"
                  type="text"
                  size="small"
                  >详情</el-button
                >
                <el-button
                  v-if="scope.row.tagFlag === '1'"
                  type="text"
                  size="small"
                  @click="electricitySign(scope.row.id)"
                  >标记</el-button
                >
                <el-button
                  type="text"
                  size="small"
                  v-if="scope.row.tagFlag === '2'"
                  @click="electricityCancelSign(scope.row.id)"
                  >取消标记</el-button
                >
              </template>
            </el-table-column>
          </el-table>
          <div
            class="info"
            v-show="noHasInfo"
            style="color: red; font-size: 20px"
          >
            没有匹配到合适的企业！
          </div>
          <el-pagination
            :current-page.sync="pageNum"
            :page-size="pageSize"
            layout="total, prev, pager, next"
            :total="total"
            @size-change="onSizeChange"
            @current-change="onCurrentChange"
          />
        </div>
        <el-button
          v-show="!isRecommendEnterprise && enterpriseSwitchValue"
          type="primary"
          size="medium"
          @click="startRecommendEnterprise"
          >开始推荐</el-button
        >
      </div>
    </div>
  </div>
</template>
<script>
import ChainArea from "@/components/Bank/chain-area";
import {
  financeDemand,
  electricityDemand,
  recommend,
  recommendEnterprise,
  immediatelyClaim,
  electricityTag,
  electricityCancelTag,
  closeElectricity,
  closeFinance,
  getIndustryData,
} from "@/api/bank/index.js";
export default {
  name: "Detail",
  components: {
    ChainArea,
  },
  data() {
    return {
      noHasInfo: false, // 没有推荐结果
      immediatelyClaimBtnDisable: false,
      demandData: {
        amountEnd: "",
        amountStart: "",
        // annualIncomeScaleEnd: "",
        // annualIncomeScaleStart: "",
        // annualTaxScaleEnd: "",
        // annualTaxScaleStart: "",
        applyIndustry: [],
        applyObj: [],
        applyScope: [],
        guaranteeType: [],
        limitEnd: "",
        limitStart: "",
        rateEnd: "",
        rateStart: "",
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
        financeRegionData: "",
        financeIndustryLabel: "",
      },
      powerData: {
        applyIndustry: [],
        applyScope: [],
        operationsDurationStart: "",
        operationsDurationEnd: "",
        registeredCapitalStart: "",
        registeredCapitalEnd: "",
        electricityRegionData: "",
        electricityIndustryLabel: "",
      },
      industrydata: [],
      props: { multiple: true, expandTrigger: "hover" },
      applyObjectOptions: [
        {
          label: "全部",
          value: "全部",
        },
      ],
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
      industryOptions: [
        {
          label: "不限",
          value: "不限",
        },
        {
          label: "制造业",
          value: "制造业",
        },
        {
          label: "金融业",
          value: "金融业",
        },
        {
          label: "服务业",
          value: "服务业",
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
      applyAdressOptions: [
        {
          label: "北京",
          value: "北京",
        },
        {
          label: "天津",
          value: "天津",
        },
        {
          label: "河北",
          value: "河北",
        },
        {
          label: "山西",
          value: "山西",
        },
        {
          label: "内蒙古",
          value: "内蒙古",
        },
        {
          label: "辽宁",
          value: "辽宁",
        },
        {
          label: "吉林",
          value: "吉林",
        },
        {
          label: "黑龙江",
          value: "黑龙江",
        },
        {
          label: "上海",
          value: "上海",
        },
        {
          label: "江苏",
          value: "江苏",
        },
        {
          label: "浙江",
          value: "浙江",
        },
        {
          label: "安徽",
          value: "安徽",
        },
        {
          label: "福建",
          value: "福建",
        },
        {
          label: "江西",
          value: "江西",
        },
        {
          label: "山东",
          value: "山东",
        },
        {
          label: "河南",
          value: "河南",
        },
        {
          label: "湖北",
          value: "湖北",
        },
        {
          label: "湖南",
          value: "湖南",
        },
        {
          label: "广东",
          value: "广东",
        },
        {
          label: "广西",
          value: "广西",
        },
        {
          label: "海南",
          value: "海南",
        },
        {
          label: "四川",
          value: "四川",
        },
        {
          label: "贵州",
          value: "贵州",
        },
        {
          label: "云南",
          value: "云南",
        },
        {
          label: "西藏",
          value: "西藏",
        },
        {
          label: "重庆",
          value: "重庆",
        },
        {
          label: "陕西",
          value: "陕西",
        },
        {
          label: "甘肃",
          value: "甘肃",
        },
        {
          label: "宁夏",
          value: "宁夏",
        },
        {
          label: "青海",
          value: "青海",
        },
        {
          label: "新疆",
          value: "新疆",
        },
        {
          label: "台湾",
          value: "台湾",
        },
        {
          label: "香港",
          value: "香港",
        },
        {
          label: "澳门",
          value: "澳门",
        },
      ],

      finaceSwitchValue: false, // 融资开关
      enterpriseSwitchValue: false, // 用电开关
      isRecommendEnterprise: false, // 用电企业开始推荐
      isRecommendFinace: false, // 融资需求开始推荐
      // switchValue: false,
      resetFinace: false, // 修改融资规则
      resetEnterprise: false, // 修改用电企业规则
      index: 0,
      tableData: [],
      commendResult: null,
      pageNum: 1,
      pageSize: 10,
      total: 0,
    };
  },
  beforeMount() {
    this.getfinanceDemand();
    this.getIndustryDatafn();
  },
  methods: {
    // 分页功能
    onCurrentChange(val) {
      this.pageNum = val;
      this.startRecommendEnterprise();
    },
    onSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.startRecommendEnterprise();
    },
    // 融资需求推荐
    async getfinanceDemand() {
      let res = await financeDemand();
      console.log(res);
      if (res.data.status === "1") {
        this.index = 0;
        this.finaceSwitchValue = true;
        this.demandData = res.data;
        if (this.demandData.applyIndustry !== null) {
          if (this.demandData.applyIndustry.length > 1) {
            this.demandData.applyIndustry = this.demandData.applyIndustry.split(
              ";"
            );
          } else {
            this.demandData.applyIndustry = this.demandData.applyIndustry.split(
              ""
            );
          }
        } else {
          this.demandData.applyIndustry = [];
        }

        if (this.demandData.applyScope !== null) {
          if (this.demandData.applyScope.length > 1) {
            this.demandData.applyScope = this.demandData.applyScope.split(";");
          } else {
            this.demandData.applyScope = this.demandData.applyScope.split("");
          }
        } else {
          this.demandData.applyScope = [];
        }

        if (this.demandData.applyObj !== null) {
          if (this.demandData.applyObj.length > 1) {
            this.demandData.applyObj = this.demandData.applyObj.split(",");
          } else {
            this.demandData.applyObj = this.demandData.applyObj.split("");
          }
        } else {
          this.demandData.applyObj = [];
        }

        if (this.demandData.guaranteeType !== null) {
          if (this.demandData.guaranteeType.length > 1) {
            this.demandData.guaranteeType = this.demandData.guaranteeType.split(
              ","
            );
          } else {
            this.demandData.guaranteeType = this.demandData.guaranteeType.split(
              ""
            );
          }
        } else {
          this.demandData.guaranteeType = [];
        }
        if (this.demandData.capitalUses) {
          this.demandData.capitalUses = this.demandData.capitalUses.split(",");
        }
        if (this.demandData.creditRating) {
          this.demandData.creditRating = this.demandData.creditRating.split(
            ","
          );
        }
      } else {
        this.finaceSwitchValue = false;
      }
    },
    // 用电企业推荐详情
    async getelectricityDemand() {
      let res = await electricityDemand();
      console.log(res);
      if (res.data.status === "1") {
        this.index = 1;
        this.enterpriseSwitchValue = true;
        this.powerData = res.data;
        if (this.powerData.applyIndustry !== null) {
          if (this.powerData.applyIndustry.length > 1) {
            this.powerData.applyIndustry = this.powerData.applyIndustry.split(
              ";"
            );
          } else {
            this.powerData.applyIndustry = this.powerData.applyIndustry.split(
              ""
            );
          }
        } else {
          this.powerData.applyIndustry = [];
        }

        if (this.powerData.applyScope !== null) {
          if (this.powerData.applyScope.length > 1) {
            this.powerData.applyScope.push(
              this.powerData.applyScope.split(";")
            );
          } else {
            this.powerData.applyScope = this.powerData.applyScope.split("");
          }
        } else {
          this.powerData.applyScope = [];
        }

        console.log(this.powerData);
      } else {
        this.enterpriseSwitchValue = false;
      }
    },
    // 所属hangye
    async getIndustryDatafn() {
      let res = await getIndustryData();
      if (res.code === 200) {
        this.industrydata = res.data;
      }
    },
    // 融资需求所属行业
    handleChangeFinanceIndustry(value) {
      console.log(value);
      let financeIndustryLabelflag = [];
      let financeIndustryLabelArr = this.$refs[
        "financeIndustryref"
      ].getCheckedNodes();
      financeIndustryLabelArr.map((item) => {
        financeIndustryLabelflag.push(item.pathLabels);
      });
      this.demandData.financeIndustryLabel = financeIndustryLabelflag.join(";");
    },
    // 用电企业所属行业
    handleChangeElectricityIndustry(value) {
      console.log(value);
      let electricityIndustryLabelflag = [];
      let electricityIndustryLabelArr = this.$refs[
        "electricityIndustryref"
      ].getCheckedNodes();
      electricityIndustryLabelArr.map((item) => {
        electricityIndustryLabelflag.push(item.pathLabels);
      });
      this.powerData.electricityIndustryLabel = electricityIndustryLabelflag.join(
        ";"
      );
    },
    handleClick1() {
      this.getfinanceDemand();
      this.index = 0;
      if (this.enterpriseSwitchValue === true) {
        this.enterpriseSwitchValue = false;
      }
    },
    handleClick2() {
      this.getelectricityDemand();
      this.index = 1;
      if (this.finaceSwitchValue === true) {
        this.finaceSwitchValue = false;
      }
    },

    // 开始推荐
    async recommendSubmit() {
      let {
        applyIndustry,
        applyObj,
        applyScope,
        guaranteeType,
        capitalUses,
        creditRating,
        ...other
      } = this.demandData;
      console.log("applyScope:", applyScope);
      let res = await recommend({
        applyIndustry: applyIndustry.join(";"),
        applyObj: applyObj.join(","),
        applyScope:
          applyScope instanceof Array ? applyScope.join(";") : applyScope,
        guaranteeType: guaranteeType.join(","),
        capitalUses:
          capitalUses && capitalUses.length > 0 ? capitalUses.join(",") : "",
        creditRating:
          creditRating && creditRating.length > 0 ? creditRating.join(",") : "",
        status: this.finaceSwitchValue === true ? 1 : 2,
        ...other,
      });
      console.log(res);
      if (res.data.length === 0) {
        this.noHasInfo = true;
      }
      this.commendResult = res.data.map((item) => {
        return {
          ...item,
          disabled: false,
        };
      });
      console.log(this.commendResult);
    },
    async recommendEnterprise() {
      let { applyIndustry, applyScope, ...other } = this.powerData;
      console.log("applyScope:", applyScope);
      let res = await recommendEnterprise({
        applyIndustry: applyIndustry.join(";"),
        applyScope:
          applyScope instanceof Array ? applyScope.join(";") : applyScope,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        status: this.enterpriseSwitchValue === true ? 1 : 2,
        ...other,
      });
      if (res.rows.length === 0) {
        this.noHasInfo = true;
      }
      this.tableData = res.rows;
      this.total = res.total;
    },
    async startRecommendEnterprise() {
      await this.recommendEnterprise();
      this.isRecommendEnterprise = true;
      this.resetEnterprise = false;
    },
    async startRecommendFinace() {
      await this.recommendSubmit();
      this.isRecommendFinace = true;
      this.resetFinace = false;
    },
    // 查看详情
    viewdetail() {
      this.$router.push({
        path: "demand-detail",
        query: {
          id: 1,
          type: "智能推荐",
        },
      });
    },
    enterpriseDetail() {
      this.$router.push({
        path: "enterprise-detail",
        query: {
          id: 1,
        },
      });
    },
    changeSwitchEnerprise() {
      // 关闭按钮的同时要清除所有的状态
      console.log(this.enterpriseSwitchValue);
      if (this.enterpriseSwitchValue === false) {
        this.isRecommendEnterprise = false;
        this.resetEnterprise = false;
        this.isRecommendEnterprise = false;
        closeElectricity();
      }
    },
    changeSwitchFinace() {
      // 关闭按钮的同时要清除所有的状态
      console.log(this.finaceSwitchValue);
      if (this.finaceSwitchValue === false) {
        this.isRecommendFinace = false;
        this.resetFinace = false;
        this.isRecommendFinace = false;
        closeFinance();
      }
    },
    // 立即认领
    async immediatelyClaimItem(item) {
      let res = await immediatelyClaim(item.id);
      if (res.code === 200) {
        this.$message.success("认领成功");
        // eslint-disable-next-line require-atomic-updates
        item.disabled = true;
      }
    },
    // 标记
    async electricitySign(id) {
      let res = await electricityTag(id);
      if (res.code === 200) {
        this.startRecommend();
      }
    },
    // 取消标记
    async electricityCancelSign(id) {
      let res = await electricityCancelTag(id);
      if (res.code === 200) {
        this.startRecommend();
      }
    },
    // 修改规则
    handleResetFinace() {
      this.isRecommendFinace = false;
      this.resetFinace = true;
    },
    handleResetEnterprise() {
      this.isRecommendEnterprise = false;
      this.resetEnterprise = true;
    },
    changeValue(val, regionlabel) {
      this.demandData.applyScope = val;
      this.demandData.financeRegionData = regionlabel;
      console.log(this.demandData.financeRegionData);
    },
    changeValue1(val, regionlabel) {
      this.powerData.applyScope = val;
      this.powerData.electricityRegionData = regionlabel;
      console.log(this.powerData.electricityRegionData);
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
.tab {
  margin: 30px 0;
  border-bottom: 1px solid #eee;
}
.contentTitle {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
}
.el-switch {
  margin-left: 20px;
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
.configureRule {
  display: flex;
  flex-direction: column;
  color: rgb(141, 141, 141);
  .configureRulespan {
    margin: 5px 10px;
  }
}
.el-form {
  padding: 30px;
  background: #eee;
}
.info {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  padding: 10px;
  background: #eee;
}
.info-item-list {
  width: 33%;
}
.loan-info {
  width: 400px;
  height: 350px;
  margin: 30px;
  padding: 30px 10px;
  font-size: 13px;
  text-align: center;
  background: #fff;
}
.info-title {
  margin-bottom: 30px;
  font-size: 18px;
}
.info-item {
  margin: 30px 0;
  // color: #057af3;
}
.item-name {
  display: inline-block;
  width: 150px;
  margin-right: 30px;
  // color: rgba(0, 0, 0, 0.5);
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
  font-size: 18px;
}
.active {
  color: #057af3;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
