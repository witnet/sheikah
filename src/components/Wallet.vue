<template>
<div>
  <TopBar :tabs="tabs" />
</div>
</template>

<script>
import TopBar from '@/components/TopBar'
export default {
  name: 'Wallet',
  data () {
    return {
      tabs: [
        { name: 'Transactions', link: '/wallet/transactions' },
        { name: 'Receive', link: '/wallet/receive' },
        { name: 'Send', link: '/wallet/send' },
      ],
    }
  },
  components: {
    TopBar,
  },
}
</script>
