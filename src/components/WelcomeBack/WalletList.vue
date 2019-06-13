<template>
    <div class="content">
      <p class="text">
        Select which wallet do you want to unlock
      </p>
      <ul class="list">
        <li v-for="wallet in wallets" :key="wallet.id">
          <router-link class="link" :to="`/welcome-back/unlock/${wallet.id}`">
            <Button class="option">
              {{ wallet.name }}
              <font-awesome-icon icon="angle-right" />
            </Button>
          </router-link>
        </li>
        <li>
          <router-link class="link" to="/ftu/welcome">
            <Button class="option">
              Create import or recover a wallet
              <font-awesome-icon icon="angle-right" />
            </Button>
          </router-link>
        </li>
      </ul>
    </div>
</template>

<script>

export default {
  name: 'WalletList',
  data () {
    return {
      wallets: [
        {
          name: 'My how wallet',
          id: 1,
        },
        {
          name: 'My trezor cold wallet',
          id: 2,
        },
      ],
    }
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

.link {
  text-decoration: none;
}
</style>
