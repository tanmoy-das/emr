<template><div></div></template>
<script>
import clientSideTblSearchPhrasesOfCt from "@/components/core/search-phrases/db/client-side/structure/search-phrases-of-components-table";
export default {
  data() {
    return {};
  },
  mounted() {
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Fifth chapter",
        ctAbbr: "c5",
        ctToShow: "book/c05-form-field/view-layer/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Fifth chapter - change",
        ctAbbr: "c5-c",
        ctToShow: "book/c05-form-field/change-layer/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
