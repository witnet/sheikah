<template>
  <Fieldset title="Addresses" :subtitle="`${addresses.length} addresses`">
    <div class="card" :class="{ active: isRadiantBorderActive }">
      <AddressList
        :addresses="addresses"
        :selected="selectedIndex"
        v-on:generate-address="$emit('generate-address')"
        v-on:select-address="selectAddress"
      />
      {{ selectedAddress }}
      <AddressInformation
        v-if="selectedAddress"
        :pkh="selectedAddress.pkh"
        :index="selectedIndex"
        :used="selectedAddress.used"
        :amount="selectedAddress.receivedAmount"
        :currency="currency"
        :firstPaymentDate="selectedAddress.firstPaymentDate"
        :lastPaymentDate="selectedAddress.lastPaymentDate"
        :payments="selectedAddress.receivedPayments"
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
  computed: {
    ...mapState({
      isRadiantBorderActive: state => {
        return state.uiInteractions.receiveTransactionClicked
      },
    }),
    selectedAddress() {
      return this.selectedIndex >= 0 ? this.addresses[this.selectedIndex] : { pkh: '', used: false }
    },
  },
  data() {
    return {
      selectedIndex: this.addresses.length - 1 || null,
    }
  },
  methods: {
    ...mapMutations({
      clearTransactionClicked: 'clearTransactionClicked',
    }),
    selectAddress(i) {
      this.selectedIndex = i
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
      }
    },
  },
  props: {
    /**
     * List of available addresses
     */
    addresses: {
      required: true,
      type: Array,
    },
    currency: {
      required: true,
      type: String,
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.card {
  border: 1px solid $grey-1;
  border-radius: 4px;
  overflow: hidden;
  width: 350px;

  box-shadow: 0px 0px 0px 0px $purple-2;
  transition: box-shadow 0.4s linear;

  &.active {
    box-shadow: 0px 0px 6px 1px $purple-2;
  }
}
</style>

<docs>
### Example
#### Default

```jsx
  <Addresses :addresses="[{
    pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0ft',
    index: 0,
    used: false,
    amount: 5000,
    currency: 'nanoWits',
    firstPaymentDate: new Date(),
    lastPaymentDate: new Date(),
    payments: 0,
  },
  {
    pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
    index: 0,
    used: true,
    amount: 5000,
    currency: 'nanoWits',
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
