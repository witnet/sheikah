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
    <p v-for="step in vesting" :key="step.date">{{ step.date }} - {{ step.amount }} wits</p>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapState } from 'vuex'
import { calculateVesting } from '@/utils'
export default {
  name: 'Vesting',
  components: {
    NavigationCard,
  },
  computed: {
    ...mapState({
      vestingInfo: state => state.wallet.claimingFileInfo.info.data.vesting,
      genesisDate: state => state.wallet.claimingFileInfo.info.data.genesisDate,
      amount: state => state.wallet.claimingFileInfo.amount,
    }),

    vesting() {
      const vesting = calculateVesting(this.vestingInfo, this.amount, this.genesisDate)
      this.$store.commit('setComputedVesting', vesting)
      return vesting
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
