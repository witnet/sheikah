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
  background-color: $alpha-grey;
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;

  .layout {
    box-shadow: $default-box-shadow;
    border: 1px solid $purple-6;
    background: $white;
    width: 600px;
    display: grid;
    grid-template-columns: 160px 440px;

    .bar {
      background: $purple-6;
      padding: 20px;
      justify-content: space-between;
      display: flex;
      flex-direction: column;

      .title {
        font-size: 24px;
        color: $white;
        border: none;
      }
    }

    .content {
      padding: 30px;
    }
  }
}
</style>
