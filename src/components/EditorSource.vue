<template>
  <Fieldset
    :title="title"
    :subtitle="subtitle"
    :closable="true"
    :onClose="() => deleteSource({ index })"
  >
    <Card class="card" shadow="thin" :border="false">
      <div class="form">
        <label>Protocol</label>
        <Select
          v-model="localProtocol"
          :options="[{ primaryText: 'HTTP-GET' }]"
          data-test="protocol-select"
        />
        <label>URL</label>
        <el-input ref="url" v-model="localUrl" data-test="url-input" />
        <label>Content-Type</label>
        <Select
          v-model="currentContentType"
          :options="currentContentTypeOptions"
          data-test="content-type-select"
        />
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
  data() {
    return {
      currentProtocol: { primaryText: 'HTTP-GET' },
      currentContentType: [],
      currentUrl: '',
    }
  },
  created() {
    this.currentContentType = this.currentContentTypeOptions[0]
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
    contentType: {
      required: true,
      type: String,
    },
  },
  methods: {
    ...mapMutations({
      deleteSource: DELETE_SOURCE,
      updateSource: UPDATE_SOURCE,
    }),
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
}
</script>

<style scoped lang="scss">
.card {
  .form {
    display: grid;
    grid-template: repeat(3, auto) / 130px 1fr;
    row-gap: 22px;
    column-gap: 10px;
    align-items: center;
  }
}
</style>

<docs>
### Example

```jsx
  <EditorSource url="witnet.io" protocol="HTTP-GET" contentType="JSON API" />
```

</docs>
