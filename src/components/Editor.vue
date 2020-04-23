<template>
  <div data-test="editor-view" class="editor">
    <ToolBar />
    <Alert
      data-test="alert"
      v-for="error in errors"
      :key="error.message"
      type="error"
      :message="error.message"
      :description="error.description"
      v-on:close="() => clearError({ error: error.name })"
    />
    <StageBar v-on:change-stage="changeStage" />
    <RadonStage class="stage" :stage="currentStage" :script="currentScript" />
    <Console :logs="logs" />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import Alert from '@/components/Alert'
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
    Alert,
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
      tryDataRequestError: state => {
        if (state.wallet.errors.tryDataRequest) {
          return {
            message: state.wallet.errors.tryDataRequest.message,
            description: state.wallet.errors.tryDataRequest.error,
            name: state.wallet.errors.tryDataRequest.name,
          }
        }
      },
      saveItemError: state => {
        if (state.rad.errors.saveItem) {
          return {
            message: state.rad.errors.saveItem.message,
            description: state.rad.errors.saveItem.error,
            name: state.rad.errors.saveItem.name,
          }
        }
      },
    }),
    errors() {
      if (this.networkStatus !== 'error') {
        return [this.saveItemError, this.tryDataRequestError].filter(error => !!error)
      } else {
        return []
      }
    },
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
  beforeDestroy() {
    if (this.tryDataRequestError) {
      this.clearError({ error: this.tryDataRequestError.name })
    }
    if (this.saveItemError) {
      this.clearError({ error: this.saveItemError.name })
    }
  },
}
</script>

<style scoped>
.editor {
  position: relative;
  height: 100vh;
}
</style>
