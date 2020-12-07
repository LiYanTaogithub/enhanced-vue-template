<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">融资超市</div>
    </div>
    <div class="searchContainer">
      <el-form ref="elForm" :model="formData" size="medium" label-width="100px">
        <el-form-item label="贷款金额">
          <el-input
            v-model="formData.loanAmountStart"
            placeholder="请输入"
            clearable
            style="width: 130px"
          />
          ~
          <el-input
            v-model="formData.loanAmountEnd"
            placeholder="请输入"
            clearable
            style="width: 130px"
          />万
        </el-form-item>
        <el-form-item label="利率">
          <el-input
            v-model="formData.loanRateStart"
            placeholder="请输入"
            clearable
            style="width: 130px"
          />
          ~
          <el-input
            v-model="formData.loanRateEnd"
            placeholder="请输入"
            clearable
            style="width: 130px"
          />%
        </el-form-item>
        <el-form-item label="贷款期限">
          <el-input
            v-model="formData.loanLimitStart"
            placeholder="请输入"
            clearable
            style="width: 130px"
          />
          ~
          <el-input
            v-model="formData.loanLimitEnd"
            placeholder="请输入"
            clearable
            style="width: 130px"
          />月
        </el-form-item>
        <el-form-item label="企业名称">
          <el-input
            v-model="formData.entName"
            placeholder="请输入"
            clearable
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item label="地区">
          <el-select
            v-model="formData.scope"
            placeholder="请选择"
            clearable
            style="width: 300px"
          >
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="信用评分">
          <el-select
            v-model="formData.score"
            placeholder="请选择"
            clearable
            style="width: 300px"
          >
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="handleQuery">查找</el-button>
          <el-button @click="resetForm">重置</el-button>
          <!-- <el-button @click="toReport">报告模板</el-button> -->
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
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.loanLimit }}月</span>
        </template>
      </el-table-column>
      <el-table-column
        label="地区"
        align="center"
        prop="productApplyScopeTxt"
      />
      <el-table-column label="信用评分" align="center" prop="score" />
      <el-table-column
        label="已认领机构数"
        align="center"
        prop="applyAccount"
      />
      <el-table-column label="订单状态" align="center" prop="statusTxt">
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="text" @click="handleClaim(scope.row)"
            >认领</el-button
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
  </div>
</template>
<script>
import { getMarketlist, applyFinace } from "@/api/bank/index.js";
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
      productList: [],
      reporShow: false,
      formData: {
        entName: "",
        loanAmountStart: "",
        loanAmountEnd: "",
        loanLimitEnd: "",
        loanLimitStart: "",
        loanRateStart: "",
        loanRateEnd: "",
        scope: "",
        score: "",
      },
      rules: {
        entName: [
          {
            required: true,
            message: "请输入企业名称",
            trigger: "blur",
          },
        ],
        loanAmountStart: [
          {
            required: true,
            message: "请输入贷款金额起始金额",
            trigger: "change",
          },
        ],
        loanAmountEnd: [
          {
            required: true,
            message: "请输入贷款金额结束金额	",
            trigger: "change",
          },
        ],
        loanLimitStart: [
          {
            required: true,
            message: "请输入贷款期限起始金额",
            trigger: "change",
          },
        ],
        loanLimitEnd: [
          {
            required: true,
            message: "请输入贷款期限结束金额",
            trigger: "change",
          },
        ],
        loanRateStart: [
          {
            required: true,
            message: "请输入贷款起始利率",
            trigger: "change",
          },
        ],
        loanRateEnd: [
          {
            required: true,
            message: "请输入贷款结束利率",
            trigger: "change",
          },
        ],
        scope: [
          {
            required: true,
            message: "请选择地区",
            trigger: "change",
          },
        ],
        score: [
          {
            required: true,
            message: "请选择信用得分",
            trigger: "change",
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
    };
  },
  created() {
    this.getList();
  },
  methods: {
    toReport() {
      this.$router.push("/report");
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
      const res = await getMarketlist({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        ...this.formData,
      });
      this.productList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    // 表单重置
    resetForm() {
      this.formData = {
        entName: "",
        loanAmountStart: "",
        loanAmountEnd: "",
        loanLimitEnd: "",
        loanLimitStart: "",
        loanRateStart: "",
        loanRateEnd: "",
        scope: "",
        score: "",
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
    handlebtn(row) {
      this.$router.push({
        path: "supermarket-detail",
        query: {
          id: row.id,
        },
      });
    },
    // 认领
    async applyFinace(id) {
      await applyFinace(id);
      this.getList();
    },
    handleClaim(row) {
      const id = row.id;
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
        })
        .catch(function () {});
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
  // display: flex;
  // flex-direction: row;
  // justify-content: space-between;

  margin: 20px 0;
  .el-form {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
    .el-form-item {
      width: 33%;
      margin: 20px 0;
    }
  }
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
