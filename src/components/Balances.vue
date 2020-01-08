<template>
  <div class="balances">
    <p class="header">
      BALANCES
    </p>
    <div class="entry">
      <p class="label">Available balance</p>
      <p v-if="available" class="value">{{ available }} <span class="currency">WIT</span></p>
      <p v-else class="empty-value">_</p>
    </div>
    <div class="entry">
      <p class="label">Timelocked</p>
      <p v-if="timelocked" class="value">{{ timelocked }} <span class="currency">WIT</span></p>
      <p v-else class="empty-value">_</p>
    </div>
    <div class="entry">
      <p class="label">Unconfirmed</p>
      <p v-if="unconfirmed" class="value">{{ unconfirmed }} <span class="currency">WIT</span></p>
      <p v-else class="empty-value">_</p>
    </div>
    <div class="entry">
      <p class="label">Total</p>
      <p v-if="total" class="value">{{ total }} <span class="currency">WIT</span></p>
      <p v-else class="empty-value">_</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Balances',
  props: {
    available: String,
    timelocked: String,
    unconfirmed: String,
    total: String,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.balances {
  min-width: 300px;

  .header {
    border-bottom: 1px solid $grey-0;
    margin-bottom: 24px;
    color: $grey-4;
    font-weight: bold;
  }

  .entry {
    display: flex;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;

    .label {
      color: $grey-5;
      margin-right: 16px;
    }

    .value {
      font-weight: bold;
      font-size: 20px;
      color: $grey-5;
      margin: 0px;
      padding: 0px;
      .currency {
        margin-left: 8px;
        font-size: 12px;
        color: $grey-4;
      }
    }
  }
}
</style>
