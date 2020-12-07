<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">风险监控</div>
    </div>
    <div class="searchContainer">
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="企业名称">
          <el-input
            v-model="formData.entName"
            placeholder="请输入企业名称"
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
      <el-table-column label="企业编号" align="center" prop="entCode">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px; color: #1890ff; cursor: pointer"
            @click="handlebtn(scope.row)"
            >{{ scope.row.entCode }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="企业名称" align="center" prop="entName" />
      <el-table-column label="重大事项变更" align="center" prop="majorChange" />
      <el-table-column label="司法风险" align="legalRisk" />
      <el-table-column label="经营风险" align="center" prop="managementRisk">
      </el-table-column>
      <el-table-column
        label="财务&经营风险"
        align="center"
        prop="financialOperationRisk"
      />
      <el-table-column
        label="用电数据风险"
        align="center"
        prop="electricityDataRisk"
      />
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
import { riskList } from "@/api/bank/index.js";
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
      formData: {
        entName: "",
      },
      loanFinishData: {
        orderId: "",
        amount: null,
        limit: null,
        rate: null,
      },
      loanStatusUpdate: {
        orderId: "",
        dateStr: "",
        orderStatus: "",
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
    // 获取列表页
    async getList() {
      this.loading = true;
      const res = await riskList({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        ...this.formData,
        type: "1",
      });
      this.productList = res.rows;
      this.total = res.total;
      this.loading = false;
    },
    // 表单重置
    resetForm() {
      this.formData = {
        entName: "",
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
        path: "risk-monitoring-detail",
        query: {
          name: row.entName,
          type: "融资",
        },
      });
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
