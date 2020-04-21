<template>
  <Fieldset title="Addresses" :subtitle="`${addresses.length} addresses`">
    <div class="card">
      <AddressList
        :addresses="addresses"
        :selected="selectedIndex"
        v-on:generate-address="$emit('generate-address')"
        v-on:select-address="selectAddress"
      />
      <!-- TODO: pass correct props when wallet implement addresses details -->
      <AddressInformation
        :pkh="selectedAddress.pkh"
        :index="selectedIndex"
        :used="selectedAddress.used"
        :amount="selectAddress.amount"
        :unit="selectedAddress.unit"
        :firstDate="selectedAddress.firstDate"
        :lastDate="selectedAddress.lastDate"
        :payments="selectedAddress.payments"
      />
    </div>
  </Fieldset>
</template>

<script>
import Fieldset from '@/components/Fieldset'
import AddressList from '@/components/AddressList'
import AddressInformation from '@/components/AddressInformation'

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
    selectAddress(i) {
      this.selectedIndex = i
    },
  },
  watch: {
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
    unit: 'nanoWits',
    firstDate: new Date(),
    lastDate: new Date(),
    payments: 0,
  },
  {
    pkh: 'twit1270yg7pkm2w9mlq56r0mzrwph3flrp862zw0fa',
    index: 0,
    used: true,
    amount: 5000,
    unit: 'nanoWits',
    firstDate: new Date(),
    lastDate: new Date(),
    payments: 1,
  }]" />
```

#### Empty

```jsx
  <Addresses :addresses="[]" />
```
</docs>
