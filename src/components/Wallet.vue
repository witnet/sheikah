<template>
  <div>
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Wallet',
  methods: {
    ...mapMutations({
      clearError: 'clearError',
    }),
  },
}
</script>
