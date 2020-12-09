<template>
  <div class="report">
    <span @click="esc" class="esc">关闭</span>
    <div class="report_cont" id="report_cont">
      <div class="cover" v-if="data[0].length != 0">
        <h2 class="cover_title">{{ data[0].tuming }}</h2>
        <div class="cover_cont">
          <p>
            <b>项目名称：</b>
            <span>{{ data[0].data.xiangmu }}</span>
          </p>
          <p>
            <b>报告编号：</b>
            <span>{{ data[0].index }}</span>
          </p>
          <p>
            <b>企业名称：</b>
            <span>{{ data[0].data.comname }}</span>
          </p>
          <p>
            <b>信用等级：</b>
            <span>{{ data[0].data.creditlevel }}</span>
          </p>
        </div>
        <div class="cover_footer">
          <p>{{ data[0].sendreport }}</p>
          <p>{{ data[0].Presentationdate }}</p>
        </div>
      </div>
      <Tabs>
        <TabPane label="基本信息">
          <button class="exportWord" @click="exportWord(1)">导出</button>
          <div class="page" id="baseMessage">
            <h2 class="companyNameTitle" v-if="data[5].qyjbxx0">
              公司名称：{{ data[5].qyjbxx0.comName }}
            </h2>
            <div class="page_score">
              <h3>
                <b>评分说明：</b>
              </h3>
              <table>
                <tbody>
                  <tr>
                    <td>符号</td>
                    <td>计分范围</td>
                    <td>信用释义</td>
                  </tr>
                  <tr>
                    <td>A</td>
                    <td>≥85</td>
                    <td>
                      企业信用程度高，管理制度健全，对履行相关经济和社会责任能够提供极强的保障，环境因素变化对其稳定发展影响较小，违约风险极低。
                    </td>
                  </tr>
                  <tr>
                    <td>B</td>
                    <td>≥75＜85</td>
                    <td>
                      企业信用程度良好，管理制度比较健全，对履行相关经济和社会责任能够提供较强的保障，环境因素变化对其稳定发展影响较小，违约风险低。
                    </td>
                  </tr>
                  <tr>
                    <td>C</td>
                    <td>≥65＜75</td>
                    <td>
                      企业信用程度一般，管理制度不完善，对履行相关经济和社会责任能够提供一般的保障，对于抵御环境发生不利变化时的能力一般，存在违约风险。
                    </td>
                  </tr>
                  <tr>
                    <td>D</td>
                    <td>＜65</td>
                    <td>
                      企业信用程度欠佳，管理制度欠缺，履约能力欠佳，有较大的违约风险。
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="qyjbxx" v-if="data[5].qyjbxx0">
              <!-- 企业基本信息 -->
              <h3>
                <b>企业信息</b>
              </h3>
              <table class="table1" border-collapse>
                <tr>
                  <td class="td_title">统一社会信用代码</td>
                  <td class="td_cont">{{ data[5].qyjbxx0.bussinessNum }}</td>
                </tr>
                <tr>
                  <td class="td_title">企业名称</td>
                  <td class="td_cont">{{ data[5].qyjbxx0.comName }}</td>
                </tr>
                <tr>
                  <td class="td_title">类型</td>
                  <td class="td_cont">{{ data[5].qyjbxx0.comTypeName }}</td>
                </tr>
                <tr>
                  <td class="td_title">法定代表人</td>
                  <td class="td_cont">{{ data[5].qyjbxx0.legalName }}</td>
                </tr>
                <tr>
                  <td class="td_title">注册资本</td>
                  <td class="td_cont">{{ data[5].qyjbxx0.registerMoney }}</td>
                </tr>
                <tr>
                  <td class="td_title">成立日期</td>
                  <td class="td_cont">
                    {{ data[5].qyjbxx0.establishTime | FormatTime() }}
                  </td>
                </tr>
                <tr>
                  <td class="td_title">住所</td>
                  <td class="td_cont">{{ data[5].qyjbxx0.zs }}</td>
                </tr>
                <tr>
                  <td class="td_title">经营期限至</td>
                  <td class="td_cont">
                    {{(data[5].qyjbxx0.YYQXZHI==null?"":data[5].qyjbxx0.YYQXZHI.substring(0, 10))}}
                  </td>
                </tr>
                <tr>
                  <td class="td_title">经营范围</td>
                  <td class="td_cont last_cont">{{ data[5].qyjbxx0.JYFW }}</td>
                </tr>
              </table>
              <h4>
                <b v-show="data[2].fsxx && data[2].fsxx.score">{{
                  "企业综合信用得分：" +
                  (data[2].fsxx != null ? data[2].fsxx.score : "00") +
                  "分（行业平均得分" +
                  (data[3].hyfsxx != null ? data[3].hyfsxx.score : "00") +
                  "分）"
                }}</b>
              </h4>
              <h4>
                <b v-show="data[5].qyjbxx0.creditRating">{{
                  "企业等级：" + data[5].qyjbxx0.creditRating + "级"
                }}</b>
              </h4>
              <!-- <echarts
                ref="comIncome"
                :tableData="comIncome"
                :elem="name"
                :styleSet="boxStyle"
              ></echarts> -->
            </div>
            <div class="cjbhg">
              <!-- 对于抽检不合格商品的违法行为的处罚 -->
              <h3>
                <b>对于抽检不合格商品的违法行为的处罚</b>
              </h3>
            </div>
            <div class="qybgxx list">
              <h3>
                <b>{{ data[6].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qybgxx"
                :data="this.data[6].qybgxx"
              ></Table>
            </div>
            <div class="qyczfxx list">
              <!-- 出资方信息 -->
              <h3>
                <b>{{ data[7].name }}</b>
              </h3>
              <Table
                stripe
                :columns="quczfxx"
                :data="this.data[7].quczfxx"
              ></Table>
            </div>
            <div class="qydsjsbaxx list">
              <!-- 企业董事-监事备案信息 -->
              <h3>
                <b>{{ data[8].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qydsjsbaxx"
                :data="this.data[8].qydsjsbaxx"
              ></Table>
            </div>
            <div class="fddbrxx list">
              <!-- 企业法人代表信息 -->
              <h3>
                <b>{{ data[9].name }}</b>
              </h3>
              <Table
                stripe
                :columns="fddbrxx"
                :data="this.data[9].fddbrxx"
              ></Table>
            </div>
            <div class="qygdxx list">
              <!-- 企业股东（投资者）信息 -->
              <h3>
                <b>{{ data[10].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qygdxx"
                :data="this.data[10].qygdxx"
              ></Table>
            </div>
            <div class="qygsxxcc list">
              <!-- 企业公示信息抽查" -->
              <h3>
                <b>{{ data[11].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qygsxxcc"
                :data="this.data[11].qygsxxcc"
              ></Table>
            </div>
            <div class="qyjjycxx list">
              <!-- 企业经营异常信息 -->
              <h3>
                <b>{{ data[12].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qyjjycxx"
                :data="this.data[12].qyjjycxx"
              ></Table>
            </div>
            <div class="qyjlxx">
              <!-- 企业奖励信息 -->
              <h3>
                <b>{{ data[13].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qyjlxx"
                :data="this.data[13].qyjlxx"
              ></Table>
            </div>
            <div class="qysbxx">
              <!-- 企业商标信息 -->
              <h3>
                <b>{{ data[14].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qysbxx"
                :data="this.data[14].qysbxx"
              ></Table>
            </div>
            <div class="qysxgsxx">
              <h3>
                <b>{{ data[15].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qysxgsxx"
                :data="this.data[15].qysxgsxx"
              ></Table>
            </div>
            <div class="qyzrrgdxx">
              <!-- 企业自然人股东信息 -->
              <h3>
                <b>{{ data[16].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qyzrrgdxx"
                :data="this.data[16].qyzrrgdxx"
              ></Table>
            </div>
            <div class="qyzxxx">
              <!-- 企业注销信息 -->
              <h3>
                <b>{{ data[17].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qyzxxx"
                :data="this.data[17].qyzxxx"
              ></Table>
            </div>
            <div class="scztxyxxjg">
              <!-- 市场主体信用信息监管 -->
              <h3>
                <b>{{ data[18].name }}</b>
              </h3>
              <Table
                stripe
                :columns="scztxyxxjg"
                :data="this.data[18].scztxyxxjg"
              ></Table>
            </div>
            <div class="qydxxx">
              <!-- 企业吊销信息 -->
              <h3>
                <b>{{ data[19].name }}</b>
              </h3>
              <Table
                stripe
                :columns="qydxxx"
                :data="this.data[19].qydxxx"
              ></Table>
            </div>
            <div class="q_gtgshxx">
              <!-- 企业吊销信息 -->
              <h3>
                <b>{{ data[20].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gtgshxx"
                :data="this.data[20].q_gtgshxx"
              ></Table>
            </div>
            <div class="q_qyjjycmlxx">
              <!--区-企业经营异常名录信息  -->
              <h3>
                <b>{{ data[21].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qyjjycmlxx"
                :data="this.data[21].q_qyjjycmlxx"
              ></Table>
            </div>
            <div class="q_zxcfxx">
              <!-- 区-行政处罚信息（含违法行为类别） -->
              <h3>
                <b>{{ data[22].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_zxcfxx"
                :data="this.data[22].q_zxcfxx"
                :tooltip="true"
              ></Table>
            </div>
            <div class="q_qyslbgzxxx">
              <!-- 区-企业设立变更注销信息 -->
              <h3>
                <b>{{ data[23].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qyslbgzxxx"
                :data="this.data[23].q_qyslbgzxxx"
              ></Table>
            </div>
            <div class="q_qyzzxx">
              <!-- 区-企业增资信息 -->
              <h3>
                <b>{{ data[24].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qyzzxx"
                :data="this.data[24].q_qyzzxx"
              ></Table>
            </div>
            <div class="q_slbgdxzxxx">
              <!-- 区-设立变更吊销注销信息-->
              <h3>
                <b>{{ data[25].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_slbgdxzxxx"
                :data="this.data[25].q_slbgdxzxxx"
              ></Table>
            </div>
            <div class="q_scztxyxxjg">
              <!-- 区-市场主体信用信息监管-->
              <h3>
                <b>{{ data[26].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_scztxyxxjg"
                :data="this.data[26].q_scztxyxxjg"
              ></Table>
            </div>
            <div class="q_qygsxxcc">
              <!-- 区-企业公示信息抽查-->
              <h3>
                <b>{{ data[27].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qygsxxcc"
                :data="this.data[27].q_qygsxxcc"
              ></Table>
            </div>
            <div class="q_gqbgdjxx">
              <!-- 区-股权变更登记信息"-->
              <h3>
                <b>{{ data[28].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gqbgdjxx"
                :data="this.data[28].q_gqbgdjxx"
              ></Table>
            </div>
            <div class="q_qygqzrxx">
              <!-- 区-企业股权转让信息"-->
              <h3>
                <b>{{ data[29].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qygqzrxx"
                :data="this.data[29].q_qygqzrxx"
              ></Table>
            </div>
            <div class="q_wzzzxx">
              <!-- 区-外资注资信息-->
              <h3>
                <b>{{ data[30].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_wzzzxx"
                :data="this.data[30].q_wzzzxx"
              ></Table>
            </div>
            <div class="q_mcyxhz">
              <!-- 区-名称预先核准-->
              <h3>
                <b>{{ data[31].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_mcyxhz"
                :data="this.data[31].q_mcyxhz"
              ></Table>
            </div>
            <div class="q_qynbgqbgxx">
              <!-- 区-企业年报股权变更信息-->
              <h3>
                <b>{{ data[32].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qynbgqbgxx"
                :data="this.data[32].q_qynbgqbgxx"
              ></Table>
            </div>
            <div class="q_qinbxx">
              <!-- 区-企业年报-->
              <h3>
                <b>{{ data[33].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qinbxx"
                :data="this.data[33].q_qinbxx"
              ></Table>
            </div>
            <div class="q_qynbdwtzxx">
              <!-- 区-企业年报对外投资信息-->
              <h3>
                <b>{{ data[34].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_qynbdwtzxx"
                :data="this.data[34].q_qynbdwtzxx"
              ></Table>
            </div>
            <div class="q_gtgsnbxx">
              <!-- 区-个体工商年报信息-->
              <h3>
                <b>{{ data[35].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gtgsnbxx"
                :data="this.data[35].q_gtgsnbxx"
              ></Table>
            </div>
            <div class="q_gtnbxzxkxx">
              <!-- 区-个体年报行政许可信息-->
              <h3>
                <b>{{ data[36].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gtnbxzxkxx"
                :data="this.data[36].q_gtnbxzxkxx"
              ></Table>
            </div>
            <div class="q_gtnbxxwdhwzxx">
              <!-- 区-个体年报信息网店或网站信息-->
              <h3>
                <b>{{ data[37].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gtnbxxwdhwzxx"
                :data="this.data[37].q_gtnbxxwdhwzxx"
              ></Table>
            </div>
            <div class="q_gxsjzxJhanSfcBaseinfoList">
              <!-- 区-农民专业合作社年报信息-->
              <h3>
                <b>{{ data[38].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhanSfcBaseinfoList"
                :data="this.data[38].q_gxsjzxJhanSfcBaseinfoList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhanSfcBranchinfoList">
              <!-- 区-农民合作社年报分支机构信息-->
              <h3>
                <b>{{ data[39].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhanSfcBranchinfoList"
                :data="this.data[39].q_gxsjzxJhanSfcBranchinfoList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhanSfcLicenceinfoList">
              <!-- 区-农民合作社年报行政许可信息-->
              <h3>
                <b>{{ data[40].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhanSfcLicenceinfoList"
                :data="this.data[40].q_gxsjzxJhanSfcLicenceinfoList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhanSfcWebsiteinfoList">
              <!-- 区-合作社年报网站或网店信息-->
              <h3>
                <b>{{ data[41].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhanSfcWebsiteinfoList"
                :data="this.data[41].q_gxsjzxJhanSfcWebsiteinfoList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhanSubcapitalList">
              <!-- 区-企业企业年报股东及企业年报股东及出资信息信息-->
              <h3>
                <b>{{ data[42].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhanSubcapitalList"
                :data="this.data[42].q_gxsjzxJhanSubcapitalList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhanWebsiteinfoList">
              <!-- 区-企业年报网店信息-->
              <h3>
                <b>{{ data[43].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhanWebsiteinfoList"
                :data="this.data[43].q_gxsjzxJhanWebsiteinfoList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhdishonestyEntinfoList">
              <!-- 区-严重违法失信企业名单-->
              <h3>
                <b>{{ data[44].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhdishonestyEntinfoList"
                :data="this.data[44].q_gxsjzxJhdishonestyEntinfoList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImCaseList">
              <!-- 区-企业公示行政处罚信息-->
              <h3>
                <b>{{ data[45].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImCaseList"
                :data="this.data[45].q_gxsjzxJheImCaseList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImInvactdetailList">
              <!-- 区-企业公示出资人实缴信息-->
              <h3>
                <b>{{ data[46].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImInvactdetailList"
                :data="this.data[46].q_gxsjzxJheImInvactdetailList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImInvestmentList">
              <!-- 区-企业公示出资人信息企业公示出资人信息-->
              <h3>
                <b>{{ data[47].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImInvestmentList"
                :data="this.data[47].q_gxsjzxJheImInvestmentList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImInvprodetailList">
              <!-- 区-企业公示出资人认缴信息-->
              <h3>
                <b>{{ data[48].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImInvprodetailList"
                :data="this.data[48].q_gxsjzxJheImInvprodetailList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImInvsraltList">
              <!-- 区-企业股权变更信息-->
              <h3>
                <b>{{ data[49].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImInvsraltList"
                :data="this.data[49].q_gxsjzxJheImInvsraltList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImInvupdateList">
              <!-- 区-企业公示出资人信息及出资人变更信息-->
              <h3>
                <b>{{ data[50].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImInvupdateList"
                :data="this.data[50].q_gxsjzxJheImInvupdateList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImIppldgaltList">
              <!-- 区-企业公示知识产权出质变更信息-->
              <h3>
                <b>{{ data[51].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImIppldgaltList"
                :data="this.data[51].q_gxsjzxJheImIppldgaltList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImIppldgList">
              <!-- 区-企业公示知识产权出质信息-->
              <h3>
                <b>{{ data[52].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImIppldgList"
                :data="this.data[52].q_gxsjzxJheImIppldgList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImPermitList">
              <!-- 区-公示行政许可信息-->
              <h3>
                <b>{{ data[53].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImPermitList"
                :data="this.data[53].q_gxsjzxJheImPermitList"
              ></Table>
            </div>
            <div class="q_gxsjzxJheImPrmtaltList">
              <!-- 区-公示行政许可变更信息-->
              <h3>
                <b>{{ data[54].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJheImPrmtaltList"
                :data="this.data[54].q_gxsjzxJheImPrmtaltList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhePubSpotcheckList">
              <!-- 区-企业抽查信息-->
              <h3>
                <b>{{ data[55].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhePubSpotcheckList"
                :data="this.data[55].q_gxsjzxJhePubSpotcheckList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhregViewIndivEntList">
              <!-- 区-法人库信息-->
              <h3>
                <b>{{ data[56].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhregViewIndivEntList"
                :data="this.data[56].q_gxsjzxJhregViewIndivEntList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhtmBaseinfoCmList">
              <!-- 区-驰名商标-->
              <h3>
                <b>{{ data[57].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhtmBaseinfoCmList"
                :data="this.data[57].q_gxsjzxJhtmBaseinfoCmList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhtmBaseinfoMlList">
              <!--区-商标信息-->
              <h3>
                <b>{{ data[58].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhtmBaseinfoMlList"
                :data="this.data[58].q_gxsjzxJhtmBaseinfoMlList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhtmBaseinfoZmList">
              <!--区-广西著名商标信息-->
              <h3>
                <b>{{ data[59].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhtmBaseinfoZmList"
                :data="this.data[59].q_gxsjzxJhtmBaseinfoZmList"
              ></Table>
            </div>
            <div class="q_gxsjzxJhxzcfGsList">
              <!--区-行政处罚信息-->
              <h3>
                <b>{{ data[60].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhxzcfGsList"
                :data="this.data[60].q_gxsjzxJhxzcfGsList"
              ></Table>
            </div>

            <!-- wangli  -->

            <div class="q_gxsjzxJhxzxkGsList">
              <!-- 区-行政许可信息-->
              <h3>
                <b>{{ data[61].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxJhxzxkGsList"
                :data="this.data[61].q_gxsjzxJhxzxkGsList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregGtgshjyycmlbList">
              <!-- 区-个体工商户经营异常名录表-->
              <h3>
                <b>{{ data[62].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregGtgshjyycmlbList"
                :data="this.data[62].q_gxsjzxLzregGtgshjyycmlbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregLzhyqyjbxxbList">
              <!-- 区-六证合一企业基本信息-->
              <h3>
                <b>{{ data[63].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregLzhyqyjbxxbList"
                :data="this.data[63].q_gxsjzxLzregLzhyqyjbxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregLzzhgtgshxxbList">
              <!-- 区-两证整合个体工商户信息-->
              <h3>
                <b>{{ data[64].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregLzzhgtgshxxbList"
                :data="this.data[64].q_gxsjzxLzregLzzhgtgshxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregNmzyhzsjyycmlbList">
              <!-- 区-农民专业合作社经营异常名录信息表-->
              <h3>
                <b>{{ data[65].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregNmzyhzsjyycmlbList"
                :data="this.data[65].q_gxsjzxLzregNmzyhzsjyycmlbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQybgxxbList">
              <!-- 区-企业变更信息表-->
              <h3>
                <b>{{ data[66].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQybgxxbList"
                :data="this.data[66].q_gxsjzxLzregQybgxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQyccxxbList">
              <!-- 区-企业抽查信息表-->
              <h3>
                <b>{{ data[67].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQyccxxbList"
                :data="this.data[67].q_gxsjzxLzregQyccxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQydsjsbanxxbList">
              <!-- 区-企业董事监事备案信息表-->
              <h3>
                <b>{{ data[68].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQydsjsbanxxbList"
                :data="this.data[68].q_gxsjzxLzregQydsjsbanxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQyfrxxbList">
              <!-- 区-企业法定代表人信息表-->
              <h3>
                <b>{{ data[69].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQyfrxxbList"
                :data="this.data[69].q_gxsjzxLzregQyfrxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQygdxxbList">
              <!-- 区-企业股东信息表-->
              <h3>
                <b>{{ data[70].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQygdxxbList"
                :data="this.data[70].q_gxsjzxLzregQygdxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQyjbxxbList">
              <!-- 区-企业基本信息表-->
              <h3>
                <b>{{ data[71].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQyjbxxbList"
                :data="this.data[71].q_gxsjzxLzregQyjbxxbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQyjyycmlbList">
              <!-- 区-企业经营异常名录信息表-->
              <h3>
                <b>{{ data[72].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQyjyycmlbList"
                :data="this.data[72].q_gxsjzxLzregQyjyycmlbList"
              ></Table>
            </div>
            <div class="q_gxsjzxLzregQyzxxxbList">
              <!-- 区-企业注销信息表-->
              <h3>
                <b>{{ data[73].name }}</b>
              </h3>
              <Table
                stripe
                :columns="q_gxsjzxLzregQyzxxxbList"
                :data="this.data[73].q_gxsjzxLzregQyzxxxbList"
              ></Table>
            </div>

            <div class="bdcdjxx">
              <h3>
                <b>不动产登记信息</b>
              </h3>
              <Table :columns="bdcdjxx" :data="sbData"></Table>
            </div>
            <div class="zdkjxmxx">
              <!-- 重大科技项目信息 -->
              <h3>
                <b>{{ data[82].name }}</b>
              </h3>
              <Table
                :columns="zdkjxmxx"
                :data="this.data[82].tQyKjjZdkjzxxxList"
              ></Table>
            </div>
            <div class="gxjsqyrdxx">
              <!-- 高新技术企业认定信息 -->
              <h3>
                <b>{{ data[81].name }}</b>
              </h3>
              <Table
                :columns="gxjsqyrdxx"
                :data="this.data[81].tQyKjjGxqyrdxxList"
              ></Table>
            </div>
            <div class="rjcpdjxx">
              <h3>
                <b>软件产品登记信息</b>
              </h3>
              <Table :columns="rjcpdjxx" :data="sbData"></Table>
            </div>
          </div>
        </TabPane>
        <TabPane label="社保公积金">
          <button class="exportWord" @click="exportWord(2)">导出</button>
          <div class="page" id="shebaoMessage">
            <h2 class="companyNameTitle" v-if="data[5].qyjbxx0">
              公司名称：{{ data[5].qyjbxx0.comName }}
            </h2>
            <div class="qusbgjj">
              <h3>
                <b>加收社会保险滞纳金（法人）</b>
              </h3>
              <Table :columns="qusbgjj" :data="sbData"></Table>
            </div>
            <div class="qusbbxznj">
              <!-- 加收社会保险滞纳金 -->
              <h3>
                <b>{{ this.data[85].name }}</b>
              </h3>
              <Table
                :columns="qusbbxznj"
                :data="this.data[85].tQyRsjJsshbxznjList"
              ></Table>
            </div>
            <div class="qusbdj">
              <!-- 社会保险登记 -->
              <h3>
                <b>{{ this.data[86].name }}</b>
              </h3>
              <Table
                :columns="qusbdj"
                :data="this.data[86].tQyRsjSbdjList"
              ></Table>
            </div>
            <div class="qusbxf">
              <!-- 社会保险缴费稽核 -->
              <h3>
                <b>{{ data[83].name }}</b>
              </h3>
              <Table
                :columns="qusbxf"
                :data="this.data[83].tQyRjsShbxjfList"
              ></Table>
            </div>
            <div class="qusbzs">
              <!-- 社会保险费的征收 -->
              <h3>
                <b>{{ this.data[87].name }}</b>
              </h3>
              <Table
                :columns="qusBZS"
                :data="this.data[87].tQyRsjShbxfzsList"
              ></Table>
            </div>
            <div class="qusbzsfr">
              <!-- 社会保险费的征收（法人） -->
              <h3>
                <b>{{ data[84].name }}</b>
              </h3>
              <Table
                :columns="qusbzsfr"
                :data="this.data[84].tQyRsjBxfzsList"
              ></Table>
            </div>
            <div class="dwgjsjcxx">
              <!-- 单位公积金缴存信息 -->
              <h3>
                <b>{{ data[80].name }}</b>
              </h3>
              <Table
                :columns="dwgjsjcxx"
                :data="this.data[80].gjjDwxxList"
              ></Table>
            </div>
          </div>
        </TabPane>
        <TabPane label="食品、药品">
          <button class="exportWord" @click="exportWord(3)">导出</button>
          <div class="page" id="shipinMessage">
            <h2 class="companyNameTitle" v-if="data[5].qyjbxx0">
              公司名称：{{ data[5].qyjbxx0.comName }}
            </h2>
            <div class="qubjp">
              <h3>
                <b>保健品生产行政审批信息表</b>
              </h3>
              <Table :columns="qubjp" :data="sbData"></Table>
            </div>
            <div class="quxzcfother">
              <h3>
                <b>其他部门公示_行政处罚信息</b>
              </h3>
              <Table :columns="quxzcfother" :data="sbData"></Table>
            </div>
            <div class="quqycfxx">
              <h3>
                <b>企业处罚信息表</b>
              </h3>
              <Table :columns="quqycfxx" :data="sbData"></Table>
            </div>
            <div class="quxzcf">
              <h3>
                <b>行政处罚</b>
              </h3>
              <Table :columns="quxzcf" :data="sbData"></Table>
            </div>
          </div>
        </TabPane>
        <TabPane label="税务">
          <button class="exportWord" @click="exportWord(4)">导出</button>
          <div class="page" id="shuiwuMessage">
            <h2 class="companyNameTitle" v-if="data[5].qyjbxx0">
              公司名称：{{ data[5].qyjbxx0.comName }}
            </h2>
            <div class="quswqszm">
              <h3>
                <b>清税证明表</b>
              </h3>
              <Table :columns="quswqszm" :data="sbData"></Table>
            </div>
            <div class="quswxzxk">
              <h3>
                <b>行政许可</b>
              </h3>
              <Table :columns="quswxzxk" :data="sbData"></Table>
            </div>

            <div class="bgtBgtFzchxxList">
              <!-- 自治区税务局_非正常户 -->
              <h3>
                <b>{{ this.data[88].name }}</b>
              </h3>
              <Table
                :columns="fzchxx"
                :data="this.data[88].bgtBgtFzchxxList"
              ></Table>
            </div>
            <div class="bgtBgtNsrqsxxList">
              <!-- 自治区税务局_纳税人欠税信息 -->
              <h3>
                <b>{{ this.data[89].name }}</b>
              </h3>
              <Table
                :columns="nsrqsxx"
                :data="this.data[89].bgtBgtNsrqsxxList"
              ></Table>
            </div>
            <div class="bgtBgtSwdjjbxxList">
              <!-- 自治区税务局_税务登记基本信息 -->
              <h3>
                <b>{{ this.data[90].name }}</b>
              </h3>
              <Table
                :columns="swdjjbxx"
                :data="this.data[90].bgtBgtSwdjjbxxList"
              ></Table>
            </div>
            <div class="bgtBgtSwdjjbxxList">
              <!-- 自治区税务局_税务登记注销信息 -->
              <h3>
                <b>{{ this.data[91].name }}</b>
              </h3>
              <Table
                :columns="swdjzxxx"
                :data="this.data[91].bgtBgtSwdjzxxxList"
              ></Table>
            </div>
          </div>
        </TabPane>
        <TabPane label="司法、公安">
          <button class="exportWord" @click="exportWord(5)">导出</button>
          <div class="page" id="sifaMessage">
            <h2 class="companyNameTitle" v-if="data[5].qyjbxx0">
              公司名称：{{ data[5].qyjbxx0.comName }}
            </h2>
            <!-- <div class="qujgcfxx">
              <h3>
                <b>机构处罚信息（侵权假冒处罚信息）</b>
              </h3>
              <Table :columns="qujgcfxx" :data="sbData"></Table>
            </div>-->
            <div class="qujgcfxx">
              <h3>
                <b>行政处罚信息</b>
              </h3>
              <!-- 城市管理委员会 -->
              <h4>
                <b>{{ this.data[92].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[92].chengguanweiXzcfList"
              ></Table>
              <!-- 旅发委_行政处罚 -->
              <h4>
                <b>{{ this.data[105].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[105].lvfaweiXzcfList"
              ></Table>
              <!-- 公安局 -->
              <h4>
                <b>{{ this.data[94].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[94].gonganjuXzcfList"
              ></Table>
              <!-- 林业局 -->
              <h4>
                <b>{{ this.data[103].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[103].linyejuXzcfList"
              ></Table>
              <!-- 桂林市水利局 -->
              <h4>
                <b>{{ this.data[115].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[115].shuilijuXzcfList"
              ></Table>
              <!-- 桂林市物价局 -->
              <h4>
                <b>{{ this.data[119].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[119].wujiajuXzcfList"
              ></Table>
              <!-- 环保局_行政处罚 -->
              <h4>
                <b>{{ this.data[99].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[99].huanbaojuXzcfList"
              ></Table>
              <!-- 交通局 -->
              <h4>
                <b>{{ this.data[101].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[101].jiaotongjuXzcfList"
              ></Table>
              <!-- 住建局 -->
              <h4>
                <b>{{ this.data[121].name }}</b>
              </h4>
              <Table
                :columns="glsfsxzcf"
                :data="this.data[121].zhujianweiXzcfList"
              ></Table>
              <!-- 质监局机构处罚信息（侵权假冒处罚信息） -->
              <h4>
                <b>{{ this.data[97].name }}</b>
              </h4>
              <Table
                :columns="jgcfxx"
                :data="this.data[97].gxzjjexchangedbAuditCreditJgcfxxList"
              ></Table>
              <!-- 双公示行政处罚信息 -->
              <h4>
                <b>{{ this.data[98].name }}</b>
              </h4>
              <Table
                :columns="punish"
                :data="this.data[98].gxzjjexchangedbAuditCreditPunishList"
              ></Table>
              <!-- 自治区食品药品监督管理局-企业处罚信息表 -->
              <h4>
                <b>{{ this.data[74].name }}</b>
              </h4>
              <Table
                :columns="entpPunish"
                :data="this.data[74].govGxBgtShareEntpPunishList"
              ></Table>
              <!-- 其他部门公示_行政处罚信息 -->
              <h4>
                <b>{{ this.data[75].name }}</b>
              </h4>
              <Table
                :columns="eotCase"
                :data="this.data[74].govGxGsShareEOtCaseList"
              ></Table>
              <!-- 双公示行政处罚-->
              <h4>
                <b>{{ this.data[109].name }}</b>
              </h4>
              <Table
                :columns="SgsXzcfxxNew"
                :data="this.data[109].sgsSgsXzcfxxNewList"
              ></Table>
              <!-- ====================================================================================== -->
              <h3>
                <b>行政许可信息</b>
              </h3>
              <!-- 旅发委_行政处罚 -->
              <h4>
                <b>{{ this.data[93].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[93].chengguanweiXzxkList"
              ></Table>
              <!-- 旅发委_行政处罚 -->
              <h4>
                <b>{{ this.data[106].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[106].lvfaweiXzxkList"
              ></Table>
              <!-- 公安局 -->
              <h4>
                <b>{{ this.data[95].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[95].gonganjuXzxkList"
              ></Table>
              <!-- 桂林市林业局 -->
              <h4>
                <b>{{ this.data[104].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[104].linyejuXzxkList"
              ></Table>
              <!-- 桂林市水利局 -->
              <h4>
                <b>{{ this.data[116].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[116].shuilijuXzxkList"
              ></Table>
              <!-- 桂林市物价局 -->
              <h4>
                <b>{{ this.data[120].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[120].wujiajuXzxkList"
              ></Table>
              <!-- 环保局 -->
              <h4>
                <b>{{ this.data[100].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[100].huanbaojuXzxkList"
              ></Table>
              <!-- 交通局 -->
              <h4>
                <b>{{ this.data[102].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[102].jiaotongjuXzxkList"
              ></Table>
              <!-- 住建局 -->
              <h4>
                <b>{{ this.data[122].name }}</b>
              </h4>
              <Table
                :columns="glssfxzxk"
                :data="this.data[122].zhujianweiXzxkList"
              ></Table>
              <!-- 质监局双公示 -->
              <h4>
                <b>{{ this.data[96].name }}</b>
              </h4>
              <Table
                :columns="allow"
                :data="this.data[96].gxzjjexchangedbAuditCreditAllowList"
              ></Table>
              <!-- 职业技能鉴定机构许可信息 -->
              <h4>
                <b>{{ this.data[79].name }}</b>
              </h4>
              <Table
                :columns="zyjnjdjgxkxx"
                :data="this.data[79].dzzwSlzyjnjdjgxkxxList"
              ></Table>
              <!-- 双公示行政许可 -->
              <h4>
                <b>{{ this.data[110].name }}</b>
              </h4>
              <Table
                :columns="sgsXzxkxx"
                :data="this.data[110].sgsXzxkxxNewList"
              ></Table>
              <!-- ====================================================================================== -->
              <h3>
                <b>其他信息</b>
              </h3>
              <!-- 养老欠缴信息 -->
              <h4>
                <b>{{ this.data[76].name }}</b>
              </h4>
              <Table
                :columns="dzzwDwqjagexx"
                :data="this.data[76].dzzwDwqjagexxList"
              ></Table>
              <!-- 单位欠缴信息 -->
              <h4>
                <b>{{ this.data[77].name }}</b>
              </h4>
              <Table
                :columns="dwqjxx"
                :data="this.data[77].dzzw_dwqjxx"
              ></Table>
              <!-- 企业参保信息 -->
              <h4>
                <b>{{ this.data[78].name }}</b>
              </h4>
              <Table
                :columns="qycbxx"
                :data="this.data[78].dzzw_qycbxx"
              ></Table>
              <!-- A级纳税人名单 -->
              <h4>
                <b>{{ this.data[107].name }}</b>
              </h4>
              <Table
                :columns="sgsSgsAjnsrxx"
                :data="this.data[107].sgsSgsAjnsrxxList"
              ></Table>
              <!-- 欠税公告表 -->
              <h4>
                <b>{{ this.data[108].name }}</b>
              </h4>
              <Table
                :columns="sgsSgsQsggxx"
                :data="this.data[108].sgsSgsQsggxxList"
              ></Table>
              <!-- 双公示重大税收违法案件信息撤出表 -->
              <h4>
                <b>{{ this.data[111].name }}</b>
              </h4>
              <Table
                :columns="SgsZdsswfajxxCcb"
                :data="this.data[111].sgsSgsZdsswfajxxCcbList"
              ></Table>
              <!-- 双公示重大税收违法案件信息 -->
              <h4>
                <b>{{ this.data[112].name }}</b>
              </h4>
              <Table
                :columns="SgsZdsswfajxxZb"
                :data="this.data[112].sgsSgsZdsswfajxxZbList"
              ></Table>
              <!-- 社会保险登记 -->
              <h4>
                <b>{{ this.data[113].name }}</b>
              </h4>
              <Table
                :columns="shehuiBxdj"
                :data="this.data[113].shehuiBxdjList"
              ></Table>
              <!-- 社会保险费的征收 -->
              <h4>
                <b>{{ this.data[114].name }}</b>
              </h4>
              <Table
                :columns="shehuiBxfdzs"
                :data="this.data[114].shehuiBxfdzsList"
              ></Table>
            </div>
          </div>
        </TabPane>
        <TabPane label="水、天然气、电">
          <button class="exportWord" @click="exportWord(6)">导出</button>
          <div class="page" id="waterMessage">
            <h2 class="companyNameTitle" v-if="data[5].qyjbxx0">
              公司名称：{{ data[5].qyjbxx0.comName }}
            </h2>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
// import Echarts from "@/components/commons/echar2";
// import { getFormatDateByLong } from "@/assets/js/longTodata";
export default {
  name: "Report",
  props:{
    data: {
      type: Array,
      default: ()=>[]
    }
  },
  components: {
    // Echarts,
  },
  data() {
    return {
      qybgxx: [
        //企业变更信息
        {
          title: "变更事项",
          key: "BGSX",
        },
        {
          title: "变更前内容",
          key: "BGQNR",
        },
        {
          title: "变更后内容",
          key: "BGHNR",
        },
        {
          title: "变更日期",
          key: "BGRQ",
        },
      ],
      quczfxx: [
        //出资方信息
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "出资方名称",
          key: "CZFMC",
        },
        {
          title: "身份证号码",
          key: "SFZHM",
        },
        {
          title: "出资方法人证件号码",
          key: "CZFRZJHM",
        },
        {
          title: "出资方法定代表人姓名",
          key: "CZFFDDBRXM",
        },
        {
          title: "出资方法人证件类型",
          key: "CZFFRZJLX",
        },
        {
          title: "出资方证件类型",
          key: "CZFZJLX",
        },
      ],
      qydsjsbaxx: [
        //企业董事-监事备案信息
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "营业执照注册号",
          key: "YYZZZCH",
        },
        {
          title: "居民身份证号码",
          key: "JMSFZHM",
        },
        {
          title: "姓名",
          key: "XM",
        },
        {
          title: "性别",
          key: "XB",
        },
        {
          title: "董事变更情况",
          key: "DSBGQK",
        },
      ],
      fddbrxx: [
        //法定代表人信息
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
        },
        {
          title: "证件类型",
          key: "ZJLX",
        },
        {
          title: "证件号码",
          key: "ZJHM",
        },
        {
          title: "税务登记号",
          key: "SWDJH",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "工商登记码",
          key: "GSDJM",
        },
        {
          title: "姓名",
          key: "XM",
        },
        {
          title: "营业执照注册号",
          key: "YYZZZCH",
        },
      ],
      qygdxx: [
        //企业股东（投资者）信息
        {
          title: "企业名称",
          key: "QYMC",
          flexd: "left",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
          width: 100,
        },
        {
          title: "工商登记码",
          key: "GSDJM",
          width: 100,
        },
        {
          title: "税务登记号",
          key: "SWDJH",
          width: 100,
        },
        {
          title: "投资人名称",
          key: "TZRMC",
          width: 100,
        },
        {
          title: "投资人类别（法人或者自然人）",
          key: "TZRLB",
          width: 100,
        },
        {
          title: "投资人营业执照注册号或自然人证件号码",
          key: "TZRYYZZH",
          width: 100,
        },
        {
          title: "投资人国籍",
          key: "TZRGJ",
          width: 100,
        },
        {
          title: "投资人身份证号码",
          key: "TZRSFZHM",
          width: 100,
        },
        {
          title: "币种",
          key: "BZ",
          width: 100,
        },
        {
          title: "投资人单位负责人",
          key: "TZRDWFZR",
          width: 100,
        },
      ],
      qygsxxcc: [
        //企业公示信息抽查
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
        },
        {
          title: "抽查日期",
          key: "CCRQ",
        },
        {
          title: "抽查结果",
          key: "CCJG",
        },
        {
          title: "抽查检查类型",
          key: "CCJCLX",
        },
        {
          title: "税务登记号",
          key: "SWDJH",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "检查实施机关",
          key: "JCSSJG",
        },
        {
          title: "工商登记码",
          key: "GSDJM",
        },
      ],
      qyjjycxx: [
        //企业经营异常信息
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
        },
        {
          title: "移除经营异常名录原因",
          key: "YCYY",
        },
        {
          title: "移除经营异常名录时间",
          key: "YCSJ",
        },
        {
          title: "税务登记号",
          key: "SWDJH",
        },
        {
          title: "作出决定机关",
          key: "ZCJDJG",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "工商登记码",
          key: "GSDJM",
        },
        {
          title: "被列入经营异常名录日期",
          key: "BLRJYYCMLRQ",
        },
      ],
      qyjlxx: [
        //企业奖励信息
        {
          title: "企业名称",
          key: "QYMC",
          flexd: "left",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
        },
        {
          title: "工商登记码",
          key: "GSDJM",
        },
        {
          title: "税务登记号",
          key: "SWDJH",
        },
        {
          title: "荣誉称号/获奖名称",
          key: "RYCH",
        },
        {
          title: "表彰（授予评定）单位",
          key: "BZDW",
        },
        {
          title: "表彰（授予评定）日期",
          key: "BZRQ",
        },
        {
          title: "表彰（授予评定）文号",
          key: "BZWH",
        },
      ],
      qysbxx: [
        //企业商标信息
        {
          title: "企业名称",
          key: "QYMC",
          flexd: "left",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
          width: 100,
        },
        {
          title: "工商登记码",
          key: "GSDJM",
          width: 100,
        },
        {
          title: "税务登记号",
          key: "SWDJH",
          width: 100,
        },
        {
          title: "荣誉称号/获奖名称",
          key: "RYCH",
          width: 100,
        },
        {
          title: "表彰（授予评定）单位",
          key: "BZDW",
          width: 100,
        },
        {
          title: "表彰（授予评定）日期",
          key: "BZRQ",
          width: 100,
        },
        {
          title: "表彰（授予评定）文号",
          key: "BZWH",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
      ],
      qysxgsxx: [
        //企业失信公示信息
        {
          title: "企业名称",
          key: "QYMC",
          flexd: "left",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
          width: 100,
        },
        {
          title: "工商登记码",
          key: "GSDJM",
          width: 100,
        },
        {
          title: "税务登记号",
          key: "SWDJH",
          width: 100,
        },
        {
          title: "工商注册号",
          key: "GSZCH",
          width: 100,
        },
        {
          title: "法定代表人-负责人",
          key: "FDDBR",
          width: 100,
        },
        {
          title: "公示监督机关",
          key: "GSJDJG",
        },
        {
          title: "公示年度",
          key: "GSND",
          width: 100,
        },
      ],
      qyzrrgdxx: [
        //企业自然人股东信息
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "出资方式",
          key: "CZFS",
        },
        {
          title: "营业执照注册号",
          key: "YYZZZCH",
        },
        {
          title: "币种",
          key: "BZ",
        },
        {
          title: "身份证号码",
          key: "SFZHM",
        },
      ],
      qyzxxx: [
        //企业注销信息
        {
          title: "企业名称",
          key: "QYMC",
          flexd: "left",
          width: 100,
        },
        {
          title: "营业执照注册号",
          key: "ZCH",
        },
        {
          title: "注销原因",
          key: "ZXYY",
          width: 100,
        },
        {
          title: "注销日期",
          key: "ZXRQ",
          width: 100,
        },
        {
          title: "注销机关",
          key: "ZXJG",
          width: 100,
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
          width: 100,
        },
        {
          title: "税务登记号",
          key: "SWDJH",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "工商登记码",
          key: "GSDJH",
          width: 100,
        },
      ],
      scztxyxxjg: [
        //市场主体信用信息监管
        {
          title: "企业名称",
          key: "QYMC",
          flexd: "left",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
          width: 100,
        },
        {
          title: "工商登记码",
          key: "GSDJM",
          width: 100,
        },
        {
          title: "税务登记号",
          key: "SWDJH",
          width: 100,
        },
        {
          title: "检查时间",
          key: "JCSJ",
          width: 100,
        },
        {
          title: "检查内容",
          key: "JCNR",
          width: 100,
        },
        {
          title: "检查结果",
          key: "JCJG",
          width: 100,
        },
        {
          title: "检查机关",
          key: "JCJIGGUAN",
          width: 100,
        },
      ],
      qydxxx: [
        //企业吊销信息
        {
          title: "企业名称",
          key: "QYMC",
          flexd: "left",
          width: 100,
        },
        {
          title: "营业执照注册号",
          key: "QYMC",
        },
        {
          title: "吊销原因",
          key: "QYMC",
          width: 100,
        },
        {
          title: "吊销日期",
          key: "QYMC",
          width: 100,
        },
        {
          title: "吊销机关",
          key: "QYMC",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "SHXYDM",
        },
        {
          title: "组织机构代码",
          key: "ZZJGDM",
          width: 100,
        },
      ],
      q_gtgshxx: [
        //区-个体工商户信息
        {
          title: "经营者姓名",
          key: "ENT_NAME",
        },
        {
          title: "统一社会信用代码（注册号）",
          key: "UNISCID",
        },
        {
          title: "行业门类",
          key: "INDUSTRYPHY",
        },
        {
          title: "从业人数",
          key: "EMPNUM",
        },
        {
          title: "营业额或营业收入",
          key: "VENDINC",
        },
        {
          title: "最后一次修改时间",
          key: "LASTUPDATETIME",
        },
      ],
      q_qyjjycmlxx: [
        //区-企业经营异常名录信息
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
          flexd: "left",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "列入日期",
          key: "ABNTIME",
          width: 100,
        },
        {
          title: "列入原因",
          key: "SPECAUSE_CN",
          width: 100,
        },
        {
          title: "做出决定机关（列入）",
          key: "DECORG_CN",
          width: 100,
        },
        {
          title: "移出日期",
          key: "REMDATE",
          width: 100,
        },
        {
          title: "移出原因",
          key: "remexcpres_CN",
          width: 100,
        },
        {
          title: "做出决定机关（移出）",
          key: "REDECORG_CN",
          width: 100,
        },
      ],
      q_zxcfxx: [
        //区-行政处罚信息（含违法行为类别）
        {
          title: "行政处罚决定书文号",
          key: "PENDECNO",
          width: 100,
          fixed: "left",
        },
        {
          title: "案件名称",
          key: "CASENAME",
          width: 100,
        },
        {
          title: "处罚类型",
          key: "PENTYPE_CN",
          width: 100,
        },
        {
          title: "违法行为类型",
          key: "ILLEGACTTYPE_CN",
          width: 100,
        },
        {
          title: "处罚事由",
          key: "PENCAUSE",
          width: 100,
        },
        {
          title: "处罚依据",
          key: "PENBASIS",
          width: 100,
        },
        {
          title: "行政相对人名称",
          key: "ADMNAME",
          width: 100,
        },
        {
          title: "法定代表人姓名",
          key: "LEREP",
          width: 100,
        },
        {
          title: "处罚结果",
          key: "PENRESULT",
          width: 100,
        },
        {
          title: "处罚生效期",
          key: "PENEFFDATE",
          width: 100,
        },
        {
          title: "处罚截止期",
          key: "PENENDDATE",
          width: 100,
        },
        {
          title: "处罚机关",
          key: "PENAUTH",
          width: 100,
        },
        {
          title: "当前状态",
          key: "STATE",
          width: 100,
        },
        {
          title: "地方编码",
          key: "DISTRICT",
          width: 100,
        },
        {
          title: "备注",
          key: "REMARKS",
          width: 100,
        },
      ],
      q_qyslbgzxxx: [
        //区-企业设立变更注销信息
        {
          title: "行政许可决定文书号",
          key: "ADMLICNO",
          flexd: "left",
          width: 100,
        },
        {
          title: "项目名称",
          key: "PRONAME",
          width: 100,
        },
        {
          title: "审批类别",
          key: "APPCATEGORY",
          width: 100,
        },
        {
          title: "登记类别",
          key: "REGCATEGORY",
          width: 100,
        },
        {
          title: "许可内容",
          key: "LICCONT",
          width: 100,
        },
        {
          title: "行政相对人名称",
          key: "ADMNAME",
          width: 100,
        },
        {
          title: "法定代表人姓名",
          key: "LEREP",
          width: 100,
        },
        {
          title: "许可生效期",
          key: "LICEFFDATE",
          width: 100,
        },
        {
          title: "许可截止期",
          key: "LICEFFDATE",
          width: 100,
        },
        {
          title: "许可机关",
          key: "LICAUTH",
          width: 100,
        },
        {
          title: "当前状态",
          key: "STATE",
          width: 100,
        },
        {
          title: "地方编码",
          key: "DISTRICT",
          width: 100,
        },
        {
          title: "备注",
          key: "REMARKS",
          width: 100,
        },
      ],
      q_qyzzxx: [
        //区-企业增资信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "企业统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册资本",
          key: "REGCAP",
        },
        {
          title: "净增加额",
          key: "INCRCAP",
        },
        {
          title: "增资日期",
          key: "INCRDATE",
        },
        {
          title: "法定代表人（负责人）",
          key: "LEREP",
        },
        {
          title: "联系电话",
          key: "TEL",
        },
        {
          title: "登记注册类型",
          key: "REGTYPE",
        },
        {
          title: "企业注册地行政区划（地市）",
          key: "TRAN_DISTRICT",
        },
      ],
      q_slbgdxzxxx: [
        //区-设立变更吊销注销信息
        {
          title: "企业名称",
          key: "ENTNAME",
          fixed: "left",
          width: 100,
        },
        {
          title: "企业统一社会信用代码",
          key: "UNISCID",
          width: 100,
        },
        {
          title: "法定代表人(负责人)",
          key: "LEREP",
          width: 100,
        },
        {
          title: "经营地址",
          key: "MANA_ADDR",
          width: 100,
        },
        {
          title: "成立日期",
          key: "ESTDATE",
          width: 100,
        },
        {
          title: "吊销日期",
          key: "REVDATE",
          width: 100,
        },
        {
          title: "注销日期",
          key: "CANDATE",
          width: 100,
        },
        {
          title: "变更事项",
          key: "ALTITEM",
          width: 100,
        },
        {
          title: "变更日期",
          key: "ALTDATE",
          width: 100,
        },
        {
          title: "法定代表人(负责人)姓名",
          key: "LEREPNAME",
          width: 100,
        },
        {
          title: "联系电话",
          key: "TEL",
          width: 100,
        },
        {
          title: "企业行政区划（地市）",
          key: "DISTRICT",
          width: 100,
        },
      ],
      q_scztxyxxjg: [
        //区-市场主体信用信息监管
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "检查内容",
          key: "INSCONTENTS",
        },
        {
          title: "检查结果",
          key: "INSRESULT",
        },
        {
          title: "检查机关",
          key: "INSAUTH",
        },
      ],
      q_qygsxxcc: [
        //区-企业公示信息抽查
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "实施检查机关",
          key: "INSAUTH",
        },
        {
          title: "抽查检查类型",
          key: "INSTYPE",
        },
        {
          title: "抽查日期",
          key: "INSDATE",
        },
        {
          title: "抽查结果",
          key: "INSRES",
        },
      ],
      q_gqbgdjxx: [
        //区-股权变更登记信息
        {
          title: "股权变更企业名称",
          key: "ENTNAME",
          flexd: "left",
          width: 100,
        },
        {
          title: "企业统一社会信用代码",
          key: "UNISCID",
          width: 100,
        },
        {
          title: "变更日期",
          key: "ALTDATE",
          width: 100,
        },
        {
          title: "经营地址",
          key: "ADDR",
          width: 100,
        },
        {
          title: "法定代表人",
          key: "LEREP",
          width: 100,
        },
        {
          title: "联系电话",
          key: "TEL",
          width: 100,
        },
        {
          title: "变更前币种",
          key: "ALTCUR",
          width: 100,
        },
        {
          title: "变更前注册资金",
          key: "ALTREGCAP",
          width: 100,
        },
        {
          title: "变更后币种",
          key: "AFTCUR",
          width: 100,
        },
        {
          title: "变更后注册资金",
          key: "AFTREGCAP",
          width: 100,
        },
        {
          title: "变更前股东名称",
          key: "ALTINV",
          width: 100,
        },
        {
          title: "变更前股东统一社会信用代码",
          key: "ALTUNISCID",
          width: 100,
        },
        {
          title: "变更后股东名称",
          key: "AFTINV",
          width: 100,
        },
        {
          title: "变更后股东统一社会信用代码",
          key: "AFTUNISCID",
          width: 100,
        },
      ],
      q_qygqzrxx: [
        //区-企业股权转让信息
        {
          title: "转让方名称",
          key: "TRANNAME",
        },
        {
          title: "转让方统一社会信用代码",
          key: "TRANUNISCID",
        },
        {
          title: "受让方名称",
          key: "INNAME",
        },
        {
          title: "受让方统一社会信用代码",
          key: "INUNISCID",
        },
        {
          title: "转让总金额",
          key: "TRANCAP",
        },
        {
          title: "转让日期",
          key: "TRANDATE",
        },
        {
          title: "转让方联系人",
          key: "TRAN_CONTACTS",
        },
        {
          title: "联系电话",
          key: "TEL",
        },
        {
          title: "转让企业注册地行政区划（地市）",
          key: "TRAN_DISTRICT",
        },
      ],
      q_wzzzxx: [
        //区-外资注资信息
        {
          title: "外资企业名称",
          key: "FORENTNAME",
        },
        {
          title: "被注资企业名称",
          key: "INCAPNAME",
        },
        {
          title: "被注资企业统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注入资金和占比",
          key: "INCAP_PROP",
        },
        {
          title: "被注资企业联系人姓名",
          key: "INCAP_CONTACTS",
        },
        {
          title: "联系电话",
          key: "TEL",
        },
        {
          title: "经营地址",
          key: "MANA_ADDR",
        },
        {
          title: "被注资企业注册地行政区划（地市）",
          key: "DISTRICT",
        },
      ],
      q_mcyxhz: [
        //区-名称预先核准
        {
          title: "行政许可决定文书号",
          key: "ADMLICNO",
          flexd: "left",
          width: 100,
        },
        {
          title: "项目名称",
          key: "PRONAME",
          width: 100,
        },
        {
          title: "审批类别",
          key: "APPCATEGORY",
          width: 100,
        },
        {
          title: "许可内容",
          key: "LICCONT",
          width: 100,
        },
        {
          title: "行政相对人名称",
          key: "ADMNAME",
          width: 100,
        },
        {
          title: "法定代表人姓名",
          key: "LEREP",
          width: 100,
        },
        {
          title: "许可生效期",
          key: "LICEFFDATE",
          width: 100,
        },
        {
          title: "许可截止期",
          key: "LICEFFDATE",
          width: 100,
        },
        {
          title: "许可机关",
          key: "LICAUTH",
          width: 100,
        },
        {
          title: "当前状态",
          key: "STATE",
          width: 100,
        },
        {
          title: "地方编码",
          key: "DISTRICT",
          width: 100,
        },
        {
          title: "备注",
          key: "REMARKS",
          width: 100,
        },
      ],
      q_qynbgqbgxx: [
        //区-企业年报股权变更信息
        {
          title: "年报id",
          key: "ANCHEID",
          flexd: "left",
          width: 100,
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
          width: 100,
        },
        {
          title: "企业名称",
          key: "ENTNAME",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
          width: 100,
        },
        {
          title: "股东名称",
          key: "INV",
          width: 100,
        },
        {
          title: "转让前股权比例",
          key: "TRANSAMPR",
          width: 100,
        },
        {
          title: "转让后股权比例",
          key: "TRANSAMAFT",
          width: 100,
        },
        {
          title: "股权变更日期",
          key: "ALTDATE",
          width: 100,
        },
      ],
      q_qinbxx: [
        //区-企业年报
        {
          title: "年报id",
          key: "ANCHEID",
          flexd: "left",
          width: 100,
        },
        {
          title: "企业年报时间",
          key: "ANCHEDATE",
          width: 100,
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
          width: 100,
        },
        {
          title: "企业名称",
          key: "ENTNAME",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
          width: 100,
        },
        {
          title: "注册号",
          key: "REGNO",
          width: 100,
        },
        {
          title: "市场主体类型",
          key: "ENTTYPE",
          width: 100,
        },
        {
          title: "企业联系电话",
          key: "TEL",
          width: 100,
        },
        {
          title: "企业通信地址",
          key: "ADDR",
          width: 100,
        },
        {
          title: "邮政编码",
          key: "POSTALCODE",
          width: 100,
        },
        {
          title: "电子邮箱",
          key: "EMAIL",
          width: 100,
        },
        {
          title: "经营状态",
          key: "BUSST_CN",
          width: 100,
        },
        {
          title: "企业年报类型",
          key: "ANTYPE",
          width: 100,
        },
        {
          title: "隶属企业名称",
          key: "DEPENDENTENTNAME",
          width: 100,
        },
        {
          title: "党组织建制",
          key: "PARINS_CN",
          width: 100,
        },
      ],
      q_qynbdwtzxx: [
        //区-企业年报对外投资信息
        {
          title: "年报id",
          key: "ANCHEID",
          flexd: "left",
          width: 100,
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
          width: 100,
        },
        {
          title: "企业名称",
          key: "ENTNAME",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "所投资企业名称",
          key: "ENT_NAME",
          width: 100,
        },
        {
          title: "所投资企业统一社会信用代码或注册号",
          key: "UNI_SCID",
          width: 100,
        },
      ],
      q_gtgsnbxx: [
        //区-个体工商年报信息
        {
          title: "年报id",
          key: "ANCHEID",
          flexd: "left",
          width: 100,
        },
        {
          title: "年报时间",
          key: "ANCHEDATE",
          width: 100,
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
          width: 100,
        },
        {
          title: "个体工商户名称",
          key: "TRANAME",
          width: 100,
        },
        {
          title: "个体经营者",
          key: "NAME",
          width: 100,
        },
        {
          title: "注册号",
          key: "REGNO",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
          width: 100,
        },
        {
          title: "电话",
          key: "TEL",
          width: 100,
        },
        {
          title: "年报方式",
          key: "ANNREPFORM",
          width: 100,
        },
        {
          title: "资金数额",
          key: "FUNDAM",
          width: 100,
        },
      ],
      q_gtnbxzxkxx: [
        //区-个体年报行政许可信息
        {
          title: "年报id",
          key: "ANCHEID",
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
        },
        {
          title: "个体工商名称",
          key: "TRANAME",
        },
        {
          title: "个体经营者",
          key: "NAME",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "许可文件名称（中文名称）",
          key: "LICNAME",
        },
        {
          title: "有效期至",
          key: "VALTO",
        },
      ],
      q_gtnbxxwdhwzxx: [
        //区-个体年报信息网店或网站信息
        {
          title: "年报id",
          key: "ANCHEID",
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
        },
        {
          title: "个体工商户名称",
          key: "TRANAME",
        },
        {
          title: "个个体经营者",
          key: "NAME",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "网站（网店）名称",
          key: "WEBSITNAME",
        },
        {
          title: "网站（网店）网址",
          key: "WEBSITE",
        },
      ],
      q_gxsjzxJhanSfcBaseinfoList: [
        //区-农民专业合作社年报信息
        {
          title: "年报id",
          key: "ANCHEID",
          flexd: "left",
          width: 150,
        },
        {
          title: "年报时间",
          key: "ANCHEDATE",
          width: 150,
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
          width: 150,
        },
        {
          title: "农业合作社名称",
          key: "FARSPEARTNAME",
          width: 150,
        },
        {
          title: "社会统一信用代码",
          key: "UNISCID",
          width: 150,
        },
        {
          title: "注册号",
          key: "REGNO",
          width: 150,
        },
        {
          title: "成员人数",
          key: "MEMNUM",
          width: 150,
        },
        {
          title: "成员人数中农民人数",
          key: "FARNUM",
          width: 150,
        },
        {
          title: "本年度新增成员人数",
          key: "ANNNEWMEMNUM",
          width: 150,
        },
        {
          title: "本年度退出成员人数",
          key: "ANNREDMEMNUM",
          width: 150,
        },
        {
          title: "联系电话",
          key: "TEL",
          width: 150,
        },
        {
          title: "电子邮件",
          key: "EMAIL",
          width: 150,
        },
        {
          title: "最后一次修改时间",
          key: "LASTUPDATETIME",
          width: 150,
        },
      ],
      q_gxsjzxJhanSfcBranchinfoList: [
        //区-农民合作社年报分支机构信息
        {
          title: "年报id",
          key: "ANCHEID",
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
        },
        {
          title: "合作社名称",
          key: "FARSPEARTNAME",
        },
        {
          title: "社会统一信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "分支机构名称",
          key: "BRNAME",
        },
        {
          title: "分支机构统一社会信用代码或注册号",
          key: "UNI_SCID",
        },
      ],
      q_gxsjzxJhanSfcLicenceinfoList: [
        //区-农民合作社年报行政许可信息
        {
          title: "年报年份",
          key: "ANCHEYEAR",
        },
        {
          title: "合作社名称",
          key: "FARSPEARTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "许可文件名称（中文名称）",
          key: "LICNAME_CN",
        },
        {
          title: "有效期至",
          key: "VALTO",
        },
      ],
      q_gxsjzxJhanSfcWebsiteinfoList: [
        //区-合作社年报网站或网店信息
        {
          title: "年报id",
          key: "ANCHEID",
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
        },
        {
          title: "合作社名称",
          key: "FARSPEARTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "网站（网店）名称",
          key: "WEBSITNAME",
        },
        {
          title: "网站（网店）网址",
          key: "WEBSITE",
        },
      ],
      q_gxsjzxJhanSubcapitalList: [
        //区-企业企业年报股东及企业年报股东及出资信息信息
        {
          title: "年报id",
          key: "ANCHEID",
        },
        {
          title: "年报年份",
          key: "ANCHEYEAR",
        },
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "股东（发起人）名称",
          key: "INVNAME",
        },
        {
          title: "累计认缴额（元）",
          key: "LISUBCONAM",
        },
        {
          title: "认缴出资时间",
          key: "SUBCONDATE",
        },
        {
          title: "认缴出资方式",
          key: "SUBCONFORM",
        },
        {
          title: "累计实缴额（元）",
          key: "LIACCONAM",
        },
      ],
      q_gxsjzxJhanWebsiteinfoList: [
        //区-企业年报网店信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "网店（网站）名称",
          key: "WEBSITNAME",
        },
        {
          title: "网店（网站）地址",
          key: "WEBSITE",
        },
      ],
      q_gxsjzxJhdishonestyEntinfoList: [
        //区-严重违法失信企业名单
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "企业注册号",
          key: "REGNO",
        },
      ],
      q_gxsjzxJheImCaseList: [
        //区-企业公示行政处罚信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "处罚决定书文号",
          key: "PENDECNO",
        },
        {
          title: "违法行为",
          key: "ILLEGACTTYPE",
        },
        {
          title: "处罚种类",
          key: "PENTYPE",
        },
        {
          title: "处罚内容",
          key: "PENCONTENT",
        },
        {
          title: "作出行政处罚机关",
          key: "JUDAUTH",
        },
        {
          title: "作出处罚决定日期",
          key: "PENDECISSDATE",
        },
        {
          title: "公示日期",
          key: "PUBLICDATE",
        },
      ],
      q_gxsjzxJheImInvactdetailList: [
        //区-企业公示出资人实缴信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "股东（发起人）名称",
          key: "INV",
        },
        {
          title: "实缴出资额(元)",
          key: "ACCONAM",
        },
        {
          title: "实缴出资方式",
          key: "CONFORM",
        },
        {
          title: "实缴出资时间",
          key: "CONDATE",
        },
        {
          title: "公示日期",
          key: "PUBLICDATE",
        },
      ],
      q_gxsjzxJheImInvestmentList: [
        //区-企业公示出资人信息企业公示出资人信息
        {
          title: "主体身份代码",
          key: "PRIPID",
        },
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "股东/发起人名称",
          key: "INV",
        },
      ],
      q_gxsjzxJheImInvprodetailList: [
        //区-企业公示出资人认缴信息
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "股东（发起人）名称",
          key: "INV",
        },
        {
          title: "认缴出资额(元)",
          key: "SUBCONAM",
        },
        {
          title: "认缴出资方式",
          key: "CONFORM",
        },
        {
          title: "认缴出资时间",
          key: "CONDATE",
        },
        {
          title: "公示日期",
          key: "PUBLICDATE",
        },
      ],
      q_gxsjzxJheImInvsraltList: [
        //区-企业股权变更信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "股东名称",
          key: "inv",
        },
        {
          title: "转让前股权比例",
          key: "TRANSAMPRBF",
        },
        {
          title: "转让后股权比例",
          key: "TRANSAMPRAF",
        },
        {
          title: "股权变更日期",
          key: "ALTDATE",
        },
        {
          title: "公示日期",
          key: "PUBLICDATE",
        },
      ],
      q_gxsjzxJheImInvupdateList: [
        //区-企业公示出资人信息及出资人变更信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "股东（发起人）名称",
          key: "INV",
        },
        {
          title: "股东及出资变更事项",
          key: "ALITEM",
        },
        {
          title: "变更前内容",
          key: "ALTBE",
        },
        {
          title: "变更后内容",
          key: "ALTAF",
        },
        {
          title: "变更日期",
          key: "ALTDATE",
        },
      ],
      q_gxsjzxJheImIppldgaltList: [
        //区-企业公示知识产权出质变更信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "商品注册号",
          key: "TMREGNO",
        },
        {
          title: "知识产权出质变更事项",
          key: "ALT",
        },
        {
          title: "变更前内容",
          key: "ALTBE",
        },
        {
          title: "变更后内容",
          key: "ALTAF",
        },
        {
          title: "变更日期",
          key: "ALTDATE",
        },
      ],
      q_gxsjzxJheImIppldgList: [
        //区-企业公示知识产权出质信息
        {
          title: "主体身份代码",
          key: "PRIPID",
          flexd: "left",
          width: 150,
        },
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
          width: 150,
        },
        {
          title: "注册号",
          key: "REGNO",
          width: 150,
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
          width: 150,
        },
        {
          title: "商品注册号",
          key: "TMREGNO",
          width: 150,
        },
        {
          title: "名称",
          key: "TMNAME",
          width: 150,
        },
        {
          title: "种类代码",
          key: "KINDS",
          width: 150,
        },
        {
          title: "知识产权出质人名称",
          key: "PLEDGOR",
          width: 150,
        },
        {
          title: "知识产权质权人名称",
          key: "IMPORG",
          width: 150,
        },
        {
          title: "知识产权质权登记期限自",
          key: "PLEREGPERFROM",
          width: 150,
        },
        {
          title: "知识产权质权登记期限至",
          key: "PLEREGPERTO",
          width: 150,
        },
        {
          title: "状态",
          key: "TYPE",
          width: 150,
        },
        {
          title: "状态名称",
          key: "TYPENAME",
          width: 150,
        },
        {
          title: "注销日期",
          key: "CANDATE",
          width: 150,
        },
        {
          title: "注销原因",
          key: "EQUPLECANREA",
          width: 150,
        },
        {
          title: "其它无效日期",
          key: "INVALIDDATE",
          width: 150,
        },
        {
          title: "其它无效原因",
          key: "INVALIDREA",
          width: 150,
        },
        {
          title: "公示日期",
          key: "PUBLICDATE",
          width: 150,
        },
      ],
      q_gxsjzxJheImPermitList: [
        //区-公示行政许可信息
        {
          title: "企业（机构）名称",
          key: "ENTNAME",
          flexd: "left",
          width: 150,
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
          width: 150,
        },
        {
          title: "注册号",
          key: "REGNO",
          width: 150,
        },
        {
          title: "许可文件编号",
          key: "LICNO",
          width: 150,
        },
        {
          title: "许可文件名称",
          key: "licname_cn",
          width: 150,
        },
        {
          title: "有效期自",
          key: "VALFROM",
          width: 150,
        },
        {
          title: "有效期至",
          key: "VALTO",
          width: 150,
        },
        {
          title: "许可机关",
          key: "LICANTH",
          width: 150,
        },
        {
          title: "许可内容",
          key: "LICITEM",
          width: 150,
        },
        {
          title: "状态",
          key: "TYPE",
          width: 150,
        },
        {
          title: "注销日期",
          key: "CANDATE",
          width: 150,
        },
        {
          title: "注销原因",
          key: "EQUPLECANREA",
          width: 150,
        },
        {
          title: "被吊销日期",
          key: "REVDATE",
          width: 150,
        },
        {
          title: "被吊销原因",
          key: "SUGREVREASON",
          width: 150,
        },
        {
          title: "其它无效日期",
          key: "INVALIDDATE",
          width: 150,
        },
        {
          title: "其它无效原因",
          key: "INVALIDREA",
          width: 150,
        },
        {
          title: "公示日期",
          key: "PUBLICDATE",
          width: 150,
        },
      ],
      q_gxsjzxJheImPrmtaltList: [
        //区-公示行政许可变更信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "许可文件编号",
          key: "LICNO",
        },
        {
          title: "许可文件名称",
          key: "licname_cn",
        },
        {
          title: "变更事项",
          key: "ALT",
        },
        {
          title: "变更前内容",
          key: "ALTBE",
        },
        {
          title: "变更后内容",
          key: "ALTAF",
        },
        {
          title: "变更日期",
          key: "ALTDATE",
        },
      ],
      q_gxsjzxJhePubSpotcheckList: [
        //区-企业抽查信息
        {
          title: "企业名称",
          key: "ENTNAME",
        },
        {
          title: "统一社会信用代码",
          key: "UNISCID",
        },
        {
          title: "注册号",
          key: "REGNO",
        },
        {
          title: "检查机关",
          key: "INSAUTH_CN",
        },
        {
          title: "检查时间",
          key: "INSDATE",
        },
        {
          title: "抽查结果",
          key: "INSRES_CN",
        },
        {
          title: "时间戳",
          key: "S_EXT_DATATIME",
        },
      ],
      q_gxsjzxJhregViewIndivEntList: [
        //区-法人库信息
        {
          title: "企业名称",
          key: "ENT_NAME",
          flexd: "left",
          width: 100,
        },
        {
          title: "企业注册号",
          key: "REG_NO",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "UNI_SCID",
          width: 100,
        },
        {
          title: "企业类型(经济性质)",
          key: "ENT_TYPE",
          width: 100,
        },
        {
          title: "登记机关",
          key: "REG_ORG",
          width: 100,
        },
        {
          title: "许可经营范围",
          key: "OP_SCOPE",
          width: 100,
        },
        {
          title: "住所",
          key: "DOM",
          width: 100,
        },
        {
          title: "注册资本",
          key: "REG_CAP",
          width: 100,
        },
        {
          title: "法定代表人",
          key: "CORP_RPT",
          width: 100,
        },
        {
          title: "核准日期",
          key: "APPROVE_DATE",
          width: 100,
        },
        {
          title: "成立日期",
          key: "EST_DATE",
          width: 100,
        },
        {
          title: "经营(驻在)期限自",
          key: "OP_FROM",
          width: 100,
        },
        {
          title: "经营(驻在)期限至",
          key: "OP_TO",
          width: 100,
        },
        {
          title: "时间戳",
          key: "LAST_DATE",
          width: 100,
        },
      ],
      q_gxsjzxJhtmBaseinfoCmList: [
        //区-驰名商标
        {
          title: "商标注册人",
          key: "COOWNER_CN_NAME",
        },
        {
          title: "商标注册号",
          key: "REG_NUM",
        },
        {
          title: "注册人地址",
          key: "DOM",
        },
        {
          title: "商标类别",
          key: "INT_CLS",
        },
        {
          title: "认定时间",
          key: "REG_DATE",
        },
        {
          title: "联系电话",
          key: "TEL",
        },
      ],
      q_gxsjzxJhtmBaseinfoMlList: [
        //区-商标信息
        {
          title: "主体身份代码",
          key: "PRIPID",
          flexd: "left",
          width: 100,
        },
        {
          title: "企业名称",
          key: "ENTNAME",
          width: 100,
        },
        {
          title: "商标注册号",
          key: "REG_NUM",
          width: 100,
        },
        {
          title: "商标类别",
          key: "INT_CLS",
          width: 100,
        },
        {
          title: "商标专用权截止日期",
          key: "PROPERTY_END_DATE",
          width: 100,
        },
        {
          title: "商品/服务项目",
          key: "GOODS_CN_NAME",
        },
        {
          title: "注册人地址",
          key: "DOM",
          width: 100,
        },
      ],
      q_gxsjzxJhtmBaseinfoZmList: [
        //区-广西著名商标信息
        {
          title: "商标注册人",
          key: "COOWNER_CN_NAME",
        },
        {
          title: "商标注册号",
          key: "REG_NUM",
        },
        {
          title: "注册人地址",
          key: "DOM",
        },
        {
          title: "商标类别",
          key: "INT_CLS",
        },
        {
          title: "认定时间",
          key: "REG_DATE",
        },
        {
          title: "联系电话",
          key: "TEL",
        },
      ],
      q_gxsjzxJhxzcfGsList: [
        //区-行政处罚信息
        {
          title: "行政处罚决定书文号",
          key: "CF_WSH",
          width: 100,
          fixed: "left",
        },
        {
          title: "案件项目名称",
          key: "CF_CFMC",
          width: 100,
        },
        {
          title: "处罚类别1",
          key: "cf_CFLB1",
          width: 100,
        },
        {
          title: "处罚类别2",
          key: "CF_CFLB2",
          width: 100,
        },
        {
          title: "处罚事由",
          key: "CF_SY",
          width: 100,
        },
        {
          title: "处罚依据",
          key: "CF_YJ",
          width: 100,
        },
        {
          title: "行政相对人名称",
          key: "CF_XDR_MC",
          width: 100,
        },
        {
          title: "法人代表姓名",
          key: "CF_FR",
          width: 100,
        },
        {
          title: "处罚结果",
          key: "CF_JG",
          width: 100,
        },
        {
          title: "处罚决定日期",
          key: "CF_JDRQ",
          width: 100,
        },
        {
          title: "处罚机关",
          key: "CF_XZJG",
          width: 100,
        },
        {
          title: "当前状态",
          key: "CF_ZT",
          width: 100,
          render: (h, params) => {
            return h("div", this.status(params.row.cf_ZT));
          },
        },
        {
          title: "地方编码",
          key: "DFBM",
          width: 100,
        },
        {
          title: "更新时间",
          key: "SJC",
          width: 100,
        },
        {
          title: "备注",
          key: "BZ",
          width: 100,
        },
      ],
      // =========================================================================================
      //===========================================================================================
      q_gxsjzxJhxzxkGsList: [
        //区-行政许可信息
        {
          title: "行政处罚决定书文号",
          key: "XK_WSH",
          width: 100,
          fixed: "left",
        },
        {
          title: "项目名称",
          key: "XK_XMMC",
          width: 100,
        },
        {
          title: "审批类别",
          key: "XK_SPLB",
          width: 100,
        },
        {
          title: "许可内容",
          key: "XK_NR",
          width: 100,
        },
        {
          title: "行政相对人名称",
          key: "XK_XDR",
          width: 100,
        },
        {
          title: "法人代表姓名",
          key: "XK_FR",
          width: 100,
        },
        {
          title: "许可决定日期",
          key: "XK_JDRQ",
          width: 100,
        },
        {
          title: "许可截止期",
          key: "XK_JZQ",
          width: 100,
        },
        {
          title: "许可登记机关",
          key: "XK_XZJG",
          width: 100,
        },
        {
          title: "许可状态",
          key: "XK_ZT",
          width: 100,
        },
        {
          title: "地方编码",
          key: "DFBM",
          width: 100,
        },
        {
          title: "备注",
          key: "BZ",
          width: 100,
        },
      ],
      q_gxsjzxLzregGtgshjyycmlbList: [
        //区-个体工商户经营异常名录表
        {
          title: "名称",
          key: "MC",
          width: 100,
          fixed: "left",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "注册号",
          key: "ZCH",
          width: 100,
        },
        {
          title: "经营者",
          key: "JYZ",
          width: 100,
        },
        {
          title: "标记经营异常状态原因",
          key: "BJJYYCZTYY",
          width: 100,
        },
        {
          title: "标记日期",
          key: "BJRQ",
          width: 100,
        },
        {
          title: "标记决定机关",
          key: "BJJDJG",
          width: 100,
        },
        {
          title: "是否恢复",
          key: "SFHF",
          width: 100,
        },
        {
          title: "恢复正常记载状态原因",
          key: "HFZCJZZTYY",
          width: 100,
        },
        {
          title: "恢复日期",
          key: "HFRQ",
          width: 100,
        },
        {
          title: "恢复决定机关",
          key: "HFJDJG",
          width: 100,
        },
      ],
      q_gxsjzxLzregLzhyqyjbxxbList: [
        //区-六证合一企业基本信息
        {
          title: "信息操作类型",
          key: "XXCZLX",
          width: 100,
          fixed: "left",
        },
        {
          title: "企业名称",
          key: "QYMC",
          width: 100,
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "业务类型",
          key: "YWLX",
          width: 100,
        },
        {
          title: "注册号",
          key: "ZCH",
          width: 100,
        },
        {
          title: "企业类型代码",
          key: "QYLXDM",
          width: 100,
        },
        {
          title: "成立日期",
          key: "CLRQ",
          width: 100,
        },
        {
          title: "法定代表人",
          key: "FDDBR",
          width: 100,
        },
        {
          title: "注册资本",
          key: "ZCZB",
          width: 100,
        },
        {
          title: "住所",
          key: "ZS",
          width: 100,
        },
        {
          title: "经营范围",
          key: "JYFW",
          width: 100,
        },
        {
          title: "营业期限自",
          key: "YYQXZI",
          width: 100,
        },
        {
          title: "营业期限至",
          key: "YYQXZHI",
          width: 100,
        },
        {
          title: "登记机关",
          key: "DJJG",
          width: 100,
        },
        {
          title: "发照日期",
          key: "FZRQ",
          width: 100,
        },
        {
          title: "经营状态",
          key: "JYZT",
          width: 100,
        },
        {
          title: "生成经营地",
          key: "SCJYD",
          width: 100,
        },
        {
          title: "生成经营地行政区划",
          key: "SCJYDXZQH",
          width: 100,
        },
        {
          title: "组成形式",
          key: "ZCXS",
          width: 100,
        },
        {
          title: "货币种类",
          key: "HBZL",
          width: 100,
        },
        {
          title: "注册地址所在行政区划",
          key: "ZCDZSZXXQH",
          width: 100,
        },
        {
          title: "核准日期",
          key: "HZRQ",
          width: 100,
        },
        {
          title: "注册地邮编",
          key: "ZCDYB",
          width: 100,
        },
        {
          title: "行业代码",
          key: "HYDM",
          width: 100,
        },
        {
          title: "从业人数",
          key: "CYRS",
          width: 100,
        },
        {
          title: "最后一次年报年度",
          key: "ZHYCNBND",
          width: 100,
        },
        {
          title: "最后一次年报时间",
          key: "ZHYCNBSJ",
          width: 100,
        },
        {
          title: "网址",
          key: "WZ",
          width: 100,
        },
      ],
      q_gxsjzxLzregLzzhgtgshxxbList: [
        //区-两证整合个体工商户信息
        {
          title: "ZTID",
          key: "ztid",
          width: 100,
          fixed: "left",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "注册号",
          key: "ZCH",
          width: 100,
        },
        {
          title: "姓名",
          key: "XM",
          width: 100,
        },
        {
          title: "经营者证件类型",
          key: "JYZZJLX",
          width: 100,
        },
        {
          title: "经营者证件号码",
          key: "JYZZJHM",
          width: 100,
        },
        {
          title: "经营者住所",
          key: "JYZZS",
          width: 100,
        },
        {
          title: "经营者邮政编码",
          key: "JYZYB",
          width: 100,
        },
        {
          title: "经营者固定电话",
          key: "JYZGDDH",
          width: 100,
        },
        {
          title: "经营者移动电话",
          key: "JYZYDDH",
          width: 100,
        },
        {
          title: "经营者电子邮箱",
          key: "JYZDZYX",
          width: 100,
        },
        {
          title: "名称",
          key: "MC",
          width: 100,
        },
        {
          title: "组成形式",
          key: "ZCXS",
          width: 100,
        },
        {
          title: "家庭成员姓名",
          key: "JTCYXM",
          width: 100,
        },
        {
          title: "家庭成员证件类型",
          key: "JTCYZJLX",
          width: 100,
        },
        {
          title: "家庭成员证件号码",
          key: "JTCYZJHM",
          width: 100,
        },
        {
          title: "经营范围",
          key: "JYFW",
          width: 100,
        },
        {
          title: "经营场所地址",
          key: "JYCSDZ",
          width: 100,
        },
        {
          title: "经营场所行政区划代码",
          key: "JYCSXZQHDM",
          width: 100,
        },
        {
          title: "经营场所邮政编码",
          key: "JYCSYZBM",
          width: 100,
        },
        {
          title: "经营场所联系电话",
          key: "JYCSLXDH",
          width: 100,
        },
        {
          title: "从业人数",
          key: "CYRS",
          width: 100,
        },
        {
          title: "注册号",
          key: "ZCH",
          width: 100,
        },
        {
          title: "核准日期",
          key: "HZRQ",
          width: 100,
        },
        {
          title: "登记机关",
          key: "DJJG",
          width: 100,
        },
        {
          title: "局轨",
          key: "JG",
          width: 100,
        },
        {
          title: "字轨",
          key: "ZG",
          width: 100,
        },
        {
          title: "年号",
          key: "NH",
          width: 100,
        },
        {
          title: "文号",
          key: "WH",
          width: 100,
        },
        {
          title: "注册日期",
          key: "ZCRQ",
          width: 100,
        },
        {
          title: "类型",
          key: "LX",
          width: 100,
        },
        {
          title: "登记状态",
          key: "DJZT",
          width: 100,
        },
        {
          title: "行业代码",
          key: "HYDM",
          width: 100,
        },
      ],
      q_gxsjzxLzregNmzyhzsjyycmlbList: [
        //区-农民专业合作社经营异常名录信息表
        {
          title: "名称",
          key: "MC",
          width: 100,
          fixed: "left",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "注册号",
          key: "ZCH",
          width: 100,
        },
        {
          title: "负责人",
          key: "FZR",
          width: 100,
        },
        {
          title: "列入原因类型",
          key: "LRYYLX",
          width: 100,
        },
        {
          title: "列入日期",
          key: "LRRQ",
          width: 100,
        },
        {
          title: "列入决定机关",
          key: "LRZCJG",
          width: 100,
        },
        {
          title: "是否移出",
          key: "SFYC",
          width: 100,
        },
        {
          title: "移出原因",
          key: "YCYY",
          width: 100,
        },
        {
          title: "移出日期",
          key: "YCRQ",
          width: 100,
        },
        {
          title: "移出决定机关",
          key: "YCZCJG",
          width: 100,
        },
        {
          title: "分支机构名称",
          key: "FZJGMC",
          width: 100,
        },
        {
          title: "分支机构统一社会信用代码",
          key: "FZJGTYSHXYDM",
          width: 100,
        },
        {
          title: "分支机构注册号",
          key: "FZJGZCH",
          width: 100,
        },
        {
          title: "分支机构负责人",
          key: "FZJGFZR",
          width: 100,
        },
        {
          title: "分支机构列入经营名录原因类型",
          key: "FZJGFLRYYLX",
          width: 100,
        },
        {
          title: "分支机构列入日期",
          key: "FZJGLRRQ",
          width: 100,
        },
        {
          title: "分支机关列入决定机关",
          key: "FZJGLRJDJG",
          width: 100,
        },
        {
          title: "分支机构是否移出",
          key: "FZJGSFYC",
          width: 100,
        },
        {
          title: "分支机构移出经营移出名录原因",
          key: "FZJGYCYY",
          width: 100,
        },
        {
          title: "分支机构移出日期",
          key: "FZJGYCRQ",
          width: 100,
        },
        {
          title: "分支机构移出决定机关",
          key: "FZJGYCJDJG",
          width: 100,
        },
      ],
      q_gxsjzxLzregQybgxxbList: [
        //区-企业变更信息表
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "注册号",
          key: "ZCH",
        },
        {
          title: "变更事项",
          key: "BGSX",
        },
        {
          title: "变更后内容",
          key: "BGHNR",
        },
        {
          title: "变更时间",
          key: "BGSHRQ",
        },
      ],
      q_gxsjzxLzregQyccxxbList: [
        //区-企业抽查信息表
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "注册号",
          key: "ZCH",
        },
        {
          title: "检查机关",
          key: "JCJG",
        },
        {
          title: "检查时间",
          key: "JCSJ",
        },
        {
          title: "抽查结果",
          key: "CCJG",
        },
      ],
      q_gxsjzxLzregQydsjsbanxxbList: [
        //区-企业董事监事备案信息表
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "注册号",
          key: "ZCH",
        },
        {
          title: "姓名",
          key: "XM",
        },
        {
          title: "职务",
          key: "ZW",
        },
        {
          title: "证件类型",
          key: "ZJLX",
        },
        {
          title: "证件号码",
          key: "ZJHM",
        },
      ],
      q_gxsjzxLzregQyfrxxbList: [
        //区-企业法定代表人信息表
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "注册号",
          key: "ZCH",
        },
        {
          title: "法定代表人姓名",
          key: "FDDBRXM",
        },
        {
          title: "证件类型",
          key: "ZJLX",
        },
        {
          title: "证件号码",
          key: "ZJHM",
        },
        {
          title: "法定代表人手机号码",
          key: "RDDBRSJHM",
        },
      ],
      q_gxsjzxLzregQygdxxbList: [
        //区-企业股东信息表
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "注册号",
          key: "ZCH",
        },
        {
          title: "股东姓名",
          key: "gdXM",
        },
        {
          title: "证件类型",
          key: "ZJLX",
        },
        {
          title: "证件号码",
          key: "ZJHM",
        },
      ],
      q_gxsjzxLzregQyjbxxbList: [
        //区-企业基本信息表
        {
          title: "企业名称",
          key: "QYMC",
          width: 100,
          fixed: "left",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "注册号",
          key: "ZCH",
          width: 100,
        },
        {
          title: "成立日期",
          key: "CYRQ",
          width: 100,
        },
        {
          title: "法定代表人",
          key: "FDDBR",
          width: 100,
        },
        {
          title: "注册资本",
          key: "ZCZB",
          width: 100,
        },
        {
          title: "住所",
          key: "ZS",
          width: 100,
        },
        {
          title: "经营范围",
          key: "JYFW",
          width: 100,
        },
        {
          title: "营业期限自",
          key: "YYQXZI",
          width: 100,
        },
        {
          title: "营业期限至",
          key: "YYQXZHI",
          width: 100,
        },
        {
          title: "登记机关",
          key: "DJJG",
          width: 100,
        },
        {
          title: "发照日期",
          key: "FZRQ",
          width: 100,
        },
        {
          title: "经营状态",
          key: "JYZT",
          width: 100,
        },
      ],
      q_gxsjzxLzregQyjyycmlbList: [
        //区-企业经营异常名录信息表
        {
          title: "企业名称",
          key: "QYMC",
          width: 100,
          fixed: "left",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
          width: 100,
        },
        {
          title: "注册号",
          key: "ZCH",
          width: 100,
        },
        {
          title: "列入原因",
          key: "LRYY",
          width: 100,
        },
        {
          title: "列入日期",
          key: "LRRQ",
          width: 100,
        },
        {
          title: "列入决定机关",
          key: "lrjdjg",
          width: 100,
        },
        {
          title: "是否移出",
          key: "SFYC",
          width: 100,
        },
        {
          title: "移出原因",
          key: "YCYY",
          width: 100,
        },
        {
          title: "移出日期",
          key: "YCRQ",
          width: 100,
        },
        {
          title: "移出决定机关",
          key: "YCJDJG",
          width: 100,
        },
      ],
      q_gxsjzxLzregQyzxxxbList: [
        //区-企业注销信息表
        {
          title: "企业名称",
          key: "QYMC",
        },
        {
          title: "统一社会信用代码",
          key: "TYSHXYDM",
        },
        {
          title: "注册号",
          key: "ZCH",
        },
        {
          title: "注销时间",
          key: "ZXSJ",
        },
        {
          title: "经营状态",
          key: "JYZT",
        },
      ],
      name: "comIncome",
      boxStyle: {
        width: "100%",
        height: "300px",
        marginTop: "20px",
        marginBottom: "20px",
      },
      comIncome: {
        //雷达图
        title: {
          text: "",
        },
        tooltip: {},
        legend: {
          bottom: 0,
          data: ["企业", "平台"],
        },
        radar: {
          // shape: 'circle',
          radius: "55%",
          center: ["50%", "55%"],
          name: {
            textStyle: {
              color: "#fff",
              backgroundColor: "#999",
              borderRadius: 3,
              padding: [3, 5],
            },
          },
          indicator: [
            { name: "企业基本信息", max: 27 },
            { name: "成长性", max: 15 },
            { name: "偿债能力", max: 20 },
            { name: "经营效率", max: 10 },
            { name: "企业盈利能力", max: 28 },
          ],
        },
        series: [
          {
            name: "",
            type: "radar",
            // areaStyle: {normal: {}},
            data: [
              {
                value: [],
                name: "企业",
              },
              {
                value: [],
                name: "行业",
              },
            ],
          },
        ],
      },
      sbData: [],
      qusbgjj: [
        {
          title: "创建人",
          width: 100,
          align: "center",
          key: "CREATE_BY",
        },
        {
          title: "创建日期",
          width: 100,
          align: "center",
          key: "CREATED",
        },
        {
          title: "最后更新人",
          width: 100,
          align: "center",
          key: "LAST_UPDATED_BY",
        },
        {
          title: "最后更新日期",
          width: 150,
          align: "center",
          key: "LAST_UPDATED",
        },
        {
          title: "加收事由",
          width: 100,
          align: "center",
          key: "JSSY",
        },
        {
          title: "加收日期",
          width: 100,
          align: "center",
          key: "JSRQ",
        },
        {
          title: "加收单位",
          width: 100,
          align: "center",
          key: "JSDW",
        },
        {
          title: "加收事由代码",
          width: 100,
          align: "center",
          key: "JSSYDM",
        },
        {
          title: "企业注册号",
          width: 100,
          align: "center",
          key: "QYZCH",
        },
        {
          title: "业户注册地址",
          width: 100,
          align: "center",
          key: "QYZCDM",
        },
        {
          title: "企业名称",
          width: 150,
          align: "center",
          key: "QYMC",
        },
      ],
      qusbbxznj: [
        {
          title: "企业编号",
          align: "center",
          key: "企业编号",
        },
        {
          title: "企业名称",
          align: "center",
          key: "企业名称",
        },
        {
          title: "企业注册地址",
          align: "center",
          key: "企业注册地址",
        },
        {
          title: "加收事由",
          align: "center",
          key: "加收事由",
        },
        {
          title: "加收日期",
          align: "center",
          key: "加收日期",
        },
        {
          title: "加收单位",
          align: "center",
          key: "加收单位",
        },
      ],
      qusbdj: [
        {
          title: "创建人",
          width: 100,
          align: "center",
          key: "CREATE_BY",
        },
        {
          title: "创建日期",
          width: 100,
          align: "center",
          key: "CREATED",
        },
        {
          title: "最后更新人",
          width: 100,
          align: "center",
          key: "LAST_UPDATE_BY",
        },
        {
          title: "最后更新日期",
          width: 150,
          align: "center",
          key: "LAST_UPDATE",
        },
        {
          title: "企业名称",
          width: 150,
          align: "center",
          key: "QYMC",
        },
        {
          title: "登记事由",
          width: 100,
          align: "center",
          key: "HBSY",
        },
        {
          title: "企业注册号",
          width: 100,
          align: "center",
          key: "qYZCH",
        },
        {
          title: "登记单位",
          width: 150,
          align: "center",
          key: "HBDW",
        },
        {
          title: "企业注册地址",
          width: 150,
          align: "center",
          key: "QYZCDZ",
        },
        {
          title: "登记事由代码",
          width: 100,
          align: "center",
          key: "HBSYDM",
        },
        {
          title: "企业代码",
          width: 100,
          align: "center",
          key: "QYDM",
        },
        {
          title: "登记日期",
          width: 100,
          align: "center",
          key: "HBRQ",
        },
      ],
      qusbxf: [
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "行政相对人名称",
        },
        {
          title: "统一社会信用代码",
          align: "center",
          key: "统一社会信用代码",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "法定代表人姓名",
        },
        {
          title: "检查结果",
          width: 100,
          align: "center",
          key: "检查结果",
        },
        {
          title: "检查时间",
          width: 100,
          align: "center",
          key: "检查时间",
        },
        {
          title: "检查机关",
          align: "center",
          key: "检查机关",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "备注",
        },
      ],
      qusBZS: [
        {
          title: "企业编号",
          align: "center",
          key: "qybh",
        },
        {
          title: "企业名称",
          align: "center",
          key: "qymc",
        },
        {
          title: "企业注册地址",
          align: "center",
          key: "qyzcd",
        },
        {
          title: "征收事由",
          align: "center",
          key: "zssy",
        },
        {
          title: "征收日期",
          align: "center",
          key: "zsrq",
        },
        {
          title: "征收单位",
          align: "center",
          key: "zsdw",
        },
      ],
      qusbzsfr: [
        {
          title: "创建人",
          width: 100,
          align: "center",
          key: "CREATE_BY",
        },
        {
          title: "创建日期",
          width: 100,
          align: "center",
          key: "CREATED",
        },
        {
          title: "最后更新人",
          width: 100,
          align: "center",
          key: "LAST_UPDATE_BY",
        },
        {
          title: "最后更新日期",
          width: 100,
          align: "center",
          key: "LAST_UPDATE",
        },
        {
          title: "企业名称",
          width: 150,
          align: "center",
          key: "QYMC",
        },
        {
          title: "征收事由",
          width: 100,
          align: "center",
          key: "HBSY",
        },
        {
          title: "征收日期",
          width: 100,
          align: "center",
          key: "HBRQ",
        },
        {
          title: "征收单位",
          width: 100,
          align: "center",
          key: "HBDW",
        },
        {
          title: "征收事由代码",
          width: 100,
          align: "center",
          key: "HBSYDM",
        },
        {
          title: "企业注册号",
          width: 100,
          align: "center",
          key: "QYZCH",
        },
        {
          title: "业户注册地址",
          width: 150,
          align: "center",
          key: "QYZCDZ",
        },
      ],
      qubjp: [
        {
          title: "行政许可ID",
          width: 100,
          align: "center",
          key: "XZXK_ID",
        },
        {
          title: "行政许可决定文书号",
          width: 100,
          align: "center",
          key: "XK_WSH",
        },
        {
          title: "项目名称",
          width: 100,
          align: "center",
          key: "XK_XMMC",
        },
        {
          title: "审批类别",
          width: 100,
          align: "center",
          key: "XK_SPLB",
        },
        {
          title: "许可内容",
          width: 100,
          align: "center",
          key: "XK_NR",
        },
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "XK_XDR",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "XK_XDR_SHXYM",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "XK_XDR_ZDM",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "XK_XDR_GSDJ",
        },
        {
          title: "税务登记证号",
          width: 100,
          align: "center",
          key: "XK_XDR_SWDJ",
        },
        {
          title: "居民身份证号",
          width: 100,
          align: "center",
          key: "XK_XDR_SFZ",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "XK_FR",
        },
        {
          title: "许可生效期",
          width: 100,
          align: "center",
          key: "XK_SXQ",
        },
        {
          title: "许可截止期日期",
          width: 100,
          align: "center",
          key: "XK_JZQ",
        },
        {
          title: "许可机关",
          width: 100,
          align: "center",
          key: "XK_XZJG",
        },
        {
          title: "当前状态",
          width: 100,
          align: "center",
          key: "XK_ZT",
        },
        {
          title: "地方编码",
          width: 100,
          align: "center",
          key: "DFBM",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "BZ",
        },
        {
          title: "操作标志",
          width: 100,
          align: "center",
          key: "OP_FLAG",
        },
      ],
      quxzcfother: [
        {
          title: "行政许可ID",
          width: 100,
          align: "center",
          key: "CASEID",
        },
        {
          title: "主体身份代码",
          width: 100,
          align: "center",
          key: "PRIPID",
        },
        {
          title: "注册号",
          width: 100,
          align: "center",
          key: "REGNO",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "UNISCID",
        },
        {
          title: "企业名称",
          width: 100,
          align: "center",
          key: "ENTNAME",
        },
        {
          title: "处罚决定书文号",
          width: 100,
          align: "center",
          key: "PENDECNO",
        },
        {
          title: "违法行为类型",
          width: 100,
          align: "center",
          key: "ILLEGACTTYPE",
        },
        {
          title: "处罚种类",
          width: 100,
          align: "center",
          key: "PENTYPE",
        },
        {
          title: "处罚种类（中文名称）",
          width: 100,
          align: "center",
          key: "PENTYPE_CN",
        },
        {
          title: "罚款金额",
          width: 100,
          align: "center",
          key: "PENAM",
        },
        {
          title: "没收金额",
          width: 100,
          align: "center",
          key: "FORFAM",
        },
        {
          title: "处罚内容",
          width: 100,
          align: "center",
          key: "PENCONTENT",
        },

        {
          title: "作出行政处罚决定机关名称",
          width: 100,
          align: "center",
          key: "PENDECISSDATE",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "REMARK",
        },
        {
          title: "公示日期",
          width: 100,
          align: "center",
          key: "PUBLICDATE",
        },
        {
          title: "工商提供企业ID",
          width: 100,
          align: "center",
          key: "REG_BUS_ENT_ID",
        },
        {
          title: "工商提供企业名称",
          width: 100,
          align: "center",
          key: "ENT_NAME",
        },
        {
          title: "工商提供注册号",
          width: 100,
          align: "center",
          key: "REG_NO",
        },
        {
          title: "工商提供社会信用代码",
          width: 100,
          align: "center",
          key: "UNI_SCID",
        },
      ],
      quqycfxx: [
        {
          title: "行政处罚决定书文号",
          width: 100,
          align: "center",
          key: "PUNISH_DOC_NUM",
        },
        {
          title: "处罚信息ID",
          width: 100,
          align: "center",
          key: "PUNISH_ID（主键）",
        },
        {
          title: "居民身份证",
          width: 100,
          align: "center",
          key: "CORP_ID_CARD",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "CORP_NAME",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "SOCIAL_CREDIT_CODE",
        },
        {
          title: "案件名称",
          width: 100,
          align: "center",
          key: "CASE_NAME",
        },
        {
          title: "处罚事由",
          width: 100,
          align: "center",
          key: "PUNISH_REASON",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "BUSINESS_LICENSE",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "TAX_REGISTRATION",
        },
        {
          title: "处罚结果",
          width: 100,
          align: "center",
          key: "PUNISH_RESULT",
        },
        {
          title: "许可相对人",
          width: 100,
          align: "center",
          key: "ENTP_NAME",
        },
      ],
      quxzcf: [
        {
          title: "处罚ID",
          width: 100,
          align: "center",
          key: "CF_ID",
        },
        {
          title: "处罚文书号",
          width: 100,
          align: "center",
          key: "CF_WSH",
        },
        {
          title: "案件名称",
          width: 100,
          align: "center",
          key: "CF_AJMC",
        },
        {
          title: "处罚类型",
          width: 100,
          align: "center",
          key: "CF_CFLB",
        },
        {
          title: "处罚事由",
          width: 100,
          align: "center",
          key: "CF_SY",
        },
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "CF_XDR_MC",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "CF_XDR_SHXYM",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "CF_XDR_ZDM",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "CF_XDR_GSDJ",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "CF_XDR_SWDJ",
        },
        {
          title: "居民身份证",
          width: 100,
          align: "center",
          key: "CF_XDR_SFZ",
        },
        {
          title: "法人代表姓名",
          width: 100,
          align: "center",
          key: "CF_FR",
        },
        {
          title: "处罚生效日期",
          width: 100,
          align: "center",
          key: "CF_SXQ",
        },
        {
          title: "处罚截止日期",
          width: 100,
          align: "center",
          key: "CF_JZQ",
        },
        {
          title: "处罚机关",
          width: 100,
          align: "center",
          key: "CF_XZJG",
        },
        {
          title: "处罚状态",
          width: 100,
          align: "center",
          key: "CF_ZT",
        },
        {
          title: "地方编码",
          width: 100,
          align: "center",
          key: "DFBM",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "BZ",
        },
        {
          title: "处罚依据",
          width: 100,
          align: "center",
          key: "CF_YJ",
        },
        {
          title: "处罚结果",
          width: 100,
          align: "center",
          key: "CF_JG",
        },
      ],
      qujgcfxx: [
        {
          title: "机构名称",
          align: "center",
          key: "ORGNAME",
        },
        {
          title: "统一社会信用代码",
          align: "center",
          key: "SOCIALCREDITCODE",
        },
        {
          title: "法定代表人",
          align: "center",
          key: "LEGAL",
        },
        {
          title: "处罚文号",
          align: "center",
          key: "PUNISHNUM",
        },
        {
          title: "处罚结果",
          align: "center",
          key: "PUNISHRESULT",
        },
        {
          title: "处罚单位",
          align: "center",
          key: "PUNISHORGAN",
        },
        {
          title: "处罚日期",
          align: "center",
          key: "PUNISHDATE",
        },
        {
          title: "备注",
          align: "center",
          key: "NOTE",
        },
      ],
      quswqszm: [
        {
          title: "登记序号",
          width: 100,
          align: "center",
          key: "DJXH",
        },
        {
          title: "税收档案编号，国地税企",
          width: 100,
          align: "center",
          key: "SSDABH",
        },
        {
          title: "纳税人识别号",
          width: 100,
          align: "center",
          key: "NSRSBH",
        },
        {
          title: "纳税人名称",
          width: 100,
          align: "center",
          key: "NSRMC",
        },
        {
          title: "社会信用代码",
          width: 100,
          align: "center",
          key: "SHXYDM",
        },
        {
          title: "文书制作税务机构代码",
          width: 100,
          align: "center",
          key: "WSZZSWJG_DM",
        },
        {
          title: "文书制作税务机构名称",
          width: 100,
          align: "center",
          key: "WSZZSWJG_MC",
        },
        {
          title: "文书制作日期",
          width: 100,
          align: "center",
          key: "WSZZRQ",
        },
        {
          title: "文书录入日期，递增",
          width: 100,
          align: "center",
          key: "LRRQ",
        },
        {
          title: "字轨",
          width: 100,
          align: "center",
          key: "ZG",
        },
        {
          title: "年号",
          width: 100,
          align: "center",
          key: "NH",
        },
        {
          title: "文号",
          width: 100,
          align: "center",
          key: "WH",
        },
      ],
      quswxzxk: [
        {
          title: "税务行政许可信息UUID",
          width: 100,
          align: "center",
          key: "SWXZXKUUID",
        },
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "XK_XDR_MC",
        },
        {
          title: "行政相对人类别",
          width: 100,
          align: "center",
          key: "XK_XDR_LB",
        },
        {
          title: "法定代表人",
          width: 100,
          align: "center",
          key: "XK_FRDB",
        },
        {
          title: "法定代表人证件类型",
          width: 100,
          align: "center",
          key: "XK_FR_ZJLX",
        },
        {
          title: "法定代表人证件号码",
          width: 100,
          align: "center",
          key: "XK_FR_ZJHM",
        },
        {
          title: "证件类型",
          width: 100,
          align: "center",
          key: "XK_XDR_ZJLX",
        },
        {
          title: "证件号码",
          width: 100,
          align: "center",
          key: "XK_XDR_ZJHM",
        },
        {
          title: "行政许可决定文书名称",
          width: 100,
          align: "center",
          key: "XK_XKWS",
        },
        {
          title: "行政许可决定文书号",
          width: 100,
          align: "center",
          key: "XK_WSH",
        },
        {
          title: "许可类别",
          width: 100,
          align: "center",
          key: "XK_XKLB",
        },
        {
          title: "许可证书名称",
          width: 100,
          align: "center",
          key: "XK_XKZS",
        },
        {
          title: "许可编号",
          width: 100,
          align: "center",
          key: "XK_XKBH",
        },
        {
          title: "许可内容",
          width: 100,
          align: "center",
          key: "XK_NR",
        },
        {
          title: "许可决定日期",
          width: 100,
          align: "center",
          key: "XK_JDRQ",
        },
        {
          title: "许可有效期自",
          width: 100,
          align: "center",
          key: "XK_YXQZ",
        },
        {
          title: "许可有效期至",
          width: 100,
          align: "center",
          key: "XK_YXQZI",
        },
        {
          title: "许可机关",
          width: 100,
          align: "center",
          key: "XK_XKJG",
        },
        {
          title: "许可机关统一社会信用代码",
          width: 100,
          align: "center",
          key: "XK_XKJGDM",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "BZ",
        },
      ],
      dwgjsjcxx: [
        {
          title: "单位名称",
          align: "center",
          key: "NAME",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ZZJGDM",
        },
        {
          title: "所属区县",
          width: 100,
          align: "center",
          key: "BELONG",
        },
        {
          title: "单位地址",
          width: 100,
          align: "center",
          key: "ADDRESS",
        },
        {
          title: "开户日期",
          width: 100,
          align: "center",
          key: "KHRQ",
        },
        {
          title: "单位职工数",
          width: 100,
          align: "center",
          key: "DWZGS",
        },
        {
          title: "单位缴至年月",
          width: 100,
          align: "center",
          key: "DWJZNY",
        },
        {
          title: "单位缴存时间",
          width: 100,
          align: "center",
          key: "DWJCSJ",
        },
        {
          title: "单位余额",
          width: 100,
          align: "center",
          key: "DWYE",
        },
      ],
      bdcdjxx: [
        {
          title: "房屋所有权人",
          width: 100,
          align: "center",
          key: "QLRMC",
        },
        {
          title: "证件种类",
          width: 100,
          align: "center",
          key: "ZJZL",
        },
        {
          title: "证件号",
          width: 100,
          align: "center",
          key: "ZJH",
        },
        {
          title: "权利人类型",
          width: 100,
          align: "center",
          key: "QLRLX",
        },
        {
          title: "等级类型",
          width: 100,
          align: "center",
          key: "DJLX",
        },
        {
          title: "土地使用权人",
          width: 100,
          align: "center",
          key: "TDSHYQR",
        },
        {
          title: "独用土地面积",
          width: 100,
          align: "center",
          key: "DYTDMJ",
        },
        {
          title: "分摊土地面积",
          width: 100,
          align: "center",
          key: "FTTDMJ",
        },
        {
          title: "规划用途",
          width: 100,
          align: "center",
          key: "GHYT",
        },
        {
          title: "房屋性质",
          width: 100,
          align: "center",
          key: "FWXZ",
        },
        {
          title: "房屋结构",
          width: 100,
          align: "center",
          key: "FWJG",
        },
        {
          title: "所在层",
          width: 100,
          align: "center",
          key: "SZC",
        },
        {
          title: "总层数",
          width: 100,
          align: "center",
          key: "ZCS",
        },
        {
          title: "实测建筑面积",
          width: 100,
          align: "center",
          key: "SCJZMJ",
        },
        {
          title: "专有建筑面积",
          width: 100,
          align: "center",
          key: "SCTNJZMJ",
        },
        {
          title: "分摊建筑面积",
          width: 100,
          align: "center",
          key: "SCFTJZMJ",
        },
        {
          title: "不动产权证号",
          width: 100,
          align: "center",
          key: "BDCQZH",
        },
        {
          title: "登记时间",
          width: 100,
          align: "center",
          key: "DJSJ",
        },
      ],
      zdkjxmxx: [
        {
          title: "信用平台对应机构",
          width: 100,
          align: "center",
          key: "ORG_NAME",
        },
        {
          title: "创建人",
          width: 100,
          align: "center",
          key: "CREATE_BY",
        },
        {
          title: "创建日期",
          width: 100,
          align: "center",
          key: "CREATED",
        },
        {
          title: "最后更新人",
          width: 100,
          align: "center",
          key: "LAST_UPDATED_BY	",
        },
        {
          title: "最后更新日期",
          width: 100,
          align: "center",
          key: "LAST_UPDATED",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ZZJGDM",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "GSDJH",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "SWDJH",
        },
        {
          title: "法定代表人",
          width: 100,
          align: "center",
          key: "FDDBR",
        },
        {
          title: "单位地址",
          width: 100,
          align: "center",
          key: "DWDZ",
        },
        {
          title: "联系电话",
          width: 100,
          align: "center",
          key: "LXDH",
        },
        {
          title: "项目名称",
          width: 100,
          align: "center",
          key: "XMmc",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "TYSHXYDM",
        },
        {
          title: "企业名称",
          width: 100,
          align: "center",
          key: "QYMC",
        },
      ],
      gxjsqyrdxx: [
        {
          title: "信用平台对应机构",
          width: 100,
          align: "center",
          key: "ORG_NAME",
        },
        {
          title: "创建人",
          width: 100,
          align: "center",
          key: "CREATE_BY",
        },
        {
          title: "创建日期",
          width: 100,
          align: "center",
          key: "CREATED",
        },
        {
          title: "最后更新人",
          width: 100,
          align: "center",
          key: "LAST_UPDATED_BY	",
        },
        {
          title: "最后更新日期",
          width: 100,
          align: "center",
          key: "LAST_UPDATED",
        },
        {
          title: "企业名称",
          width: 100,
          align: "center",
          key: "QYMC",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "TYSHXYDM",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ZZJGDM",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "GSDJH",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "SWDJH",
        },
        {
          title: "法定代表人",
          width: 100,
          align: "center",
          key: "FDDBR",
        },
        {
          title: "单位地址",
          width: 100,
          align: "center",
          key: "DWDZ",
        },
        {
          title: "联系电话",
          width: 100,
          align: "center",
          key: "LXDH",
        },
        {
          title: "认定日期",
          width: 100,
          align: "center",
          key: "RDRQ",
        },
        {
          title: "有效期",
          width: 100,
          align: "center",
          key: "YXQ",
        },
      ],
      glsfsxzcf: [
        {
          title: "系统流水号",
          width: 100,
          align: "center",
          key: "UUID",
        },
        {
          title: "行政处罚决定书文号",
          width: 100,
          align: "center",
          key: "CF_WSH",
        },
        {
          title: "处罚名称",
          width: 100,
          align: "center",
          key: "CF_CFMC",
        },
        {
          title: "处罚类别1",
          width: 100,
          align: "center",
          key: "CF_CFLB1",
        },
        {
          title: "处罚类别2",
          width: 100,
          align: "center",
          key: "CF_CFLB2",
        },
        {
          title: "处罚事由",
          width: 100,
          align: "center",
          key: "CF_SY",
        },
        {
          title: "处罚依据",
          width: 100,
          align: "center",
          key: "CF_YJ",
        },
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "CF_XDR_MC",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "CF_XDR_SHXYM",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "CF_XDR_ZDM",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "CF_XDR_GSDJ",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "CF_XDR_SWDJ",
        },
        {
          title: "居民身份证号",
          width: 100,
          align: "center",
          key: "CF_XDR_SFZ",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "CF_FR",
        },
        {
          title: "处罚结果",
          width: 100,
          align: "center",
          key: "CF_JG",
        },
        {
          title: "处罚决定日期",
          width: 100,
          align: "center",
          key: "CF_CFJDRQ",
        },
        {
          title: "处罚机关",
          width: 100,
          align: "center",
          key: "CF_XZJG",
        },
        {
          title: "当前状态",
          width: 100,
          align: "center",
          key: "CF_ZT",
        },
        {
          title: "地方编码",
          width: 100,
          align: "center",
          key: "DFBM",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "BZ",
        },
        {
          title: "所属单位",
          width: 100,
          align: "center",
          key: "CF_SSDW",
        },
      ],
      glssfxzxk: [
        {
          title: "系统流水号",
          width: 100,
          align: "center",
          key: "UUID",
        },
        {
          title: "文书号",
          width: 100,
          align: "center",
          key: "XK_WSH",
        },
        {
          title: "项目名称",
          width: 100,
          align: "center",
          key: "XK_XMMC",
        },
        {
          title: "审批类别",
          width: 100,
          align: "center",
          key: "XK_SPLB",
        },
        {
          title: "内容",
          width: 100,
          align: "center",
          key: "XK_NR",
        },
        {
          title: "行政相对人",
          width: 100,
          align: "center",
          key: "XK_XDR",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "XK_XDR_SHXYM",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "XK_XDR_ZDM",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "XK_XDR_GSDJ",
        },
        {
          title: "税务登记",
          width: 100,
          align: "center",
          key: "XK_XDR_SWDJ",
        },
        {
          title: "居民身份证号",
          width: 100,
          align: "center",
          key: "XK_XDR_SFZ",
        },
        {
          title: "法人",
          width: 100,
          align: "center",
          key: "XK_FR",
        },
        {
          title: "许可决定日期",
          width: 100,
          align: "center",
          key: "XK_JDRQ",
        },
        {
          title: "许可截止期",
          width: 100,
          align: "center",
          key: "XK_JZQ",
        },
        {
          title: "许可机关",
          width: 100,
          align: "center",
          key: "XK_XZJG",
        },
        {
          title: "当前状态",
          width: 100,
          align: "center",
          key: "XK_ZT",
        },
        {
          title: "地方编码",
          width: 100,
          align: "center",
          key: "DFBM",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "BZ",
        },
        {
          title: "所属单位",
          width: 100,
          align: "center",
          key: "XK_SSDW",
        },
      ],
      rjcpdjxx: [
        {
          title: "创建人",
          width: 100,
          align: "center",
          key: "CREATE_BY",
        },
        {
          title: "创建日期",
          width: 100,
          align: "center",
          key: "CREATED",
        },
        {
          title: "最后更新人",
          width: 100,
          align: "center",
          key: "last_UPDATED_BY",
        },
        {
          title: "最后更新日期",
          width: 100,
          align: "center",
          key: "last_UPDATED",
        },
        {
          title: "申请企业名称",
          width: 100,
          align: "center",
          key: "SQQYMC",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "TYSHXYDM",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ZZJGDM",
        },
        {
          title: "工商注册号",
          width: 100,
          align: "center",
          key: "GSZCH",
        },
        {
          title: "证书编号",
          width: 100,
          align: "center",
          key: "ZSBH",
        },
        {
          title: "有效期",
          width: 100,
          align: "center",
          key: "YXQ",
        },
        {
          title: "发证日期",
          width: 100,
          align: "center",
          key: "FZRQ",
        },
        {
          title: "评估机构",
          width: 100,
          align: "center",
          key: "PGJG",
        },
      ],
      fzchxx: [
        //自治区税务局_非正常户
        {
          title: "UUID",
          align: "center",
          key: "UUID",
        },
        {
          title: "企业名称",
          align: "center",
          key: "QYMC",
        },
        {
          title: "非正常户类别",
          align: "center",
          key: "FZCHLB",
        },
        {
          title: "上年纳税总额",
          align: "center",
          key: "SNNSZE",
        },
      ],
      nsrqsxx: [
        //自治区税务局_纳税人欠税信息
        {
          title: "UUID",
          align: "center",
          width: 100,
          key: "UUID",
        },
        {
          title: "纳税人名称",
          align: "center",
          width: 100,
          key: "NSRMC",
        },
        {
          title: "社会信用代码",
          align: "center",
          width: 100,
          key: "SHXYDM",
        },
        {
          title: "纳税人识别号",
          align: "center",
          width: 100,
          key: "NSRSBH",
        },
        {
          title: "法人姓名",
          align: "center",
          width: 100,
          key: "FDDBR",
        },
        {
          title: "身份证件号码",
          align: "center",
          width: 100,
          key: "SFZJHM",
        },
        {
          title: "经营地点",
          align: "center",
          width: 100,
          key: "JYDD",
        },
        {
          title: "欠税税种",
          align: "center",
          width: 100,
          key: "QSSZ",
        },
        {
          title: "欠税余额",
          align: "center",
          width: 100,
          key: "QSYE",
        },
        {
          title: "当期发生的欠税金额",
          align: "center",
          width: 100,
          key: "DQXFSDQSJE",
        },
        {
          title: "统计截止日期",
          align: "center",
          width: 100,
          key: "TJHZRQ",
        },
        {
          title: "公告税务机关",
          align: "center",
          width: 100,
          key: "GGSWJG",
        },
        {
          title: "状态",
          align: "center",
          width: 100,
          key: "ZT",
        },
      ],
      swdjjbxx: [
        //自治区税务局_税务登记基本信息
        {
          title: "UUID",
          align: "center",
          key: "UUID",
        },
        {
          title: "企业名称",
          align: "center",
          key: "QYMC",
        },
        {
          title: "纳税人识别号",
          align: "center",
          key: "NSRSBH",
        },
        {
          title: "税务登记机关",
          align: "center",
          key: "SWDJJG",
        },
        {
          title: "纳税人状态码",
          align: "center",
          key: "NSRZTM",
        },
        {
          title: "增值税一般纳税人标志",
          align: "center",
          key: "ZZSYBNSRBZ",
        },
      ],
      swdjzxxx: [
        //自治区税务局_税务登记注销信息
        {
          title: "UUID",
          align: "center",
          key: "UUID",
        },
        {
          title: "注销类型",
          align: "center",
          key: "ZXLX",
        },
        {
          title: "注销原因",
          align: "center",
          key: "ZXYY",
        },
        {
          title: "注销日期",
          align: "center",
          key: "ZXRQ",
        },
        {
          title: "注销登记机关",
          align: "center",
          key: "ZXDJJG",
        },
        {
          title: "纳税人名称",
          align: "center",
          key: "NSRMC",
        },
        {
          title: "社会统一代码",
          align: "center",
          key: "SHTYDM",
        },
      ],
      allow: [
        // 质监局双公示--行政许可
        {
          title: "机构名称",
          align: "center",
          key: "ORGNAME",
        },
        {
          title: "统一社会信用代码",
          align: "center",
          key: "SOCIALCREDITCODE",
        },
        {
          title: "法定代表人",
          align: "center",
          key: "LEGAL",
        },
        {
          title: "处罚文号",
          align: "center",
          key: "PUNISHNUM",
        },
        {
          title: "处罚结果",
          align: "center",
          key: "PUNISHRESULT",
        },
        {
          title: "处罚单位",
          align: "center",
          key: "PUNISHORGAN",
        },
        {
          title: "处罚日期",
          align: "center",
          key: "PUNISHDATE",
        },
        {
          title: "备注",
          align: "center",
          key: "NOTE",
        },
      ],
      jgcfxx: [
        //质监局机构处罚信息（侵权假冒处罚信息）
        {
          title: "机构名称",
          align: "center",
          key: "ORGNAME",
        },
        {
          title: "统一社会信用代码",
          align: "center",
          key: "SOCIALCREDITCODE",
        },
        {
          title: "法定代表人",
          align: "center",
          key: "LEGAL",
        },
        {
          title: "处罚文号",
          align: "center",
          key: "PUNISHNUM",
        },
        {
          title: "处罚结果",
          align: "center",
          key: "PUNISHRESULT",
        },
        {
          title: "处罚单位",
          align: "center",
          key: "PUNISHORGAN",
        },
        {
          title: "处罚日期",
          align: "center",
          key: "PUNISHDATE",
        },
        {
          title: "备注",
          align: "center",
          key: "NOTE",
        },
      ],
      punish: [
        //双公示行政处罚信息
        {
          title: "行政处罚决定书文号",
          width: 100,
          align: "center",
          key: "PUNISHNUM",
        },
        {
          title: "案件名称",
          width: 100,
          align: "center",
          key: "CASENAME",
        },
        {
          title: "处罚类别1",
          width: 100,
          align: "center",
          key: "PUNISHTYPE1",
        },
        {
          title: "处罚类别2",
          width: 100,
          align: "center",
          key: "PUNISHTYPE2",
        },
        {
          title: "处罚事由",
          width: 100,
          align: "center",
          key: "PUNISHREASON",
        },
        {
          title: "处罚依据",
          width: 100,
          align: "center",
          key: "PUNISHACCORD",
        },
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "ORGNAME",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "SOCIALCREDITCODE",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ORGCODE",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "REGCODE",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "TAXCODE",
        },
        {
          title: "法人身份证号",
          width: 100,
          align: "center",
          key: "LEGALIDCARD",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "LEGAL",
        },
        {
          title: "处罚结果",
          width: 100,
          align: "center",
          key: "PUNISHRESULT",
        },
        {
          title: "处罚生效期",
          width: 100,
          align: "center",
          key: "PUNISHDATE",
        },
        {
          title: "处罚截止期",
          width: 100,
          align: "center",
          key: "PUNISHENDDATE",
        },
        {
          title: "处罚机关",
          width: 100,
          align: "center",
          key: "PUNISHORGAN",
        },
        {
          title: "当前状态",
          width: 100,
          align: "center",
          key: "STATUS1",
        },
        {
          title: "地方编码",
          width: 100,
          align: "center",
          key: "OPLOCDISTRICT",
        },
      ],
      entpPunish: [
        //自治区食品药品监督管理局-企业处罚信息表
        {
          title: "行政处罚决定书文号",
          width: 100,
          align: "center",
          key: "PUNISH_DOC_NUM",
        },
        {
          title: "处罚信息ID",
          width: 100,
          align: "center",
          key: "PUNISH_ID",
        },
        {
          title: "居民身份证",
          width: 100,
          align: "center",
          key: "CORP_ID_CARD",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "CORP_NAME",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "SOCIAL_CREDIT_CODE",
        },
        {
          title: "案件名称",
          width: 100,
          align: "center",
          key: "CASE_NAME",
        },
        {
          title: "处罚事由",
          width: 100,
          align: "center",
          key: "PUNISH_REASON",
        },
        {
          title: "处罚依据",
          width: 100,
          align: "center",
          key: "PUNISH_RULE",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "BUSINESS_LICENSE",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "TAX_REGISTRATION",
        },
        {
          title: "处罚结果",
          width: 100,
          align: "center",
          key: "PUNISH_RESULT",
        },
        {
          title: "许可相对人",
          width: 100,
          align: "center",
          key: "ENTP_NAME",
        },
      ],
      eotCase: [
        //其他部门公示_行政处罚信息
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "UNISCID",
        },
        {
          title: "企业名称",
          width: 100,
          align: "center",
          key: "ENTNAME",
        },
        {
          title: "处罚决定书文号",
          width: 100,
          align: "center",
          key: "PENDECNO",
        },
        {
          title: "违法行为类型",
          width: 100,
          align: "center",
          key: "ILLEGACTTYPE",
        },
        {
          title: "处罚种类",
          width: 100,
          align: "center",
          key: "PENTYPE_CN",
        },
        {
          title: "罚款金额",
          width: 100,
          align: "center",
          key: "PENAM",
        },
        {
          title: "没收金额",
          width: 100,
          align: "center",
          key: "FORFAM",
        },
        {
          title: "处罚内容",
          width: 100,
          align: "center",
          key: "PENCONTENT",
        },
        {
          title: "作出行政处罚决定机关名称",
          width: 100,
          align: "center",
          key: "JUDAUTH",
        },
        {
          title: "作出处罚决定书日期",
          width: 100,
          align: "center",
          key: "PENDECISSDATE",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "REMARK",
        },
        {
          title: "公示日期",
          width: 100,
          align: "center",
          key: "PUBLICDATE",
        },
      ],
      dzzwDwqjagexx: [
        //养老欠缴信息
        {
          title: "单位名称",
          align: "center",
          key: "AAB004",
        },
        {
          title: "统一社会信用代码",
          align: "center",
          key: "BAB010",
        },
        {
          title: "欠缴年度",
          align: "center",
          key: "ND",
        },
        {
          title: "欠缴金额",
          align: "center",
          key: "QJJE",
        },
      ],
      dwqjxx: [
        //单位欠缴信息
        {
          title: "单位名称",
          align: "center",
          key: "AAB004",
        },
        {
          title: "欠缴年度",
          align: "center",
          key: "QJND",
        },
        {
          title: "当年欠缴金额",
          align: "center",
          key: "DNQJJE",
        },
      ],
      qycbxx: [
        //企业参保信息
        {
          title: "单位名称",
          align: "center",
          key: "AAB004",
        },
        {
          title: "参保年度",
          width: 100,
          align: "center",
          key: "ND",
        },
        {
          title: "养老参保人数",
          width: 100,
          align: "center",
          key: "YANGLRS",
        },
        {
          title: "失业参保人数",
          width: 100,
          align: "center",
          key: "LOSTRS",
        },
        {
          title: "医疗参保人人数",
          width: 100,
          align: "center",
          key: "YLRS",
        },
        {
          title: "工伤参保人数",
          width: 100,
          align: "center",
          key: "GSRS",
        },
        {
          title: "生育参保人数",
          width: 100,
          align: "center",
          key: "SYRS",
        },
      ],
      zyjnjdjgxkxx: [
        //职业技能鉴定机构许可信息
        {
          title: "机构名称",
          width: 100,
          align: "center",
          key: "JGMC",
        },
        {
          title: "机构编码",
          width: 100,
          align: "center",
          key: "JGBH",
        },
        {
          title: "机构地址及邮编",
          align: "center",
          key: "JGDZ",
        },
        {
          title: "机构负责人",
          width: 100,
          align: "center",
          key: "FZR",
        },
        {
          title: "负责人联系电话",
          align: "center",
          key: "FZRDH",
        },
        {
          title: "机构联系人",
          align: "center",
          key: "LXR",
        },
        {
          title: "联系人联系电话",
          align: "center",
          key: "LXRDH",
        },
        {
          title: "鉴定职业",
          align: "center",
          width: 100,
          key: "JDZY",
        },
        {
          title: "职业代码",
          align: "center",
          key: "ZYDM",
        },
        {
          title: "鉴定等级",
          align: "center",
          key: "JDDJ",
        },
      ],
      sgsSgsAjnsrxx: [
        //A级纳税人名单
        {
          title: "纳税人名称",
          width: 100,
          align: "center",
          key: "NSRMC",
        },
        {
          title: "社会信用代码",
          width: 100,
          align: "center",
          key: "SHXYDM",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ZZJG_DM",
        },
        {
          title: "工商登记码",
          width: 100,
          align: "center",
          key: "GSDJM",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "FDDBRXM",
        },
        {
          title: "居民身份证号",
          width: 100,
          align: "center",
          key: "FDDBRSFZJHM",
        },
        {
          title: "主管税务机关",
          width: 100,
          align: "center",
          key: "ZGSWJG",
        },
        {
          title: "税务登记号",
          width: 100,
          align: "center",
          key: "SWDJH",
        },
        {
          title: "纳税信用评价结果",
          width: 100,
          align: "center",
          key: "PDJB",
        },
        {
          title: "评价年度",
          width: 100,
          align: "center",
          key: "PDND",
        },
        {
          title: "有效期起",
          width: 100,
          align: "center",
          key: "YXQQ",
        },
        {
          title: "有效期止",
          width: 100,
          align: "center",
          key: "YXQZ",
        },
      ],
      sgsSgsQsggxx: [
        //欠税公告表
        {
          title: "纳税人识别号",
          width: 100,
          align: "center",
          key: "NSHSBH",
        },
        {
          title: "纳税人名称",
          width: 100,
          align: "center",
          key: "NSRMC",
        },
        {
          title: "法人姓名",
          width: 100,
          align: "center",
          key: "FDDBRXM",
        },
        {
          title: "法人证件类型代码",
          width: 100,
          align: "center",
          key: "FDDBRSFZJLX_DM",
        },
        {
          title: "法人证件类型名称",
          width: 100,
          align: "center",
          key: "FDDBRSFZJLX_MC",
        },
        {
          title: "法人证件号码",
          width: 100,
          align: "center",
          key: "FDDBRSFZJHM",
        },
        {
          title: "生产经营地址",
          width: 100,
          align: "center",
          key: "SCJYDZ",
        },
        {
          title: "税种代码",
          width: 100,
          align: "center",
          key: "ZSXM_DM",
        },
        {
          title: "税种名称",
          width: 100,
          align: "center",
          key: "ZSXMMC",
        },
        {
          title: "欠税余额",
          width: 100,
          align: "center",
          key: "QSYE",
        },
        {
          title: "当期新增欠税金额",
          width: 100,
          align: "center",
          key: "DQXZQSJE",
        },
        {
          title: "欠税公告期限天",
          width: 100,
          align: "center",
          key: "QSGGQX",
        },
        {
          title: "公告日期",
          width: 100,
          align: "center",
          key: "GGRQ",
        },
        {
          title: "欠税公告机关",
          width: 100,
          align: "center",
          key: "QSGGJG",
        },
        {
          title: "社会信用代码",
          width: 100,
          align: "center",
          key: "SHXYDM",
        },
        {
          title: "有效期起",
          width: 100,
          align: "center",
          key: "YXQQ",
        },
        {
          title: "有效期止",
          width: 100,
          align: "center",
          key: "YXQZ",
        },
        {
          title: "缴款期限",
          width: 100,
          align: "center",
          key: "JKQX",
        },
      ],
      SgsXzcfxxNew: [
        //双公示行政处罚
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "CF_XDR_MC",
        },
        {
          title: "行政相对人类别",
          width: 100,
          align: "center",
          key: "CF_XDR_LB",
        },
        {
          title: "法定代表人",
          width: 100,
          align: "center",
          key: "CF_FRDB",
        },
        {
          title: "法定代表人证件类型",
          width: 100,
          align: "center",
          key: "CF_FR_ZJLX",
        },
        {
          title: "法定代表人证件号码",
          width: 100,
          align: "center",
          key: "CF_FR_ZJHM",
        },
        {
          title: "证件类型",
          width: 100,
          align: "center",
          key: "CF_XDR_ZJLX",
        },
        {
          title: "证件号码",
          width: 100,
          align: "center",
          key: "CF_XDR_ZJHM",
        },
        {
          title: "行政处罚决定书文号",
          width: 100,
          align: "center",
          key: "CF_WSH",
        },
        {
          title: "违法行为类型",
          width: 100,
          align: "center",
          key: "CF_WFXW",
        },
        {
          title: "违法事实",
          width: 100,
          align: "center",
          key: "CF_SY",
        },
        {
          title: "处罚依据",
          width: 100,
          align: "center",
          key: "CF_YJ",
        },
        {
          title: "处罚类别",
          width: 100,
          align: "center",
          key: "CF_CFLB",
        },
        {
          title: "处罚内容",
          width: 100,
          align: "center",
          key: "CF_NR",
        },
        {
          title: "罚款金额（万元）",
          width: 100,
          align: "center",
          key: "CF_NR_FK",
        },
        {
          title: "没收违法所得、没收非法财物的金额（万元",
          width: 100,
          align: "center",
          key: "CF_NR_WFFF",
        },
        {
          title: "暂扣或吊销证照名称及编号",
          width: 100,
          align: "center",
          key: "CF_NR_ZKDX",
        },
        {
          title: "处罚决定日期",
          width: 100,
          align: "center",
          key: "CF_JDRQ",
        },
        {
          title: "处罚有效期",
          width: 100,
          align: "center",
          key: "CF_YXQ",
        },
        {
          title: "公示截止期",
          width: 100,
          align: "center",
          key: "CF_GSJZQ",
        },
        {
          title: "处罚机处罚",
          width: 100,
          align: "center",
          key: "CF_CFJG",
        },
        {
          title: "处罚机关统一社会信用代码",
          width: 100,
          align: "center",
          key: "CF_CFJGDM",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "BZ",
        },
      ],
      sgsXzxkxx: [
        //双公示行政许可
        {
          title: "行政相对人名称",
          width: 100,
          align: "center",
          key: "XK_XDR_MC",
        },
        {
          title: "行政相对人类别",
          width: 100,
          align: "center",
          key: "XK_XDR_LB",
        },
        {
          title: "法定代表人",
          width: 100,
          align: "center",
          key: "XK_FRDB",
        },
        {
          title: "法定代表人证件类型",
          width: 100,
          align: "center",
          key: "XK_FR_ZJLX",
        },
        {
          title: "法定代表人证件号码",
          width: 100,
          align: "center",
          key: "XK_FR_ZJHM",
        },
        {
          title: "证件类型",
          width: 100,
          align: "center",
          key: "XK_XDR_ZJLX",
        },
        {
          title: "证件号码",
          width: 100,
          align: "center",
          key: "XK_XDR_ZJHM",
        },
        {
          title: "行政许可决定文书名称",
          width: 100,
          align: "center",
          key: "XK_XKWS",
        },
        {
          title: "行政许可决定文书号",
          width: 100,
          align: "center",
          key: "XK_WSH",
        },
        {
          title: "许可类别",
          width: 100,
          align: "center",
          key: "XK_XKLB",
        },
        {
          title: "许可证书名称",
          width: 100,
          align: "center",
          key: "XK_XKZS",
        },
        {
          title: "许可编号",
          width: 100,
          align: "center",
          key: "XK_XKBH",
        },
        {
          title: "许可内容",
          width: 100,
          align: "center",
          key: "XK_NR",
        },
        {
          title: "许可决定日期",
          width: 100,
          align: "center",
          key: "XK_JDRQ",
        },
        {
          title: "许可有效期自",
          width: 100,
          align: "center",
          key: "XK_YXQZ",
        },
        {
          title: "许可有效期至",
          width: 100,
          align: "center",
          key: "XK_YXQZI",
        },
        {
          title: "许可机关",
          width: 100,
          align: "center",
          key: "XK_XKJG",
        },
        {
          title: "许可机关统一社会信用代码",
          width: 100,
          align: "center",
          key: "XK_XKJGDM",
        },
        {
          title: "当前状态",
          width: 100,
          align: "center",
          key: "XK_ZT",
        },
        {
          title: "备注",
          width: 100,
          align: "center",
          key: "BZ",
        },
      ],
      SgsZdsswfajxxCcb: [
        //双公示重大税收违法案件信息撤出表
        {
          title: "公布级别",
          width: 100,
          align: "center",
          key: "GBJB",
        },
        {
          title: "检查机关",
          width: 100,
          align: "center",
          key: "JCJG",
        },
        {
          title: "纳税人名称",
          width: 100,
          align: "center",
          key: "NSRMC",
        },
        {
          title: "统一社会信用代码",
          width: 100,
          align: "center",
          key: "SHXYDM",
        },
        {
          title: "纳税人识别号",
          width: 100,
          align: "center",
          key: "NSRSBH",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ZZJGDM",
        },
        {
          title: "注册地址",
          width: 100,
          align: "center",
          key: "ZCDZ",
        },
        {
          title: "法定代表人姓名",
          width: 100,
          align: "center",
          key: "FDDBRXM",
        },
        {
          title: "法定代表人性别",
          width: 100,
          align: "center",
          key: "FDDBRXB",
        },
        {
          title: "法定代表人证件名称",
          width: 100,
          align: "center",
          key: "FDDBRZJMC",
        },
        {
          title: "法定代表人证件号码",
          width: 100,
          align: "center",
          key: "FDDBRZJHM",
        },
        {
          title: "财务负责人姓名",
          width: 100,
          align: "center",
          key: "CWFZRXM",
        },
        {
          title: "财务负责人性别",
          width: 100,
          align: "center",
          key: "CWFZRXB",
        },
        {
          title: "财务负责人证件名称",
          width: 100,
          align: "center",
          key: "CWFZRZJMC",
        },
        {
          title: "财务负责人证件号码",
          width: 100,
          align: "center",
          key: "CWFZRZJHM",
        },
        {
          title: "负有直接责任的中介结构信息及从业人员信息",
          width: 150,
          align: "center",
          key: "ZJFZJJXX",
        },
        {
          title: "案件性质",
          width: 100,
          align: "center",
          key: "AJXZ",
        },
        {
          title: "主要违法事实",
          width: 100,
          align: "center",
          key: "ZYWFSS",
        },
        {
          title: "相关法律依据及税务处理处罚情况",
          width: 100,
          align: "center",
          key: "CFQKJYJ",
        },
        {
          title: "查补税款",
          width: 100,
          align: "center",
          key: "CBSK",
        },
        {
          title: "加收滞纳金",
          width: 100,
          align: "center",
          key: "JSZNJ",
        },
        {
          title: "罚款",
          width: 100,
          align: "center",
          key: "FK",
        },
        {
          title: "税款、滞纳金、罚款是否全部缴清",
          width: 100,
          align: "center",
          key: "SFJQ",
        },
        {
          title: "撤出原因",
          width: 100,
          align: "center",
          key: "CCYY",
        },
        {
          title: "原录入日期",
          width: 100,
          align: "center",
          key: "LRRQ",
        },
        {
          title: "省级税务机关简称",
          width: 100,
          align: "center",
          key: "SJSWJGJC",
        },
      ],
      SgsZdsswfajxxZb: [
        //双公示重大税收违法案件信息
        {
          title: "纳税人名称",
          width: 100,
          align: "center",
          key: "NSRMC",
        },
        {
          title: "组织机构代码",
          width: 100,
          align: "center",
          key: "ZZJG_DM",
        },
        {
          title: "法定代表人/负责人姓名",
          width: 100,
          align: "center",
          key: "FDDBRHFZRXM",
        },
        {
          title: "法定代表人/负责人性别",
          align: "center",
          width: 150,
          key: "FDDBRHFZRXB",
        },
        {
          title: "法定代表人/负责人证件名称",
          align: "center",
          width: 150,
          key: "FDDBRHFZRZJMC",
        },
        {
          title: "法定代表人/负责人证件号码",
          width: 100,
          align: "center",
          key: "FDDBRHFZRZJHM",
        },
        {
          title: "负有直接责任的财务负责人姓名",
          width: 100,
          align: "center",
          key: "FYZJZRCWFZRXM",
        },
        {
          title: "负有直接责任的财务负责人性别",
          width: 100,
          align: "center",
          key: "FYZJZRCWFZRXB",
        },
        {
          title: "负有直接责任的财务负责人证件名称",
          width: 100,
          align: "center",
          key: "FYZJZRCWFZRZJMC",
        },
        {
          title: "负有直接责任的财务负责人证件号码",
          width: 150,
          align: "center",
          key: "FYZJZRCWFZRZJHM",
        },
        {
          title: "负有直接责任的中介机构信息及其从业人员信息",
          width: 150,
          align: "center",
          key: "FYZJZRZJJGXX",
        },
        {
          title: "案件性质",
          width: 100,
          align: "center",
          key: "AJXZ",
        },
        {
          title: "主要违法事实",
          width: 100,
          align: "center",
          key: "ZYWFSS",
        },
        {
          title: "相关法律依据及税务处理处罚情况",
          align: "center",
          width: 120,
          key: "XGFYJJSWCLCFQK",
        },
        {
          title: "纳税人识别号",
          width: 100,
          align: "center",
          key: "NSRSBH",
        },
        {
          title: "注册地址",
          width: 100,
          align: "center",
          key: "ZCDZ",
        },
      ],
      shehuiBxdj: [
        //社会保险登记
        {
          title: "企业编号",
          width: 100,
          align: "center",
          key: "qybh",
        },
        {
          title: "企业名称",
          align: "center",
          key: "qymc",
        },
        {
          title: "统一社会信用代码",
          align: "center",
          key: "tyxydm",
        },
        {
          title: "企业注册地址",
          align: "center",
          key: "qyzcdz",
        },
        {
          title: "登记事由",
          width: 100,
          align: "center",
          key: "djsy",
        },
        {
          title: "登记日期",
          width: 100,
          align: "center",
          key: "djrq",
        },
        {
          title: "登记单位",
          width: 100,
          align: "center",
          key: "djdw",
        },
      ],
      shehuiBxfdzs: [
        //社会保险费的征收
        {
          title: "企业编号",
          width: 100,
          align: "center",
          key: "qybh",
        },
        {
          title: "企业名称",
          align: "center",
          key: "qymc",
        },
        {
          title: "企业注册地址",
          width: 100,
          align: "center",
          key: "qyzcdz",
        },
        {
          title: "征收事由",
          width: 100,
          align: "center",
          key: "zssy",
        },
        {
          title: "征收日期",
          width: 100,
          align: "center",
          key: "zsrq",
        },
        {
          title: "征收单位",
          width: 100,
          align: "center",
          key: "zsdw",
        },
      ],
    };
  },
  mounted() {
    // this.$refs.comIncome.drawLine(this.$refs.comIncome.elem);
    // this.radarMap().then(res => {
    //   console.log(res);
    //   //雷达图
    //   this.comIncome.radar.indicator = res.indicator;
    //   if (res.qy && res.qy.length == 0) {
    //     this.comIncome.series[0].data[0].value = [0, 0, 0, 0, 0];
    //   } else {
    //     this.comIncome.series[0].data[0].value = res.qy;
    //   }
    //   if (res.hy && res.hy.length == 0) {
    //     this.comIncome.series[0].data[1].value = [0, 0, 0, 0, 0];
    //   } else {
    //     this.comIncome.series[0].data[1].value = res.hy;
    //   }
    //   this.comIncome.series[0].data[0].name = res.name[1];
    //   this.comIncome.series[0].data[1].name = res.name[0];
    //   if (res.name.length == 2) {
    //     this.comIncome.legend.data = res.name;
    //   } else {
    //     this.comIncome.legend.data = ["企业", "平台"];
    //   }
    //   this.$refs.comIncome.drawLine(this.$refs.comIncome.elem);
    // });
  },
  methods: {
    exportWord(num) {
      if (num == 1) {
        this.getPdf("baseMessage", "baseMessage");
      } else if (num == 2) {
        this.getPdf("shebaoMessage", "shebaoMessage");
      } else if (num == 3) {
        this.getPdf("shipinMessage", "shipinMessage");
      } else if (num == 4) {
        this.getPdf("shuiwuMessage", "shuiwuMessage");
      } else if (num == 5) {
        this.getPdf("sifaMessage", "sifaMessage");
      } else if (num == 6) {
        this.getPdf("waterMessage", "waterMessage");
      }
    },
    esc() {
      this.$parent.isReportShow = false;
      // console.log(this.data);
    },
    status(zt) {
      if (zt == 0) {
        return "正常";
      } else if (zt == 1) {
        return "撤销";
      } else if (zt == 2) {
        return "异议";
      } else if (zt == 3) {
        return "其他";
      }
    },
    radarMap() {
      ///雷达图
      return new Promise((resolve) => {
        let maxnum = this.comIncome.radar.indicator;
        let name = ["行业", "企业"];
        let qy = this.comIncome.series[0].data[0].value;
        let hy = this.comIncome.series[0].data[1].value;
        if (this.data[4].maxindex != null) {
          maxnum[0].max = this.data[4].maxindex.essential;
          maxnum[1].max = this.data[4].maxindex.growth;
          maxnum[2].max = this.data[4].maxindex.solvency;
          maxnum[3].max = this.data[4].maxindex.operating;
          maxnum[4].max = this.data[4].maxindex.enterprise;
        }
        //   // series
        if (this.data[4].comFiveScore != null) {
          qy[0] = this.data[4].comFiveScore.essential;
          qy[1] = this.data[4].comFiveScore.growth;
          qy[2] = this.data[4].comFiveScore.solvency;
          qy[3] = this.data[4].comFiveScore.operating;
          qy[4] = this.data[4].comFiveScore.enterprise;
        }
        if (this.data[4].industry != null) {
          hy[0] = this.data[4].industry.essential;
          hy[1] = this.data[4].industry.growth;
          hy[2] = this.data[4].industry.solvency;
          hy[3] = this.data[4].industry.operating;
          hy[4] = this.data[4].industry.enterprise;
        } else {
          hy = null;
        }

        let dataList1 = {
          qy: qy,
          hy: hy,
          indicator: maxnum,
          name: name,
        };
        resolve(dataList1);
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

<style scoped>
@import '../../assets/styles/report.scss';
.esc {
  position: fixed;
  top: 0;
  right: 0;
  padding: 20px;
  color: #fff;
  
  
}

/* .report_cont {
  width: 80%;
} */
.report {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.report_cont {
  width: 80%;
  height: 100%;
  margin: 0 auto;
  overflow: scroll;
  background: #fff;
}
.page {
  padding: 30px 40px;
  border: 1px solid #e6e6e6;
}
.page .companyNameTitle {
  font-weight: bold;
  font-size: 18px;
  line-height: 60px;
  text-align: center;
}
.page_score table tr td:nth-child(1) {
  width: 60px;
  text-align: center;
}
.page_score table tr td:nth-child(2) {
  width: 60px;
}
.page_score table tr td:nth-child(3) {
  width: 200px;
}
.table1 {
  width: 100%;
}

/* .table1 tr td {
  box-sizing: border-box;
  height: 40px;
  padding: 0 10px;
  line-height: 40px;
  border: 1px solid #ccc;
} */
.table1 .td_title {
  width: 200px;
}
.table1 .td_cont {
  width: 80%;
}
.table1 .last_cont {
  display: inline-block;
  width: 100%;
  height: 252px;
  overflow-y: scroll;
}
.hide {
  display: inline-block;
  overflow: hidden;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.list {
  margin-top: 20px;
}
.list ul .w20 b,
.list ul .w20 span {
  width: 20%;
}
.lib,
.lispan {
  width: 13%;
}
.list ul li span.nobr {
  overflow: hidden;
  white-space: normal;
  text-align: left;
  text-overflow: ellipsis;
}
.list ul li span:last-child,
.list ul li b:last-child {
  border-right: none;
}
.list ul {
  width: 100%;
  border: 1px solid #ccc;
}
.list ul li {
  clear: both;
  height: 40px;
  border-bottom: 1px solid #ccc;
}
.list ul li:last-child {
  border-bottom: none;
}
.list ul li.first {
  padding: 0;
}

.list ul li:nth-child(even) {
  background: #e0e0e0;
}

/* .list ul li span,
.list ul li b {
  display: flex;
  align-items: center;
  justify-content: center;
  float: left;
  box-sizing: border-box;
  width: 10%;
  height: 40px;
  padding: 0 5px;
  text-align: center;
  border-right: 1px solid #ccc;
} */

ul li span.w25,
ul li b.w25 {
  display: inline-block;
  width: 25%;
  line-height: 40px;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.tableTitle strong {
  display: inline-block;
  width: 100%;
  font-weight: bolder;
  line-height: 40px;
  text-indent: 10px;
}
ul li span.w18,
ul li b.w18 {
  width: 18%;
}
ul li span.w16,
ul li b.w16 {
  width: 16%;
}
ul li span.w15,
ul li b.w15 {
  width: 15%;
}

/* .list ul li .w20,
.list ul li .w20 {
  width: 20%;
} */
.center {
  width: 300px;
  margin: 10px auto;
  overflow: hidden;
}

.companyBaseInfo,
.dl {
  padding-top: 20px;
}
.companyBaseInfo p,
.dl p,
.line p {
  padding-top: 20px;
  padding-bottom: 20px;
  line-height: 30px;
  text-align: justify;
  text-indent: 2em;
  text-justify: inter-ideograph;
}
.exportWord {
  margin-bottom: 40px;
  margin-left: 90%;
}
</style>
