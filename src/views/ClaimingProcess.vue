<template>
  <div class="centered" data-test="claiming">
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      status: state => state.wallet.networkStatus,
    }),
  },
  watch: {
    status(status) {
      if (status === 'error') {
        this.$router.push('/wallet-not-found')
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.centered {
  background-color: $alpha-purple;
  margin: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
