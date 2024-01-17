<template>
  <div v-if="loading" class="information loading">
    <DotsLoading size="10px" />
  </div>
  <div v-else-if="address" class="information">
    <div class="header">
      <p class="caption">
        {{ $t('address') }}
        <span class="number">#{{ index + 1 }}</span>
      </p>
      <el-tooltip
        v-if="!used && !copied"
        :content="$t('copy')"
        placement="bottom"
        effect="light"
      >
        <div class="copy" @click="copy">
          <font-awesome-icon class="icon" icon="copy" />
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="!used && copied"
        v-model="copied"
        manual
        :content="$t('copied')"
        placement="bottom"
        effect="light"
      >
        <div class="checked">
          <font-awesome-icon class="icon" icon="check" />
        </div>
      </el-tooltip>
    </div>

    <Address class="address" :value="address" :blind="used" />
    <div v-if="!used" class="transactions">
      <Tag class="tag" color="green" :text="$t('not_used')" />
      <p class="description"
        >{{ $t('received', payments, { count: payments }) }}
        <span class="bold">{{
          $t('payment', payments, { count: payments })
        }}</span
        >.</p
      >
    </div>
    <div v-else class="transactions">
      <Tag class="tag" color="red" :text="$t('used')" />
      <p class="description">
        {{ $t('received', payments, { count: payments }) }}
        <span class="bold">{{
          $t('payment', payments, { count: payments })
        }}</span>
        {{ $t('totalling') }}
        <span class="bold"><Amount :amount="amount" /></span>
        {{ $t('from') }}
        <span class="bold">{{
          formatDateVerbose(firstPaymentDate, locale)
        }}</span>
        {{ $t('to') }}
        <span class="bold">{{
          formatDateVerbose(lastPaymentDate, locale)
        }}</span
        >.
      </p>
    </div>

    <p class="help">
      {{ $t('reusing_address_alert') }}
      <a class="link" href="#">{{ $t('learn_more') }} ></a>.
    </p>
  </div>
  <div v-else class="information">
    <p>{{ $t('addresses_empty') }}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Amount from '@/components/Amount.vue'
import DotsLoading from '@/components/DotsLoading.vue'
import Address from '@/components/Address.vue'
import Tag from '@/components/Tag.vue'
import { formatDateVerbose, copyToClipboard } from '@/utils'
/**
 * Show the information of a given address
 */
export default {
  name: 'AddressInformation',
  components: {
    Address,
    Amount,
    DotsLoading,
    Tag,
  },
  props: {
    /**
     * Index of the address selected
     */
    index: {
      default: 0,
      type: Number,
    },
    /**
     * Indicates if the address has been used
     */
    used: {
      type: Boolean,
      default: false,
    },
    /**
     * selected address
     */
    address: {
      type: String,
      default: '',
    },
    /**
     * Amount of wits of the address
     */
    amount: {
      type: String,
      default: '0',
    },
    /**
     * How many payments has receive the selected address
     */
    payments: {
      type: Number,
      default: 0,
    },
    /**
     * Date in which the address received the first payment
     */
    firstPaymentDate: {
      type: Date,
      default: null,
    },
    /**
     * Date in which the address received the last payment
     */
    lastPaymentDate: {
      type: Date,
      default: null,
    },
    /**
     * Indicates if a loading state should be shown
     */
    loading: {
      type: Boolean,
    },
  },
  data() {
    return {
      copied: false,
      toogleNotification: false,
    }
  },
  computed: {
    ...mapState({
      locale: state => state.wallet.locale,
    }),
    blindAddress() {
      const start = this.address.slice(0, 20)
      const end = this.address.slice(-16)

      return start + ' ... ' + end
    },
  },
  methods: {
    copy() {
      copyToClipboard(this.address)
      this.copied = true
      setTimeout(() => {
        this.copied = false
      }, 3000)
    },
    formatDateVerbose,
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.information {
  background: var(--card-background);
  color: var(--text-medium-emphasis);
  min-height: 200px;
  padding: 25px;

  &.loading {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .header {
    align-items: center;
    color: var(--text-medium-emphasis);
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;

    .caption {
      font-size: 16px;
      font-weight: 500;

      .number {
        font-weight: bold;
      }
    }

    .checked {
      align-items: center;
      color: $green-4;
      display: flex;
      height: 24px;
      justify-content: center;
      padding: 5px;
      user-select: none;
      width: 24px;

      .icon {
        color: $green-3;
        width: 14px;
      }
    }

    .copy {
      align-items: center;
      background: $grey-0;
      border: 1px solid $grey-1;
      border-radius: 2px;
      cursor: pointer;
      display: flex;
      height: 24px;
      justify-content: center;
      padding: 5px;
      user-select: none;
      width: 24px;

      .icon {
        color: $alt-grey-3;
        width: 11px;
      }

      &:active {
        border-color: $purple-2;

        .icon {
          color: $purple-2;
        }
      }
    }
  }

  .address {
    margin-bottom: 15px;
  }

  .transactions {
    align-items: center;
    display: flex;
    margin-bottom: 15px;

    .tag {
      margin-right: 18px;
    }

    .description {
      color: var(--text-low-emphasis);
      font-size: 12px;
      line-height: 150%;

      .bold {
        font-weight: 500;
      }
    }
  }

  .help {
    color: var(--text-medium-emphasis);
    font-size: 12px;
    font-style: italic;
    line-height: 150%;

    .link {
      color: var(--text-medium-emphasis);
      font-weight: 500;
      text-decoration: underline;
    }
  }
}
</style>
