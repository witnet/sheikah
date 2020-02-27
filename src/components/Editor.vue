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
      v-on:close="() => clearError(error.name)"
    />
    <StageBar v-on:change-stage="changeStage" />
    <RadonStage class="stage" :stage="currentStage" :script="currentScript" />
    <Console :logs="logs" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    changeStage: function(stage) {
      this.currentStage = stage
    },
    clearError(errorName) {
      this.$store.commit('clearError', { error: errorName })
    },
  },
  watch: {
    radRequestResult(val) {
      this.logs.push(val)
    },
  },
  computed: {
    ...mapState({
      radRequest: state => {
        return state.rad.radRequest
      },
      radRequestResult: state => {
        return state.wallet.radRequestResult
      },
      tryDataRequestError: state => {
        if (state.wallet.errors.tryDataRequest) {
          return {
            message: state.wallet.errors.tryDataRequest.message,
            description: state.wallet.errors.tryDataRequest.error.message,
            name: state.wallet.errors.tryDataRequest.name,
          }
        }
      },
      saveItemError: state => {
        if (state.rad.errors.saveItem) {
          return {
            message: state.rad.errors.saveItem.message,
            description: state.rad.errors.saveItem.error.message,
            name: state.rad.errors.saveItem.name,
          }
        }
      },
    }),
    errors() {
      if (this.$store.state.wallet.networkStatus !== 'error') {
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
      this.clearError(this.tryDataRequestError.name)
    }
    if (this.saveItemError) {
      this.clearError(this.saveItemError.name)
    }
  },
}
</script>

<style scoped>
.editor {
  position: relative;
  height: 100%;
}
</style>
