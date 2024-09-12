<template>
  <el-form
    ref="sendForm"
    class="form"
    data-test="tx-form"
    :model="form"
    label-position="top"
    :rules="rules"
    width="max-content"
  >
    <el-form-item :label="t('address')" prop="address">
      <el-input
        v-model="form.address"
        v-focus
        tabindex="1"
        :placeholder="t('address_placeholder')"
        data-test="tx-address"
        :maxlength="addressLength"
      />
    </el-form-item>
    <el-form-item :label="t('amount')" prop="amount">
      <!-- FIXME(#1188): create InputWit component after assess how to pass Element validation between transparent wrapper -->
      <el-input v-model="form.amount" tabindex="3" data-test="tx-amount">
        <template #append>
          <AppendUnit @change-unit="changeUnit" />
        </template>
      </el-input>
    </el-form-item>
    <transition name="slide">
      <div v-if="isAdvancedVisible">
        <div class="label">
          {{ t('timelock') }}
          <el-tooltip trigger="hover" effect="light">
            <font-awesome-icon class="info" icon="info-circle" />
            <template #content>
              <div class="info-message">
                {{ t('timelock_tooltip') }}
              </div>
            </template>
          </el-tooltip>
        </div>
        <el-date-picker
          v-model="form.timelock"
          type="datetime"
          :placeholder="t('select_date')"
          :default-time="new Date()"
          value-format="x"
        />
      </div>
    </transition>
    <p v-if="createVTTError" class="error">{{ createVTTError.message }}</p>
    <div class="submit">
      <el-link
        v-if="isAdvancedVisible"
        data-test="advance-options"
        class="link"
        @click="toggleAdvanceOptions"
      >
        {{ t('show_less') }}
        <CustomIcon class-name="icon" name="close" />
      </el-link>
      <el-link
        v-else
        data-test="show-advance-options"
        class="link"
        @click="toggleAdvanceOptions"
      >
        {{ t('show_advance') }}
        <CustomIcon class-name="icon" name="open" />
      </el-link>
      <el-button
        class="send-btn"
        tabindex="6"
        type="primary"
        data-test="sign-send-btn"
        @click="tryCreateVTT"
      >
        {{ t('continue') }}
      </el-button>
    </div>
  </el-form>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, onMounted, reactive, ref, watch, toRefs } from 'vue'
import { useI18n } from 'vue-i18n'
import AppendUnit from '@/components/AppendUnit.vue'
import { standardizeWitUnits } from '@/utils'
import FormValidation from '@/services/FormValidation'
import { VTT_DEFAULT_VALUES, WIT_UNIT } from '@/constants'
import CustomIcon from '@/components/CustomIcon.vue'

const store = useStore()
const { t } = useI18n()
const props = defineProps({
  vttValues: {
    type: Object,
    required: true,
  },
})
const addressLength = computed(() => {
  return network.value && network.value.toLowerCase() === 'mainnet' ? 42 : 43
})

const network = computed(() => store.getters.network)
const unit = computed(() => store.state.wallet.unit)
const createVTTError = computed(() => store.state.wallet.errors.createVTT)
const availableBalance = computed(() => store.state.wallet.balance.available)
const formValidation = new FormValidation({
  unit: unit.value,
  balance: availableBalance.value,
  feeType: null,
})
const isGrtThanBalance = (rule: any, value: any, callback: any) => {
  return formValidation.isGrtThanBalance(rule, value, callback)
}
const isDecimalAmountValid = (rule: any, value: any, callback: any) => {
  return formValidation.isDecimalAmountValid(rule, value, callback)
}
const maxNumber = (rule: any, value: any, callback: any) => {
  return formValidation.maxNumber(rule, value, callback)
}
const integerNanoWit = (rule: any, value: any, callback: any) => {
  return formValidation.integerNanoWit(rule, value, callback)
}
const minAmount = (rule: any, value: any, callback: any) => {
  return formValidation.minAmount(rule, value, callback)
}
const isNumber = (rule: any, value: any, callback: any) => {
  return formValidation.isNumber(rule, value, callback)
}

const sendForm = ref()
const isAdvancedVisible = ref(false)
const form = reactive(VTT_DEFAULT_VALUES)
const { amount } = toRefs(form)
const rules = ref({
  address: [
    {
      required: true,
      message: t('required_field'),
      trigger: 'blur',
    },
    {
      min: 42,
      max: 43,
      message: t('address_validation_default'),
      trigger: 'blur',
    },
  ],
  label: [],
  amount: [
    {
      required: true,
      message: t('required_field'),
      trigger: 'blur',
    },
    {
      validator: isDecimalAmountValid,
      trigger: 'blur',
    },
    {
      validator: isGrtThanBalance,
      trigger: 'blur',
    },
    { validator: isNumber, trigger: 'blur' },
    { validator: minAmount, trigger: 'submit' },
    {
      validator: integerNanoWit,
      trigger: 'submit',
    },
    { validator: maxNumber, trigger: 'blur' },
  ],
})
const emits = defineEmits(['set-vtt-values', 'close'])

const clearError = ({ error }: { error: string }) =>
  store.commit('clearError', { error })

function toggleAdvanceOptions() {
  isAdvancedVisible.value = !isAdvancedVisible.value
}

function changeUnit(prevUnit: any, newUnit: any) {
  amount.value = form.amount
    ? standardizeWitUnits(form.amount, newUnit, prevUnit, 2)
    : null
}
function tryCreateVTT() {
  sendForm.value.validate((valid: boolean) => {
    if (valid) {
      emits('set-vtt-values', {
        label: form.label,
        address: form.address,
        amount: form.amount,
        fee: form.fee,
        timelock: form.timelock,
      })
    }
  })
}

onMounted(() => {
  console.log(props.vttValues)
  form.address = props.vttValues.address
  form.amount = props.vttValues.value
  form.timelock = props.vttValues.timelock
})

watch(
  form,
  () => {
    if (createVTTError.value) {
      clearError({ error: createVTTError.value.name })
    }
  },
  { deep: true },
)

watch(amount, (newAmount, oldAmount) => {
  const witAmount = standardizeWitUnits(newAmount, WIT_UNIT.WIT, unit.value, -1)
  if (
    formValidation.hasDecimals(newAmount) &&
    formValidation.amountValidated(newAmount)
  ) {
    const isValid = formValidation.decimalsValidated(witAmount)
    if (!isValid) {
      amount.value = oldAmount
    }
  }
})

watch(
  addressLength,
  len => {
    rules.value.address = [
      {
        required: true,
        message: t('required_field'),
        trigger: 'blur',
      },
      {
        min: len,
        max: len,
        message: t('address_length_validation', { variable: len }),
        trigger: 'blur',
      },
    ]
  },
  {
    immediate: true,
  },
)
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
  margin-bottom: 8px;
  word-break: break-word;
}

.label {
  color: var(--text-medium-emphasis);
  margin-bottom: 16px;

  .info {
    font-size: 13px;
    margin-left: 4px;
  }
}

.form {
  width: 600px;
}

.switch {
  justify-content: flex-end;
  margin-bottom: 16px;
  width: 100%;
}

.submit {
  display: flex;
  flex-direction: column;
  text-align: right;
  width: 100%;
  margin-top: 24px;

  .link {
    font-size: 14px;
    text-align: left;
    width: fit-content;

    .icon {
      width: 8px;
    }

    &:hover {
      cursor: pointer;
    }
  }

  .send-btn {
    align-self: flex-end;
  }
}
</style>
