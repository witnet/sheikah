<template>
  <NavigationCard
    :nextStep="previousStep"
    :previousStep="() => {}"
    data-test=""
    nextText="Back"
    title="Countdown"
  >
    <InformativeContent :subtitle="subtitle" :texts="texts" />
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'
import InformativeContent from '@/components/card/InformativeContent'

export default {
  name: 'Countdown',
  components: {
    NavigationCard,
    InformativeContent,
  },
  data() {
    return {
      subtitle: 'Countdown',
      texts: {},
    }
  },
  methods: {
    previousStep() {
      this.$router.push('/claiming/download-file')
    },
  },
}
</script>
