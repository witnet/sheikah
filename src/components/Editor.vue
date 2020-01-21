<template>
  <div class="editor">
    <ToolBar />
    <Alert
      data-test="alert"
      v-if="tryDataRequestError"
      :key="tryDataRequestError.message"
      type="error"
      :message="tryDataRequestError.message"
      :description="tryDataRequestError.description"
      v-on:close="() => clearError(tryDataRequestError.name)"
    />
    <StageBar v-on:change-stage="changeStage" />
    <RadonStage class="stage" :stage="currentStage" :script="currentScript" />
    <Console />
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
  computed: {
    ...mapState({
      radRequest: state => {
        return state.rad.radRequest
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
  beforeDestroy() {
    if (this.tryDataRequestError) {
      this.clearError(this.tryDataRequestError.name)
    }
  },
}
</script>
