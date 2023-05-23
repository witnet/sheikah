<template>
  <el-dialog
    class="info"
    :title="$t('close_session_info_title')"
    width="50%"
    :visible="true"
    :show-close="true"
    :close-on-click-modal="false"
    @close="close"
  >
    <div slot="title" class="title-container">
      <font-awesome-icon class="icon" icon="info-circle" />
      <p class="title">{{ $t('export_xprv_modal_title') }}</p>
    </div>

    <div class="content">
      <i18n path="export_xprv_modal_warning" tag="p" class="warning">
        <a class="link" href="#" target="_blank">myWitWallet</a>
      </i18n>

      <div class="qr" :class="{ blur: !isQrVisible }">
        <VueQr :text="xprv.master_key" :size="225" />
      </div>
      <el-button class="show" type="secondary" @click="toggleQR">{{
        !isQrVisible
          ? $t('export_xprv_modal_show_qr')
          : $t('export_xprv_modal_hide_qr')
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import VueQr from 'vue-qr'

export default {
  name: 'LogoutModal',
  components: {
    VueQr,
  },
  data() {
    return {
      avoidShowModalAgain: false,
      isQrVisible: false,
    }
  },
  computed: {
    ...mapState({
      sessionExpirationMin: state => state.wallet.sessionExpirationSecs / 60,
      xprv: state => state.wallet.xprv,
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
      close: 'closeExportXprvQrVisible',
    }),
    ...mapActions({
      saveShowModalAgain: 'saveShowModalAgain',
    }),
    toggleQR() {
      this.isQrVisible = !this.isQrVisible
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

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

  .content {
    align-items: center;
    display: flex;
    flex-direction: column;
    margin-bottom: 16px;

    .warning {
      margin-bottom: 16px;

      .link {
        color: var(--text-medium-emphasis);
        font-weight: 500;
        text-decoration: underline;
      }
    }

    .qr {
      height: 225px;
      margin-bottom: 16px;
      width: 225px;

      &.blur {
        background-color: #ccc;
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -o-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(7px);
      }
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
