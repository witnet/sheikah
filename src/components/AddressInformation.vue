<template>
  <div v-if="loading" class="information loading">
    <DotsLoading size="10px" />
  </div>

  <div v-else-if="address" class="information">
    <div class="header">
      <p class="caption">
        Address <span class="number">#{{ index + 1 }}</span>
      </p>
      <el-tooltip
        v-if="!used && !copied"
        content="Copy"
        placement="bottom"
        effect="light"
      >
        <div class="copy" @click="copy">
          <font-awesome-icon class="icon" icon="copy" />
        </div>
      </el-tooltip>
      <el-tooltip
        v-if="!used && copied"
        content="Copied"
        placement="bottom"
        effect="light"
      >
        <div class="checked">
          <font-awesome-icon class="icon" icon="check" />
        </div>
      </el-tooltip>
    </div>
    <p v-if="address" class="address">{{ used ? blindAddress : address }}</p>

    <div v-if="!used" class="transactions">
      <Tag class="tag" color="green" text="NOT USED" />
      <p class="description">Received <span class="bold">0 payments</span>.</p>
    </div>
    <div v-else class="transactions">
      <Tag class="tag" color="red" text="USED" />
      <p class="description">
        Received <span class="bold">{{ payments }} payments</span> totalling
        <span class="bold"><Amount :amount="amount"/></span> from
        <span class="bold">{{ formatDateVerbose(firstPaymentDate) }}</span> to
        <span class="bold">{{ formatDateVerbose(lastPaymentDate) }}</span
        >.
      </p>
    </div>

    <p class="help">
      For privacy reasons, reusing addresses is highly discouraged.
      <a class="link" href="#">Learn more></a>.
    </p>
  </div>

  <div v-else class="information">
    <p>You haven't generated addresses yet. Click above to generate one.</p>
  </div>
</template>

<script>
import Amount from '@/components/Amount'
import DotsLoading from '@/components/DotsLoading'
import Tag from '@/components/Tag'
import { formatDateVerbose, copyToClipboard } from '@/utils'
/**
 * Show the information of a given address
 */
export default {
  name: 'AddressInformation',
  components: {
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
      type: Number,
      default: 0,
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
    }
  },
  computed: {
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
      }, 2000)
    },
    formatDateVerbose,
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.information {
  background: $white;
  min-height: 200px;
  padding: 25px;

  &.loading {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .header {
    align-items: center;
    color: $alt-grey-5;
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
        color: $alt-grey-4;
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
    color: $alt-grey-5;
    font-family: 'Roboto Mono';
    font-size: 12px;
    font-style: italic;
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
      color: $alt-grey-4;
      font-size: 12px;
      line-height: 150%;

      .bold {
        font-weight: 500;
      }
    }
  }

  .help {
    color: $alt-grey-5;
    font-size: 12px;
    font-style: italic;
    line-height: 150%;

    .link {
      color: $alt-grey-5;
      font-weight: 500;
      text-decoration: underline;
    }
  }
}
</style>

<docs>
### Example

#### Default
```jsx
  <AddressInformation
    :style="{ width: '350px' }"
    :index="0"
    :used="false"
    address="twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft"
    :amount="5000"
    :firstPaymentDate="new Date()"
    :lastPaymentDate="new Date()"
    :payments="0"
  />
```

#### Empty
```jsx
  <AddressInformation
    :style="{ width: '350px' }"
    :used="false"
  />
```
</docs>
