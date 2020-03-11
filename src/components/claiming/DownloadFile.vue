<template>
  <NavigationCard
    :nextStep="nextStep"
    :previousStep="previousStep"
    data-test=""
    nextText="Next"
    previousText="Back"
    title="DownloadFile"
  >
    {{ claimingFileInfo }}
    <InformativeContent :subtitle="subtitle" :texts="texts" />
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'
import { mapState } from 'vuex'

export default {
  name: 'DownloadFile',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle: 'DownloadFile',
      texts: {},
    }
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
      this.$router.push('/claiming/countdown')
    },
    previousStep() {
      this.$router.push('/claiming/generate-addresses')
    },
  },
  beforeCreate() {
    this.$store.dispatch('getClaimingInfo')
  },
}
</script>
