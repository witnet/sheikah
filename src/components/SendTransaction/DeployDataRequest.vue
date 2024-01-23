<template>
  <el-dialog
    v-model="dialogVisible"
    class="dialog"
    :title="title"
    :show-close="true"
    :close-on-click-modal="false"
    width="max-content"
    :top="generatedTransaction || !hasVariablesToComplete ? '6vh' : '15vh'"
    @close="closeAndClear"
  >
    <CompleteVariablesForm
      v-if="stage === 0"
      @go-to-next-step="showCreateDataRequestForm"
      @go-back="closeAndClear"
    />
    <CreateDataRequestForm
      v-if="stage === 1"
      :dr-values="drValues"
      @set-dr-values="setFormValues"
      @go-back="closeAndClear"
    />
    <SetFee
      v-if="stage === 2"
      :dr-values="drValues"
      @set-transaction="setSelectedTransaction"
      @go-back="goPrevStage"
    />
    <GeneratedTransaction
      v-if="stage === 3 && generatedTransaction"
      :generated-transaction="generatedTransaction"
      type="DataRequest"
      @send="confirmDataRequest"
      @close-clear="goPrevStage"
    />
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import CreateDataRequestForm from '@/components/SendTransaction/CreateDataRequestForm.vue'
import SetFee from '@/components/SendTransaction/SetFee.vue'
import CompleteVariablesForm from '@/components/SendTransaction/CompleteVariablesForm.vue'
import GeneratedTransaction from '@/components/SendTransaction/GeneratedTransaction.vue'
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
      variablesUpdated: false,
      stage: 0,
      dialogVisible: true,
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
      drValues: state => state.wallet.drValues,
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
    this.variables.length ? (this.stage = 0) : (this.stage = 1)
  },
  beforeUnmount() {
    if (this.createDataRequestError) {
      this.clearError({ error: this.createDataRequestError.name })
    }
  },
  methods: {
    ...mapMutations({
      clearGeneratedTransaction: 'clearGeneratedTransaction',
      clearSelectedFee: 'clearSelectedFee',
      clearError: 'clearError',
      setCurrentTemplate: SET_CURRENT_TEMPLATE,
      setGeneratedTransaction: 'setGeneratedTransaction',
      setDrValues: 'setDrValues',
      clearDrValues: 'clearDrValues',
    }),
    ...mapActions({
      sendTransaction: 'sendTransaction',
      createDataRequest: 'createDataRequest',
    }),
    setFormValues(form) {
      this.setDrValues({
        values: {
          ...form,
          template: this.template,
        },
      })
      this.goNextStage()
    },
    setSelectedTransaction(transaction) {
      this.setGeneratedTransaction({ transaction })
      this.goNextStage()
    },
    goPrevStage() {
      const firstStage = this.variables.length ? 0 : 1
      if (this.stage > firstStage) {
        this.stage -= 1
      }
    },
    goNextStage() {
      this.stage += 1
    },
    showCreateDataRequestForm() {
      this.variablesUpdated = true
      this.goNextStage()
    },
    async confirmDataRequest() {
      await this.sendTransaction({ label: '' })
      this.$emit('close', 'SENT')
      this.closeAndClear()
    },
    closeAndClear: function () {
      this.$emit('close')
      if (this.drValues) {
        this.clearDrValues()
      }
      if (this.generatedTransaction) {
        this.clearGeneratedTransaction()
      }
      this.clearSelectedFee()
      if (this.sendTransactionError) {
        this.clearError({ error: this.sendTransactionError.name })
      }
      if (this.createDataRequestError) {
        this.clearError({ error: this.createDataRequestError.name })
      }
    },
  },
}
</script>
