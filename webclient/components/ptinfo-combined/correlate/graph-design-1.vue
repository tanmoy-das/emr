<template>
  <highcharts :options="chartOptions"></highcharts>
</template>

<script>
import clientSideTblOfPatientServiceStatements from '@/components/ptinfo-single/1time-Mrow-1Field/service-statement/db/client-side/structure/patient-table-of-service-statements.js'

import clientSideTblOfPatientReminders from '@/components/ptinfo-single/1time-Mrow-1Field/reminder/db/client-side/structure/reminders-of-a-patient-table.js'

import clientSideTblOfMentalStatusExam from '@/components/ptinfo-single/1time-1row-mField/mental-status-exam/db/client-side/structure/patient-table-of-mental-status-exam.js'
import clientSideTblWeight from '@/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/weight/db/client-side/structure/table.js'
import clientSideTblHeight from '@/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/height/db/client-side/structure/table.js'
import clientSideTblOxygenSaturation from '@/components/ptinfo-single/1time-1row-mField/vital-signs/sub-cts/oxygen-saturation/db/client-side/structure/table.js'

// For pros
import clientSideTblOfMasterPsychReviewOfSystems from '@/components/ptinfo-single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/master-table-of-psych-review-of-systems.js'
import clientSideTblOfPatientPsychReviewOfSystems from '@/components/ptinfo-single/1time-1row-mField/psych-review-of-systems/db/client-side/structure/patient-table-of-psych-review-of-systems.js'

import { Chart } from 'highcharts-vue'

export default {
  components: {
    highcharts: Chart,
  },
  data() {
    return {}
  },
  computed: {
    chartOptions() {
      const chart = {
        xAxis: [
          {
            title: {
              text: 'Measurement date',
            },
            type: 'datetime',
            labels: {
              enabled: 'true',
              format: '{value:%m-%Y}', // X axis now shows month and year
            },
          },
        ],
        title: {
          text: '',
        }, // Reason: Y axis will have clientSideTable.entity for e.g. "weight" written beside it. This is small space. Difficult design decisions need to be made instead of doing everything.

        series: [
          // { data: this.cfBasicConcept, name: 'Basic concept' },
          // { data: [0, 0, 0], name: 'Appointments' },
          // { data: this.cfArOfRemindersForDisplay, name: 'Reminders' },
          // { data: this.cfGetHeightDataForGraph, name: 'Height' },
          { data: this.cfGetWeightDataForGraph, name: 'Weight', dashStyle: 'longdash' },
          { data: this.cfGetOxygenSaturationDataForGraph, name: 'Spo2', dashStyle: 'shortdot' },
          {
            data: this.cfGetProsDepressionDataForGraph,
            name: 'pros: depression',
            dashStyle: 'shortdot',
          },
        ],

        credits: {
          enabled: false,
        },
      }

      return chart
    },

    cfGetProsDepressionDataForGraph() {
      // Where clause  needs to change to not reviewed time
      // Also need to run it for everytime the note has been reviewed

      const arOfObjectsFromClientSidePatientDB = clientSideTblOfPatientPsychReviewOfSystems
        .query()
        .with('tblPsychReviewOfSystemsMasterLink')
        .where('ROW_END', 2147483648000)
        .get()

      //  console.log(arOfObjectsFromClientSidePatientDB)

      const maxValue = 8

      let groupTotal = []
      let catName = ''
      let value = 0
      for (let i = 0; i < arOfObjectsFromClientSidePatientDB.length; i++) {
        catName =
          arOfObjectsFromClientSidePatientDB[i]['tblPsychReviewOfSystemsMasterLink'][
            'psychReviewOfSystemsCategory'
          ]
        if (!groupTotal[catName]) groupTotal[catName] = 0
        if (arOfObjectsFromClientSidePatientDB[i]['psychReviewOfSystemsFieldValue'] !== null) {
          value = arOfObjectsFromClientSidePatientDB[i]['psychReviewOfSystemsFieldValue']
          groupTotal[catName] = parseFloat(groupTotal[catName]) + parseFloat(value)
        }
      }

      const arDataToShowOnGraph = []
      const numberOfPointsOnGraph = 1
      // This will need to change to not reviewed time
      const timeOfMeasurementInMilliseconds = 1601702631025
      let graphData = (groupTotal['Depression'] / maxValue) * 100
      graphData = Math.round(graphData)
      arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
      //console.log(arDataToShowOnGraph)
      return arDataToShowOnGraph
    },

    cfGetHeightDataForGraph() {
      const arDataToShowOnGraph = []
      const data = clientSideTblHeight.all()
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData = data[i][clientSideTblHeight.graphSeries1FieldName]
          arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
        }
        // console.log(arDataToShowOnGraph)
        return arDataToShowOnGraph
      } else {
        return null
      }
    },

    cfGetWeightDataForGraph() {
      const arDataToShowOnGraph = []
      const data = clientSideTblWeight.all()
      const numberOfPointsOnGraph = data.length
      if (numberOfPointsOnGraph > 0) {
        // find the max value
        let maxGraphData = 0
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const graphData = data[i][clientSideTblWeight.graphSeries1FieldName]
          if (graphData > maxGraphData) {
            maxGraphData = graphData
          }
        }

        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData =
            (data[i][clientSideTblWeight.graphSeries1FieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
        }
        //console.log(arDataToShowOnGraph)
        return arDataToShowOnGraph
      } else {
        return null
      }
    },

    cfGetOxygenSaturationDataForGraph() {
      const arDataToShowOnGraph = []
      const data = clientSideTblOxygenSaturation.all()
      const numberOfPointsOnGraph = data.length

      if (numberOfPointsOnGraph > 0) {
        // find the max value
        let maxGraphData = 0
        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const graphData = data[i][clientSideTblOxygenSaturation.graphSeries1FieldName]
          if (graphData > maxGraphData) {
            maxGraphData = graphData
          }
        }

        for (let i = 0; i < numberOfPointsOnGraph; i++) {
          const timeOfMeasurementInMilliseconds = data[i].timeOfMeasurementInMilliseconds
          const graphData =
            (data[i][clientSideTblOxygenSaturation.graphSeries1FieldName] / maxGraphData) * 100
          graphData = Math.round(graphData)
          arDataToShowOnGraph.push([timeOfMeasurementInMilliseconds, graphData])
        }
        // console.log(arDataToShowOnGraph)
        return arDataToShowOnGraph
      } else {
        return null
      }
    },

    cfArOfServiceStatementForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientServiceStatements
        .query()
        .with('tblServiceStatementsMasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      return arOfObjectsFromClientSideDB
    },

    cfBasicConcept() {
      var data = new Array()

      // Works: All highcharts cares about are 0 and 1 values it does not care about the field / key names
      data.push([2, 2])

      data.push([4, 4])

      // Works: but show wrong graph since this will be taken as two values and not an array of values
      data.push(5, 5)

      // Not work: since each point needs to be array and not a object
      var firstError = new Object()
      firstError[0] = 6
      firstError[1] = 6
      data.push(firstError)

      // Not work: since each point should not have field name. It should just have a index.
      var secondError = new Object()
      secondError['row'] = 8
      secondError['value'] = 8
      data.push(secondError)

      console.log(data)

      // Only 2,2 and 4,4 will be shown on graph

      return data
    },
    cfArOfRemindersForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfPatientReminders
        .query()
        .where('ROW_END', 2147483648000)
        .get()
      console.log(arOfObjectsFromClientSideDB)

      var arDataToShowOnGraph = new Array()

      for (let i = 0; i < arOfObjectsFromClientSideDB.length; i++) {
        arDataToShowOnGraph.push([arOfObjectsFromClientSideDB[i].ROW_START, 0])
      }

      // console.log(arDataToShowOnGraph)
      return arDataToShowOnGraph
    },
    cfArOfMentalStatusExamForDisplay() {
      const arOfObjectsFromClientSideDB = clientSideTblOfMentalStatusExam
        .query()
        .with('tblMentalStatusExamMasterLink')
        .where('ROW_END', 2147483648000)
        .get()
      console.log(arOfObjectsFromClientSideDB)
      const data = [10, 10, 10]
      return data
    },
  },
}
</script>

<style scoped>
/* Ref: https://stackoverflow.com/questions/39486352/a4-page-like-layout-in-html  */
.A4 {
  background: white;
  width: 21cm;
  height: 29.7cm;
  display: block;
  margin: 0 auto;
  padding: 2cm;
  font-size: 12px;
  margin-bottom: 0.5cm;
  box-shadow: 0 0 0.5cm rgba(0, 0, 0, 0.5);
}
</style>
