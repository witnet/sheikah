<template>
  <el-dialog
    :title="$t('create_vtt_title')"
    :visible="true"
    :show-close="true"
    :close-on-click-modal="false"
    width="max-content"
    @close="closeAndClear"
  >
    <GeneratedTransaction
      v-if="generatedTransaction"
      :generated-transaction="generatedTransaction"
      type="ValueTransfer"
      @close-clear="closeAndClear"
      @send="confirmTransaction"
    />
    <SetValueTransferFee
      v-else-if="vttValues"
      :vtt-values="vttValues"
      @create-vtt="transaction => setGeneratedTransaction({ transaction })"
      @clear-vtt-values="clearVttValues"
    />
    <SendValueTransferForm v-else @set-vtt-values="setVttValues" />
  </el-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import GeneratedTransaction from '@/components/GeneratedTransaction.vue'
import SendValueTransferForm from '@/components/SendValueTransferForm.vue'
import SetValueTransferFee from '@/components/SetValueTransferFee.vue'

export default {
  name: 'SendValueTransfer',
  components: {
    GeneratedTransaction,
    SendValueTransferForm,
    SetValueTransferFee,
  },
  data() {
    return {
      label: '',
      vttValues: null,
    }
  },
  computed: {
    ...mapState({
      generatedTransaction: state => {
        return state.wallet.generatedTransaction
      },
      unit: state => state.wallet.unit,
      createVTTError: state => state.wallet.errors.createVTT,
    }),
  },
  methods: {
    ...mapMutations({
      clearError: 'clearError',
      setError: 'setError',
      clearGeneratedTransaction: 'clearGeneratedTransaction',
      setGeneratedTransaction: 'setGeneratedTransaction',
    }),
    ...mapActions({
      sendTransaction: 'sendTransaction',
      createVTT: 'createVTT',
    }),
    setVttValues(form) {
      this.vttValues = form
    },
    clearVttValues() {
      this.vttValues = null
    },
    closeAndClear() {
      this.clearGeneratedTransaction()
      if (this.createVTTError) {
        this.clearError({ error: this.createVTTError.name })
      }
      this.$emit('close')
    },
    confirmTransaction() {
      this.sendTransaction({ label: this.label })
      this.$emit('close')
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
  padding-right: 24px;
  width: 600px;
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
