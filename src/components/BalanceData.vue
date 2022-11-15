<template>
  <div class="table">
    <p class="label">{{ $t('available') }}</p>
    <Amount
      data-test="available"
      :unit-light="true"
      class="amount"
      :amount="available"
    />
    <p v-if="Number(locked)" class="label"
      >{{ $t('locked_balance_label') }}
      <el-tooltip trigger="hover" effect="light">
        <font-awesome-icon class="info" icon="info-circle" />
        <div slot="content" class="info-message">
          <i18n-t keypath="locked_balance_tooltip" scope="global">
            <a class="link" :href="balanceLockedUrl" target="_blank"
              >{{ $t('locked_balance_tooltip_here') }}
              <font-awesome-icon class="external-link" icon="external-link-alt"
            /></a>
          </i18n-t>
        </div>
      </el-tooltip>
    </p>
    <Amount
      v-if="Number(locked)"
      data-test="locked"
      :unit-light="true"
      class="amount"
      :amount="locked"
    />
    <p v-if="Number(unconfirmed)" class="label">{{ $t('unconfirmed') }}</p>
    <Amount
      v-if="Number(unconfirmed)"
      data-test="unconfirmed"
      :unit-light="true"
      class="amount"
      :amount="unconfirmed"
    />
    <p class="label total">{{ $t('total_balance_label') }}</p>
    <Amount
      data-test="total"
      :unit-light="true"
      class="amount"
      :amount="total"
    />
  </div>
</template>

<script>
import { EXTERNAL_URL } from '@/constants'

import Amount from '@/components/Amount.vue'
/**
 * Show available, locked and total amount balances.
 */
export default {
  name: 'BalanceData',
  components: {
    Amount,
  },
  props: {
    /**
     * Specify in which unit display wits
     * @values wit, microWit, nanoWit
     */
    unit: {
      type: String,
      required: true,
    },
    /**
     * Available wits the user owns
     */
    available: {
      type: String,
      required: true,
    },
    /**
     * Unconfirmed wits the user owns
     */
    unconfirmed: {
      type: String,
      required: true,
    },
    /**
     * Locked wits that can't be spent yet
     */
    locked: {
      type: String,
      required: true,
    },
    /**
     * Total amount of wits: available + locked
     */
    total: {
      type: String,
      required: true,
    },
  },
  computed: {
    /**
     * External link to locked balances explanation
     */

    balanceLockedUrl() {
      return EXTERNAL_URL.BALANCE_LOCKED
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter {
  opacity: 0;
}

.info-message {
  color: var(--text-medium-emphasis);
  font-size: 13px;
  max-width: 250px;

  .link {
    color: var(--balance-link-color);
    text-decoration: underline;

    .external-link {
      font-size: 10px;
      margin-left: 4px;
    }
  }
}

.table {
  background-color: var(--balance-background);
  border-radius: 4px;
  box-shadow: var(--balance-box-shadow);
  display: grid;
  grid-template: auto auto auto / auto 1fr;
  margin-bottom: 10px;
  padding: 25px;
  row-gap: 12px;
  width: 100%;

  .label {
    color: var(--text-dark-background);
    font-size: 14px;

    &.total {
      font-size: 16px;
      font-weight: bold;
    }

    .info {
      color: var(--text-dark-background);
      font-size: 13px;
      margin-left: 4px;
    }
  }

  .amount {
    color: var(--text-dark-background);
    font-size: 16px;
    font-weight: bold;
    justify-self: end;
    width: max-content;

    .unit {
      font-size: 11px;
      font-weight: normal;
    }

    &.total {
      font-size: 16px;
      font-weight: bold;
    }
  }
}
</style>
