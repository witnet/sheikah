<template>
  <Card
    class="card"
    :title="$t('rename_wallet_title')"
    :border="false"
    shadow="thin"
  >
    <p class="paragraph">
      {{ $t('rename_modal_description') }}
    </p>
    <div class="form-row">
      <p class="label">
        {{ $t('name') }}
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <template #content>
            <div class="info-message">
              {{ $t('wallet_name_info') }}
            </div>
          </template>
        </el-tooltip>
      </p>

      <el-input v-model="localName" :maxlength="30" class="password" />
    </div>
    <div class="form-row">
      <p class="label">
        {{ $t('description') }}
        <el-tooltip trigger="hover" effect="light">
          <font-awesome-icon class="info" icon="info-circle" />
          <template #content>
            <div class="info-message">
              {{ $t('wallet_description_info') }}
            </div>
          </template>
        </el-tooltip>
      </p>
      <el-input
        v-model="localDescription"
        type="textarea"
        class="password"
        resize="none"
        :rows="3"
      />
    </div>

    <div class="submit">
      <el-button type="primary" data-test="export-btn" @click="showModal">
        {{ $t('update_wallet') }}
      </el-button>
    </div>
  </Card>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import { createNotification } from '@/utils'
import Card from '@/components/card/Card.vue'

export default {
  name: 'ExportXprv',
  components: {
    Card,
  },
  data() {
    return {
      name: '',
      description: '',
    }
  },
  computed: {
    ...mapState({
      walletDescription: state => state.wallet.description,
      walletName: state => state.wallet.title,
    }),
    localName: {
      get() {
        return this.name
      },
      set(val) {
        this.name = val
      },
    },
    localDescription: {
      get() {
        return this.description
      },
      set(val) {
        this.description = val
      },
    },
  },
  mounted() {
    this.name = this.walletName
    this.description = this.walletDescription
  },
  methods: {
    createNotification,
    ...mapActions({
      updateWallet: 'updateWallet',
      closeSession: 'closeSession',
    }),
    ...mapMutations({
      setWalletUpdate: 'setWalletUpdate',
      showRenameConfirmationModal: 'showRenameConfirmationModal',
    }),
    showModal() {
      this.setWalletUpdate({ name: this.name, description: this.description })
      this.showRenameConfirmationModal()
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';
@import '@/styles/scroll.scss';

.label {
  margin-right: 8px;
}

.submit {
  margin-top: 32px;
  text-align: right;
  width: 100%;
}

.paragraph {
  margin-bottom: 24px;
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
