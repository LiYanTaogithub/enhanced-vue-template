<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">融资申请管理 / 非快贷产品申请列表</div>
    </div>
    <div class="searchContainer">
      <el-form ref="elForm" :model="formData" size="medium" label-width="100px">
        <el-form-item label="名称">
          <el-input
            v-model="formData.name"
            placeholder="请输入产品名称或企业名称"
            clearable
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查找</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="productList" @selection-change="handleSelectionChange">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="订单编号" align="center" prop="code">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px; color: #1890ff; cursor: pointer"
            @click="handlebtn(scope.row)"
            >{{ scope.row.code }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="企业名称" align="center" prop="entName" />
      <el-table-column label="产品名称" align="center" prop="productName" />
      <el-table-column label="贷款利率" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.loanRate }}%</span>
        </template>
      </el-table-column>
      <el-table-column label="贷款额度" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.loanAmount }}万</span>
        </template>
      </el-table-column>
      <el-table-column label="贷款期限" align="center" prop="loanLimit">
      </el-table-column>
      <el-table-column label="地区" align="center" prop="entArea" />
      <el-table-column label="信用评分" align="center" prop="score" />
      <el-table-column label="订单状态" align="center" prop="statusTxt">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.status === '10050'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleClaim(scope.row)"
            >审核</el-button
          >
          <el-button
            v-if="scope.row.status === '10100'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleLoan(scope.row)"
            >放款完成</el-button
          >
          <el-button
            v-if="scope.row.status === '10110' || scope.row.status === '10120'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleLoanStatus(scope.row)"
            >还款状态标注</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page.sync="pageNum"
      :page-size="pageSize"
      layout="total, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
    />
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
</template>
<script>
import {
  getfinanceList,
  financeloanAuditSubmit,
  financeLoanFinish,
  financeloanStatusUpdate,
} from "@/api/bank/index.js";
export default {
  name: "MyFinacialProducts",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      pageNum: 1,
      pageSize: 10,
      // 银行金融产品表格数据
      productList: [
        // {
        //   id: "123131313141",
        //   entName: "北京XXX有限公司",
        //   loanRate: 5,
        //   loanAmount: 100,
        //   loanLimit: "1-12月",
        //   scope: "北京市",
        //   score: 9,
        //   status: "审核",
        // },
      ],
      formData: {
        name: "",
        type: "2",
      },
      loanFinishData: {
        orderId: "",
        amount: null,
        limit: null,
        rate: null,
        type: 2,
      },
      loanStatusUpdate: {
        orderId: "",
        // dateStr: "",
        // orderStatus: "",
        status: "",
      },
      rules: {
        entName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur",
          },
        ],
      },
      statusOptions: [
        // {
        //   label: '全部',
        //   value: ''
        // },
        {
          label: "审核中",
          value: "1",
        },
        {
          label: "启用",
          value: "2",
        },
        {
          label: "停用",
          value: "3",
        },
        {
          label: "审核未通过",
          value: "4",
        },
      ],
      isshow: false,
      auditResult: "",
      type: "审核",
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
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
    // 分页功能
    onCurrentChange(val) {
      this.pageNum = val;
      this.getList();
    },
    onSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getList();
    },
    async getList() {
      this.loading = true;
      const res = await getfinanceList({
        ...this.formData,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.productList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    // 表单重置
    resetForm() {
      this.formData = {
        name: "",
        type: "2",
      };
      this.getList();
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },

    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id);
      this.single = selection.length !== 1;
      this.multiple = !selection.length;
    },
    // 详情
    handlebtn(row) {
      this.$router.push({
        path: "application-detail",
        query: {
          id: row.id,
          type: 2,
        },
      });
    },
    // 审核
    async applyFinace() {
      let res = await financeloanAuditSubmit({
        orderId: this.optionId,
        result: this.auditResult,
        refuseReasonType: this.refuseReasonType,
        refuseReason: this.refuseReason,
      });
      if (res.code === 200) {
        this.isshow = false;
        this.$message.success("操作成功");
        this.getList();
      }
    },
    // 放款完成
    async loanFinish() {
      let res = await financeLoanFinish(this.loanFinishData);
      if (res.code === 200) {
        this.isshow = false;
        this.$message.success("操作成功");
        this.getList();
      }
    },
    // 放款状态标注
    async loanStatusUpdates() {
      let res = await financeloanStatusUpdate(this.loanStatusUpdate);
      if (res.code === 200) {
        this.isshow = false;
        this.$message.success("操作成功");
        this.getList();
      }
    },
    handleClaim(row) {
      this.isshow = true;
      this.type = "审核";
      this.optionId = row.id;
    },
    handleLoan(row) {
      this.isshow = true;
      this.type = "放款完成";
      this.loanFinishData.orderId = row.id;
    },
    handleLoanStatus(row) {
      this.isshow = true;
      this.type = "还款状态标注";
      this.loanStatusUpdate.orderId = row.id;
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
.searchContainer {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin: 20px 0;
  .el-form {
    display: flex;
    justify-content: flex-end;
    width: 100%;
    .el-form-item {
      margin: 20px 10px;
    }
  }
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
