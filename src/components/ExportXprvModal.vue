<template>
  <el-dialog
    v-model="modalVisible"
    class="info"
    :show-close="true"
    @close="close"
  >
    <template #header>
      <div class="title-container">
        <font-awesome-icon class="icon" icon="info-circle" />
        <p class="title">{{ $t('export_xprv_modal_title') }}</p>
      </div>
    </template>

    <div class="content">
      <i18n-t
        keypath="export_xprv_modal_warning"
        scope="global"
        tag="p"
        class="warning"
      >
        <a class="link" href="#" target="_blank">myWitWallet</a>
      </i18n-t>
      <div class="qr" :class="{ blur: !isQrVisible }">
        <QRCodeVue3
          v-if="masterKey"
          :value="masterKey"
          :width="225"
          :height="225"
          :dots-options="{
            type: 'dots',
            color: '#2d2c3a',
          }"
          :background-options="{ color: '#ffffff' }"
          :corners-square-options="{ type: 'dot', color: '#2d2c3a' }"
          :corners-dot-options="{ type: undefined, color: '#2d2c3a' }"
        />
      </div>
      <el-button class="show" @click="toggleQR">{{
        !isQrVisible
          ? $t('export_xprv_modal_show_qr')
          : $t('export_xprv_modal_hide_qr')
      }}</el-button>
    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import QRCodeVue3 from 'qrcode-vue3'
import { ref, toRefs, computed } from 'vue'
import { useStore } from 'vuex'

const isQrVisible = ref(false)
const modalVisible = ref(true)
const store = useStore()

const { xprv } = toRefs(store.state.wallet)
const masterKey = computed(() => (xprv.value ? xprv.value.master_key : null))

function close() {
  store.commit('closeExportXprvQrVisible')
}

function toggleQR() {
  isQrVisible.value = !isQrVisible.value
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
      margin-top: 16px;
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
