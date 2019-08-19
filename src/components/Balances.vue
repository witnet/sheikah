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
    available: Number,
    timelocked: Number,
    unconfirmed: Number,
    total: Number,
  },
}
</script>

<style scoped lang="scss">
.balances {
  min-width: 300px;

  .header {
    border-bottom: 1px solid #b3b3b3;
    margin-bottom: 24px;
    color: #808080;
    font-weight: bold;
  }

  .entry {
    display: flex;
    margin-bottom: 16px;
    display: flex;
    justify-content: space-between;

    .label {
      color: #4d4d4d;
      margin-right: 16px;
    }

    .value {
      font-weight: bold;
      font-size: 18px;
      color: #4d4d4d;
      .currency {
        margin-left: 4px;
        font-size: 12px;
        color: #b3b3b3;
      }
    }
  }
}
</style>
