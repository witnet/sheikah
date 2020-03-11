<template>
  <NavigationCard
    :nextStep="nextStep"
    :previousStep="previousStep"
    data-test=""
    nextText="Next"
    previousText="Back"
    title="File Information"
  >
    <InformativeContent :subtitle="subtitle" :texts="texts" />
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'
import { mapState } from 'vuex'

export default {
  name: 'FileInformation',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle: 'Claiming information',
      texts: {},
    }
  },
  created() {
    this.fillInfo()
  },
  computed: {
    ...mapState({
      claimingFileInfo: state => {
        return state.wallet.claimingFileInfo
      },
    }),
  },
  methods: {
    fillInfo() {
      this.texts = {
        0: this.claimingFileInfo.name,
        1: this.claimingFileInfo.description,
      }
    },
    nextStep() {
      this.$router.push('/claiming/create-wallet')
    },
    previousStep() {
      this.$router.push('/claiming/upload-file')
    },
  },
}
</script>
