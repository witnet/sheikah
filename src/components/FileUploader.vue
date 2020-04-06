<template>
  <div>
    <div
      data-test="drag-and-drop"
      class="drag-file-area"
      @click="uploadFile"
      v-cloak
      @drop.prevent="readFile"
      @dragover.prevent
    >
      <font-awesome-icon
        v-if="localFile"
        icon="check-circle"
        data-test="success-icon"
        class="icon-circle-check"
      />
      <p v-if="localFile" data-test="success-text">{{ fileName }}</p>
      <font-awesome-icon
        v-if="!localFile && !error"
        icon="cloud-upload-alt"
        data-test="upload-icon"
        class="icon-upload"
      />
      <font-awesome-icon
        v-if="error"
        icon="times-circle"
        data-test="icon-error"
        class="icon-error"
      />
      <p v-if="!localFile" data-test="upload-text" class="sub-text">
        <slot></slot>
      </p>
    </div>
    <p v-if="acceptedFormat" data-test="accepted-file-subtitle" class="format-warning">
      {{ subtitle }}
    </p>
    <transition name="fade" mode="out-in">
      <div
        v-if="localFile"
        data-test="file"
        class="file"
        @mouseover="showDelete = true"
        @mouseleave="showDelete = false"
      >
        <div class="name" @click="downloadFile">
          <font-awesome-icon icon="file-alt" class="icon-document" />
          <div data-test="file-name" class="text">{{ fileName }}</div>
        </div>
        <font-awesome-icon
          v-if="showDelete"
          icon="times"
          data-test="delete-icon"
          @click="clearFile"
          class="file-icon close"
        />
        <font-awesome-icon
          v-else
          icon="check-circle"
          data-test="check-icon"
          class="file-icon success"
        />
      </div>
    </transition>
    <transition name="fade" mode="out-in">
      <p v-if="error" data-test="error" class="error">
        {{ errorMessage }}
      </p>
    </transition>
    <input
      :accept="acceptedFormat"
      :style="{ display: 'none' }"
      type="file"
      ref="fileInput"
      v-on:change="readFile"
    />
    <a
      v-if="localFile"
      :href="fileLink"
      ref="download"
      :download="localFile.name"
      style="display:none"
    />
  </div>
</template>

<script>
/**
 * File uploader component
 * @displayName FileUploader
 */
export default {
  name: 'FileUploader',
  props: {
    /**
     * Type of the file to be accepted
     */
    acceptedFormat: String,
    /**
     * Initial file loaded. Util to load the component in a success state
     */
    file: Object,
    /**
     * Gets called when a file is uploaded to ensure its validity
     */
    validateFile: Function,
    /**
     * Error text to show if validateFile fails
     */
    errorMessage: String,
  },
  data() {
    return {
      error: false,
      localFile: this.file,
      fileName: this.file ? this.file.name : null,
      showDelete: false,
      subtitle: `(Only ${this.acceptedFormat} files are allowed)`,
    }
  },
  methods: {
    fileLink() {
      return `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(this.localFile))}`
    },
    downloadFile() {
      this.$refs.download.click()
    },
    clearFile() {
      this.localFile = null
      /**
       * Nofity when the file uploaded is removed
       */
      this.$emit('clear-file')
    },
    uploadFile() {
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
        this.clearFile()
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
              /**
               * Emit the content of the file validated
               */
              this.$emit('file-validated', fileInfo)
              this.localFile = fileInfo
              this.error = false
            } else {
              this.clearFile()
              /**
               * Nofity file uploaded is not valid
               */
              this.$emit('error-uploading-file')
              this.error = true
            }
          } catch (error) {
            /**
             * Nofity file uploaded is not valid
             */
            this.$emit('error-uploading-file')
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
  .icon-error {
    margin-bottom: 16px;
    font-size: 56px;
    color: $red-1;
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
.fade-enter {
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
  errorMessage="Upload a valid file"
  :validateFile="()=> true"
>
  Drag your <span class="upload">participant_proof.json</span> file here or
  <span class="underline">click to import</span>
</FileUploader>
```

#### Show error when validation file
```js
<FileUploader
  acceptedFormat=".json"
  errorMessage="Upload a valid file"
  :validateFile="() => false"
>
  Drag your <span class="upload">participant_proof.json</span> file here or
  <span class="underline">click to import</span>
</FileUploader>
```

</docs>
