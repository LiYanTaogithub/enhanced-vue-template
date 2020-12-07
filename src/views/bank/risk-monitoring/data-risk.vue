<template>
  <div>
    <el-row>
      <el-col :span="3" class="datelist">
        <div
          v-for="(item, index) in electricityRiskData"
          :key="item.dimension"
          class="date-item"
          @click="handleClick(index)"
          :class="{ active: currentIndex === index }"
        >
          {{ item.dimension }}
        </div>
      </el-col>
      <el-col :span="20">
        <div style="display: flex; flex-direction: row">
          <div class="box">
            <div class="redbox"></div>
            <div style="color: red">红色预警</div>
          </div>
          <div class="box">
            <div class="yellowbox"></div>
            <div style="color: orange">黄色预警</div>
          </div>
          <div class="box">
            <div class="greywbox"></div>
            <div style="color: grey">数据缺失</div>
          </div>
        </div>
        <!-- <el-table :data="electricityRiskTableData" border style="width: 100%">
          <el-table-column
            v-for="item in electricityRiskTableData"
            :prop="item.value"
            :label="item.name"
            :key="item.name"
          >
          </el-table-column>
        </el-table> -->
        <div class="electricityBox">
          <div
            v-for="item in electricityRiskTableData"
            :key="item.name"
            class="electricityItem"
          >
            <span>{{ item.name }} : {{ item.value }}</span>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "operationRisk",
  props: {
    electricityRiskData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      electricityRiskTableData: [],
      currentIndex: "",
    };
  },
  mounted() {
    this.electricityRiskTableData = this.electricityRiskData[0].data;
  },
  methods: {
    handleClick(index) {
      this.currentIndex = index;
      this.electricityRiskTableData = this.electricityRiskData[index].data;
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 30px;
  margin-right: 50px;
  margin-bottom: 30px;
  margin-left: 20px;
}
.redbox {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: red;
}
.yellowbox {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: orange;
}
.greywbox {
  width: 20px;
  height: 20px;
  margin-right: 5px;
  background: grey;
}
.date-item {
  margin: 20px;
  cursor: pointer;
}
.datelist {
  height: 400px;
  overflow: hidden;
  overflow-y: auto;
}
.active {
  color: #057af3;
}
.electricityBox {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 20px;
}
.electricityItem {
  width: 30%;
  height: 50px;
  //   margin-bottom: 20px;
  //   background: #eee;
}
</style>
