<template>
  <Card
    class="card"
    :title="$t('delete_wallet')"
    :border="true"
    type="danger"
    shadow="thin"
  >
    <p class="text">
      <span class="bold">{{ $t('please_note').toUpperCase() }}</span>
      {{ $t('delete_wallet_info') }}
    </p>
    <div class="btn-container">
      <el-button type="danger" class="delete" @click="showDeleteWalletModal">
        {{ $t('delete') }}
      </el-button>
    </div>
  </Card>
</template>

<script>
import { mapMutations } from 'vuex'
import Card from '@/components/card/Card.vue'

export default {
  name: 'SettingsOptionCurrenty',
  components: { Card },
  methods: {
    ...mapMutations({
      showDeleteWalletModal: 'showDeleteWalletModal',
    }),
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';

.card {
  .content {
    border-radius: 4px;
  }

  .bold {
    font-weight: bold;
  }

  .btn-container {
    margin-top: 32px;
    text-align: right;
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
