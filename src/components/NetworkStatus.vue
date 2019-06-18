<template>
  <div class="network-status">
    <span class="label">NETWORK STATUS</span>
    <span class="status">{{ status.toUpperCase() }}</span>
    <DotIndicator :status="status" />
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

.network-status {
  font-size: $icon_status-font_size;
  display: flex;
  align-items: center;

  .label {
    color: $sidebar-mainnet-color;
    font-weight: $sidebar-mainnet-font_weight;
  }

  .status{
    color: $sidebar-synced-color;
    font-weight: $sidebar-synced-font_weight;
    padding: 0.5em;
  }
}
</style>
