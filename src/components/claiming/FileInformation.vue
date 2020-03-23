<template>
  <NavigationCard
    data-test="file-information"
    :nextStep="nextStep"
    :previousStep="previousStep"
    nextText="Sign and continue"
    previousText="Back"
    title="File Information"
  >
    <p class="text bold">
      Claiming information,
    </p>
    <p class="text">
      Nulla facilisi. Praesent fermentum urna magna, et vehicula odio venenatis vitae. Cras lacinia
      arcu id orci viverra, et semper metus ullamcorper. Donec tempus diam velit, eu pellentesque
      odio imperdiet mattis. Suspendisse eu mollis leo, nec posuere augue. Suspendisse eget nulla
      libero. Aenean velit justo, efficitur ac interdum ut, suscipit in ex. Nulla facilisi. Quisque
      mattis, tellus nec mollis maximus, eros sapien vulputate ligula, at dignissim orci ipsum vel
      justo. Donec quis rhoncus ex, eget posuere augue.
    </p>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import { mapState } from 'vuex'

export default {
  name: 'FileInformation',
  components: {
    NavigationCard,
  },
  computed: {
    ...mapState({
      claimingFileInfo: state => {
        return state.wallet.claimingFileInfo
      },
    }),
  },
  methods: {
    nextStep() {
      this.$router.push('/claiming/vesting')
    },
    previousStep() {
      this.$router.push('/claiming/upload-file')
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
