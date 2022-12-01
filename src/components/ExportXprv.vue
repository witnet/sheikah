<template>
  <Card
    class="card"
    :title="$t('encrypt_xprv_title')"
    :border="false"
    shadow="thin"
  >
    <a ref="download" class="none" :href="dataStr" :download="downloadName"></a>
    <PasswordValidation
      ref="password-validation"
      :error="createValidPasswordError"
      :opening="openingLine"
      :text="text"
      @validate="encryptAndExport"
      @input-password="setPassword"
    />
    <div class="form-row">
      <p class="">{{ $t('export_name_and_description') }}</p>
      <el-switch
        v-model="exportNameAndDescription"
        data-test="action-try"
        class="center"
      ></el-switch>
    </div>

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
import { mapState, mapMutations, mapActions } from 'vuex'
import { EDITOR_EXPORT_FORMAT } from '@/constants'
import PasswordValidation from '@/components/PasswordValidation.vue'
import { createNotification } from '@/utils'
import { buildXprvFile } from '@/services/buildXprvFile'
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
      exportNameAndDescription: false,
    }
  },
  computed: {
    ...mapState({
      createValidPasswordError: state =>
        state.wallet.errors.createValidPassword,
      xprv: state => state.wallet.xprv,
      validatedPassword: state => state.wallet.validatedPassword,
      birthDate: state => state.wallet.birthDate,
      description: state => state.wallet.description,
      name: state => state.wallet.title,
    }),
    dataStr() {
      if (this.xprv) {
        const { name, description } = this.exportNameAndDescription
          ? { name: this.name, description: this.description }
          : { name: '', description: '' }

        return buildXprvFile(
          this.xprv && this.xprv.master_key,
          this.birthDate,
          name,
          description,
        )
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
      this.$refs['password-validation'].clearInput()
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

.none {
  display: none;
}

.label {
  color: $font-color-light;
}

.submit {
  margin-top: 32px;
  text-align: right;
  width: 100%;
}

.form-row {
  align-items: center;
  column-gap: 8px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  justify-content: center;
  margin: 16px 0;
}
</style>
