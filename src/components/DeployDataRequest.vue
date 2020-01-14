<template>
  <div class="container">
    <div v-if="generatedDataRequest" class="data-request-info">
      <ConfirmDataRequest :template="template" v-on:confirm-dr="confirmDataRequest" />
    </div>
    <div v-else>
      <div v-if="variablesUpdated">
        <CreateDataRequestForm
          :fees="fees"
          v-on:create-dr="createDataRequest"
          v-on:fees="setFees"
        />
      </div>
      <div v-else>
        <CompleteVariablesForm v-on:go-to-next-step="goNextStep" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateDataRequestForm from '@/components/CreateDataRequestForm'
import CompleteVariablesForm from '@/components/CompleteVariablesForm'
import ConfirmDataRequest from '@/components/ConfirmDataRequest'
import { SET_CURRENT_TEMPLATE } from '@/store/mutation-types'

export default {
  name: 'DeployDataRequest',
  props: {
    fees: Array,
    template: Object,
    variablesUpdated: Boolean,
    dialogVisible: Boolean,
    showModal: Boolean,
  },
  components: {
    CreateDataRequestForm,
    CompleteVariablesForm,
    ConfirmDataRequest,
  },
  computed: {
    generatedDataRequest() {
      return this.$store.state.wallet.generatedDataRequest
    },
  },
  methods: {
    goNextStep() {
      this.$emit('toggle-updated')
    },
    setFees(fees) {
      this.fees = fees
    },
    createDataRequest() {
      this.$store.dispatch('createDataRequest', {
        label: '',
        fee: this.fees[0].amount,
        request: this.template.radRequest,
      })
    },
    confirmDataRequest() {
      this.$store.dispatch('sendTransaction')
      this.closeDialog()
    },
    closeDialog() {
      this.$emit('close')
    },
  },
  watch: {
    generatedDataRequest(value) {
      if (value) {
        this.showModal = true
      }
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
  justify-content: center;
  margin: 0px;
}
</style>
