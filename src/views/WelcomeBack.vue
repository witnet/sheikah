<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="bar">
      <img class="row sheikah-icon" src="@/resources/svg/sheikah-icon.svg" />
      <p class="row title">Welcome back to Sheikah!</p>
      <p class="row subtitle">
        Sheikah keeps your Witnet wallet safe and helps you build, share and deploy data requests
        into the Witnet network.
      </p>
      <el-button class="row link" type="text">
        Discover more features >
      </el-button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'WelcomeBack',
  data() {
    return {
      settings: [
        {
          label: 'Quit app',
          action: () => window.close(),
        },
      ],
    }
  },
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
@import '@/styles/theme.scss';
@import '@/styles/_colors.scss';

.welcome-back {
  background-color: $alpha-grey;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .bar {
    color: $new-grey-1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    margin-right: 100px;
    width: 370px;
    .row {
      margin-bottom: 24px;
      text-align: left;
    }
    .title {
      font-size: 48px;
      font-weight: bold;
      line-height: inherit;
    }
    .sheikah-icon {
      width: 70px;
    }
  }
}
</style>
