<script>
import clientSideTblOfCtSearchPhrases from '@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table.js'
import tblCTLifeCycle from '@/components/core/ctMaster/db/client-side/structure/orm-ct-life-cycle'

export default {
  data() {
    return {
      // dataTable: [],
    }
  },
  mounted() {
    tblCTLifeCycle.insert({
      data: {
        name: 'recommendations',
        status: 3,
      },
    })

    // Step 2/3: Inserting Search interfaces to this component
    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'recommendations',
        ctAbbr: 'rex',
        ctToShow: 'ptinfo-single/rec/view-layer/timeline.vue',
        displayLocation: 'PresentTimeStateViewLayer',
      },
    })

    clientSideTblOfCtSearchPhrases.insert({
      data: {
        value: 'add recommendations',
        ctAbbr: 'arex',
        ctToShow: 'ptinfo-single/rec/view-layer/table-ct.vue',
        displayLocation: 'edit-layer',
      },
    })
  },
}
</script>
