<template>
  <NavigationCard
    :nextStep="nextStep"
    data-test="instructions"
    nextText="Start"
    title="About the Witnet token claiming process"
    :disabledNextButton="false"
  >
    <p class="text bold">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed ac ipsum
      cursus, consequat quam in, vestibulum erat. Duis ut diam fringilla, varius
      diam ac, ornare arcu.
    </p>
    <p class="text">
      Nulla facilisi. Praesent fermentum urna magna, et vehicula odio venenatis
      vitae. Cras lacinia arcu id orci viverra, et semper metus ullamcorper.
      Donec tempus diam velit, eu pellentesque odio imperdiet mattis.
      Suspendisse eu mollis leo, nec posuere augue. Suspendisse eget nulla
      libero. Aenean velit justo, efficitur ac interdum ut, suscipit in ex.
      Nulla facilisi. Quisque mattis, tellus nec mollis maximus, eros sapien
      vulputate ligula, at dignissim orci ipsum vel justo. Donec quis rhoncus
      ex, eget posuere augue.
    </p>
  </NavigationCard>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'Instructions',
  components: {
    NavigationCard,
  },
  methods: {
    nextStep() {
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
    margin-bottom: 8px;
  }

  &:last-of-type {
    margin: 0;
  }
}
</style>
