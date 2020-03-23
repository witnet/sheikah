<template>
  <NavigationCard
    data-test="vesting"
    :nextStep="nextStep"
    :previousStep="previousStep"
    nextText="Continue"
    previousText="Back"
    title="Vesting"
  >
    <p>You will unlock the following amount of wits</p>
    <p v-for="step in steps" :key="step.date">{{ step.date }} - {{ step.amount }} wits</p>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapState } from 'vuex'
import { changeDateFormat } from '@/utils'
export default {
  name: 'Vesting',
  components: {
    NavigationCard,
  },
  computed: {
    ...mapState({
      cliff: state => state.wallet.claimingFileInfo.info.data.vesting.cliff,
      delay: state => state.wallet.claimingFileInfo.info.data.vesting.delay,
      installmentLength: state => state.wallet.claimingFileInfo.info.data.vesting.installmentLength,
      installmentWits: state => state.wallet.claimingFileInfo.info.data.vesting.installmentWits,
      genesisDate: state => state.wallet.claimingFileInfo.info.data.genesisDate,
      amount: state => state.wallet.claimingFileInfo.amount,
    }),

    steps() {
      const numberOfSteps = Math.ceil(this.amount / this.installmentWits)
      let amount = this.amount
      const steps = Array(numberOfSteps)
        .fill(0)
        .map((_, index) => {
          console.log('---', this.genesisDate)
          let date = new Date(this.genesisDate)
          date.setSeconds(
            date.getSeconds() + this.delay + this.cliff + this.installmentLength * index
          )
          let currentAmount = amount >= this.installmentWits ? this.installmentWits : amount
          amount -= this.installmentWits
          return {
            date: changeDateFormat(date),
            amount: currentAmount,
          }
        })
      return steps
    },
    amount() {
      return 1000
    },
  },
  methods: {
    nextStep() {
      this.$router.push('/claiming/create-wallet')
    },
    previousStep() {
      this.$router.push('/claiming/file-information')
    },
  },
}
</script>
<style lang="scss" scoped>
.text {
  margin-bottom: 8px;

  &.bold {
    font-weight: bold;
    margin-bottom: 16px;
  }
}
</style>
