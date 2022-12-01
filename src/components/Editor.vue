<template>
  <div data-test="editor-view" class="editor">
    <EditorToolBar @deploy="showDeployDR = true" />
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
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { EDITOR_STAGES, EDITOR_SAVE_INTERVAL } from '@/constants'
import { SET_CURRENT_STAGE } from '@/store/mutation-types'
import EditorToolBar from '@/components/EditorToolBar.vue'
import EditorStageAggregations from '@/components/EditorStageAggregations.vue'
import EditorStageScripts from '@/components/EditorStageScripts.vue'
import EditorStageSettings from '@/components/EditorStageSettings.vue'
import EditorStageSources from '@/components/EditorStageSources.vue'
import EditorStageTally from '@/components/EditorStageTally.vue'
import DeployDataRequest from '@/components/SendTransaction/DeployDataRequest.vue'
import EditorStageBar from '@/components/EditorStageBar.vue'

export default {
  name: 'Editor',
  components: {
    EditorToolBar,
    EditorStageBar,
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
      inactivityInterval: null,
      saveInterval: setInterval(() => {
        if (this.dataRequestChangedSinceSaved) {
          this.saveTemplate()
        }
      }, EDITOR_SAVE_INTERVAL),
    }
  },
  computed: {
    ...mapState({
      radRequest: state => state.rad.radRequest,
      networkStatus: state => state.wallet.networkStatus,
      currentStage: state => state.rad.currentStage,
      currentTemplate: state => state.rad.currentTemplate,
      autoTry: state => state.rad.autoTry,
      dataRequestChangedSinceSaved: state =>
        state.rad.dataRequestChangedSinceSaved,
    }),
  },
  watch: {
    dataRequestChangedSinceSaved(newValue) {
      if (newValue && this.autoTry) {
        this.tryDataRequest()
      }
    },
  },
  beforeDestroy() {
    clearInterval(this.tryInterval)
    clearInterval(this.saveInterval)
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
    ...mapActions(['saveTemplate', 'tryDataRequest']),
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
