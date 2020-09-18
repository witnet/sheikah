<template>
  <Fieldset title="Addresses" :subtitle="`${addresses.length} addresses`">
    <div class="card" :class="{ active: isRadiantBorderActive }">
      <AddressList
        :addresses="addresses"
        :selected="selectedIndex"
        @generate-address="$emit('generate-address')"
        @select-address="selectAddress"
      />
      <AddressInformation
        v-if="selectedAddress"
        :address="selectedAddress.address"
        :index="selectedIndex"
        :used="selectedAddress.used"
        :amount="selectedAddress.receivedAmount"
        :first-payment-date="selectedAddress.firstPaymentDate"
        :last-payment-date="selectedAddress.lastPaymentDate"
        :payments="selectedAddress.receivedPayments"
        :loading="generateAddressLoading"
      />
    </div>
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/Fieldset'
import AddressList from '@/components/AddressList'
import AddressInformation from '@/components/AddressInformation'
import { mapState, mapMutations } from 'vuex'

/**
 * List all the addresses and show the information of the selected one
 */
export default {
  name: 'Addresses',
  components: {
    Fieldset,
    AddressList,
    AddressInformation,
  },
  props: {
    /**
     * List of available addresses
     */
    addresses: {
      required: true,
      type: Array,
    },
  },
  data() {
    return {
      selectedIndex: this.addresses.length ? this.addresses.length - 1 : 0,
    }
  },
  computed: {
    ...mapState({
      generateAddressLoading: state => {
        return state.uiInteractions.generateAddressLoading
      },
      isRadiantBorderActive: state => {
        return state.uiInteractions.receiveTransactionClicked
      },
    }),
    selectedAddress() {
      return this.selectedIndex >= 0
        ? this.addresses[this.selectedIndex]
        : { address: '', used: false }
    },
  },
  watch: {
    isRadiantBorderActive(val, oldVal) {
      if (val) {
        setTimeout(() => {
          this.clearTransactionClicked()
        }, 2000)
      }
    },
    addresses(val, oldVal) {
      if (val.length !== oldVal.length) {
        this.selectedIndex = val.length - 1

        // clear loading state
        this.clearGenerateAddressLoading()
      }
    },
  },
  methods: {
    ...mapMutations({
      clearTransactionClicked: 'clearTransactionClicked',
      clearGenerateAddressLoading: 'clearGenerateAddressLoading',
    }),
    selectAddress(i) {
      this.selectedIndex = i
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.card {
  border: 1px solid $grey-1;
  border-radius: 4px;
  box-shadow: 0 0 0 0 $purple-2;
  overflow: hidden;
  transition: box-shadow 0.4s linear;
  width: 350px;

  &.active {
    box-shadow: 0 0 6px 1px $purple-2;
  }
}
</style>

<docs>
### Example
#### Default

```jsx
  <Addresses :addresses="[{
    address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
    index: 0,
    used: false,
    receivedAmount: 5000,
    firstPaymentDate: new Date(),
    lastPaymentDate: new Date(),
    payments: 0,
  },
  {
    address: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
    index: 0,
    used: true,
    receivedAmount: 5000,
    firstPaymentDate: new Date(),
    lastPaymentDate: new Date(),
    payments: 1,
  }]" />
```

#### Empty

```jsx
  <Addresses :addresses="[]" />
```
</docs>
