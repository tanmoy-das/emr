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
        value: "Fourth chapter",
        ctAbbr: "c4",
        ctToShow: "book/c04-orm-model/view-layer/table-ct.vue", // PtsVl -> Present time state - part of - view layer
        displayLocation: "ptsVl",
      },
    });
    clientSideTblSearchPhrasesOfCt.insert({
      data: {
        value: "Fourth chapter - change",
        ctAbbr: "c4-c",
        ctToShow: "book/c04-orm-model/change-layer/table-ct.vue",
        displayLocation: "cl",
        ctWidthInCl: "small",
      },
    });
  },
};
</script>
