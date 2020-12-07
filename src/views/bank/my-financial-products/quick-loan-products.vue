<template>
  <div class="modelContainer">
    <div class="title">
      <div class="box" />
      <div class="text">我的金融产品 / 快贷产品管理</div>
    </div>
    <!-- <div>
      <el-button @click="swichButton">快贷产品</el-button>
      <el-button @click="buttonType = '1'">快贷产品二维码</el-button>
    </div> -->
    <el-radio-group
      v-model="buttonType"
      @change.once="onbuttonChange"
      style="margin-bottom: 20px"
    >
      <el-radio-button label="快贷产品"></el-radio-button>
      <el-radio-button label="快贷产品二维码"></el-radio-button>
    </el-radio-group>
    <div v-if="buttonType === '快贷产品'">
      <div class="searchContainer">
        <el-button type="primary" @click="handleAddProduct">添加</el-button>
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
              @click="handleDetail(scope.row)"
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
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status !== '1' && scope.row.status !== '3'"
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
              @click="handleUpdateProduct(scope.row)"
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
    <div v-if="buttonType === '快贷产品二维码'">
      <div class="searchContainer">
        <el-button type="primary" @click="handleAddQRcode">添加</el-button>
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
              placeholder="请输入快贷产品名称"
              clearable
              style="width: 300px"
            />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="handleQuery">查找</el-button>
            <el-button @click="resetForm">重置</el-button>
          </el-form-item>
        </el-form>
        <!-- <el-form
        ref="formData"
        :model="formData"
        :rules="rules"
        size="medium"
        label-width="140px"
      >
        <el-row :gutter="50">
          <el-col :span="14">
            <el-form-item label="快贷产品名称:" prop="name">
              <el-input
                v-model="formData.name"
                placeholder="请输入快贷产品名称"
                clearable
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-form-item label="快贷产品URL地址:" prop="urlAddress">
              <el-input
                v-model="formData.urlAddress"
                placeholder="请输入快贷产品URL地址"
                clearable
                :style="{ width: '100%' }"
              />
            </el-form-item>
            <el-button
              type="primary"
              style="float: right; margin-left: 10px"
              @click="saveQuickLoanProducts('formData')"
              >添加产品
            </el-button>
          </el-col>
          <el-col :span="8" style="text-align: center">
            <img
              v-show="codeUrl !== ''"
              :src="codeUrl"
              alt=""
              style="width: 300px; height: 300px; margin-top: -30px"
            />
            <div v-show="codeUrl !== ''">{{ codeName }}</div>
          </el-col>
        </el-row>
      </el-form> -->
      </div>
      <el-table :data="productList">
        <el-table-column label="快贷产品名称" align="center" prop="name" />
        <el-table-column
          label="快贷产品URL地址"
          align="center"
          prop="urlAddress"
        />
        <el-table-column
          label="状态"
          align="center"
          prop="statusTxt"
        ></el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template slot-scope="scope" v-if="scope.row.flag === '1'">
            <el-button
              v-if="scope.row.status !== '1'"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handlePreview(scope.row)"
              >预览</el-button
            >
            <el-button
              v-if="scope.row.status === '2'"
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
              v-if="scope.row.status === '3'"
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="handleUpdata(scope.row)"
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
      <el-dialog
        :title="title"
        :visible.sync="isshow"
        width="30%"
        font-size="12px"
      >
        <el-form
          ref="formData"
          label-position="right"
          :rules="rules"
          label-width="160px"
          :model="formData"
        >
          <el-form-item label="快贷产品名称:" prop="name">
            <el-input
              v-model="formData.name"
              placeholder="请输入快贷产品名称"
              clearable
              :style="{ width: '100%' }"
            />
          </el-form-item>
          <el-form-item label="快贷产品URL地址:" prop="urlAddress">
            <el-input
              v-model="formData.urlAddress"
              placeholder="请输入快贷产品URL地址"
              clearable
              :style="{ width: '100%' }"
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="isshow = false">取 消</el-button>
          <el-button type="primary" @click="submitUpdata('formData')"
            >确 定</el-button
          >
        </span>
      </el-dialog>
      <div class="QRcode" v-show="codeUrl !== ''" @click="codeUrl = ''">
        <!-- <el-button @click="codeUrl = ''"> 关闭 </el-button> -->
        <img :src="codeUrl" alt="" style="width: 200px; height: 200px" />
        <div style="padding-top: 10px; text-align: center">{{ codeName }}</div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
import {
  saveQuickProducts,
  getQuicklist,
  previewQuickProducts,
  updataQuickProducts,
  deleteProducts,
  disableProducts,
  UsingProduct,
} from "@/api/bank/index.js";
export default {
  data() {
    return {
      formData: {
        name: "",
        urlAddress: "",
      },
      buttonType: "快贷产品",
      rules: {
        name: [
          {
            required: true,
            message: "请输入快贷产品名称",
            trigger: "blur",
          },
        ],
        urlAddress: [
          {
            required: true,
            message: "请输入快贷产品URL地址",
            trigger: "blur",
          },
        ],
      },
      productList: [],
      pageNum: 1,
      pageSize: 10,
      total: 0,
      codeUrl: "",
      codeName: "",
      isshow: false,
      modifyId: "",
      title: "",
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
  mounted() {
    this.getQuickList();
  },
  methods: {
    // 分页功能
    onCurrentChange(val) {
      this.pageNum = val;
      this.getQuickList();
    },
    onSizeChange(val) {
      this.pageNum = 1;
      this.pageSize = val;
      this.getQuickList();
    },
    handleQuery() {
      this.getQuickList();
    },
    // 表单重置
    resetForm() {
      this.formData = {
        name: "",
        urlAddress: "",
      };
      this.getQuickList();
    },

    // 获取产品列表
    async getQuickList() {
      const res = await getQuicklist({
        ...this.formData,
        pageNum: this.pageNum,
        pageSize: this.pageSize,
      });
      this.productList = res.rows;
      this.total = res.total;
    },
    // 添加
    handleAddProduct() {
      this.$router.push({
        path: "products-info",
        query: {
          type: "添加",
          name: "快贷产品",
        },
      });
    },
    handleAddQRcode() {
      this.title = "添加";
      this.isshow = true;
    },
    // 详情
    handleDetail(row) {
      console.log(row);
      this.$router.push({
        path: "detail",
        query: {
          id: row.id,
          name: "快贷产品",
        },
      });
    },
    // 修改快贷产品
    handleUpdateProduct(row) {
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
                name: "快贷产品",
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
            id: row.id,
            name: "快贷产品",
          },
        });
      }
    },

    async saveQuickProducts() {
      const res = await saveQuickProducts(this.formData);
      console.log(res);
      this.formData = {
        name: "",
        urlAddress: "",
      };
      this.getQuickList();
      this.isshow = false;
    },
    // 预览
    async preview(id) {
      const formdata = new FormData();
      formdata.append("productId", id);
      const res = await previewQuickProducts(formdata);
      this.codeUrl = res.data;
    },
    handlePreview(row) {
      this.preview(row.id);
      this.codeName = row.name;
    },
    // 修改
    async updataQuickProduct() {
      await updataQuickProducts({
        id: this.modifyId,
        ...this.formData,
      });
    },
    handleUpdata(row) {
      this.title = "修改";
      this.isshow = true;
      this.modifyId = row.id;
      this.formData.name = row.name;
      this.formData.urlAddress = row.urlAddress;
    },
    submitUpdata(formData) {
      this.$refs[formData].validate((valid) => {
        if (valid) {
          if (this.title === "修改") {
            this.updataQuickProduct();
            this.isshow = false;
            this.$message.success("产品修改已完成，启用产品后才能查看和办理");
            this.formData = {
              name: "",
              urlAddress: "",
            };
            this.getQuickList();
          } else {
            this.saveQuickProducts();
          }
        } else {
          return false;
        }
      });
    },
    // 删除
    async delProduct(id) {
      console.log(id);
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
          this.getQuickList();
        })
        .then(() => {
          this.msgSuccess("删除成功");
        })
        .catch(function () {});
    },
    // 停用
    async disable(id) {
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
          this.getQuickList();
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
  },
};
</script>
<style lang="scss" scoped>
.modelContainer {
  position: relative;
  height: 100%;
  margin: 10px;
  padding: 30px;
  background: #fff;
}
.QRcode {
  position: absolute;
  top: 200px;
  right: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;
  background: #eee;
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
.el-row {
  width: 100%;
}
.el-pagination {
  display: flex;
  justify-content: flex-end;
}
</style>
