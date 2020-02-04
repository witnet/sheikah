<template>
  <div class="container">
    <div v-if="generatedTransaction" class="data-request-info">
      <ConfirmDataRequest
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
      />
    </div>
    <div v-else-if="showFillVariablesForm">
      <CreateDataRequestForm v-on:create-dr="createDataRequest" />
    </div>
    <div v-else>
      <CompleteVariablesForm v-on:go-to-next-step="showCreateDataRequestForm" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CreateDataRequestForm from '@/components/CreateDataRequestForm'
import CompleteVariablesForm from '@/components/CompleteVariablesForm'
import ConfirmDataRequest from '@/components/ConfirmDataRequest'
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'DeployDataRequest',
  props: {
    template: Object,
    dialogVisible: Boolean,
    showModal: Boolean,
  },
  components: {
    CreateDataRequestForm,
    CompleteVariablesForm,
    ConfirmDataRequest,
  },
  computed: {
    variables() {
      return this.$store.getters.variablesKeys
    },
    showFillVariablesForm() {
      return this.variablesUpdated || !this.variables.length
    },
    ...mapState({
      generatedTransaction: state => {
        return state.wallet.generatedTransaction
      },
    }),
  },
  data() {
    return {
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
      this.$store.dispatch('createDataRequest', {
        parameters: parameters,
        request: this.template.radRequest,
      })
    },
    confirmDataRequest() {
      this.$store.dispatch('sendTransaction', { label: '' })
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('close')
    },
  },
  created() {
    this.$store.commit(SET_CURRENT_TEMPLATE, {
      id: this.template.id,
    })
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0px;
  max-width: 100%;
}
</style>
