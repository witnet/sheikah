<template>
  <el-form ref="form" label-position="left" label-width="200px">
    <FormInformation
      :commit-and-reveal-fee="commitAndRevealFee"
      :fee="fee"
      :min-consensus-percentage="minConsensusPercentage"
      :reward-fee="rewardFee"
      :witnesses="witnesses"
      :timelock="timelock"
      :generated-transaction="generatedTransaction"
      type="DataRequest"
      @close-clear="goBack"
      @send="confirmDataRequest"
    />
  </el-form>
</template>

<script>
import FormInformation from '@/components/FormInformation.vue'

export default {
  name: 'ConfirmDataRequest',
  components: {
    FormInformation,
  },
  props: {
    commitAndRevealFee: {
      type: Number,
      required: true,
    },
    fee: {
      type: Number,
      required: true,
    },
    generatedTransaction: {
      type: Object,
      required: true,
    },
    minConsensusPercentage: {
      type: Number,
      required: true,
    },
    rewardFee: {
      type: Number,
      required: true,
    },
    witnesses: {
      type: Number,
      required: true,
    },
    timelock: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      isAdvancedVisible: true,
    }
  },
  methods: {
    toggleAdvanceOptions() {
      this.isAdvancedVisible = !this.isAdvancedVisible
    },
    confirmDataRequest() {
      this.$emit('confirm-dr')
    },
    goBack() {
      this.$emit('go-back')
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.title {
  color: $alt-grey-3;
  font-size: 18px;
  margin: 0 0 40px 32px;
}

.submit {
  margin-top: 32px;
  text-align: right;
  width: 100%;
}
</style>
