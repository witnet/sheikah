<template>
  <div>
    <div
      v-cloak
      data-test="drag-and-drop"
      class="drag-file-area"
      @click="uploadFile"
      @drop.prevent="readFile"
      @dragover.prevent
    >
      <font-awesome-icon
        v-if="localFile"
        icon="check-circle"
        data-test="success-icon"
        class="icon-circle-check"
      />

      <p
        v-if="fileName && fileName.length <= 50 && localFile"
        data-test="success-text"
        >{{ fileName }}</p
      >
      <el-tooltip v-else :content="fileName" placement="bottom" effect="light">
        <p v-if="localFile" data-test="success-text">{{
          cropString(fileName, 50, 'middle')
        }}</p>
      </el-tooltip>

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
    <p
      v-if="acceptedFormat"
      data-test="accepted-file-subtitle"
      class="format-warning"
    >
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
          <div data-test="file-name" class="text">{{
            cropString(fileName, 50, 'middle')
          }}</div>
        </div>
        <font-awesome-icon
          v-if="showDelete"
          icon="times"
          data-test="delete-icon"
          class="file-icon close"
          @click="clearFile"
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
      ref="fileInput"
      :accept="acceptedFormat"
      :style="{ display: 'none' }"
      type="file"
      @change="readFile"
    />
    <a
      v-if="localFile"
      ref="download"
      :href="fileLink"
      :download="localFile.name"
      style="display: none"
    />
  </div>
</template>

<script>
import { cropString } from '@/utils'
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
    acceptedFormat: {
      type: String,
      default: '',
    },
    /**
     * Initial file loaded. Util to load the component in a success state
     */
    file: {
      type: Object,
      default: null,
    },
    /**
     * Gets called when a file is uploaded to ensure its validity
     */
    validateFile: {
      type: Function,
      default: null,
    },
    /**
     * Error text to show if validateFile fails
     */
    errorMessage: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      error: !!this.errorMessage,
      localFile: this.file,
      fileName: this.file ? this.file.name : null,
      showDelete: false,
      subtitle: this.$t('accepted_format', { variable: this.acceptedFormat }),
    }
  },
  computed: {
    fileLink() {
      return `data:application/json;charset=utf-8,${encodeURIComponent(
        JSON.stringify(this.localFile),
      )}`
    },
  },
  created() {
    if (this.errorMessage) {
      this.clearFile()
    }
  },
  methods: {
    cropString,
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
        async e => {
          const fileInfo = JSON.parse(e.target.result)
          this.fileName = file.name
          this.$emit('file-name', file.name)
          try {
            const validated = await this.validateFile(fileInfo)
            if (validated) {
              /**
               * Emit the content of the file validated
               */
              this.$emit('file-validated', fileInfo)
              this.localFile = { ...fileInfo, name: file.name }
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
        false,
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
  align-items: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  outline: var(--drag-drop-area);
  padding: 50px;
  width: 100%;

  .sub-text {
    color: var(--text-low-emphasis);
    font-size: 14px;
    margin-bottom: 16px;

    .upload {
      font-weight: 600;
    }

    .underline {
      text-decoration: underline;
    }
  }

  .icon-upload {
    color: var(--text-low-emphasis);
    font-size: 56px;
    margin-bottom: 16px;
  }

  .icon-error {
    color: $red-2;
    font-size: 56px;
    margin-bottom: 16px;
  }

  .icon-circle-check {
    color: #52c41a;
    font-size: 56px;
    line-height: 50px;
    margin-bottom: 16px;
  }

  &:hover {
    outline: var(--drag-drop-area-focus);
  }
}

.format-warning {
  color: var(--text-low-emphasis);
  font-size: 12px;
  margin-top: 8px;
}

.file {
  align-items: center;
  cursor: pointer;
  display: flex;
  font-size: 34px;
  height: min-content;
  justify-content: space-between;
  margin-top: 16px;
  padding: 4px;

  .icon-document {
    color: var(--text-low-emphasis);
    margin-left: 4px;
    margin-right: 8px;
  }

  .name {
    align-items: center;
    border: 1px solid transparent;
    border-radius: 3px;
    color: var(--text-low-emphasis);
    display: flex;
    font-size: 14px;
    justify-content: center;
  }

  &:hover {
    background-color: var(--drag-drop-file-background-color);
    border-radius: 4px;
    transition: color 0.3s;

    .text {
      color: var(--text-medium-emphasis);
    }
  }

  .file-icon {
    color: var(--text-low-emphasis);
    font-size: 12px;
    margin-right: 8px;
  }

  .success {
    color: #52c41a;
  }
}

.fade-enter-active {
  transition: all 0.3s ease;
}

.fade-enter {
  opacity: 0;
  transform: translateY(-10px);
}

.error {
  color: $red-2;
  font-size: 14px;
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
