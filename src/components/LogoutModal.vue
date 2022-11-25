<template>
  <el-dialog
    class="info"
    width="30%"
    v-model="sessionExpiredLocal"
    :show-close="true"
    @close="close"
  >
    <template #header class="title-container">
      <font-awesome-icon class="icon" icon="info-circle" />
      <p class="title">{{ $t('close_session_info_title') }}</p>
    </template>

    <i18n-t keypath="close_session_info_0" tag="p" class="text" scope="global">
      <span>{{
        $tc('minutes', sessionExpirationMin, { count: sessionExpirationMin })
      }}</span>
    </i18n-t>

    <el-checkbox v-model="checked">{{ $t('not_show_again') }}</el-checkbox>
    <template #footer class="dialog-footer">
      <el-button type="primary" @click="close">{{ $t('ok') }}</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'

export default {
  name: 'LogoutModal',
  data() {
    return {
      avoidShowModalAgain: false,
    }
  },
  computed: {
    ...mapState({
      sessionExpirationMin: state => state.wallet.sessionExpirationSecs / 60,
      sessionExpired: state => state.uiInteractions.sessionExpired,
    }),
    sessionExpiredLocal: {
      get() {
        return this.sessionExpired
      },
      set() {
        this.close()
      }
    },
    checked: {
      get() {
        return this.notShowModalAgain
      },
      set(val) {
        this.avoidShowModalAgain = val
        this.saveShowModalAgain(val)
        return this.avoidShowModalAgain
      },
    },
  },
  methods: {
    ...mapMutations({
      close: 'closeLogoutModal',
    }),
    ...mapActions({
      saveShowModalAgain: 'saveShowModalAgain',
    }),
  },
}
</script>

<style lang="scss">
@import '@/styles/_colors.scss';

.info {
  .title-container {
    align-items: center;
    color: var(--info-title);
    display: flex;

    .title {
      color: var(--info-title);
      font-size: 32px;
    }

    .icon {
      font-size: 36px;
      margin-right: 8px;
    }
  }

  .el-dialog__body {
    padding: 10px 20px;
    word-break: break-word;

    .text {
      margin-bottom: 8px;
    }
  }
}
</style>
