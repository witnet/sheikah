<template>
  <div data-test="editor-view" class="editor">
    <EditorToolBar
      @undo-redo="changeStage({ stage: lastStageModified })"
      @deploy="showDeployDR = true"
    />
    <EditorStageBar @change-stage="value => changeStage({ stage: value })" />
    <EditorStageSettings v-if="currentStage === EDITOR_STAGES.SETTINGS" />
    <EditorStageSources v-if="currentStage === EDITOR_STAGES.SOURCES" />
    <EditorStageScripts v-if="currentStage === EDITOR_STAGES.SCRIPTS" />
    <EditorStageAggregations
      v-if="currentStage === EDITOR_STAGES.AGGREGATIONS"
    />
    <EditorStageTally v-if="currentStage === EDITOR_STAGES.TALLY" />
    <DeployDataRequest
      v-if="showDeployDR"
      :template="currentTemplate"
      @close="closeDeployModal"
    />
    <Console :logs="logs" />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { EDITOR_STAGES } from '@/constants'
import { SET_CURRENT_STAGE } from '@/store/mutation-types'
import EditorToolBar from '@/components/EditorToolBar'
import EditorStageAggregations from '@/components/EditorStageAggregations'
import EditorStageScripts from '@/components/EditorStageScripts'
import EditorStageSettings from '@/components/EditorStageSettings'
import EditorStageSources from '@/components/EditorStageSources'
import EditorStageTally from '@/components/EditorStageTally'
import Console from '@/components/Console.vue'
import DeployDataRequest from '@/components/DeployDataRequest.vue'
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
    DeployDataRequest,
  },
  data() {
    return {
      EDITOR_STAGES,
      logs: [],
      showDeployDR: false,
    }
  },
  computed: {
    ...mapState({
      radRequest: state => state.rad.radRequest,
      radRequestResult: state => state.wallet.radRequestResult,
      networkStatus: state => state.wallet.networkStatus,
      lastStageModified: state => state.rad.lastStageModified,
      currentStage: state => state.rad.currentStage,
      currentTemplate: state => state.rad.currentTemplate,
    }),
  },
  watch: {
    radRequestResult(val) {
      this.logs.push(val)
    },
  },
  created() {
    this.saveTemplate()
    this.changeStage({ stage: EDITOR_STAGES.SETTINGS })
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
      changeStage: SET_CURRENT_STAGE,
    }),
    ...mapActions(['saveTemplate']),
    closeDeployModal() {
      this.showDeployDR = false
    },
  },
}
</script>

<style scoped>
.editor {
  display: grid;
  grid-template-rows: auto auto 1fr auto;
  grid-template-rows: max-content max-content 1fr max-content;
  height: 100vh;
  overflow: hidden;
}
</style>
