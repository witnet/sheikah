<template>
  <div>
    <el-input v-model="nodeUrl" />
    <el-button type="primary" @click="setLocalNodeUrl(nodeUrl)">
      Change and restart
    </el-button>
  </div>
</template>

<script>
import { setLocalNodeUrl } from '@/ipcHandlers'
export default {
  name: 'Send',
  data() {
    return {
      nodeUrl: null,
    }
  },
  methods: {
    setLocalNodeUrl,
  },
}
</script>
