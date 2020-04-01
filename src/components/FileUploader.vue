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
      <font-awesome-icon
        icon="check-circle"
        data-test="success-icon"
        v-if="file"
        class="icon-circle-check"
      />
      <p data-test="success-text" v-if="file">{{ file.name }}</p>
      <font-awesome-icon
        icon="cloud-upload-alt"
        data-test="upload-icon"
        v-if="!file"
        class="icon-upload"
      />
      <p data-test="upload-text" v-if="!file" class="sub-text">
        <slot></slot>
      </p>
    </div>
    <p data-test="accepted-file-subtitle" v-if="acceptedFormat" class="format-warning">
      {{ subtitle }}
    </p>
    <transition name="fade" mode="out-in">
      <div
        data-test="file"
        class="file"
        v-if="file"
        @mouseover="showDelete = true"
        @mouseleave="showDelete = false"
      >
        <div class="name" @click="downloadFile">
          <font-awesome-icon icon="file-alt" class="icon-document" />
          <div data-test="file-name" class="text">{{ file.name }}</div>
        </div>
        <font-awesome-icon
          icon="times"
          data-test="close-icon"
          @click="clearFile"
          v-if="showDelete"
          class="file-icon close"
        />
        <font-awesome-icon
          icon="check-circle"
          data-test="check-icon"
          v-else
          class="file-icon success"
        />
      </div>
    </transition>
    <p data-test="error" v-if="error" class="error">
      {{ errorMessage }}
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
  name: 'FileUploader',
  props: {
    acceptedFormat: String,
    file: Object,
    clearFile: Function,
    validateFile: Function,
    afterUpload: Function,
    errorMessage: String,
  },
  data() {
    return {
      error: false,
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
              this.$emit('file-validated', fileInfo)
              this.error = false
            } else {
              this.clearFile()
              this.$emit('error-uploading-file')
              this.error = true
            }
          } catch (error) {
            // console.log('Error parsing json', error)
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
  .icon-upload {
    margin-bottom: 16px;
    font-size: 56px;
    color: $grey-2;
  }
  .icon-circle-check {
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
  padding: 4px;
  height: min-content;
  .icon-document {
    color: $grey-3;
    margin-right: 8px;
    margin-left: 4px;
  }
  .name {
    border: 1px solid transparent;
    border-radius: 3px;
    font-size: 14px;
    color: $grey-6;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &:hover {
    transition: color 0.3s;
    border-radius: 4px;
    background-color: #f5f7fa;
    .text {
      color: $purple-6;
    }
  }
  .file-icon {
    color: $grey-3;
    margin-right: 8px;
    font-size: 12px;
  }
  .success {
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
.error {
  font-size: 14px;
  color: $red-1;
  margin-top: 8px;
}
</style>

<docs>
#### Upload component:

#### Basic usage
```js
<FileUploader
  acceptedFormat=".json"
  errorMessage="An error ocurred"
  :validateFile="() => true"
/>
```

#### Show error when validation file
```js
<FileUploader
  acceptedFormat=".json"
  errorMessage="An error ocurred"
  :validateFile="() => false"
/>
```

</docs>
