<template>
  
  <div v-if='transactions => 1' :class="`transaction ${border ? 'border' : ''}`">
    <div class="amount">
      <font-awesome-icon :class="`icon ${origin.toLowerCase()}`" :icon="arrowIcon" />
      <span :class="`number ${origin.toLowerCase()}`">{{ amount }}</span>
      <span class="wit">WIT</span>
    </div>

    <div class="address">
     <p class="origin"><span class="label">{{ origin }}</span> <span class="number">{{address}}</span></p>
    </div>

    <div class="">
      <p class="date">{{ date }}</p>
      <p class="block">Confirmed in block {{ block }}</p>
    </div>
  </div>
  
</template>

<script>

export default {
  name: 'Transaction',
  props: {
    address: String,
    amount: String,
    block: String,
    border: Boolean,
    date: String,
  },
  computed: {
    origin () {
      return this.amount.includes('+') ? 'From' : 'To'
    },
    arrowIcon () {
      return this.amount.includes('+') ? 'angle-right' : 'angle-left'
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

  .amount, .address {
    display: flex;
    align-items: center;
  }

  .amount {
    .icon {
      margin-right: 8px;
    }

    .number {
      font-size: 18px;
      font-weight: 500;
    }

    .from{
      color: $green-6;
    }

    .to{
      color: $red-6;
    }

    .wit {
      margin-left: 4px;
      color: $grey-6;
      font-size: 14px;
      font-weight: 600;
    }
  }

  .address {
   .origin {
      font-size: 14px;
      color: $grey-8;
      font-weight: 600;

      .label {
        margin-right: 4px;
        font-weight: 600;
        color: $grey-7;
      }

      &.from {
        color: $green-6;
      }

      &.to {
        color: $red-6;
      }

    }

    .address-number {
      color: $grey-8;
      font-size: 16px;
    }
  }

  .date {
    color: $grey-8;
    font-size: 14px;
    font-weight: 600;
  }

  .block {
    color: $grey-5;
    font-size: 14px;
    font-weight: 600;
  }
}
</style>
