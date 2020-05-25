<template>
  <el-dialog
    :visible="visible"
    :title="title"
    width="400px"
    :show-close="false"
    @close="closeAndClear"
  >
    <ConfirmDataRequest
      v-if="generatedTransaction"
      :backup-witnesses="backupWitnesses"
      :commit-fee="commitFee"
      :extra-commit-rounds="extraCommitRounds"
      :extra-reveal-rounds="extraRevealRounds"
      :fee="fee"
      :generated-transaction="generatedTransaction"
      :min-consensus-percentage="minConsensusPercentage"
      :reveal-fee="revealFee"
      :reward-fee="rewardFee"
      :tally-fee="tallyFee"
      :timelock="timelock"
      :witnesses="witnesses"
      @confirm-dr="confirmDataRequest"
      @go-back="() => goBack('CONFIRM')"
    />
    <CreateDataRequestForm
      v-else-if="showFillVariablesForm"
      :back-word="variables.length ? 'Back' : 'Cancel'"
      @go-back="() => goBack('FORM')"
      @create-dr="createDR"
    />
    <CompleteVariablesForm
      v-else
      @go-to-next-step="showCreateDataRequestForm"
      @go-back="() => goBack('TEMPLATE_VARIABLES')"
    />
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import CreateDataRequestForm from '@/components/CreateDataRequestForm'
import CompleteVariablesForm from '@/components/CompleteVariablesForm'
import ConfirmDataRequest from '@/components/ConfirmDataRequest'
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'DeployDataRequest',
  components: {
    CreateDataRequestForm,
    CompleteVariablesForm,
    ConfirmDataRequest,
  },
  props: {
    template: {
      type: Object,
      required: true,
    },
    visible: Boolean,
  },

  data() {
    return {
      currentTemplate: '',
      variablesUpdated: false,
      backupWitnesses: null,
      commitFee: null,
      extraCommitRounds: null,
      extraRevealRounds: null,
      fee: null,
      minConsensusPercentage: null,
      revealFee: null,
      rewardFee: null,
      tallyFee: null,
      timelock: null,
      witnesses: null,
      collateral: null,
    }
  },
  computed: {
    title() {
      if (this.generatedTransaction) {
        return 'Confirm'
      } else if (this.showFillVariablesForm) {
        return 'Fill all the fields to deploy a data request'
      } else {
        return 'Add custom values for the template variables'
      }
    },
    showFillVariablesForm() {
      return this.variablesUpdated || !this.variables.length
    },
    ...mapGetters({
      variables: 'variablesKeys',
    }),
    ...mapState({
      generatedTransaction: state => {
        return state.wallet.generatedTransaction
      },
      networkStatus: state => state.wallet.networkStatus,
    }),
  },
  created() {
    this.setCurrentTemplate({
      id: this.template.id,
    })
  },
  methods: {
    ...mapMutations({
      clearGeneratedTransaction: 'clearGeneratedTransaction',
      clearError: 'clearError',
      setCurrentTemplate: SET_CURRENT_TEMPLATE,
    }),
    ...mapActions({
      sendTransaction: 'sendTransaction',
      createDataRequest: 'createDataRequest',
    }),
    goBack(from) {
      if (from === 'CONFIRM') {
        this.clearGeneratedTransaction()
      } else if (from === 'TEMPLATE_VARIABLES') {
        this.closeAndClear()
      } else if (from === 'FORM' && !this.variables.length) {
        this.closeAndClear()
      } else {
        this.variablesUpdated = false
      }
    },
    closeAndClear: function() {
      this.$emit('close')
      if (this.generatedTransaction) {
        this.clearGeneratedTransaction()
      }
      this.currentTemplate = ''
      this.variablesUpdated = false
      this.backupWitnesses = null
      this.commitFee = null
      this.extraCommitRounds = null
      this.extraRevealRounds = null
      this.fee = null
      this.minConsensusPercentage = null
      this.revealFee = null
      this.rewardFee = null
      this.tallyFee = null
      this.timelock = null
      this.witnesses = null
    },
    showCreateDataRequestForm() {
      this.variablesUpdated = true
    },
    createDR(parameters) {
      this.backupWitnesses = parameters.backupWitnesses
      this.commitFee = parameters.commitFee
      this.extraCommitRounds = parameters.extraCommitRounds
      this.extraRevealRounds = parameters.extraRevealRounds
      this.fee = parameters.fee
      this.minConsensusPercentage = parameters.minConsensusPercentage
      this.revealFee = parameters.revealFee
      this.rewardFee = parameters.rewardFee
      this.tallyFee = parameters.tallyFee
      this.timelock = this.template.radRequest.timelock
      this.witnesses = parameters.witnesses
      this.collateral = parameters.collateral
      this.createDataRequest({
        parameters: parameters,
        request: this.template.radRequest,
      })
    },
    confirmDataRequest() {
      this.sendTransaction({ label: '' })
      this.$emit('close', 'SENT')
    },
  },
}
</script>
