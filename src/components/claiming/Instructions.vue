<template>
  <NavigationCard
    :next-step="nextStep"
    data-test="instructions"
    next-text="Start"
    title="About the Witnet Tokens Claiming Process"
    :disabled-next-button="false"
  >
    <p class="text">
      This process is reserved for participants of the Witnet Token Generation
      Event. That is, persons who hold any right to get Witnet tokens allocated
      to them in the first block of the Witnet block chain.
    </p>
    <p class="text">
      The Sheikah Wallet app will guide you through the process of taking full
      direct ownership of your Witnet tokens and protecting them with a
      password.
    </p>
    <p class="text"
      >At the end of the process, a "tokens claim file" will be generated and
      you will receive an email as a confirmation of your token claim.</p
    >
    <p class="text bold">
      IMPORTANT: completing this process by October 10—including sending the
      claim file over email—is strictly needed for taking direct ownership of
      your Witnet tokens.
    </p>
    <p class="text">
      The entire process will take no more than 5 minutes. Before you start,
      please make sure to have pen and paper on hand, as you will be required to
      note down some important information along the way.
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
