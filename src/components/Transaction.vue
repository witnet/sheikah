<template>
  <div v-if="transactions => 1" :class="`transaction ${border ? 'border' : ''}`">
    <div class="amount">
      <font-awesome-icon :class="`icon ${origin.toLowerCase()}`" :icon="arrowIcon" />
      <span :class="`number ${origin.toLowerCase()}`">{{ amount }}</span>
      <span class="wit">{{ currency }}</span>
    </div>
    <div class="label">
      {{ label }}
    </div>
    <div class="">
      <p class="date">{{ date }}</p>
      <p class="block">Confirmed in block #{{ block }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Transaction',
  props: {
    currency: String,
    address: String,
    amount: String,
    block: [String, Number],
    border: Boolean,
    date: String,
    label: String,
    id: String,
  },
  computed: {
    origin() {
      return this.amount > 0 ? 'From' : 'To'
    },
    arrowIcon() {
      return this.amount > 0 ? 'angle-right' : 'angle-left'
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.transaction {
  padding: 8px 0;
  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-column-gap: 24px;

  &.border {
    border-bottom: 1px solid lightgray;
  }

  .amount,
  .address {
    display: flex;
    align-items: center;
  }

  .amount {
    .icon {
      margin-right: 8px;
    }

    .number {
      font-size: 16px;
      font-weight: 500;
    }

    .from {
      color: $green-5;
    }

    .to {
      color: $red-4;
    }

    .wit {
      margin-left: 8px;
      color: $alt-grey-5;
      font-size: 16px;
      font-weight: 600;
    }
  }

  .label {
    align-items: center;
    display: flex;
    justify-content: center;
    color: $alt-grey-5;
    font-size: 16px;
    font-weight: 600;
  }

  .date {
    color: $alt-grey-5;
    font-size: 16px;
    font-weight: 600;
    text-align: right;
  }

  .block {
    color: $alt-grey-5;
    font-size: 16px;
    font-weight: 600;
  }
}
</style>
