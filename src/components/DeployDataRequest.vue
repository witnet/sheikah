<template>
  <el-dialog
    :visible="visible"
    :title="title"
    width="400px"
    v-on:close="closeAndClear"
    :show-close="false"
  >
    <Alert
      data-test="alert"
      v-for="error in errors"
      class="alert"
      :key="error.message"
      type="error"
      :message="error.message"
      :description="error.description"
    />
    <ConfirmDataRequest
      v-if="generatedTransaction"
      :backupWitnesses="backupWitnesses"
      :commitFee="commitFee"
      :extraCommitRounds="extraCommitRounds"
      :extraRevealRounds="extraRevealRounds"
      :fee="fee"
      :generatedTransaction="generatedTransaction"
      :minConsensusPercentage="minConsensusPercentage"
      :revealFee="revealFee"
      :rewardFee="rewardFee"
      :tallyFee="tallyFee"
      :timelock="timelock"
      :witnesses="witnesses"
      v-on:confirm-dr="confirmDataRequest"
      v-on:go-back="() => goBack('CONFIRM')"
    />
    <CreateDataRequestForm
      v-else-if="showFillVariablesForm"
      :backWord="variables.length ? 'Back' : 'Cancel'"
      v-on:go-back="() => goBack('FORM')"
      v-on:create-dr="createDataRequest"
    />
    <CompleteVariablesForm
      v-else
      v-on:go-to-next-step="showCreateDataRequestForm"
      v-on:go-back="() => goBack('TEMPLATE_VARIABLES')"
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
  props: {
    template: Object,
    visible: Boolean,
  },
  components: {
    CreateDataRequestForm,
    CompleteVariablesForm,
    ConfirmDataRequest,
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
    errors() {
      if (this.networkStatus !== 'error') {
        return [this.getItemError, this.saveItemError, this.createDataRequestError].filter(
          error => !!error
        )
      } else {
        return [this.networkError]
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
    }
  },
  methods: {
    ...mapMutations({
      clearGeneratedTransaction: 'clearGeneratedTransaction',
      clearError: 'clearError',
      createDataRequest: 'createDataRequest',
      sendTransaction: 'sendTransaction',
      setCurrentTemplate: SET_CURRENT_TEMPLATE,
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
      if (this.createDataRequestError) {
        this.clearError({ error: this.createDataRequestError.name })
      }
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
    createDataRequest(parameters) {
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
  created() {
    this.setCurrentTemplate({
      id: this.template.id,
    })
  },
}
</script>

<style lang="scss" scoped></style>
