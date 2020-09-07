<template>
  <el-dialog
    class="dialog"
    :visible="true"
    :title="title"
    :show-close="false"
    width="600px"
    :top="generatedTransaction || showFillVariablesForm ? '6vh' : '15vh'"
    @close="closeAndClear"
  >
    <ConfirmDataRequest
      v-if="generatedTransaction"
      :commitAndRevealFee="commitAndRevealFee"
      :fee="fee"
      :generatedTransaction="generatedTransaction"
      :minConsensusPercentage="minConsensusPercentage"
      :rewardFee="rewardFee"
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
  },

  data() {
    return {
      currentTemplate: '',
      variablesUpdated: false,
      commitAndRevealFee: null,
      fee: null,
      minConsensusPercentage: null,
      rewardFee: null,
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
      this.commitAndRevealFee = null
      this.fee = null
      this.minConsensusPercentage = null
      this.rewardFee = null
      this.timelock = null
      this.witnesses = null
    },
    showCreateDataRequestForm() {
      this.variablesUpdated = true
    },
    createDR(parameters) {
      this.commitAndRevealFee = parameters.commitAndRevealFee
      this.fee = parameters.fee
      this.minConsensusPercentage = parameters.minConsensusPercentage
      this.rewardFee = parameters.rewardFee
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
