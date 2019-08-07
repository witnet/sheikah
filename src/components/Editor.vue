<template>
<div>
  <ToolBar/>
</div>
</template>

<script>

import { mapState } from 'vuex'
import RadonStage from '@/components/RadonStage.vue'
import ToolBar from '@/components/ToolBar.vue'

export default {
  name: 'Editor',
  components: {
    RadonStage,
    ToolBar,
  },
  computed: {
    ...mapState({
      retrieve: state => state.rad.radRequest.retrieve,
      aggregate: state => state.rad.radRequest.aggregate,
      consensus: state => state.rad.radRequest.consensus,
    }),
  },
}
</script>
