<template>
  <el-dialog
    v-model="localVisible"
    :title="title"
    :show-close="true"
    width="max-content"
    @close="closeAndClear"
  >
    <SendValueTransferForm
      v-if="stage === 0"
      :vtt-values="vttValues"
      @set-vtt-values="setFormValues"
    />
    <SetFee
      v-if="stage === 1"
      :vtt-values="vttValues"
      @set-transaction="setSelectedTransaction"
      @go-back="goPrevStage"
    />
    <GeneratedTransaction
      v-if="stage === 2 && generatedTransaction"
      :generated-transaction="generatedTransaction"
      type="ValueTransfer"
      @send="confirmTransaction"
      @close-clear="goPrevStage"
    />
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import GeneratedTransaction from '@/components/SendTransaction/GeneratedTransaction.vue'
import SendValueTransferForm from '@/components/SendTransaction/SendValueTransferForm.vue'
import SetFee from '@/components/SendTransaction/SetFee.vue'

export default {
  name: 'SendValueTransfer',
  components: {
    GeneratedTransaction,
    SendValueTransferForm,
    SetFee,
  },
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      label: '',
      stage: 0,
    }
  },
  computed: {
    localVisible: {
      set() {
        this.$emit('close')
      },
      get() {
        return this.visible
      },
    },
    ...mapState({
      generatedTransaction: state => {
        return state.wallet.generatedTransaction
      },
      vttValues: state => state.wallet.vttValues,
      unit: state => state.wallet.unit,
      createVTTError: state => state.wallet.errors.createVTT,
    }),
    title() {
      if (this.generatedTransaction) {
        return this.$t('confirm_vtt_tx')
      } else if (this.stage === 1) {
        return this.$t('set_vtt_miner_fee')
      } else {
        return this.$t('create_vtt_title')
      }
    },
  },
  mounted() {
    this.clearValues()
  },
  beforeUnmount() {
    if (this.createVTTError) {
      this.clearError({ error: this.createVTTError.name })
    }
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
      setError: 'setError',
      clearGeneratedTransaction: 'clearGeneratedTransaction',
      clearSelectedFee: 'clearSelectedFee',
      setGeneratedTransaction: 'setGeneratedTransaction',
      setVttValues: 'setVttValues',
      clearVttValues: 'clearVttValues',
      clearTransactionOptions: 'clearTransactionOptions',
    }),
    ...mapActions({
      sendTransaction: 'sendTransaction',
      createVTT: 'createVTT',
    }),
    setFormValues(form) {
      this.stage = 1
      this.setVttValues({ values: form })
    },
    setSelectedTransaction(transaction) {
      this.stage = 2
      this.setGeneratedTransaction({ transaction })
    },
    goPrevStage() {
      this.stage -= 1
    },
    clearValues() {
      this.clearVttValues()
      this.clearTransactionOptions()
      this.clearGeneratedTransaction()
      this.clearSelectedFee()
      if (this.createVTTError) {
        this.clearError({ error: this.createVTTError.name })
      }
    },
    closeAndClear() {
      this.clearValues()
      this.$emit('close')
    },
    async confirmTransaction() {
      await this.sendTransaction({ label: this.label })
      this.closeAndClear()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

.slide-enter-active {
  transition-duration: 0.1s;
  transition-timing-function: ease-in;
}

.slide-leave-active {
  transition-duration: 0.1s;
  transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to,
.slide-leave {
  max-height: 100px;
  overflow: hidden;
}

.slide-enter,
.slide-leave-to {
  max-height: 0;
  overflow: hidden;
}

.error {
  color: $red-2;
  font-size: 14px;
  position: absolute;
}

.form {
  width: 500px;
}

.transaction-container {
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 500px;
}

.submit {
  text-align: right;
  width: 100%;
}
</style>
