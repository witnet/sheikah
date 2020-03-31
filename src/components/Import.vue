<template>
  <div class="import-container">
    <div
      data-test="drag-and-drop"
      class="drag-file-area"
      @click="importFile"
      v-cloak
      @drop.prevent="readFile"
      @dragover.prevent
    >
      <i v-show="file" class="el-icon-upload-success el-icon-circle-check" />
      <p v-if="file">{{ file.name }}</p>
      <i v-show="!file" class="el-icon-upload"></i>
      <p v-show="!file" class="sub-text">
        <slot></slot>
      </p>
    </div>
    <p v-if="acceptedFormat" class="format-warning">
      {{ subtitle }}
    </p>
    <transition name="fade" mode="out-in">
      <div class="file" v-if="file" @mouseover="showDelete = true" @mouseleave="showDelete = false">
        <p class="name" @click="downloadFile">
          <i class="el-icon-document"></i>
          <span class="text"> {{ file.name }} </span>
        </p>
        <i @click="clearFile" v-if="showDelete" class="el-icon-close file-icon"></i>
        <i v-else class="el-icon-upload-success el-icon-circle-check file-icon"></i>
      </div>
    </transition>
    <p v-if="error" class="error" data-test="error">
      {{ error }}
    </p>
    <input
      :accept="acceptedFormat"
      :style="{ display: 'none' }"
      type="file"
      ref="fileInput"
      v-on:change="readFile"
    />
    <a v-if="file" :href="fileLink" ref="download" :download="file.name" style="display:none" />
  </div>
</template>

<script>
export default {
  name: 'Import',
  props: {
    acceptedFormat: String,
    error: String,
    file: Object,
    clearFile: Function,
    validateFile: Function,
    beforeUpload: Function,
  },
  data() {
    return {
      fileName: '',
      showDelete: false,
      subtitle: `(Only ${this.acceptedFormat} files are allowed)`,
    }
  },
  methods: {
    fileLink() {
      return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.file))}`
    },
    downloadFile() {
      this.$refs.download.click()
    },
    importFile() {
      this.$refs.fileInput.value = ''
      this.$refs.fileInput.click()
    },
    readFile(e) {
      let file = null
      if (this.$refs.fileInput.files.length > 0) {
        this.clearFile()
        const inputFile = this.$refs.fileInput.files
        file = inputFile[inputFile.length - 1]
      } else if (e.dataTransfer) {
        const dropFile = e.dataTransfer.files
        file = dropFile[dropFile.length - 1]
      }
      const reader = new FileReader()
      reader.addEventListener(
        'load',
        e => {
          const fileInfo = JSON.parse(e.target.result)
          this.fileName = file.name
          this.$emit('file-name', file.name)
          try {
            if (this.validateFile(fileInfo)) {
              this.beforeUpload(fileInfo)
              if (this.error) {
                this.$emit('clear-error')
              }
            } else {
              this.clearFile()
              this.$emit('set-error')
            }
          } catch (error) {
            console.log('Error parsing json', error)
          }
        },
        false
      )
      if (file) {
        reader.readAsText(file)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
@import '@/styles/_colors.scss';
@import '@/styles/theme.scss';

.drag-file-area {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 50px;
  outline: $drag_drop_area;
  cursor: pointer;
  .sub-text {
    margin-bottom: 16px;
    font-size: 14px;
    color: $grey-3;
    .upload {
      font-weight: 600;
    }
    .underline {
      text-decoration: underline;
    }
  }
  .el-icon-upload {
    margin-bottom: 16px;
    font-size: 56px;
    color: $grey-3;
  }
  .el-icon-circle-check {
    font-size: 56px;
    color: #52c41a;
    margin-bottom: 16px;
    line-height: 50px;
  }
  &:hover {
    outline: $drag_drop_area_focus;
  }
}
.format-warning {
  margin-top: 8px;
  color: $grey-3;
  font-size: 12px;
}
.file {
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  align-items: center;
  font-size: 34px;
  margin-top: 16px;
  height: min-content;
  .el-icon-document {
    margin-right: 8px;
    padding-left: 4px;
  }
  .name {
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 14px;
  }
  &:hover {
    transition: color 0.3s;
    border-radius: 4px;
    background-color: #f5f7fa;
    .text {
      color: $blue-6;
    }
  }
  .file-icon {
    padding-right: 8px;
    font-size: 14px;
  }
  .el-icon-upload-success {
    color: #52c41a;
  }
}
.fade-enter-active {
  transition: all 0.3s ease;
}
.fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.fade-enter,
.fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
.text {
  margin-bottom: 24px;
}
.error {
  font-size: 14px;
  color: $red-0;
  margin-top: 8px;
}
</style>
