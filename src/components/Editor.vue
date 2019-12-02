<template>
  <div class="editor">
    <ToolBar />
    <Alert
      v-for="error in errors"
      :key="error.name"
      type="error"
      :message="error.message"
      :description="error.description"
      v-on:close="() => clearError(error.name)"
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
import { formatSectionApiErrorsByRoute } from '@/utils'

export default {
  name: 'Editor',
  components: {
    RadonStage,
    ToolBar,
    StageBar,
    Alert,
    Console,
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
    }),
    currentScript: function() {
      if (this.currentStage === 'retrieve') {
        return this.radRequest.retrieve
      } else if (this.currentStage === 'aggregate') {
        return this.radRequest.aggregate
      } else if (this.currentStage === 'tally') {
        return this.radRequest.tally
      } else {
        return null
      }
    },
    ...mapState({
      tryDataRequestError: state => {
        return state.wallet.errors.tryDataRequest
      },
    }),
    errors() {
      return formatSectionApiErrorsByRoute(
        this.$route.name,
        {
          editor: ['tryDataRequestError'],
        },
        {
          tryDataRequestError: this.tryDataRequestError,
        }
      )
    },
  },
  data() {
    return {
      currentStage: 'retrieve',
    }
  },
}
</script>
