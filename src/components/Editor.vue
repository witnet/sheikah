<template>
  <div data-test="editor-view" class="editor">
    <EditorToolBar />
    <EditorStageBar @change-stage="changeStage" />
    <EditorStageSettings v-if="currentStage === EDITOR_STAGES.SETTINGS" />
    <EditorStageSources v-if="currentStage === EDITOR_STAGES.SOURCES" />
    <EditorStageScripts v-if="currentStage === EDITOR_STAGES.SCRIPTS" />
    <EditorStageAggregations
      v-if="currentStage === EDITOR_STAGES.AGGREGATIONS"
    />
    <EditorStageTally v-if="currentStage === EDITOR_STAGES.TALLY" />

    <Console :logs="logs" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { EDITOR_STAGES } from '@/constants'
import EditorToolBar from '@/components/EditorToolBar'
import EditorStageAggregations from '@/components/EditorStageAggregations'
import EditorStageScripts from '@/components/EditorStageScripts'
import EditorStageSettings from '@/components/EditorStageSettings'
import EditorStageSources from '@/components/EditorStageSources'
import EditorStageTally from '@/components/EditorStageTally'
import Console from '@/components/Console.vue'
import EditorStageBar from '@/components/EditorStageBar.vue'

export default {
  name: 'Editor',
  components: {
    EditorToolBar,
    EditorStageBar,
    Console,
    EditorStageAggregations,
    EditorStageScripts,
    EditorStageSettings,
    EditorStageSources,
    EditorStageTally,
  },
  data() {
    return {
      EDITOR_STAGES,
      currentStage: EDITOR_STAGES.SETTINGS,
      logs: [],
    }
  },
  computed: {
    ...mapState({
      radRequest: state => state.rad.radRequest,
      radRequestResult: state => state.wallet.radRequestResult,
      networkStatus: state => state.wallet.networkStatus,
    }),
  },
  watch: {
    radRequestResult(val) {
      this.logs.push(val)
    },
  },
  created() {
    this.saveTemplate()
  },
  methods: {
    ...mapMutations(['clearError']),
    ...mapActions(['saveTemplate']),
    changeStage: function(stage) {
      this.currentStage = stage
    },
  },
}
</script>

<style scoped>
.editor {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  height: 100vh;
  position: relative;
}
</style>
