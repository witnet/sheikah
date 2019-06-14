<template>
    <div class="content">
      <p class="text">
        Insert Password to unlock wallet {{ $route.params.id }}
      </p>
      <input v-model="password" type="password">

      <button @click="unlockWallet">
        Unlock
      </button>
      <p v-if="showError">Invalid password</p>

      <p v-if="sent">{{ wallet }}</p>
    </div>
</template>

<script>

export default {
  name: 'UnlockWallet',
  data () {
    return {
      password: '',
      showError: false,
      sent: false,
    }
  },
  methods: {
    unlockWallet () {
      this.$store.dispatch('unlockWallet', { id: this.$route.params.id, password: this.password })
      this.sent = true
    },
  },
  computed: {
    wallet () {
      console.log('----')
      const wallet = this.$store.state.wallet
      if (wallet) {
        this.showError = false
        this.$router.push('/wallet/transactions')
      } else {
        // this.showError = true
      }

      return wallet
    },
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/theme.scss';
  @import '@/styles/_colors.scss';

.centered {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

.card {
  height: 400px;
  min-width: 600px;
  display: grid;
  grid-template-columns: 30% 1fr;
  box-shadow: 0 1px 5px 1px rgba(0, 0, 0, 0.1);

  .sidebar {
    background: $sheikah-gradient;
    padding: 20px;
    justify-content: space-between;
    display: flex;
    flex-direction: column;
    .title {
      font-size: 22px;
      color: white;
      border: none;
    }
    .settings {
      color: white;
    }
  }

  .content {
    padding: 30px;
    .text {
      margin-bottom: 30px;
    }
    .list {
      height: 240px;
      overflow: auto;

      .option {
        margin-bottom: 10px;
        background: white;
        border: 1px solid #ececec;
        color: #4d4d4d;
        cursor: pointer;
        display: flex;
        flex-direction: row;
        height: 60px;
        justify-content: space-between;
        padding: 0 20px;
        width: 100%;
        border-radius: 3px;

        &:hover {
          border-color: $blue-6;
          color: $blue-6;
        }
      }
    }
  }
}
</style>
