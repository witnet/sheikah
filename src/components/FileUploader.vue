<template>
  <div class="import-container">
    <!-- TODO: Fix drag and drop -->
    <div
      data-test="drag-and-drop"
      class="drag-file-area"
      @click="importFile"
      v-cloak
      @drop.prevent="readFile"
      @dragover.prevent
    >
      <!-- TODO: use font awesome icons instead of element ones -->
      <i
        data-test="success-icon"
        v-if="localFile && !error"
        class="el-icon-upload-success el-icon-circle-check"
      />
      <!-- TODO: Set proper error icon -->
      <i
        data-test="error-icon"
        v-if="localFile && error"
        class="el-icon-upload-error el-icon-circle-close"
      />
      <p data-test="success-text" v-if="localFile">{{ fileName }}</p>
      <i data-test="upload-icon" v-if="!localFile" class="el-icon-upload"></i>
      <p data-test="upload-text" v-if="!localFile" class="sub-text">
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
        v-if="localFile && !error"
        @mouseover="showDelete = true"
        @mouseleave="showDelete = false"
      >
        <p class="name">
          <i class="el-icon-document"></i>
          <span data-test="file-name" class="text"> {{ fileName }} </span>
        </p>
        <i
          data-test="close-icon"
          @click="clearFile"
          v-if="showDelete"
          class="el-icon-close file-icon"
        ></i>
        <i
          data-test="check-icon"
          v-else
          class="el-icon-upload-success el-icon-circle-check file-icon"
        ></i>
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
     * Type of the file to be uploaded
     */
    acceptedFormat: {
      type: String,
      required: true,
    },
    /**
     * Initial file loaded
     */
    file: {
      type: Object,
      required: false,
    },
    /**
     * Gets called when a file is uploaded to ensure its validity
     */
    validateFile: {
      type: Function,
      required: false,
    },
    /**
     * Gets called just after a file is uploaded
     */
    afterUpload: {
      type: Function,
      required: false,
    },
    /**
     * Error text to show if validateFile fails
     */
    errorMessage: {
      type: String,
      required: false,
    },
  },
  data() {
    return {
      localFile: this.file,
      error: false,
      fileName: this.fileName,
      showDelete: false,
      subtitle: `(Only ${this.acceptedFormat} files are allowed)`,
    }
  },
  methods: {
    clearFile() {
      this.localFile = null
      this.fileName = null
      this.$emit('file-cleared')
    },
    importFile() {
      this.$refs.fileInput.value = ''
      this.$refs.fileInput.click()
    },
    readFile(e) {
      this.localFile = this.$refs.fileInput.files[0]
      this.fileName = this.$refs.fileInput.files[0].name

      const reader = new FileReader()
      reader.addEventListener(
        'load',
        e => {
          const fileInfo = JSON.parse(e.target.result)
          try {
            if (this.validateFile(fileInfo)) {
              this.localFile = fileInfo
              /**
               * Emit the content of the file uploaded
               */
              this.$emit('file-uploaded', fileInfo)
              this.error = false
            } else {
              this.fileName = this.localFile.name
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

      if (this.localFile) {
        reader.readAsText(this.localFile)
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
      color: $purple-6;
    }
  }
  .file-icon {
    padding-right: 8px;
    font-size: 14px;
  }
  .el-icon-upload-success {
    color: lightgreen;
  }

  .el-icon-upload-error {
    color: lightcoral;
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
