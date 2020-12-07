<template>
  <div class="report" id="report_cont">
    <div class="report_cont">
      <div class="cover">
        <h2 class="cover_title">{{ qymc }}<br />风险量化报告</h2>
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
        <!-- 目录 -->
        <h3 class="list_title">目 录</h3>
        <ul class="list" style="overflow: hidden">
          <li>
            <a href="#ddd" class="list-nap1 L1"
              >1、&nbsp;&nbsp;&nbsp;&nbsp;企业概况</a
            >
            <div class="list-line"></div>
            <div class="list-con1">2</div>
          </li>
          <li>
            <div class="list-nap1 L1">
              2、&nbsp;&nbsp;&nbsp;&nbsp;重大变更事项
            </div>
            <div class="list-line"></div>
            <div class="list-con1">2</div>
          </li>
          <li>
            <div class="list-nap1 L1">3、&nbsp;&nbsp;&nbsp;&nbsp;经营信息</div>
            <div class="list-line"></div>
            <div class="list-con1">3</div>
          </li>
          <li>
            <div class="list-nap1 L1">
              4、&nbsp;&nbsp;&nbsp;&nbsp;行政处罚信息
            </div>
            <div class="list-line"></div>
            <div class="list-con1">4</div>
          </li>
          <li>
            <div class="list-nap1 L1">5、&nbsp;&nbsp;&nbsp;&nbsp;司法信息</div>
            <div class="list-line"></div>
            <div class="list-con1">5</div>
          </li>
          <li>
            <div class="list-nap1 L1">
              6、&nbsp;&nbsp;&nbsp;&nbsp;财务、经营数据预警
            </div>
            <div class="list-line"></div>
            <div class="list-con1">6</div>
          </li>
          <li>
            <div class="list-nap1 L1">
              7、&nbsp;&nbsp;&nbsp;&nbsp;电力预警信息
            </div>
            <div class="list-line"></div>
            <div class="list-con1">7</div>
          </li>
        </ul>
      </div>
      <div class="page1">
        <h2 id="ddd">一、 企业概况</h2>
        <h3>1. 企业基本信息</h3>
        <el-container class="table-noborder">
          <el-row>
            <el-row>
              <el-col :span="5" class="">企业名称：</el-col>
              <el-col :span="19">{{
                (reportData.zcxx && reportData.zcxx.name) || "-"
              }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">成立时间：</el-col>
              <el-col :span="19">{{
                (reportData.zcxx && reportData.zcxx.estiblishTime) || "-"
              }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">法定代表人：</el-col>
              <el-col :span="19">{{
                (reportData.zcxx && reportData.zcxx.legalEntityId) || "-"
              }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">注册资本(元)：</el-col>
              <el-col :span="19">{{
                (reportData.zcxx && reportData.zcxx.regCapitalAmount) || "-"
              }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">统一社会信用代码：</el-col>
              <el-col :span="19">{{
                (reportData.zcxx && reportData.zcxx.creditCode) || "-"
              }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">所属行业：</el-col>
              <el-col :span="19">{{
                (reportData.zcxx && reportData.zcxx.categoryCode) || "-"
              }}</el-col>
            </el-row>
            <el-row>
              <el-col :span="5">经营范围：</el-col>
              <el-col :span="19">{{
                (reportData.zcxx && reportData.zcxx.businessScope) || "-"
              }}</el-col>
            </el-row>
          </el-row>
        </el-container>
        <!-- <table border="0">
          <tr>
            <th>企业名称</th>
            <th>{{ (reportData.zcxx && reportData.zcxx.name) || "-" }}</th>
            <th>成立时间</th>
            <th>{{ reportData.zcxx && reportData.zcxx.estiblishTime }}</th>
          </tr>
          <tr>
            <td>法定代表人</td>
            <td>{{ reportData.zcxx && reportData.zcxx.legalEntityId }}</td>
            <td>注册资本（元）</td>
            <td>{{ reportData.zcxx && reportData.zcxx.regCapitalAmount }}</td>
          </tr>
          <tr>
            <td>统一社会信用代码</td>
            <td>{{ reportData.zcxx && reportData.zcxx.creditCode }}</td>
            <td>所属行业</td>
            <td>{{ reportData.zcxx && reportData.zcxx.categoryCode }}</td>
          </tr>
          <tr>
            <td>经营范围</td>
            <td colspan="3">
              {{ reportData.zcxx && reportData.zcxx.businessScope }}
            </td>
          </tr>
        </table> -->
      </div>
      <div class="page1">
        <h3>二、 重大变更事项</h3>
        <table>
          <div v-for="item in reportData.bgjlList" :key="item.id">
            <tr>
              <th>变更项目</th>
              <th>{{ item.changeItem }}</th>
              <th>变更日期</th>
              <th>{{ item.changeTime }}</th>
            </tr>
            <tr>
              <td>变更后内容</td>
              <td colspan="3">
                {{ item.contentAfter }}
              </td>
            </tr>
            <tr>
              <td>变更前内容</td>
              <td colspan="3">
                {{ item.contentBefore }}
              </td>
            </tr>
          </div>
        </table>
      </div>
      <div class="page1">
        <h3>三、 经营信息</h3>
        <h4>1. 动产抵押</h4>
        <table>
          <tr>
            <th>序号</th>
            <th>登记日期</th>
            <th>登记编号</th>
            <th>公示日期</th>
            <th>被担保债权数额</th>
            <th>登记机关</th>
            <th>状态</th>
            <th>债务人履行债务的期限</th>
            <th>被担保债权种类</th>
          </tr>
          <tr v-for="(item, index) in reportData.dcdyList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.regDate }}</td>
            <td>{{ item.regNum }}</td>
            <td>{{ item.publishDate }}</td>
            <td>{{ item.amount }}</td>
            <td>{{ item.regDepartment }}</td>
            <td>{{ item.status }}</td>
            <td>{{ item.term }}</td>
            <td>{{ item.type }}</td>
          </tr>
        </table>
        <h4>2. 股权质押</h4>
        <table>
          <tr>
            <th>序号</th>
            <th>出质人</th>
            <th>质权人</th>
            <th>出质股权数额</th>
            <th>公示日期</th>
            <th>股权出质登记日期</th>
            <th>状态</th>
          </tr>
          <tr v-for="(item, index) in reportData.gqzyList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.pledgor }}</td>
            <td>{{ item.pledgee }}</td>
            <td>{{ item.equityAmount }}</td>
            <td>{{ item.pubDate }}</td>
            <td>{{ item.regDate }}</td>
            <td>{{ item.state }}</td>
          </tr>
        </table>
        <h4>3. 经营异常</h4>
        <table>
          <tr>
            <th>序号</th>
            <th>列入异常名录日期</th>
            <th>列入异常名录原因</th>
            <th>决定列入异常名录部门(作出决定机关)</th>
            <th>移除异常名录原因</th>
            <th>决定移除异常名录部门</th>
          </tr>
          <tr v-for="(item, index) in reportData.jyycList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.putDate }}</td>
            <td>{{ item.putReason }}</td>
            <td>{{ item.putDepartment }}</td>
            <td>{{ item.removeReason }}</td>
            <td>{{ item.removeDepartment }}</td>
          </tr>
        </table>
      </div>
      <div class="page1">
        <h3>四、 行政处罚信息</h3>
        <h4>1. 行政处罚</h4>
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
          <tr v-for="(item, index) in reportData.xzcfList" :key="item.id">
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
      <div class="page1">
        <h3>五、 司法信息</h3>
        <h4>1. 严重违法</h4>
        <table>
          <tr>
            <th>序号</th>
            <th>列入日期</th>
            <th>列入决定机关</th>
            <th>列入严重违法失信企业名单原因</th>
          </tr>
          <tr v-for="(item, index) in reportData.yzwfList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.putDate }}</td>
            <td>{{ item.putDepartment }}</td>
            <td>{{ item.putReason }}</td>
          </tr>
        </table>
        <h4>2. 裁判文书</h4>
        <table>
          <tr>
            <th>序号</th>
            <th>案件名称</th>
            <th>判决结果</th>
            <th>案号</th>
            <th>案件身份</th>
            <th>执行法院</th>
          </tr>
          <tr v-for="(item, index) in reportData.cpwsList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.caseNo }}</td>
            <td>{{ item.result }}</td>
            <td>{{ item.caseNo }}</td>
            <td></td>
            <td>{{ item.court }}</td>
          </tr>
        </table>
        <h4>3. 失信被执行人</h4>
        <table>
          <tr>
            <th>序号</th>
            <th>案号</th>
            <th>发布时间</th>
            <th>执行法院</th>
            <th>立案时间</th>
            <th>做出执行依据单位</th>
            <th>法律生效文书确定的义务</th>
            <th>被执行人的履行情况</th>
            <th>已履行部分</th>
            <th>未履行部分</th>
          </tr>
          <tr v-for="(item, index) in reportData.sxbzxrxxList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.caseNo }}</td>
            <td>{{ item.pubDate }}</td>
            <td>{{ item.court }}</td>
            <td>{{ item.regTime }}</td>
            <td>{{ item.gistUnit }}</td>
            <td>{{ item.duty }}</td>
            <td>{{ item.performance }}</td>
            <td>{{ item.performedPart }}</td>
            <td>{{ item.unperformPart }}</td>
          </tr>
        </table>
        <h4>4. 抽查检查</h4>
        <table>
          <tr>
            <th>序号</th>
            <th>日期</th>
            <th>类型</th>
            <th>结果</th>
            <th>检查实施机关</th>
          </tr>
          <tr v-for="(item, index) in reportData.ccjcList" :key="item.id">
            <td>{{ index + 1 }}</td>
            <td>{{ item.checkDate }}</td>
            <td></td>
            <td>{{ item.checkResult }}</td>
            <td>{{ item.checkOrg }}</td>
          </tr>
        </table>
      </div>
      <div class="page1">
        <h3>六、 财务、经营数据预警</h3>
        <h4>1. 预警信息</h4>
        <table>
          <tr>
            <th>预警指标</th>
            <th>企业信息</th>
            <th>预警原因</th>
          </tr>
          <tr
            v-for="(item, index) in reportData.financeWaring"
            :key="index + 'a1'"
          >
            <td>{{ item.targetName }}</td>
            <td>{{ item.entValue }}</td>
            <td>{{ item.reason }}</td>
          </tr>
        </table>
      </div>
      <div class="page1">
        <h3>七、电力预警信息</h3>
        <h5>（一）贷后预警模型告警码规则说明表</h5>
        <table>
          <tr>
            <th>一级指标</th>
            <th>A</th>
            <th>B</th>
            <th>C</th>
            <th>D</th>
            <th>E</th>
          </tr>
          <tr>
            <td>指标名称</td>
            <td>容量状态</td>
            <td>用电水平</td>
            <td>电费缴纳水平</td>
            <td>停电分析</td>
            <td>违约用电</td>
          </tr>
        </table>
        <h5>（二）贷后预警模型告警二级指标规则说明表</h5>
        <table>
          <tr>
            <th>告警二级指标</th>
            <th>对应编码</th>
          </tr>
          <tr>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import Echarts from "@/components/commons/echar2";
import { getFormatDateByLong } from "@/assets/js/longTodata";
import reportScss from "@/assets/styles/report.scss";
import { getReportData } from "@/api/report";
export default {
  name: "Report",
  props: ["qymc"],
  components: {
    // Echarts,
  },
  created() {
    this.getData();
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
    };
  },
  watch: {
    qymc: {
      handler() {
        this.getData();
      },
    },
  },
  methods: {
    // 获取报告数据
    getData() {
      getReportData({ reportType: 2, qymc: this.qymc }).then((res) => {
        if (res.code === 200) {
          this.reportData = res.data;
        }
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
