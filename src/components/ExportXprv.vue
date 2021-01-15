<template>
  <Card
    class="card"
    :title="$t('encrypt_xprv_title')"
    :border="false"
    shadow="thin"
  >
    <a
      ref="download"
      :href="dataStr"
      :download="downloadName"
      style="display: none"
    ></a>
    <PasswordValidation
      :error="createValidPasswordError"
      :opening="openingLine"
      :text="text"
      @validate="encryptAndExport"
      @input-password="setPassword"
    />
    <div class="submit">
      <el-button
        tabindex="5"
        type="primary"
        data-test="export-btn"
        @keydown.enter.esc.prevent="encryptAndExport"
        @click="encryptAndExport"
      >
        {{ $t('encrypt_export') }}
      </el-button>
    </div>
  </Card>
</template>

<script>
import { EDITOR_EXPORT_FORMAT } from '@/constants'
import { mapState, mapMutations, mapActions } from 'vuex'
import PasswordValidation from '@/components/PasswordValidation'
import { createNotification } from '@/utils'
import Card from '@/components/card/Card.vue'

export default {
  name: 'ExportXprv',
  components: {
    PasswordValidation,
    Card,
  },
  data() {
    return {
      password: '',
      repeatedPassword: '',
      disabledNextButton: false,
      downloadName: 'xprv.json',
      openingLine: this.$t('please_note').toUpperCase(),
      text: this.$t('encrypt_xprv'),
    }
  },
  computed: {
    ...mapState({
      createValidPasswordError: state =>
        state.wallet.errors.createValidPassword,
      xprv: state => state.wallet.xprv,
      validatedPassword: state => state.wallet.validatedPassword,
    }),
    dataStr() {
      if (this.xprv) {
        return `data:text/json;charset=utf-8,${encodeURIComponent(
          JSON.stringify(this.xprv),
        )}`
      } else {
        return null
      }
    },
  },
  methods: {
    createNotification,
    ...mapMutations({
      clearError: 'clearError',
      validatePassword: 'validatePassword',
    }),
    ...mapActions({
      exportMasterKey: 'exportMasterKey',
    }),
    setPassword(password, repeatedPassword) {
      this.password = password
      this.repeatedPassword = repeatedPassword
    },
    export(format) {
      if (this.dataStr) {
        this.exportFormat = format
        // wait for computed props update according to exportFormat
        this.$nextTick().then(() => {
          this.$refs.download.click()
        })
      }
    },
    clear() {
      if (this.createValidPasswordError) {
        this.clearError({ error: this.createValidPasswordError.name })
      }
    },
    beforeDestroy() {
      this.clear()
    },
    async encryptAndExport() {
      await this.validatePassword({
        password: this.password,
        repeatedPassword: this.repeatedPassword,
      })
      if (this.validatedPassword) {
        await this.exportMasterKey({ password: this.password })
        await this.export(EDITOR_EXPORT_FORMAT.JSON)
        this.clear()
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

.label {
  color: $font-color-light;
}

.submit {
  margin-top: 32px;
  text-align: right;
  width: 100%;
}
</style>
