<template>
  <div data-test="welcome-back" class="welcome-back">
    <div class="layout">
      <div class="bar">
        <p class="title">Welcome Back</p>
        <Settings :settings="settings" :showText="true" />
      </div>

      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import Settings from '@/components/Settings.vue'
import { mapState } from 'vuex'

export default {
  name: 'WelcomeBack',
  components: {
    Settings,
  },
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
  background-color: $alpha-purple;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .bar {
    color: $alt-grey-5;
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

    .content {
      padding: 30px;
    }
  }
}
</style>
