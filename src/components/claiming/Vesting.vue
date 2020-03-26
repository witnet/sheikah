<template>
  <NavigationCard
    data-test="vesting"
    :nextStep="nextStep"
    :previousStep="previousStep"
    nextText="Continue"
    previousText="Back"
    :title="`${name}, this is your token allocation`"
  >
    <ClaimingInfo />
    <div class="info">
      <p class="text">
        Such allocation is conditioned to the succesful completion of this claiming process. Please
        verify that your information listed above is correct — if not, please ask
        genesis@witnet.foundation for support.
      </p>
      <p class="text">
        This information will be available after the token generation event through the main Sheikah
        wallet interface. However, feel free to take a screenshot or picture using your phone as a
        means of backup.
      </p>
    </div>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import ClaimingInfo from '@/components/claiming/ClaimingInfo'
import { mapState } from 'vuex'
import { calculateVesting, changeDateFormat } from '@/utils'
export default {
  name: 'Vesting',
  components: {
    NavigationCard,
    ClaimingInfo,
  },
  computed: {
    ...mapState({
      claimingFileInfo: state => state.wallet.claimingFileInfo.info,
      name: state => state.wallet.claimingFileInfo.info.data.name,
      vestingInfo: state => state.wallet.claimingFileInfo.info.data.vesting,
      genesisDate: state => state.wallet.claimingFileInfo.info.data.genesisDate,
      amount: state => state.wallet.claimingFileInfo.info.data.wit,
    }),

    vesting() {
      console.log('claiming info', this.claimingFileInfo)
      const vesting = calculateVesting(this.vestingInfo, this.amount, this.genesisDate)
      this.$store.commit('setComputedVesting', vesting)
      return vesting
    },
  },
  methods: {
    changeDateFormat,
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
.info {
  margin: 32px 16px 0px 16px;
}
.text {
  margin-bottom: 8px;

  &.bold {
    font-weight: bold;
    margin-bottom: 16px;
  }
}
</style>
