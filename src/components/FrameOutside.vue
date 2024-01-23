<template>
  <div ref="el">
    <slot />
  </div>
</template>
<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref } from 'vue'
const emit = defineEmits(['click'])
const listener = ref()
const el = ref()

onMounted(() => {
  listener.value = (e: any) => {
    if (e.target === el.value || el.value.contains(e.target)) {
      return
    }
    emit('click', e)
  }

  document.addEventListener(`click`, listener.value)
  document.addEventListener(`focus`, listener.value, true)
})
onBeforeUnmount(() => {
  document.removeEventListener(`click`, listener.value)
  document.removeEventListener(`focus`, listener.value, true)
})
</script>
