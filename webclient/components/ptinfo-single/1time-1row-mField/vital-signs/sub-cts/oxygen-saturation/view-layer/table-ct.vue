<!-- Master doc is at reference implementation name/view-layer/table-ct.vue. This file has doc unique to this ct 
Code synced with ref implementation on 4th august 2020
 -->
<template>
  <div>
    <h5 v-if="formType === 'stand-alone'">Oxygen saturation</h5>
    <el-button
      :type="mfTypeOfButton('oxygenSaturationInSpo2')"
      plain
      :tabindex="cfPosInArCardsInPtsOfVl * 100 + 1"
      size="small"
      >{{ cfLatestDataRowFromClientSideTable['oxygenSaturationInSpo2'] }}</el-button
    >
    <el-button :type="mfTypeOfButton('timeOfMeasurementInMilliseconds')" plain size="small">{{
      cfTimeOfMeasurementInMilliseconds
    }}</el-button>
    <el-button :type="mfTypeOfButton('notes')" plain size="small">{{
      cfLatestDataRowFromClientSideTable['notes']
    }}</el-button>
    <el-button
      size="mini"
      style="padding: 3px"
      plain
      tabindex="-1"
      @click="mfOpenEditCtInEditLayer(cfLatestDataRowFromClientSideTable['clientSideUniqRowId'])"
      class="el-icon-edit"
    ></el-button>
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
      type="success"
      size="mini"
      style="padding: 3px"
      plain
      tabindex="-1"
      @click="mfSendReviewedEvent()"
      >S</el-button
    >
    <el-button
      v-if="dataFldsOfToChangeAndCopiedRowsAreSame !== true"
      type="danger"
      size="mini"
      style="padding: 3px"
      plain
      tabindex="-1"
      @click="mfSendResetFormEvent()"
      >R</el-button
    >
  </div>
</template>

<script>
import mxViewLayer from '../code-common-for-all-1r-mf/view-layer.js'
export default {
  mixins: [mxViewLayer],
  props: {
    formType: {
      default: 'stand-alone',
      type: String,
    },
  },
}
</script>
