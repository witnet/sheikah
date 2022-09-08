<template>
  <el-dialog
    class="dialog"
    :visible="true"
    :title="title"
    :show-close="true"
    :close-on-click-modal="false"
    width="max-content"
    :top="generatedTransaction || !hasVariablesToComplete ? '6vh' : '15vh'"
    @close="closeAndClear"
  >
    <GeneratedTransaction
      v-if="generatedTransaction"
      :generated-transaction="generatedTransaction"
      type="DataRequest"
      @close-clear="closeAndClear"
      @send="confirmDataRequest"
    />
    <CompleteVariablesForm
      v-if="hasVariablesToComplete"
      @go-to-next-step="showCreateDataRequestForm"
      @go-back="closeAndClear"
    />
    <CreateDataRequestForm
      v-if="!hasVariablesToComplete && !drValues"
      @go-back="closeAndClear"
      @set-dr-values="setDrValues"
    />
    <SetFee
      v-if="drValues && !generatedTransaction"
      :dr-values="drValues"
      @set-transaction="transaction => setGeneratedTransaction({ transaction })"
      @go-back="closeAndClear"
    />
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import CreateDataRequestForm from '@/components/CreateDataRequestForm'
import SetFee from '@/components/SetFee.vue'
import CompleteVariablesForm from '@/components/CompleteVariablesForm'
import GeneratedTransaction from '@/components/GeneratedTransaction'
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'DeployDataRequest',
  components: {
    CreateDataRequestForm,
    CompleteVariablesForm,
    GeneratedTransaction,
    SetFee,
  },
  props: {
    template: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      drValues: null,
      variablesUpdated: false,
    }
  },
  computed: {
    ...mapGetters({
      variables: 'variablesKeys',
    }),
    ...mapState({
      generatedTransaction: state => {
        return state.wallet.generatedTransaction
      },
      networkStatus: state => state.wallet.networkStatus,
      createDataRequestError: state => state.wallet.errors.createDataRequest,
      sendTransactionError: state => state.wallet.errors.sendTransaction,
      locale: state => state.wallet.locale,
    }),
    title() {
      if (this.generatedTransaction) {
        return this.$t('deploy_dr_title_confirm')
      } else if (this.drValues) {
        return this.$t('set_dr_miner_fee')
      } else if (!this.hasVariablesToComplete) {
        return this.$t('deploy_dr_title_fill_all')
      } else {
        return this.$t('deploy_dr_title_add_custom_values')
      }
    },
    totalCommitAndRevealFee() {
      return this.commitAndRevealFee * this.witnesses * 2
    },
    totalRewardFee() {
      return this.rewardFee * this.witnesses
    },
    hasVariablesToComplete() {
      return this.variables.length && !this.variablesUpdated
    },
  },
  created() {
    this.setCurrentTemplate({
      id: this.template.id,
      locale: this.locale,
    })
  },
  beforeDestroy() {
    if (this.createDataRequestError) {
      this.clearError({ error: this.createDataRequestError.name })
    }
  },
  methods: {
    ...mapMutations({
      clearGeneratedTransaction: 'clearGeneratedTransaction',
      clearError: 'clearError',
      setCurrentTemplate: SET_CURRENT_TEMPLATE,
      setGeneratedTransaction: 'setGeneratedTransaction',
    }),
    ...mapActions({
      sendTransaction: 'sendTransaction',
      createDataRequest: 'createDataRequest',
    }),
    setDrValues(form) {
      this.drValues = {
        ...form,
        template: this.template,
      }
    },
    clearDrValues() {
      this.drValues = null
    },
    showCreateDataRequestForm() {
      this.variablesUpdated = true
    },
    confirmDataRequest() {
      this.sendTransaction({ label: '' })
      this.$emit('close', 'SENT')
    },
    closeAndClear: function () {
      this.$emit('close')
      if (this.drValues) {
        this.clearDrValues()
      }
      if (this.generatedTransaction) {
        this.clearGeneratedTransaction()
      }
      if (this.sendTransactionError) {
        this.clearError({ error: this.sendTransactionError.name })
      }
      if (this.createDataRequestError) {
        this.clearError({ error: this.createDataRequestError.name })
      }
      this.drValues = null
    },
  },
}
</script>
