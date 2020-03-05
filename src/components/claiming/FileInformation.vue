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

export default {
  name: 'FileInformation',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle: 'File information',
      texts: {},
    }
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
