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
import { EDITOR_STAGES, EDITOR_TRY_INTERVAL } from '@/constants'
import { SET_CURRENT_STAGE } from '@/store/mutation-types'
import EditorToolBar from '@/components/EditorToolBar'
import EditorStageAggregations from '@/components/EditorStageAggregations'
import EditorStageScripts from '@/components/EditorStageScripts'
import EditorStageSettings from '@/components/EditorStageSettings'
import EditorStageSources from '@/components/EditorStageSources'
import EditorStageTally from '@/components/EditorStageTally'
import DeployDataRequest from '@/components/DeployDataRequest.vue'
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
      tryInterval: setInterval(() => {
        console.log('outside')
        if (this.autoTry && this.dataRequestChanged) {
          console.log('inside')
          this.tryDataRequest()
        }
      }, EDITOR_TRY_INTERVAL),
    }
  },
  computed: {
    ...mapState({
      radRequest: state => state.rad.radRequest,
      networkStatus: state => state.wallet.networkStatus,
      currentStage: state => state.rad.currentStage,
      currentTemplate: state => state.rad.currentTemplate,
      autoTry: state => state.rad.autoTry,
      dataRequestChanged: state => state.rad.dataRequestChanged,
    }),
  },
  beforeDestroy() {
    this.tryInterval = null
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
