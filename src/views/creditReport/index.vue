<template>
  <div class="report">
    <div class="report_cont" id="report_credit">
      <div class="cover">
        <h2 class="cover_title">{{ qymc }}<br />信用评价报告</h2>
        <div class="cover_footer">
          <p>2020年10月</p>
        </div>
      </div>
      <div class="page1 report_statement" style="height: 1123px">
        <h3>报告声明</h3>
        <p>
          为便于报告使用人正确理解和使用本信用评价报告，国网征信有限公司（以下简称“国网征信”或“我们”）特此声明：
        </p>
        <ol>
          <li>
            我们遵照相关法律、法规及监管部门相关要求，按照国网征信的业务流程及评价标准，履行了勤勉尽责和诚信义务，及时为用户提供客观、真实、公正的报告开具服务。
          </li>
          <li>
            本报告是依据国网征信合理的内部信用评价标准及方法，遵循内部评价程序做出的独立判断，未受被查询机构和其他第三方组织或个人的干预和影响。
          </li>
          <li>
            本报告生成依据含截止用户申请出具报告时第三方公开数据，我们无法对其提供内容的合法性、真实性、完整性、准确性及时效性进行一一核实，亦对第三方提供的内容本身不承担任何法律责任。
          </li>
          <li>
            本报告仅供用户在商业决策时参考使用，不用于其他用途，使用者因本报告而做出的判断、决策等行为均为其依据自身经验、常识所做出的行为，本报告并不构成对用户商业决策时的任何建议。
          </li>
          <li>
            国网征信不对任何本报告使用者所表述的国网征信分析结果而出现的任何损失负责，亦不对使用本报告提供给第三方所产生的任何后果承担责任。
          </li>
          <li>
            报告使用时，应严格遵守有关法律、法规规定，不得利用本报告从事任何侵犯他人个人隐私或商业秘密等违法、犯罪活动。
          </li>
          <li>
            用户不得以任何形式复制、摘录、编辑、篡改本报告全部或部分内容。
          </li>
          <li>
            用户在本报告生成前，应当已获得被查询机构充分授权同意，授权内容至少应当明确用户有权向国网征信进行查询或委托国网征信向权威数据源系统查询授权机构的经营活动信息和其他信用信息，并向用户反馈。
          </li>
          <li>
            本报告自加盖国网征信单位公章/电子章之日起生效，有效期为一个月。
          </li>
        </ol>
      </div>
      <div class="page1" style="height: 1123px">
        <h3 class="list_title">目 录</h3>
        <ul class="list">
          <li>
            <div class="L0">1. 整体情况</div>
            <div class="list-line L0"></div>
            <div class="list-con1 L0">1</div>
          </li>
          <li>
            <div class="L0">2. 企业基本信息</div>
            <div class="list-line"></div>
            <div class="list-con1">2</div>
          </li>
          <li>
            <div class="L1">2.1. 工商信息</div>
            <div class="list-line"></div>
            <div class="list-con1">2</div>
          </li>
          <li>
            <div class="L1">2.2. 关联关系</div>
            <div class="list-line"></div>
            <div class="list-con1">4</div>
          </li>
          <li>
            <div class="L1">2.3. 经营信息</div>
            <div class="list-line"></div>
            <div class="list-con1">5</div>
          </li>
          <li>
            <div class="L1">2.4. 双公示及资质信息</div>
            <div class="list-line"></div>
            <div class="list-con1">6</div>
          </li>
          <li>
            <div class="L1">2.5. 司法信息</div>
            <div class="list-line"></div>
            <div class="list-con1">7</div>
          </li>
          <li>
            <div class="L1">2.6. 知识产权</div>
            <div class="list-line"></div>
            <div class="list-con1">8</div>
          </li>
          <li>
            <div class="L0">3. 电力数据</div>
            <div class="list-line"></div>
            <div class="list-con1">9</div>
          </li>
          <li>
            <div class="L1">3.1. 电费水平微标签</div>
            <div class="list-line"></div>
            <div class="list-con1">9</div>
          </li>
          <li>
            <div class="L1">3.2. 交费行为微标签</div>
            <div class="list-line"></div>
            <div class="list-con1">9</div>
          </li>
          <li>
            <div class="L1">3.3. 用电规范微标签</div>
            <div class="list-line"></div>
            <div class="list-con1">10</div>
          </li>
          <li>
            <div class="L1">3.4. 用电行为微标签</div>
            <div class="list-line"></div>
            <div class="list-con1">11</div>
          </li>
          <li>
            <div class="L1">3.5. 用电容量微标签</div>
            <div class="list-line"></div>
            <div class="list-con1">13</div>
          </li>
          <li>
            <div class="L1">3.6. 互动行为+企业基本信息微标签</div>
            <div class="list-line"></div>
            <div class="list-con1">13</div>
          </li>
          <li>
            <div class="L0">4. 财务信息</div>
            <div class="list-line"></div>
            <div class="list-con1">14</div>
          </li>
          <li>
            <div class="L1">4.1. 财务数据结构分析</div>
            <div class="list-line"></div>
            <div class="list-con1">14</div>
          </li>
          <li>
            <div class="L1">4.2. 财务指标分析</div>
            <div class="list-line"></div>
            <div class="list-con1">16</div>
          </li>
          <li>
            <div class="L0">5. 税务信息</div>
            <div class="list-line"></div>
            <div class="list-con1">21</div>
          </li>
          <li>
            <div class="L1">5.1. 纳税信息分析</div>
            <div class="list-line"></div>
            <div class="list-con1">21</div>
          </li>
          <li>
            <div class="L1">5.2. 企业增值税纳税趋势变动分析</div>
            <div class="list-line"></div>
            <div class="list-con1">22</div>
          </li>
          <li>
            <div class="L1">5.3. 进项发票信息</div>
            <div class="list-line"></div>
            <div class="list-con1">22</div>
          </li>
          <li>
            <div class="L1">5.4. 销项发票信息</div>
            <div class="list-line"></div>
            <div class="list-con1">23</div>
          </li>
          <li>
            <div class="L1">5.5. 上游供应商情况</div>
            <div class="list-line"></div>
            <div class="list-con1">24</div>
          </li>
          <li>
            <div class="L2">5.5.1. 供应商数目及金额</div>
            <div class="list-line"></div>
            <div class="list-con1">24</div>
          </li>
          <li>
            <div class="L2">5.5.2. 前五大上游供应商企业</div>
            <div class="list-line"></div>
            <div class="list-con1">25</div>
          </li>
          <li>
            <div class="L2">5.5.3. 上游供应商地域分布</div>
            <div class="list-line"></div>
            <div class="list-con1">26</div>
          </li>
          <li>
            <div class="L2">5.5.4. 上游供应商行业分布</div>
            <div class="list-line"></div>
            <div class="list-con1">27</div>
          </li>
          <li>
            <div class="L2">5.5.5. 按交易金额划分的前三大企业类型</div>
            <div class="list-line"></div>
            <div class="list-con1">27</div>
          </li>
          <li>
            <div class="L1">5.6. 下游客户情况</div>
            <div class="list-line"></div>
            <div class="list-con1">27</div>
          </li>
          <li>
            <div class="L2">5.6.1 客户数目及金额</div>
            <div class="list-line"></div>
            <div class="list-con1">27</div>
          </li>
          <li>
            <div class="L2">5.6.2 前五大下游企业</div>
            <div class="list-line"></div>
            <div class="list-con1">28</div>
          </li>
          <li>
            <div class="L2">5.6.3 下游客户地域分布</div>
            <div class="list-line"></div>
            <div class="list-con1">29</div>
          </li>
          <li>
            <div class="L2">5.6.4 下游客户行业分布</div>
            <div class="list-line"></div>
            <div class="list-con1">29</div>
          </li>
          <li>
            <div class="L2">5.6.5 按交易金额划分的前三大企业类型</div>
            <div class="list-line"></div>
            <div class="list-con1">29</div>
          </li>
          <li>
            <div class="L1">5.7. 企业前五大采购商品分析</div>
            <div class="list-line"></div>
            <div class="list-con1">30</div>
          </li>
          <li>
            <div class="L0">6. 产业定位</div>
            <div class="list-line"></div>
            <div class="list-con1">31</div>
          </li>
          <li>
            <div class="L1">6.1 企业主要财务经营指标</div>
            <div class="list-line"></div>
            <div class="list-con1">31</div>
          </li>
          <li>
            <div class="L1">6.2 企业风险信息定位</div>
            <div class="list-line"></div>
            <div class="list-con1">32</div>
          </li>
        </ul>
      </div>
      <overall :reportData="reportData" />
      <businese :reportData="reportData" />
      <!-- <graph /> -->
      <operate :reportData="reportData" />
      <dbpub :reportData="reportData" />
      <judicial :reportData="reportData" />
      <knowledge :reportData="reportData" />

      <div>
        <elec-level :reportData="reportData" />
      </div>

      <div>
        <finadata :reportData="reportData" />
        <fina-index :reportData="reportData" />
        <fina-profit :reportData="reportData" />
      </div>
      <div>
        <tax1 :reportData="reportData" />
        <tax2 :reportData="reportData" />
        <tax3 :reportData="reportData" />
      </div>
      <div><industrypos :reportData="reportData" /></div>
    </div>
  </div>
</template>

<script>
import { getReportData } from "@/api/report";
import { getFormatDateByLong } from "@/assets/js/longTodata";
import reportScss from "@/assets/styles/report.scss";
import overall from "./components/baseInfo/overall";
import Businese from "./components/baseInfo/business";
// import Graph from "./components/baseInfo/graph";
import Operate from "./components/baseInfo/operate";
import dbpub from "./components/baseInfo/dblPub";
import judicial from "./components/baseInfo/judicial";
import knowledge from "./components/baseInfo/knowledge";
import elecLevel from "./components/elecData/elec-level";
import finadata from "./components/financeInfo/data";
import finaIndex from "./components/financeInfo/finaIndex";
import finaProfit from "./components/financeInfo/finaprofit";
import tax1 from "./components/taxInfo/tax1";
import tax2 from "./components/taxInfo/tax2";
import tax3 from "./components/taxInfo/tax3";
import industrypos from "./components/industryPos";
export default {
  name: "Report",
  props: ["qymc"],
  components: {
    overall,
    Businese,
    // Graph,
    Operate,
    dbpub,
    judicial,
    knowledge,
    elecLevel,
    finadata,
    finaIndex,
    finaProfit,
    tax1,
    tax2,
    tax3,
    industrypos,
  },
  computed: {
    reportScss() {
      return reportScss;
    },
  },
  data() {
    return {
      reportData: {
        zcxx: {},
      },
      zcjgfxList: [],
      zwjgfxListDate: [],
    };
  },
  watch: {
    qymc: {
      handler() {
        this.getData();
      },
    },
  },
  created() {
    this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      getReportData({ qymc: this.qymc }).then((res) => {
        this.reportData = res.data;
      });
    },
  },
  filters: {
    FormatTime: function (value) {
      if (!value) return "";
      return getFormatDateByLong(value, "yyyy-MM-dd");
    },
  },
};
</script>
