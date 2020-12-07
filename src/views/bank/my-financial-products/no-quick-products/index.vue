<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">我的金融产品</div>
    </div>
    <div class="searchContainer">
      <el-button type="primary" @click="handleAdd">添加</el-button>
      <el-form
        ref="elForm"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="100px"
      >
        <el-form-item label="产品状态">
          <el-select v-model="formData.status" placeholder="请选择" clearable>
            <el-option
              v-for="(item, index) in statusOptions"
              :key="index"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品名称">
          <el-input
            v-model="formData.name"
            placeholder="请输入"
            clearable
            style="width: 300px"
          />
        </el-form-item>
        <el-form-item size="large">
          <el-button type="primary" @click="handleQuery">查找</el-button>
          <el-button @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="productList">
      <!-- <el-table-column type="selection" width="55" align="center" /> -->
      <el-table-column label="产品编号" align="center" prop="code">
        <template slot-scope="scope">
          <span
            style="margin-left: 10px; color: #1890ff; cursor: pointer"
            @click="handlebtn(scope.row)"
            >{{ scope.row.code }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="产品名称" align="center" prop="name" />
      <el-table-column label="利率范围" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            >{{ scope.row.rateStart }}-{{ scope.row.rateEnd }}%</span
          >
        </template>
      </el-table-column>
      <el-table-column label="贷款额度" align="center">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            >{{ scope.row.amountStart }}-{{ scope.row.amountEnd }}万</span
          >
        </template>
      </el-table-column>
      <el-table-column label="贷款期限" align="center" prop="limitStart">
        <template slot-scope="scope">
          <span style="margin-left: 10px"
            >{{ scope.row.limitStart }}-{{ scope.row.limitEnd }}月</span
          >
        </template>
      </el-table-column>
      <el-table-column label="产品状态" align="center" prop="statusTxt">
        <!-- <template slot-scope="scope">
          <span v-if="scope.row.status === '1'" style="margin-left: 10px"
            >审核中</span
          >
          <span v-if="scope.row.status === '2'" style="margin-left: 10px"
            >启用</span
          >
          <span v-if="scope.row.status === '3'" style="margin-left: 10px"
            >停用</span
          >
          <span v-if="scope.row.status === '4'" style="margin-left: 10px"
            >审核未通过</span
          >
        </template> -->
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope" v-if="scope.row.flag === '1'">
          <el-button
            v-if="
              scope.row.status !== '1' &&
              scope.row.status !== '3' &&
              scope.row.status !== '4'
            "
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleStop(scope.row)"
            >停用</el-button
          >
          <el-button
            v-if="scope.row.status === '3'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUsing(scope.row)"
            >启用</el-button
          >
          <el-button
            v-if="scope.row.status !== '1'"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            >修改</el-button
          >
          <el-button
            v-if="scope.row.status !== '1'"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            >删除</el-button
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
import {
  getProductList,
  deleteProducts,
  disableProducts,
  UsingProduct,
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
      productList: [],
      formData: {
        status: "",
        name: "",
      },
      rules: {
        status: [
          {
            required: true,
            message: "请选择产品状态",
            trigger: "change",
          },
        ],
        name: [
          {
            required: true,
            message: "请输入产品名称",
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
    /** 查询银行金融产品列表 */
    async getList() {
      this.loading = true;
      const res = await getProductList({
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
        status: "",
        name: "",
      };
      this.getList();
    },
    handleAdd() {
      this.$router.push({
        path: "products-info",
        query: {
          type: "添加",
          name: "非快贷产品",
        },
      });
    },
    handlebtn(row) {
      this.$router.push({
        path: "detail",
        query: {
          name: "非快贷产品",
          id: row.id,
        },
      });
    },
    handleUpdate(row) {
      if (row.status === "2") {
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
            this.disable(row.id);
          })
          .then(() => {
            this.$router.push({
              path: "products-info",
              query: {
                type: "修改",
                id: row.id,
                name: "非快贷产品",
              },
            });
          })
          .catch(() => {
            return false;
          });
      } else {
        this.$router.push({
          path: "products-info",
          query: {
            type: "修改",
            // productInfo: row,
            id: row.id,
            name: "非快贷产品",
          },
        });
      }
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.getList();
    },

    /** 删除按钮操作 */
    async delProduct(id) {
      // console.log(id);
      // const formdata = new FormData();
      // formdata.append("productId", id);
      // console.log(formdata.get("productId"));
      await deleteProducts(id);
    },
    handleDelete(row) {
      const id = row.id;
      this.$confirm("删除后，该产品将被彻底删除", "删除产品", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.delProduct(id);
        })
        .then(() => {
          this.getList();
        })
        .then(() => {
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    // 停用
    async disable(id) {
      // const formdata = new FormData();
      // formdata.append("productId", id);
      await disableProducts(id);
    },
    handleStop(row) {
      // const ids = row.id || this.ids
      this.$confirm("停用后该产品无法展示和办理，确认停用？", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.disable(row.id);
          this.msgSuccess("产品已停用");
        })
        .then(() => {
          this.getList();
        })
        .catch(function () {});
    },
    // 启用
    async Using(id) {
      let res = await UsingProduct(id);
      if (res.code === 200) {
        this.getList();
        this.msgSuccess("待平台审核后通过后，该产品可展示办理");
      }
    },
    handleUsing(row) {
      this.$confirm("启用产品，平台审核通过后，该产品可以展示和办理", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.Using(row.id);
        })
        .catch(function () {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        "system/product/export",
        {
          ...this.formData,
        },
        `system_product.xlsx`
      );
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
  justify-content: space-between;
  margin: 20px 0;
  .el-form {
    display: flex;
    flex-direction: row;
    .el-form-item {
      margin: 0;
    }
  }
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
