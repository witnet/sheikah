<template>
  <NavigationCard
    :next-step="nextStep"
    data-test="instructions"
    next-text="Start"
    title="About the Witnet Tokens Claiming Process"
    :disabled-next-button="false"
  >
    <p class="text">
      This wallet app will guide you through the process of taking full
      ownership of your Witnet tokens and protecting them with a secure
      password.
    </p>
    <p class="text bold">
      IMPORTANT: You must complete this process by 08:00am UTC, October 12th,
      2020 to ensure you have full ownership of your Witnet tokens.
    </p>
    <p class="text">
      The entire process will take no more than 5 minutes to complete. Before
      you start,
      <b class="text bold"
        >please make sure to have pen and paper on hand (THIS IS VERY
        IMPORTANT)</b
      >, as you will be required to write down some important information along
      the way.
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
