<template>
  <NavigationCard
    data-test="generate-addresses"
    title="Generate addresses"
    :disabledNextButton="false"
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
import { groupAmountByUnlockedDate, sleep } from '@/utils'

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
  },
  computed: {
    ...mapState({
      importedFile: state => {
        return state.wallet.claimingFileInfo
      },
      generatedAddresses: state => {
        return state.wallet.claimingAddresses.length || 0
      },
      vesting: state => {
        return state.wallet.vesting
      },
    }),
    amountByUnlockedDate() {
      return this.vesting.map(period => {
        return groupAmountByUnlockedDate(period.amount)
      })
    },
    addressesToGenerate() {
      return this.amountByUnlockedDate.reduce((acc, arr) => acc + arr.length, 0)
    },
    areAddressesGenerated() {
      return this.generatedAddresses === this.addressesToGenerate
    },
    percentage() {
      return Math.round((this.generatedAddresses / this.addressesToGenerate) * 100)
    },
  },
  watch: {
    async areAddressesGenerated(areGenerated) {
      if (areGenerated) {
        this.$store.dispatch('createAndSaveExportFileLink', this.amountByUnlockedDate)
        await sleep(2000)
        this.$router.push('/claiming/download-file')
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
