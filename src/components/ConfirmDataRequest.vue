<template>
  <div data-test="confirm-deploy-dr" class="form">
    <div class="title">Confirm</div>
    <div class="data-request-info">
      {{ template.radRequest }}
    </div>
    <div class="submit">
      <Button
        @keydown.enter.esc.prevent="confirmDataRequest"
        data-test="sign-send-btn"
        :onClick="confirmDataRequest"
        type="primary"
      >
        Confirm
      </Button>
    </div>
  </div>
</template>

<script>
import Button from './Button'

export default {
  name: 'ConfirmDataRequest',
  components: {
    Button,
  },
  props: {
    template: Object,
  },
  methods: {
    confirmDataRequest() {
      this.$emit('confirm-dr', this.template)
    },
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.form {
  margin: 16px;
  .title {
    color: $grey-4;
    font-size: 18px;
    margin: 0px 0px 40px 32px;
  }
  .data-request-info {
    margin: 16px;
  }
  .submit {
    width: 100%;
    text-align: right;
    padding-top: 40px;
  }
}
</style>
