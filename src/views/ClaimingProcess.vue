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
  align-items: center;
  background-color: $alpha-purple;
  display: flex;
  height: 100vh;
  justify-content: center;
  margin: 0;
  width: 100vw;
}
</style>
