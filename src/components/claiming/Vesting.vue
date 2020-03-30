<template>
  <NavigationCard
    data-test="vesting"
    :nextStep="nextStep"
    :previousStep="previousStep"
    nextText="Continue"
    previousText="Back"
    :disabledNextButton="false"
    :title="`${name}, this is your token allocation`"
  >
    <ClaimingInfo />
    <div class="info">
      <p class="text">
        Such allocation is conditioned to the succesful completion of this claiming process. Please
        verify that your information listed above is correct — if not, please ask
        <a class="link" href="mailto:genesis@witnet.foundation">genesis@witnet.foundation</a> for
        support.
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
export default {
  name: 'Vesting',
  components: {
    NavigationCard,
    ClaimingInfo,
  },
  computed: {
    ...mapState({
      name: state => state.wallet.claimingFileInfo.info.data.name,
    }),
  },
  methods: {
    nextStep() {
      this.$router.push('/claiming/create-wallet')
    },
    previousStep() {
      this.$router.push('/claiming/upload-file')
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
  &:last-of-type {
    margin: 0px;
  }
  .link {
    text-decoration: underline;
    color: inherit;
  }
}
</style>
