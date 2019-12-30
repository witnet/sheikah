<template>
  <div class="network-status">
    <span class="label">NETWORK STATUS</span>
    <span class="status">{{ status.toUpperCase() }}</span>
    <div class="dot-status">
      <DotIndicator :status="status" />
    </div>
  </div>
</template>

<script>
import DotIndicator from '@/components/DotIndicator'
export default {
  name: 'NetworkStatus',
  props: {
    status: String,
  },
  components: {
    DotIndicator,
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/theme.scss';
@import '@/styles/app.global.scss';

@media screen and (max-width: 1200px) {
  .label {
    display: none;
  }
  .status {
    display: none;
  }
  .network-status {
    text-align: left;
  }
  .dot-status {
    margin-right: 24px;
  }
}

.network-status {
  font-size: $icon_status-font_size;
  display: flex;
  align-items: center;
  // margin-right: 16px;

  .label {
    color: $sidebar-mainnet-color;
    font-weight: $sidebar-mainnet-font_weight;
  }

  .status {
    color: $sidebar-synced-color;
    font-weight: $sidebar-synced-font_weight;
    padding: 8px;
  }
}
</style>
