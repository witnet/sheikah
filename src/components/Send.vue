<template>
  <div class="send">
    <Alert
      data-test="alert"
      v-for="error in errors"
      :key="error.message"
      type="error"
      :message="error.message"
      :description="error.description"
      v-on:close="() => clearError(error.name)"
    />
    <div v-if="generatedTransaction" class="transaction-info">
      <div class="scroll">
        <div class="row">
          <p class="entry">Amount</p>
          <p class="value">{{ generatedTransaction.metadata.value }} Wit</p>
        </div>
        <!-- <div class="row">
          <p class="entry">Type</p>
          <p class="value">{{ generatedTransaction.type }}</p>
        </div> -->
        <div class="row">
          <p class="entry">To</p>
          <p class="value">{{ generatedTransaction.metadata.to }}</p>
        </div>
        <div class="row">
          <p class="entry">Fee</p>
          <p class="value">{{ generatedTransaction.metadata.fee }} uWit/B</p>
        </div>
        <div data-test="advance-options" v-if="isAdvancedVisible" class="row">
          <p class="entry">Inputs</p>
          <p></p>
          <div class="column">
            <p
              class="address value"
              v-for="input in generatedTransaction.transaction.ValueTransfer.body.inputs"
              :key="input.output_pointer"
            >
              {{ input.output_pointer }}
            </p>
          </div>
        </div>
        <div data-test="advance-options" v-if="isAdvancedVisible" class="row">
          <p class="entry">Outputs</p>
          <p></p>
          <div class="column">
            <p
              class="address value"
              v-for="output in generatedTransaction.transaction.ValueTransfer.body.outputs"
              :key="output.pkh"
            >
              <span>PKH: {{ output.pkh }}</span>
              <span>Amount: {{ output.value }}</span>
            </p>
          </div>
        </div>

        <div data-test="advance-options" v-if="isAdvancedVisible" class="row">
          <p class="entry">Bytes</p>
          <p></p>
          <div class="column">
            <p class="address value">{{ generatedTransaction.bytes }}</p>
          </div>
        </div>
      </div>
      <div class="confirm-advance-btn">
        <p
          v-if="isAdvancedVisible"
          data-test="advance-options"
          @click="toggleAdvanceOptions"
          class="link"
        >
          Show less
        </p>
        <p v-else data-test="show-advance-options" @click="toggleAdvanceOptions" class="link">
          Show advanced options
        </p>
        <span slot="footer" class="dialog-footer">
          <Button :onClick="closeDialog" data-test="cancel-tx" type="secondary" class="button">
            Cancel
          </Button>
          <Button
            :onClick="confirmTransaction"
            data-test="confirm-tx"
            type="primary"
            class="button"
          >
            Confirm
          </Button>
        </span>
      </div>
    </div>
    <div v-else data-test="tx-form">
      <div class="row">
        <div class="label">
          <label class for>Address</label>
        </div>
        <Input data-test="tx-address" v-model="form.address" placeholder="Recipient address" />
      </div>

      <div class="row">
        <div class="label">
          <label class for>Label</label>
        </div>
        <Input data-test="tx-label" v-model="form.label" />
      </div>
      <div class="row">
        <div class="label">
          <label class for>Amount</label>
        </div>
        <InputNumber v-model="form.amount" />
      </div>
      <div class="row">
        <div class="label">
          <label class for>Fee</label>
        </div>
        <Select v-model="form.fee" :options="form.options" />
      </div>
      <div class="submit">
        <Button
          @keydown.enter.esc.prevent="createVTT"
          data-test="sign-send-btn"
          :onClick="createVTT"
          type="primary"
        >
          Sign and send
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from './Button'
import Input from './Input'
import InputNumber from './InputNumber'
import Select from './Select'
import { mapState } from 'vuex'
import Alert from '@/components/Alert'

export default {
  name: 'send',
  components: {
    Button,
    Input,
    InputNumber,
    Select,
    Alert,
  },
  data() {
    return {
      isAdvancedVisible: false,
      showModal: false,
    }
  },
  props: {
    form: Object,
  },
  computed: {
    ...mapState({
      saveItemError: state => {
        if (state.wallet.errors.saveItem) {
          return {
            message: state.wallet.errors.saveItem.message,
            description: state.wallet.errors.saveItem.error.message,
            name: state.wallet.errors.saveItem.name,
          }
        }
      },
      errors() {
        if (this.$store.state.wallet.networkStatus !== 'error') {
          return [this.saveItemError].filter(error => !!error)
        } else {
          return []
        }
      },
    }),
    generatedTransaction() {
      return this.$store.state.wallet.generatedTransaction
    },
  },
  methods: {
    clearError: function(name) {
      return this.$store.commit('clearError', { error: name })
    },
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    confirmTransaction() {
      this.$store.dispatch('sendTransaction', { label: this.form.label })
      this.closeDialog()
    },
    createVTT() {
      this.$emit('create-VTT', this.form)
    },
    closeDialog() {
      if (this.errors) {
        this.isAdvancedVisible = false
        this.$emit('close')
      }
    },
  },
  watch: {
    generatedTransaction(value) {
      if (value) {
        this.showModal = true
      }
    },
  },
  beforeDestroy() {
    if (this.saveItemError) {
      this.clearError(this.saveItemError.name)
    }
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transaction-info {
  overflow-y: auto;
  align-items: center;
  display: flex;
  flex-direction: column;
  max-height: 50vh;
  .entry {
    font-weight: bold;
    font-size: 16px;
    color: $grey-6;
  }
  .value {
    max-width: 200px;
    font-size: 16px;
    font-weight: 400;
  }
  .row {
    padding: 16px 10px;
    width: 300px;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $grey-1;
    .column {
      display: flex;
      flex-direction: column;
    }
  }
  .scroll {
    overflow-y: auto;
    overflow-wrap: break-word;
  }
  .confirm-advance-btn {
    margin: 16px 0px 32px 0px;
    width: 300px;
    text-align: right;
    .link {
      padding: 24px;
      &:hover {
        cursor: pointer;
      }
    }
  }
}

.send {
  margin: 40px;
  .row {
    display: flex;
    align-items: flex-start;
    margin-bottom: 16px;

    .label {
      min-width: 64px;
      margin-right: 24px;
      margin-top: 8px;
      text-align: right;
    }
    .input {
      text-align: left;
      padding-left: 16px;
    }
  }
  .submit {
    width: 100%;
    text-align: right;
    padding-top: 10px;
  }
}

.dialog-footer {
  margin-top: 16px;
  .button {
    margin-right: 15px;
  }
}
</style>
