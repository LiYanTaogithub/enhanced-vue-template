<template>
  <div>
    <el-form
      ref="elForm"
      :model="formData"
      :rules="rules"
      size="medium"
      label-width="140px"
    >
      <el-form-item label="快贷产品名称" prop="field101">
        <el-input
          v-model="formData.field101"
          placeholder="请输入快贷产品名称"
          clearable
          :style="{ width: '100%' }"
        />
      </el-form-item>
      <el-form-item label="快贷产品URL地址" prop="field102">
        <el-input
          v-model="formData.field102"
          placeholder="请输入快贷产品URL地址"
          clearable
          :style="{ width: '100%' }"
        />
      </el-form-item>
      <el-form-item size="large">
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  props: [],
  data() {
    return {
      formData: {
        field101: undefined,
        field102: undefined,
      },
      rules: {
        field101: [
          {
            required: true,
            message: "请输入快贷产品名称",
            trigger: "blur",
          },
        ],
        field102: [
          {
            required: true,
            message: "请输入快贷产品URL地址",
            trigger: "blur",
          },
        ],
      },
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    submitForm() {
      this.$refs["elForm"].validate((valid) => {
        if (!valid) return;
        // TODO 提交表单
      });
    },
    resetForm() {
      this.$refs["elForm"].resetFields();
    },
  },
};
</script>
