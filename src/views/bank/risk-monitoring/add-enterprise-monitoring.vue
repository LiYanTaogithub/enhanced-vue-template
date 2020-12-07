<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">风险监控</div>
    </div>

    <div class="searchContainer">
      <el-button type="primary" style="height: 40px" @click="isshow = true"
        >添加监控企业</el-button
      >
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
          <span style="margin-left: 10px; color: #1890ff; cursor: pointer">{{
            scope.row.entCode
          }}</span>
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
      <el-table-column fixed="right" label="操作">
        <template slot-scope="scope">
          <el-button
            @click="removeMonitoring(scope.row)"
            type="text"
            size="small"
            >移除监控企业</el-button
          >
          <el-button type="text" size="small" @click="viewdetails(scope.row)"
            >查看详情</el-button
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
      title="添加企业"
      :visible.sync="isshow"
      width="600px"
      font-size="15px"
    >
      <div>
        <el-form
          ref="entName"
          label-position="right"
          :rules="rules"
          label-width="100px"
        >
          <el-form-item label="企业名称:" prop="amount">
            <el-input
              v-model="entName"
              placeholder="请输入企业名称"
              @input="getEntNameDebounce"
              clearable
              :style="{ width: '100%' }"
            />
          </el-form-item>
          <div
            v-for="item in nameList"
            :key="item.name"
            class="namelist"
            @click="entName = item.name"
          >
            {{ item.name }}
          </div>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button @click="isshow = false">取 消</el-button>
        <el-button type="primary" @click="addEnt('formData')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import {
  riskList,
  addRisk,
  tipEntName,
  removeEntMonitoring,
} from "@/api/bank/index.js";
import debounce from "@/utils/debounce.js";
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
      entName: "",
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
      optionId: "",
      orderStatus: "",
      repaymentDate: "",
      repaymentStatus: "",
      nameList: [],
    };
  },
  created() {
    this.getList();
  },
  methods: {
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
      const res = await riskList({
        pageSize: this.pageSize,
        pageNum: this.pageNum,
        ...this.formData,
        type: "2",
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
    // 查看企业详情
    viewdetails(row) {
      this.$router.push({
        path: "risk-monitoring-detail",
        query: {
          name: row.entName,
          type: "添加",
        },
      });
    },
    getEntNameDebounce: debounce(async function (val) {
      console.log(val);
      let res = await tipEntName(val);
      console.log(res);
      this.nameList = res.data;
    }, 200),
    // 添加企业监控
    async addEnt() {
      if (this.entName === "") {
        this.$message.error("请输入企业名称");
        return false;
      }
      let res = await addRisk(this.entName);
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.isshow = false;
        this.nameList = [];
        this.entName = "";
        this.getList();
      }
    },
    // 移除企业监控
    removeMonitoring(row) {
      this.$confirm("确定移除企业后，平台不再监控该企业的风险", "移除企业", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        this.removeMonitoringhandle(row);
      });
    },
    async removeMonitoringhandle(row) {
      let res = await removeEntMonitoring(row.entName);
      if (res.code === 200) {
        this.$message.success(res.msg);
        this.getList();
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
.namelist {
  margin-left: 100px;
  padding: 10px;
  border-bottom: #eee solid 1px;
  cursor: pointer;
}
</style>
