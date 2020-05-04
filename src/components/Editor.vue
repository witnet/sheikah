<template>
  <div data-test="editor-view" class="editor">
    <ToolBar />
    <StageBar v-on:change-stage="changeStage" />
    <RadonStage class="stage" :stage="currentStage" :script="currentScript" />
    <Console :logs="logs" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import RadonStage from '@/components/RadonStage.vue'
import ToolBar from '@/components/ToolBar.vue'
import Console from '@/components/Console.vue'
import StageBar from '@/components/StageBar.vue'

export default {
  name: 'Editor',
  components: {
    RadonStage,
    ToolBar,
    StageBar,
    Console,
  },
  data() {
    return {
      currentStage: 'retrieve',
      logs: [],
    }
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
    }),
    changeStage: function(stage) {
      this.currentStage = stage
    },
  },
  watch: {
    radRequestResult(val) {
      this.logs.push(val)
    },
  },
  computed: {
    ...mapState({
      radRequest: state => state.rad.radRequest,
      radRequestResult: state => state.wallet.radRequestResult,
      networkStatus: state => state.wallet.networkStatus,
    }),
    currentScript: function() {
      if (this.currentStage === 'retrieve') {
        return this.radRequest.getMarkup().retrieve
      } else if (this.currentStage === 'aggregate') {
        return this.radRequest.getMarkup().aggregate
      } else if (this.currentStage === 'tally') {
        return this.radRequest.getMarkup().tally
      } else {
        return null
      }
    },
  },
}
</script>

<style scoped>
.editor {
  position: relative;
  height: 100vh;
}
</style>
