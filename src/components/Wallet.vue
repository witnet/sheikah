<template>
  <div>
    <TopBar :tabs="tabs" />
    <router-view />
  </div>
</template>

<script>
import TopBar from '@/components/TopBar'

export default {
  name: 'Wallet',
  data() {
    return {
      tabs: [{ name: 'Transactions', link: '/wallet/transactions' }],
    }
  },
  components: {
    TopBar,
  },
}
</script>
