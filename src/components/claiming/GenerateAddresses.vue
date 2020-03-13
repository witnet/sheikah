<template>
  <NavigationCard
    :nextStep="areAddressesGenerated ? nextStep : null"
    data-test=""
    nextText="Next"
    title="Generate addresses"
  >
    <p>Your addresses are being generated. This process could take some time</p>
    <el-progress :percentage="percentage" :format="format"></el-progress>
    <p>{{ generatedAddresses }} of {{ addressesToGenerate }}</p>
    <!-- TODO: Show buttons only when all addresses are generated -->
    <!-- <el-button type="primary" @click="generateAddresses">Generate addresses</el-button> -->
  </NavigationCard>
</template>
<script>
import { mapState } from 'vuex'
import NavigationCard from '@/components/card/NavigationCard'
import { CLAIM_WITS_PER_ADDRESS } from '@/constants'

export default {
  name: 'GenerateAddresses',
  components: {
    NavigationCard,
  },
  mounted() {
    this.generateAddresses()
  },
  data() {
    // TODO: read the amount from the uploaded file
    const amount = 500
    const addressesToGenerate = Math.ceil(amount / CLAIM_WITS_PER_ADDRESS)
    return {
      subtitle: 'GenerateAddresses',
      amount,
      addressesToGenerate,
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
      generatedAddresses: state => {
        return state.wallet.claimingAddresses.length || 0
      },
    }),
    areAddressesGenerated() {
      return this.generatedAddresses === this.addressesToGenerate
    },
    percentage() {
      return Math.round((this.generatedAddresses / this.addressesToGenerate) * 100)
    },
  },
}
</script>
