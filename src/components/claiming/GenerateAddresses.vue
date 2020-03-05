<template>
  <NavigationCard
    :nextStep="nextStep"
    :previousStep="previousStep"
    data-test=""
    nextText="Next"
    previousText="Back"
    title="DownloadFile"
  >
    <InformativeContent :subtitle="subtitle" :texts="texts" />
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'

export default {
  name: 'GenerateAddresses',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle: 'GenerateAddresses',
      texts: {},
    }
  },
  methods: {
    nextStep() {
      this.$router.push('/claiming/countdown')
    },
    previousStep() {
      this.$router.push('/claiming/create-wallet')
    },
  },
}
</script>
