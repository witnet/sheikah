<template>
  <!--  Emit click event to indicate a new address should be created -->
  <el-tooltip
    :content="$t('generate_address')"
    :visible="
      isRadiantBorderActive ||
      (addAddress && addAddress.classList.contains('active'))
    "
    placement="right"
    effect="light"
  >
    <button
      ref="addAddress"
      class="card"
      data-test="address-card-button"
      :class="{ active: isRadiantBorderActive }"
      @click="$emit('click')"
    >
      <font-awesome-icon
        class="icon"
        data-test="address-card-plus-icon"
        icon="plus"
      />
    </button>
  </el-tooltip>
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { computed, watch, ref, type Ref } from 'vue'
const store = useStore()
const addAddress: Ref<HTMLButtonElement | undefined> = ref()
const isRadiantBorderActive = computed(
  () => store.state.uiInteractions.receiveTransactionClicked,
)
watch(isRadiantBorderActive, val => {
  if (val) {
    addAddress.value?.focus()
  } else {
    addAddress.value?.classList.remove('active')
    addAddress.value?.blur()
  }
})
</script>

<style lang="scss" scoped>
.card {
  align-items: center;
  background: none;
  border: var(--address-card-button-border);
  border-radius: 3px;
  color: var(--address-card-button-color);
  cursor: pointer;
  display: flex;
  height: 40px;
  justify-content: center;
  position: relative;
  width: 25px;

  &:focus,
  &:hover {
    border: var(--address-card-button-border-hover);
    color: var(--address-card-button-color-hover);
  }

  .active {
    border: var(--address-card-button-border-focus);
    border-radius: 3px;
  }

  &:active {
    border: var(--address-card-button-border-active);
    color: var(--address-card-button-color-active);
  }
}
</style>
