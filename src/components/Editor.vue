<template>
  <div>
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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Alert from '@/components/Alert'
import RadonStage from '@/components/RadonStage.vue'
import ToolBar from '@/components/ToolBar.vue'
import StageBar from '@/components/StageBar.vue'
import { formatSectionApiErrorsByRoute } from '@/utils'

export default {
  name: 'Editor',
  components: {
    RadonStage,
    ToolBar,
    StageBar,
    Alert,
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
      console.log(2)
      if (this.currentStage === 'retrieve') {
        return this.radRequest.retrieve
      } else if (this.currentStage === 'aggregate') {
        return this.radRequest.aggregate.script
      } else if (this.currentStage === 'tally') {
        return this.radRequest.tally.script
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
    console.log(1)
    return {
      currentStage: 'retrieve',
    }
  },
}
</script>
