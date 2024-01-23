<template>
  <customIcon :class="className" />
</template>

<script setup lang="ts">
import { useStore } from 'vuex'
import { toRefs, computed, defineAsyncComponent } from 'vue'
import { THEMES, CUSTOM_ICON_NAMES, CUSTOM_DARK_ICON_NAMES } from '@/constants'

const store = useStore()
const { theme } = toRefs(store.state.wallet)
const props = defineProps({
  className: {
    type: String,
    default: null,
  },
  name: {
    type: String,
    default: null,
    validator(value: string) {
      return value ? CUSTOM_ICON_NAMES.includes(value) : true
    },
  },
})
const customIcon = defineAsyncComponent(
  () => import(`@/resources/svg/${url.value}.svg`),
)
const url = computed(() => {
  let url
  if (
    theme.value === THEMES.DARK &&
    CUSTOM_DARK_ICON_NAMES.includes(props.name)
  ) {
    url = `${props.name}-dark`.trim()
  } else {
    url = `${props.name}`.trim()
  }
  return url
})
</script>
