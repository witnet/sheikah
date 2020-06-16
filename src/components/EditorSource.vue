<template>
  <Fieldset :title="title" :subtitle="subtitle" :closable="false">
    <Card class="card" shadow="thin" :border="false">
      <div class="form">
        <label class="label">Protocol</label>
        <Select
          v-model="localProtocol"
          :disabled="true"
          :options="[{ primaryText: 'HTTP-GET' }]"
          data-test="protocol-select"
        />
        <label class="label">URL</label>
        <el-input ref="url" v-model="localUrl" data-test="url-input" />
        <label class="label">Content-Type</label>
        <Select
          v-model="currentContentType"
          :disabled="true"
          :options="currentContentTypeOptions"
          data-test="content-type-select"
        />
      </div>
      <div
        class="delete"
        data-test="delete-btn"
        @click="deleteSource({ index })"
      >
        <el-tooltip content="Delete source" placement="right" effect="light">
          <img src="@/resources/svg/close-btn.svg" />
        </el-tooltip>
      </div>
    </Card>
  </Fieldset>
</template>

<script>
import { mapMutations } from 'vuex'

import { UPDATE_SOURCE, DELETE_SOURCE } from '@/store/mutation-types'
import { getDomainFromUrl } from '@/utils'
import Card from '@/components/card/Card'
import Fieldset from '@/components/Fieldset'
import Select from '@/components/Select'

export default {
  name: 'EditorSource',
  components: {
    Fieldset,
    Card,
    Select,
  },
  props: {
    /**
     * Index of the source by creation date
     */
    index: {
      required: true,
      type: Number,
    },
    /**
     * Value to show in the protocol field
     */
    protocol: {
      required: true,
      type: String,
    },
    /**
     * Value to show in the url field
     */
    url: {
      required: true,
      type: String,
    },
    /**
     * Value to show in the content type field
     */
    // FIXME: Support other content types and protocol options
    contentType: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      currentProtocol: { primaryText: 'HTTP-GET' },
      currentContentType: [],
      currentUrl: '',
    }
  },
  computed: {
    title() {
      return `Data Source #${this.index}`
    },
    subtitle() {
      return getDomainFromUrl(this.url)
    },
    currentContentTypeOptions() {
      return [
        { primaryText: 'JSON API' },
        { primaryText: 'Plain UTF-8 text' },
        { primaryText: 'Binary file' },
      ]
    },
    localUrl: {
      get() {
        return this.url
      },
      set(val) {
        this.updateSource({
          index: this.index,
          source: {
            protocol: this.localProtocol.primaryText,
            url: val,
            contentType: this.localContentType.primaryText,
          },
        })
        this.$refs.url.focus()
      },
    },
    localProtocol: {
      get() {
        return { primaryText: this.protocol }
      },
      set(val) {
        this.updateSource({
          index: this.index,
          source: {
            protocol: val.primaryText,
            url: this.localUrl,
            contentType: this.localContentType.primaryText,
          },
        })
      },
    },
    localContentType: {
      get() {
        return { primaryText: this.contentType }
      },
      set(val) {
        this.updateSource({
          index: this.index,
          source: {
            protocol: this.localProtocol.primaryText,
            url: this.localUrl,
            contentType: val.primaryText,
          },
        })
      },
    },
  },
  created() {
    this.currentContentType = this.currentContentTypeOptions[0]
  },
  methods: {
    ...mapMutations({
      deleteSource: DELETE_SOURCE,
      updateSource: UPDATE_SOURCE,
    }),
  },
}
</script>

<style scoped lang="scss">
@import '@/styles/_colors.scss';

.card {
  position: relative;

  .delete {
    cursor: pointer;
    position: absolute;
    right: 8px;
    top: 8px;
  }

  .form {
    align-items: center;
    column-gap: 10px;
    display: grid;
    grid-template: repeat(3, auto) / 130px 1fr;
    row-gap: 22px;

    .label {
      color: $grey-5;
      font-size: 14px;
    }
  }
}
</style>

<docs>
### Example

```jsx
  <EditorSource url="witnet.io" protocol="HTTP-GET" contentType="JSON API" :index="0" />
```

</docs>
