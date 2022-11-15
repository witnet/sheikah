<template>
  <el-dialog
    class="info"
    :title="$t('close_session_info_title')"
    width="30%"
    :visible="true"
    :show-close="true"
    :close-on-click-modal="false"
    @close="close"
  >
    <div slot="title" class="title-container">
      <font-awesome-icon class="icon" icon="info-circle" />
      <p class="title">{{ $t('close_session_info_title') }}</p>
    </div>

    <i18n-t keypath="close_session_info_0" tag="p" class="text" scope="global">
      <span>{{
        $tc('minutes', sessionExpirationMin, { count: sessionExpirationMin })
      }}</span>
    </i18n-t>

    <el-checkbox v-model="checked">{{ $t('not_show_again') }}</el-checkbox>
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="close">{{ $t('ok') }}</el-button>
    </span>
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
    }),
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
