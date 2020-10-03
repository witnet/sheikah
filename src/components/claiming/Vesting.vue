<template>
  <NavigationCard
    data-test="vesting"
    :next-step="nextStep"
    :previous-step="previousStep"
    next-text="Continue"
    previous-text="Back"
    :disabled-next-button="false"
    :width="700"
    :title="`${name.split(' ')[0]}, this is your token allocation`"
  >
    <ClaimingInfo />
    <div class="info">
      <p class="text">
        Your allocation is dependent on the successful completion of this
        claiming process. Please verify that the participation amount displayed
        above is correct — if not, please contact
        <a class="link" href="mailto:genesis@witnet.foundation"
          >genesis@witnet.foundation</a
        >
        immediately for support.
      </p>
      <p class="text">
        You will always be able to retrieve this information through this wallet
        interface. However, feel free to take a screenshot or picture using your
        phone as a means of backup.
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
      this.$router.push('/claiming/disclaimer/0')
    },
    previousStep() {
      this.$router.push('/claiming/upload-file')
    },
  },
}
</script>

<style lang="scss" scoped>
.info {
  margin: 32px 16px 0 16px;
}

.text {
  margin-bottom: 8px;

  &.bold {
    font-weight: bold;
    margin-bottom: 16px;
  }

  &:last-of-type {
    margin: 0;
  }

  .link {
    color: inherit;
    text-decoration: underline;
  }
}
</style>
