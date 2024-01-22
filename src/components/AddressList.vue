<template>
  <div class="list" :class="{ 'vertical-align': !isMaxHeightExceeded }">
    <AddressCard
      v-for="(address, index) in addresses"
      ref="address"
      :key="index"
      class="item"
      :used="address.used"
      :selected="selected === index"
      @click="() => selectAddress(index)"
    />
    <AddressCardButton @click="$emit('generate-address')" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

type Address = {
  used: boolean
}

const props = defineProps({
  /**
   * Addresses generated
   */
  addresses: {
    type: Array<Address>,
    required: true,
  },
  /**
   * Address selected
   */
  selected: {
    type: Number,
    default: 0,
  },
})

const emits = defineEmits(['select-address', 'generate-address'])

const isMaxHeightExceeded = computed(() => {
  // FIXME: calculate a the height in a more agnostic way
  return props.addresses.length > 26
})

const selectAddress = (index: number) => {
  emits('select-address', index)
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/scroll.scss';

.list {
  align-items: center;
  background-color: var(--addresses-list-background);
  border-bottom: 1px solid $grey-1;
  box-sizing: border-box;
  display: grid;
  gap: 6px;
  grid-template-columns: repeat(auto-fit, 25px);
  grid-template-rows: repeat(auto-fit, 40px);
  height: 170px;
  justify-content: center;
  max-height: 170px;
  overflow: auto;
  padding: 25px;

  &.vertical-align {
    align-content: center;
  }
}
</style>
