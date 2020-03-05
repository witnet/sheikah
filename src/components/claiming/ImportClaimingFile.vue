<template>
  <div>
    <NavigationCard
      v-show="!uploaded"
      data-test="header-2"
      class="wallet-disclaimer"
      title="Import claiming file"
      :previousStep="previousStep"
      :nextStep="nextStep"
      previousText="Back"
      nextText="Next"
    >
      <div
        class="drag-file-area"
        @click="importFile"
        v-cloak
        @drop.prevent="addFile"
        @dragover.prevent
      >
        <font-awesome-icon class="icon" icon="file-upload" />
        <p v-show="!uploaded" class="sub-text">
          <span class="upload">Upload the file</span> or drag it here.
        </p>
      </div>
      <input :style="{ display: 'none' }" type="file" ref="fileInput" @change="readFile" />
    </NavigationCard>
    <NavigationCard
      v-show="uploaded"
      data-test="header-2"
      class="wallet-disclaimer"
      title="Claiming Information"
      :previousStep="previousStep"
      :nextStep="nextStep"
      previousText="Back"
      nextText="Next"
    >
      <div class="file-info">
        <font-awesome-icon class="icon" icon="file" />
        {{ file.name }}
      </div>
    </NavigationCard>
  </div>
</template>

<script>
import NavigationCard from '@/components/card/NavigationCard'

export default {
  name: 'WalletDisclaimer',
  components: {
    NavigationCard,
  },
  data() {
    return {
      uploaded: false,
      file: 'file',
      subtitle: 'Import your claiming file,',
    }
  },
  methods: {
    previousStep() {
      if (this.uploaded) {
        this.uploaded = false
      } else {
        this.$router.push('/ftu/claiming-info')
      }
    },
    nextStep() {
      if (this.uploaded) {
        this.$router.push('/ftu/welcome')
      }
    },
    importFile() {
      this.$refs.fileInput.click()
    },
    addFile(e) {
      let droppedFiles = e.dataTransfer.files
      if (!droppedFiles) return
      ;[...droppedFiles].forEach(f => {
        this.uploaded = true
        this.file = f
      })
    },
    readFile(e) {
      const file = this.$refs.fileInput.files[0]
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        () => {
          const fileText = reader.result
          try {
            this.file = JSON.parse(fileText)
            this.uploaded = true
          } catch (error) {
            console.log('Error parsing json')
          }
        },
        false
      )
      reader.readAsText(file)
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.paragraph {
  margin-bottom: 16px;
  font-size: 16px;
  padding: 0 8px;
}
.drag-file-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  outline: $input_big-border;
  cursor: pointer;
  .sub-text {
    color: $grey-3;
    .upload {
      font-weight: 600;
    }
  }
}
.file-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: $grey-3;
}
.icon {
  color: $grey-3;
  font-size: 40px;
  padding-bottom: 8px;
}
</style>
