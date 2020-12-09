<template>
  <div>
    <el-cascader
      size="large"
      style="width: 100%"
      :options="options"
      v-model="value"
      :props="{checkStrictly: true, multiple:multiple}"
      ref="regionLabel"
      @change="handleChange">
    </el-cascader>
  </div>   
</template>
<script>
import { 
  regionData, 
  } from 'element-china-area-data'
export default {
  name: 'ChainArea',
  props:{
    value:{
      type: Array,
      default: () =>[]
    },
    multiple: {
      type: Boolean,
      default: false
    }
  },
  data () {
      return {
        options: regionData,
        regionLabel: [],
      }
    },

    methods: {
      handleChange (value) {
        console.log(value)
        console.log(this.$refs['regionLabel'].getCheckedNodes())
        this.regionLabel = [] 
        let regionLabelArr = this.$refs['regionLabel'].getCheckedNodes()
        regionLabelArr.map( (item, index) => {
          this.regionLabel.push(item.pathLabels)
        })
        console.log('handleChangeregionLabel',this.regionLabel)
        this.$emit('changeValue',value, this.regionLabel.join(';'))
      },
    }
}
</script>