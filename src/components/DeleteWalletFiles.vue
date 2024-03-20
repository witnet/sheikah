<template>
  <Card
    class="card"
    :title="$t('reset_wallet_files')"
    :border="true"
    type="danger"
    shadow="thin"
  >
    <p class="text">
      <span class="bold">{{ $t('please_note').toUpperCase() }}</span>
      {{ $t('delete_wallet_files_info') }}
    </p>
    <div class="btn-container">
      <el-button
        type="danger"
        class="delete"
        @click="showDeleteWalletFilesModal"
      >
        {{ $t('delete_wallet_files_action') }}
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
      showDeleteWalletFilesModal: 'showDeleteWalletFilesModal',
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
