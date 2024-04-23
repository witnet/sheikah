<template>
  <component :is="icon" :class="className" />
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
const isDarkTheme = computed(() => theme.value === THEMES.DARK)
const isDarkIconSupported = computed(() =>
  CUSTOM_DARK_ICON_NAMES.includes(props.name),
)
const icon = computed(() => {
  if (isDarkTheme.value && isDarkIconSupported.value) {
    return defineAsyncComponent(
      () => import(`@/resources/svg/${`${props.name}-dark`.trim()}.svg`),
    )
  } else {
    return defineAsyncComponent(
      () => import(`@/resources/svg/${`${props.name}`.trim()}.svg`),
    )
  }
})
</script>
