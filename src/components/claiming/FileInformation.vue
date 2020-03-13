<template>
  <NavigationCard
    :nextStep="nextStep"
    :previousStep="previousStep"
    nextText="Next"
    previousText="Back"
    title="File Information"
  >
    <InformativeContent :subtitle="subtitle" :texts="text" />
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
      text: {
        0: 'A:',
        1: 'B:',
      },
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
      this.$router.push('/claiming/create-wallet')
    },
    previousStep() {
      this.$router.push('/claiming/upload-file')
    },
  },
}
</script>
