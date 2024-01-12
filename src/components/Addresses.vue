<template>
  <Fieldset
    :title="$t('addresses')"
    :subtitle="
      $tc('address_count', addresses.length, { count: addresses.length })
    "
  >
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
import { mapState, mapMutations } from 'vuex'
import Fieldset from '@/components/Fieldset.vue'
import AddressList from '@/components/AddressList.vue'
import AddressInformation from '@/components/AddressInformation.vue'

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
      selectedIndex: this.addresses.length - 1,
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
    isRadiantBorderActive(val) {
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
  border: var(--addresses-border);
  border-radius: 4px;
  box-shadow: 0 0 0 0 $purple-2;
  overflow: hidden;
  transition: box-shadow 0.4s linear;
  width: 100%;

  &.active {
    box-shadow: var(--addresses-active-box-shadow);
  }
}
</style>
