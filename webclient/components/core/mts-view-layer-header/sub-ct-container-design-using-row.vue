/* Single instance component names Components that should only ever have a single active instance
should begin with the The prefix, to denote that there can be only one. Ref:
https://vuejs.org/v2/style-guide/#Single-instance-component-names-strongly-recommended */

<template>
  <el-row id="TheMultiStateDisplayAreaHeader" type="grid" align="middle">
    <el-col :span="6" class="ml-2" style="display: flex; align-items: center">
      <span style="font-size: 20px"><ctName form-type="embedded"></ctName></span>
      <span style="font-size: 14px; margin-left: 6px"><ctAge></ctAge></span>
    </el-col>
    <el-col :span="16">
      <ctSlider></ctSlider>
    </el-col>
    <el-col :span="2">
      <ctTogleHealthOther></ctTogleHealthOther>
    </el-col>
  </el-row>
</template>

<script>
import ctName from '@/components/ptinfo-single/1time-1row-mField/name/view-layer/privacy-protected-name.vue'
import ctAge from '@/components/ptinfo-single/1time-1row-mField/date-of-birth/view-layer/age.vue'
import ctSlider from './time-series-of-appointments-component.vue'
import ctTogleHealthOther from './toggle-health-other-component.vue'

export default {
  components: { ctName, ctAge, ctTogleHealthOther, ctSlider },
}
</script>

<style scoped>
#TheMultiStateDisplayAreaHeader {
  height: 30px;
  margin-bottom: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
