<template>
  <NavigationCard
    :nextStep="areAddressesGenerated ? nextStep : null"
    data-test="generate-addresses"
    nextText="Continue"
    title="Generate addresses"
  >
    <p class="text">
      To enhance your privacy, the Sheikah wallet divides your tokens among multiple addresses that
      are difficult to associate with each other. Your first addresses are now being generated. This
      process could take some time.
    </p>
    <el-progress :percentage="percentage" :format="format"></el-progress>
  </NavigationCard>
</template>
<script>
import { mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'
import { calculateAddressesAmount } from '@/utils'
export default {
  name: 'GenerateAddresses',
  components: {
    NavigationCard,
  },
  mounted() {
    this.generateAddresses()
  },
  data() {
    return {
      subtitle: 'GenerateAddresses',
    }
  },
  methods: {
    generateAddresses() {
      let count = 0
      const interval = setInterval(() => {
        if (count < this.addressesToGenerate) {
          this.generateAddress()
          count += 1
        } else {
          clearInterval(interval)
        }
      }, 0)
    },
    format() {
      return `${this.generatedAddresses}/${this.addressesToGenerate}`
    },
    generateAddress() {
      this.$store.dispatch('generateMultipleAddresses')
    },
    nextStep() {
      this.$router.push('/claiming/download-file')
    },
    previousStep() {
      this.$router.push('/claiming/create-wallet')
    },
  },
  computed: {
    ...mapState({
      importedFile: state => {
        return state.wallet.claimingFileInfo
      },
      generatedAddresses: state => {
        return state.wallet.claimingAddresses.length || 0
      },
      computedVesting: state => {
        return state.wallet.computedVesting
      },
    }),
    addressesAmount() {
      return this.computedVesting.map(period => {
        return calculateAddressesAmount(period.amount)
      })
    },
    addressesToGenerate() {
      return this.addressesAmount.reduce((acc, arr) => acc + arr.length, 0)
    },
    areAddressesGenerated() {
      return this.generatedAddresses === this.addressesToGenerate
    },
    percentage() {
      return Math.round((this.generatedAddresses / this.addressesToGenerate) * 100)
    },
  },
  watch: {
    areAddressesGenerated(areGenerated) {
      if (areGenerated) {
        this.$store.commit('addAmountToClamingAddresses', this.addressesAmount)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.text {
  margin-bottom: 8px;
}
</style>
